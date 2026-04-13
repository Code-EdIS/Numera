import { supabase } from "./modules/supabaseClient.js"

import * as funzioni from "./modules/api.js"

import * as anime from "./modules/animazioni.js"

const bodyAlert = document.getElementById("bodyAlert");
//funzione di aggiornamento UI che parte in ogni occasione necessaria
async function aggiornaUI(){
  const totale = await funzioni.contaImporto();
  
    document.getElementById("aggiorna").textContent = totale.toFixed(2);
}

//apparizione card di aggiunta transizione 
const transizioneAggiunta = document.getElementById("addMovimento");

transizioneAggiunta.addEventListener("click", () => {
  anime.apriTransazioni();
}
)

//ingrandimento tendine di aggiunta operazioni in caso di operazione ricorrente

const inputRicorrenza = document.querySelectorAll("input[name='ricorrenza']");

function abilitaRicorrenza(){
  document.querySelectorAll("#extraRicorrenza input, #extraRicorrenza select")
    .forEach(el => el.disabled = false);
}

function disabilitaRicorrenza(){
  document.querySelectorAll("#extraRicorrenza input, #extraRicorrenza select")
    .forEach(el => {
      el.disabled = true;

      // reset valore
      if(el.type === "radio" || el.type === "checkbox"){
        el.checked = false;
      } else {
        el.value = "";
      }
    });
}

inputRicorrenza.forEach(input => {
  input.addEventListener('change', () => {
    if(input.value === "si" && input.checked){
      anime.apriTendinaRicorrenza();
      abilitaRicorrenza();
    }else{
      anime.chiudiTendinaRicorrenza();
      disabilitaRicorrenza();
    }
  })})
  
//lista effettiva delle transizion
async function caricaLista(){
const cardLista = document.getElementById("listaMovimenti");

const res = await funzioni.prendiMovimenti();

let html = "";

if(!res.success){
  cardLista.innerHTML = `<p>errore nel caricamento della lisa</p>`
}else{
  const listaTransazioni = res.data;
  listaTransazioni.forEach(el =>
    html += `
    <p class="self-start border-r border-white/10 rounded-l p-1 text-white">${el.date}</p>
    <div class="flex flex-row text-white border-b border-white/10 justify-around">
       <p>${el.amount}</p>
       <p>${el.description}</p>
    </div>`
  )}
  
  cardLista.innerHTML = html;
}
//mostra e chiudi dashboard e pagina login

function mostraLogin(){
  document.getElementById("paginaLogin").classList.remove("hidden");
  
  anime.animazioneLogin();
}

function chiudiLogin() {
  document.getElementById("paginaLogin").classList.add("hidden");
}

function mostraDashboard(){
  document.getElementById("paginaPrincipale").classList.remove("hidden");
    
  anime.animazioneDashboard();
}

function chiudiDashboard(){
  document.getElementById("paginaPrincipale").classList.add("hidden");
}

//funzione per mostrare gli avvisi, equivalente di alert ma personalizzato
function avviso(message){
  anime.apriAvviso();
  bodyAlert.textContent(message);
  setTimeout( () => {anime.chiudiAvviso()}, 1000);
}
//funzione login con dichiarazioni e funzione
const formLogin = document.getElementById("loginForm");

window.addEventListener('load', async() => {
  const {data, error} = await supabase.auth.getSession();
  const session = data?.session ?? null;
    
    if(session){
      chiudiLogin();
      mostraDashboard();
      aggiornaUI();
      caricaLista();
    }else{
      chiudiDashboard();
      mostraLogin();
}
});

formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
  
        const mail = formLogin.querySelector("input[type='email']").value;
        const password = formLogin.querySelector("input[type='password']").value;
        
        const res = await funzioni.loginUser(mail, password);
        
        if(res.success){
          chiudiLogin();
          mostraDashboard();
          aggiornaUI();
          caricaLista();
          formLogin.reset();
        }else{
          avviso(res.message);
        }
}); 

//blocco movimenti
const pulsanteAggiunta = document.getElementById("addMovimento");

const formAggiunta= document.getElementById("movimentiInseriti");

function resetFormCompleto() {
  disabilitaRicorrenza();
  formAggiunta.reset();
}

formAggiunta.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(formAggiunta);
  let transaction = Object.fromEntries(formData.entries());
  
  //aggiusto i tipi di dati
  transaction.amount = Number(transaction.amount);
  
  transaction.type = transaction.tipo;
  delete transaction.tipo;
  
  transaction.recurrent = transaction.ricorrenza === "si";
  delete transaction.ricorrenza;
  
  transaction.description = transaction.description?.trim() || null;
  
  transaction.frequency = transaction.frequenza || null;
  delete transaction.frequenza;
  
  transaction.start_date = new Date().toISOString().split("T")[0];
  
  if(transaction.fineRicorrenza === "infinito"){
    transaction.end_date = null;
  } else{
    transaction.end_date = transaction.end_date || null;
  }
  delete transaction.fineRicorrenza;
  
  const res = await funzioni.addTransaction(transaction);
  
  if(res.success){
    formAggiunta.textContent = "transazione aggiunta correttamente"
    anime.chiudiTransazione();
    resetFormCompleto();
    aggiornaUI();
    caricaLista();
  }else{
    alert(res.message);
  }
})

const overlay = document.getElementById("overlayChiusuraCard");

overlay.addEventListener("click", () => {
  anime.chiudiAvviso();
  anime.chiudiTransazione();
  resetFormCompleto();
})

//funzione logout
const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", async () => {
  const res = await funzioni.logout();
  
  if(!res.success){
    alert(res.message);
  }else{
    alert("logout riuscito");
    chiudiDashboard();
    mostraLogin();
  }
})

//blocco funzione e dichiarazioni signUp

const signUpBtn = document.getElementById("signIn");

signUpBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  
  const email = formLogin.querySelector("input[type='email']").value;
  const password = formLogin.querySelector("input[type='password']").value;
  
  const res = await funzioni.signIn(email, password);
  
  if(res.success){
    alert("registrazione avvenuta con successo");
    chiudiLogin();
    mostraDashboard();
    formLogin.reset();
  }else{
    alert(res.message);
    formLogin.reset();
  }
})