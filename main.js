import { supabase } from "./modules/supabaseClient.js"

import * as funzioni from "./modules/api.js"

import * as anime from "./modules/animazioni.js"

//blocco animazioni

window.addEventListener("load", anime.animazioneLogin());

//blocco funzione login con dichiarazioni e funzione
const formLogin = document.getElementById("loginForm");

function mostraDashboard(){
  document.getElementById("paginaLogin").classList.add("hidden");
    
    document.getElementById("paginaPrincipale").classList.remove("hidden");
    
  anime.animazioneDashboard();
}

const { data: {session}} = await supabase.auth.getSession();
  
  if(session){
    mostraDashboard();
  }else{
    formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  
    const mail = formLogin.querySelector("input[type='email']").value;
    const password = formLogin.querySelector("input[type='password']").value;
    
    const res = await funzioni.loginUser(mail, password);
    
    if(res.success){
      mostraDashboard();
    }else{
      alert(res.message);
    }
  }
)}; 

//blocco movimenti
const pulsanteAggiunta = document.getElementById("addMovimento");

const formAggiunta= document.getElementById("movimentiInseriti");

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
    alert("transazione aggiornata correttamente")
    formAggiunta.reset();
  }else{
    alert(res.messagge);
  }
})