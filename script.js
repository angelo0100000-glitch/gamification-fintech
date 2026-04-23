let portfolio = {
  stocks: 4000,
  bonds: 4000,
  commodities: 2000
};

let invested = 10000;
let points = 0;
let history = [10000];

let nextMilestone = 15000;

const assets = {
  nvidia: { type: "stocks", risk: "high" },
  apple: { type: "stocks", risk: "high" },
  bond_us: { type: "bonds", risk: "low" },
  bond_eu: { type: "bonds", risk: "low" },
  gold: { type: "commodities", risk: "medium" },
  silver: { type: "commodities", risk: "medium" }
};

// ================= PIE =================
const chart = new Chart(document.getElementById("chart"), {
  type: "pie",
  data: {
    labels: ["Azioni","Obbligazioni","Commodities"],
    datasets: [{
      data: [4000,4000,2000],
      backgroundColor: ["#3b82f6","#22c55e","#f59e0b"]
    }]
  }
});

// ================= PERFORMANCE € =================
const perfChart = new Chart(document.getElementById("performanceChart"), {
  type: "line",
  data: {
    labels: ["Start"],
    datasets: [{
      label: "Valore Portafoglio (€)",
      data: [10000],
      borderColor: "#3b82f6",
      tension: 0.3
    }]
  }
});

// ================= PERFORMANCE % =================
function generateStaticPerformance(){
  let returns=[0];
  let drift=0.08/12;
  let vol=0.10/Math.sqrt(12);
  let cumulative=0;

  for(let i=1;i<=12;i++){
    let rand=(Math.random()-0.5)*vol;
    cumulative += drift+rand;
    returns.push(cumulative*100);
  }
  return returns;
}

const staticChart = new Chart(
  document.getElementById("staticPerformanceChart"),
  {
    type: "line",
    data: {
      labels:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic","Fine"],
      datasets:[{
        label:"Performance (%)",
        data: generateStaticPerformance(),
        borderColor:"#10b981",
        tension:0.3
      }]
    },
    options:{
      scales:{
        y:{
          ticks:{
            callback:(v)=>v+"%"
          }
        }
      }
    }
  }
);

// ================= ALERT (diversificazione) =================
function showAlert(message,color){
  let box=document.createElement("div");
  box.innerText=message;

  box.style.position="fixed";
  box.style.top="20px";
  box.style.left="50%";
  box.style.transform="translateX(-50%)";
  box.style.padding="20px 40px";
  box.style.fontSize="20px";
  box.style.color="white";
  box.style.borderRadius="12px";
  box.style.zIndex="9999";

  if(color==="red"){
    box.style.background="#ef4444";
    document.body.style.background="linear-gradient(120deg,#fecaca,#fee2e2,#fecaca)";
  }else{
    box.style.background="#10b981";
  }

  document.body.appendChild(box);

  setTimeout(()=>{
    box.remove();
    document.body.style.background="linear-gradient(120deg,#e0f2fe,#ecfdf5,#fef9c3)";
  },4000);
}

// ================= NOTIFICA BASSA =================
function showBottomNotification(message, color="green"){
  let box = document.createElement("div");

  box.innerText = message;

  box.style.position = "fixed";
  box.style.bottom = "20px";
  box.style.left = "50%";
  box.style.transform = "translateX(-50%)";

  box.style.padding = "14px 28px";
  box.style.fontSize = "18px";
  box.style.borderRadius = "12px";
  box.style.zIndex = "9999";
  box.style.color = "white";

  box.style.background = color === "green" ? "#10b981" : "#ef4444";

  document.body.appendChild(box);

  setTimeout(() => box.remove(), 3500);
}

