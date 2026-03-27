const titolo = document.getElementById("financialDashboard");

const slogan = document.getElementById("slogan");

const cardLogin = document.getElementById("loginCard");

const cardConto = document.getElementById("cardTotale");

const cardTrans = document.getElementById("cardTransizioni");

const dettagliRicorrenza = document.getElementById("extraRicorrenza");

const aggiuntaTransazione = document.getElementById("cardDiAggiunta");

const overlay = document.getElementById("overlayChiusuraCard");

export function apriTendinaRicorrenza() {
  dettagliRicorrenza.classList.remove("max-h-0");
  dettagliRicorrenza.classList.add("max-h-[500px]");
}

export function chiudiTendinaRicorrenza() {
  dettagliRicorrenza.classList.remove("max-h-[500px]");
  dettagliRicorrenza.classList.add("max-h-0");
}

export function apriTransazioni() {
  aggiuntaTransazione.classList.remove("scale-0");
  aggiuntaTransazione.classList.add("scale-100");
  
  overlay.classList.remove("opacity-0", "pointer-events-none");
  overlay.classList.add("opacity-100");
}

export function chiudiTransazione() {
  aggiuntaTransazione.classList.remove("scale-100");
  aggiuntaTransazione.classList.add("scale-0");
  
  overlay.classList.remove("opacity-100");
  overlay.classList.add("opacity-0", "pointer-events-none");
}

export function animazioneLogin() {
  titolo.classList.remove("opacity-0", "scale-75");
  slogan.classList.remove("opacity-0", "scale-75");
  cardLogin.classList.remove("translate-y-8", "opacity-0", "scale-95");
}

export function animazioneDashboard(){
  cardConto.offsetHeight;
  cardTrans.offsetHeight;
  
  cardConto.classList.remove("opacity-0", "scale-75");
  cardTrans.classList.remove("translate-y-8", "scale-95", "opacity-0");
}