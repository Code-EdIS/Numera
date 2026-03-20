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