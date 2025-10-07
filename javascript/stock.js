const ctx = document.getElementById("stockChart");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const statsDiv = document.getElementById("stats");

let chart;
let interval;
let days = [];
let prices = [];
let currentPrice = 100; // 初始股價
let totalDays = 7300; // 二十年
let currentDay = 0;

// 初始化圖表
function initChart() {
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: days,
      datasets: [{
        label: "Stock Price",
        data: prices,
        borderColor: "#000000ff",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      }],
    },
    options: {
      animation: false,
      scales: { y: { beginAtZero: false } },
    },
  });
}
let Bull = 0; // 全域變數，放在最上面

// 模擬每天股價變動
function simulateDay() {
  // 計算前一年同一天的索引
  const oneYearAgoIndex = currentDay - 365;

  //跌破去年價 → 啟動「修復上漲期」或者 0.05% 的機率自然啟動一段牛市
  if ( Bull == 0 &&  oneYearAgoIndex >= 0 &&
      (prices[oneYearAgoIndex] >= currentPrice || Math.random() < 0.0005)) {
        Bull = 60;
  }

  // 擲骰子決定方向
  const dice = Math.floor(Math.random() * 6) + 1; // 1~6
  let direction = Math.random() < 0.5 ? -1 : 1;   // 隨機方向

  // 如果強制正漲幅
  if (Bull > 0) {
    direction = 1;  // 強制正
    Bull--;
  }

  // 生成漲幅
  const magnitude = (dice / 6) * 0.015;
  const change = direction * magnitude;

  currentPrice *= 1 + change;
  currentPrice = Math.max(currentPrice, 0);
}

// 更新圖表
function updateChart() {
  days.push("Day " + (currentDay + 1));
  prices.push(currentPrice);
  chart.data.datasets[0].data = prices.map(p => p.toFixed(2));
  chart.update();
}

function calculateStats() {
  const n = prices.length;
  const startPrice = 100;
  const endPrice = prices[n-1];

  const totalReturn = (endPrice - startPrice) / startPrice;
  const years = totalDays / 365; // 365天為一年
  const cagr = Math.pow(endPrice / startPrice, 1 / years) - 1;

  // 最大回撤
  let peak = prices[0], maxDrawdown = 0;
  for (let p of prices) {
    if (p > peak) peak = p;
    let drawdown = (peak - p) / peak;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  }

  statsDiv.innerHTML = `
    <p>Initial Price: ${startPrice.toFixed(2)}</p>
    <p>Final Price: <span style="color:${endPrice >= startPrice ? 'green':'red'}">${endPrice.toFixed(2)}</span></p>
    <p>Total Return: <span style="color:${totalReturn >= 0 ? 'green':'red'}">${(totalReturn*100).toFixed(2)}%</span></p>
    <p>CAGR (Compound Annual Growth Rate): <span style="color:${cagr >= 0 ? 'green':'red'}">${(cagr*100).toFixed(2)}%</span></p>
    <p>Maximum Drawdown: <span style="color:red">${(maxDrawdown*100).toFixed(2)}%</span></p>
  `;
}

const bgm = document.getElementById("bgm");

// 開始模擬
startBtn.onclick = function () {
  bgm.play();
  // 如果圖表還沒開始，先把第一天的初始價格顯示出來
  if (currentDay === 0) {
    days.push("Day 1");
    prices.push(currentPrice); // 第一日固定100
    chart.data.datasets[0].data = prices.map(p => p.toFixed(2));
    chart.update();
    currentDay = 1; // 更新 currentDay
  }

  interval = setInterval(() => {
    for (let i = 0; i < 30; i++) {
      if (currentDay >= totalDays) {
        clearInterval(interval);
        interval = null;
        calculateStats();
        return;
      }
      simulateDay();
      currentDay++;
    }

    // 每 30 天才更新圖表
    days.push("Day " + currentDay);
    prices.push(currentPrice);
    chart.data.datasets[0].data = prices.map(p => p.toFixed(2));
    chart.update();

  }, 50);
};

// 重設
resetBtn.onclick = function () {
  bgm.pause();
  bgm.currentTime = 0; // 重設播放位置到開頭
  clearInterval(interval);
  interval = null;
  days = [];
  prices = [];
  currentDay = 0;
  currentPrice = 100;
  chart.destroy();
  initChart();
  statsDiv.innerHTML = "";
};

initChart();
