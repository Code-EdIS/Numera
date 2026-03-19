const titolo = document.getElementById("financialDashboard");

const slogan = document.getElementById("slogan");

const cardLogin = document.getElementById("loginCard");

const cardConto = document.getElementById("cardTotale");

const cardTrans = document.getElementById("cardTransizioni");

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