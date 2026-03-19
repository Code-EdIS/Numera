import { supabase } from "./modules/supabaseClient.js"

import * as funzioni from "./modules/api.js"

import * as anime from "./modules/animazioni.js"

//blocco animazioni

window.addEventListener("load", anime.animazioneLogin());

//blocco funzione login con dichiarazioni e funzione
const form = document.getElementById("loginForm");

function mostraDashboard(){
  document.getElementById("paginaLogin").classList.add("hidden");
    
    document.getElementById("paginaPrincipale").classList.remove("hidden");
    
  anime.animazioneDashboard();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const { data: {session}} = await supabase.auth.getSession();
  
  if(session){
    mostraDashboard();
  }else{
    const mail = form.querySelector("input[type='email']").value;
    const password = form.querySelector("input[type='password']").value;
    
    const res = await funzioni.loginUser(mail, password);
    
    if(res.success){
      mostraDashboard();
    }else{
      alert(res.message);
    }
  }
});