// ================= CONFETTI =================
function confetti(){

  for(let i=0;i<12;i++){
    let f=document.createElement("div");

    f.style.position="fixed";
    f.style.left="50%";
    f.style.top="60%";
    f.style.width="6px";
    f.style.height="6px";
    f.style.borderRadius="50%";
    f.style.background=["#ff4d4d","#ffb703","#3a86ff","#8338ec"][Math.floor(Math.random()*4)];
    f.style.boxShadow="0 0 10px rgba(255,255,255,0.8)";
    f.style.zIndex="9999";

    document.body.appendChild(f);

    let angle = Math.random()*Math.PI*2;
    let distance = 200 + Math.random()*200;

    let x = Math.cos(angle)*distance;
    let y = Math.sin(angle)*distance;

    f.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${x}px, ${y}px) scale(0.2)`, opacity: 0 }
    ], {
      duration: 1200 + Math.random()*600,
      easing: "cubic-bezier(.1,.8,.2,1)"
    });

    setTimeout(()=>f.remove(), 1800);
  }

  for(let i=0;i<80;i++){
    let c=document.createElement("div");

    let size = Math.random()*8 + 3;

    c.style.position="fixed";
    c.style.width=size+"px";
    c.style.height=size+"px";
    c.style.left=Math.random()*100+"vw";
    c.style.top="-10px";

    c.style.background=["#3b82f6","#22c55e","#f59e0b","#ef4444","#a855f7"][Math.floor(Math.random()*5)];

    c.style.zIndex="9999";

    let depth = Math.random();

    c.style.filter = `blur(${(1-depth)*2}px)`;
    c.style.opacity = 0.6 + depth*0.4;

    document.body.appendChild(c);

    let fallDuration = 1500 + depth*1500;
    let xDrift = (Math.random()-0.5)*300;

    c.animate([
      { transform: "translate3d(0,0,0) rotate(0deg)" },
      { transform: `translate3d(${xDrift}px, 110vh, ${depth*200}px) rotate(${Math.random()*720}deg)` }
    ], {
      duration: fallDuration,
      easing: "cubic-bezier(.2,.8,.2,1)"
    });

    setTimeout(()=>c.remove(), fallDuration);
  }

  document.body.animate([
    { transform: "translate(0,0)" },
    { transform: "translate(5px,-5px)" },
    { transform: "translate(-5px,5px)" },
    { transform: "translate(0,0)" }
  ], {
    duration: 300
  });
}

// ================= NEWS =================
const newsItems = [

  // 📊 mercati
  "📊 Mercati europei misti → incertezza macro tra crescita e inflazione",

  // 🚀 settori
  "🚀 Nvidia guida il settore AI → forte momentum su crescita tecnologica",
  "🌍 Attesa inflazione UE → possibile impatto su tassi BCE e obbligazioni europee"
];


function renderNews(){
  const feed = document.getElementById("newsFeed");
  if(!feed) return;

  feed.innerHTML = "";
  let loop = [...newsItems, ...newsItems];

  loop.forEach(text=>{
    let div = document.createElement("div");
    div.className = "news-item";
    div.innerText = text;
    feed.appendChild(div);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderNews();

  setInterval(()=>{

    const dynamic = [

  // ================= TASSI =================
  "🏦 Taglio tassi atteso -0.50%: i bond tendono a salire di valore (rendimenti scendono) mentre le piccole imprese beneficiano di credito più economico → possibile spinta su growth e small cap",

  "📈 Aumento tassi +0.50%: pressione sui bond (prezzi giù), ma raffreddamento inflazione → banche e settori finanziari tendono a beneficiare dei margini più alti",

  // ================= INFLAZIONE / TARIFFE =================
  "🇺🇸 Trump propone aumento dazi: rischio inflazione in crescita → protezione storica in oro e commodities come hedge contro perdita di potere d’acquisto",

  // ================= AZIONI / CRYPTO =================
  "📊 S&P500 in accelerazione: miglioramento del sentiment macro → storicamente aumenta la propensione al rischio e può sostenere anche Bitcoin per correlazione risk-on",

  // ================= MACRO GENERALI =================
  "🔥 Spike volatilità globale: aumenta il rischio sui mercati → capitali si spostano verso asset difensivi come bond e oro",

  "⚡ Tech sector in ripresa: liquidità e aspettative di crescita tornano positive → favorisce aziende growth e indici Nasdaq-heavy",

  "📉 Bond yields in calo: segnali di rallentamento economico → obbligazioni lunghe più attrattive per effetto prezzo",

];

    newsItems.shift();
    newsItems.push(dynamic[Math.floor(Math.random()*dynamic.length)]);

    renderNews();

  }, 6000);
});

// ================= UPDATE =================
function updateCharts(){

  let total=invested;

  let s=(portfolio.stocks/total)*100;
  let b=(portfolio.bonds/total)*100;
  let c=(portfolio.commodities/total)*100;

  chart.data.datasets[0].data=[
    portfolio.stocks,
    portfolio.bonds,
    portfolio.commodities
  ];
  chart.update();

  document.getElementById("percStocks").innerText=s.toFixed(1);
  document.getElementById("percBonds").innerText=b.toFixed(1);
  document.getElementById("percCommodities").innerText=c.toFixed(1);

  perfChart.data.labels.push("t"+history.length);
  perfChart.data.datasets[0].data.push(history[history.length-1]);
  perfChart.update();

  document.getElementById("points").innerText=points;
  document.getElementById("points2").innerText=points;
  document.getElementById("total").innerText=invested;
}

// ================= INVEST =================
function invest(){

  let asset=document.getElementById("asset").value;
  let amount=Number(document.getElementById("amount").value);
  if(!amount) return;

  let item=assets[asset];

  portfolio[item.type]+=amount;
  invested+=amount;

  let randomReturn=(Math.random()*0.02-0.005);
  let newValue=invested*(1+randomReturn);
  history.push(newValue);

  let total=invested;

  let s=(portfolio.stocks/total)*100;
  let b=(portfolio.bonds/total)*100;
  let c=(portfolio.commodities/total)*100;

  let deviation =
    Math.abs(s-40)>20 ||
    Math.abs(b-40)>20 ||
    Math.abs(c-20)>20;

  if(deviation){
    showAlert("⚠️ Scarsa diversificazione!","red");
  }else{
    showAlert("✅ Ottima diversificazione!","green");
  }

  let score=0;
  if(item.risk==="low") score+=50;
  if(item.risk==="medium") score+=20;
  if(item.risk==="high") score-=40;

  points+=score;

  // SOLO NOTIFICA BASSA
  showBottomNotification("✔ Operazione eseguita correttamente!", "green");

  // ================= MILESTONE SYSTEM =================
  if (invested >= nextMilestone) {
    confetti();
    showBottomNotification("🎉 Obiettivo raggiunto: " + nextMilestone + "€!", "green");
    nextMilestone += 5000;
  }

  updateCharts();
}

updateCharts();

// ================= UPDATE UI & CHARTS =================
function updateCharts(){
  let total = invested;

  // Calcolo percentuali per etichette
  let s = (portfolio.stocks / total) * 100;
  let b = (portfolio.bonds / total) * 100;
  let c = (portfolio.commodities / total) * 100;

  // Aggiornamento grafico a torta
  chart.data.datasets[0].data = [
    portfolio.stocks,
    portfolio.bonds,
    portfolio.commodities
  ];
  chart.update();

  // Aggiornamento testi percentuali
  document.getElementById("percStocks").innerText = s.toFixed(1);
  document.getElementById("percBonds").innerText = b.toFixed(1);
  document.getElementById("percCommodities").innerText = c.toFixed(1);

  // Aggiornamento grafico a linee (Performance €)
  perfChart.data.labels.push("t" + history.length);
  perfChart.data.datasets[0].data.push(history[history.length - 1]);
  perfChart.update();

  // Aggiornamento testi totali e punti
  document.getElementById("points").innerText = points;
  document.getElementById("points2").innerText = points;
  document.getElementById("total").innerText = Math.floor(invested).toLocaleString();

  // MOVIMENTO GAMIFICATION: Aggiorna la barra e l'omino
  aggiornaGraficaObiettivi();
}

// ================= FUNZIONE INVESTI =================
function invest(){
  let asset = document.getElementById("asset").value;
  let amountInput = document.getElementById("amount");
  let amount = Number(amountInput.value);

  if (!amount || amount <= 0) return;

  let item = assets[asset];

  // Aggiornamento portafoglio
  portfolio[item.type] += amount;
  invested += amount;

  // Simulazione rendimento
  let randomReturn = (Math.random() * 0.02 - 0.005);
  let newValue = invested * (1 + randomReturn);
  history.push(newValue);

  // Controllo Diversificazione
  let total = invested;
  let s = (portfolio.stocks / total) * 100;
  let b = (portfolio.bonds / total) * 100;
  let c = (portfolio.commodities / total) * 100;

  let deviation = Math.abs(s - 40) > 20 || Math.abs(b - 40) > 20 || Math.abs(c - 20) > 20;
  if (deviation) {
    showAlert("⚠️ Scarsa diversificazione!", "red");
  } else {
    showAlert("✅ Ottima diversificazione!", "green");
  }

  // Punteggio
  let score = 0;
  if (item.risk === "low") score += 50;
  if (item.risk === "medium") score += 20;
  if (item.risk === "high") score -= 40;
  points += score;

  showBottomNotification("✔ Operazione eseguita correttamente!", "green");

  // Controllo Milestone (Ogni 5.000€)
  if (invested >= nextMilestone) {
    confetti();
    showBottomNotification("🎉 Obiettivo raggiunto: " + nextMilestone + "€!", "green");
    nextMilestone += 5000;
  }

  updateCharts();
  amountInput.value = ""; // Pulisce il campo input
}

// ================= FUNZIONE GAMIFICATION (MOVIMENTO) =================
function aggiornaGraficaObiettivi() {
  const min = 10000;
  const max = 30000;
  const barra = document.getElementById('progressBar');
  const omino = document.getElementById('investorIcon');
  const testo = document.getElementById('progressText');

  // Calcola la % di avanzamento tra 10k e 30k
  let percentuale = ((invested - min) / (max - min)) * 100;

  if (percentuale < 0) percentuale = 0;
  if (percentuale > 100) percentuale = 100;

  // Applica lo spostamento CSS
  if(barra) barra.style.width = percentuale + "%";
  if(omino) omino.style.left = percentuale + "%";

  // Aggiorna il testo sotto la barra
  if(testo) {
    if (invested >= 30000) {
      testo.innerText = "🏆 LIVELLO ELITE RAGGIUNTO!";
      testo.style.color = "#d97706";
    } else {
      let mancano = nextMilestone - invested;
      testo.innerText = `Mancano ${Math.floor(mancano).toLocaleString()}€ al prossimo obiettivo! 🎯`;
    }
  }
}

// Avvio iniziale
updateCharts();
