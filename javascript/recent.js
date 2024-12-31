// 使用 fetch API 獲取 Binance BTC 價格
function fetchBTCPrice() {
    fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
        .then(response => response.json()) // 解析 JSON 響應
        .then(data => {
            // 更新頁面上顯示的 BTC 價格
            const btcPrice = data.lastPrice;
            const priceChangePercent = data.priceChangePercent;
            document.getElementById('btc-price').textContent = `$${parseFloat(btcPrice).toFixed(2)}`;
            document.getElementById('btc-change').textContent = `${priceChangePercent}%`;
        })
        .catch(error => {
            console.error('Error fetching the BTC price:', error);
            document.getElementById('btc-price').textContent = 'Failed to fetch the price.';
            document.getElementById('btc-change').textContent = 'Failed to fetch the change.';
        });
}

// 初次載入頁面時顯示 BTC 價格
fetchBTCPrice();

setInterval(fetchBTCPrice, 1000); 

//---------------------------------------------------------------------------------------------------

// 使用 fetch API 獲取 Binance ETH 價格
function fetchETHPrice() {
    fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT')
        .then(response => response.json()) // 解析 JSON 響應
        .then(data => {
            // 更新頁面上顯示的 ETH 價格
            const ethPrice = data.lastPrice;
            const priceChangePercent = data.priceChangePercent;
            document.getElementById('eth-price').textContent = `$${parseFloat(ethPrice).toFixed(2)}`;
            document.getElementById('eth-change').textContent = `${priceChangePercent}%`;
        })
        .catch(error => {
            console.error('Error fetching the ETH price:', error);
            document.getElementById('eth-price').textContent = 'Failed to fetch the price.';
            document.getElementById('eth-change').textContent = 'Failed to fetch the change.';
        });
}

// 初次載入頁面時顯示 ETH 價格
fetchETHPrice();

setInterval(fetchETHPrice, 1000); 

//---------------------------------------------------------------------------------------------------
// 使用 fetch API 獲取 Binance ADA 價格
function fetchADAPrice() {
    fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ADAUSDT')
        .then(response => response.json()) // 解析 JSON 響應
        .then(data => {
            // 更新頁面上顯示的 ADA 價格
            const adaPrice = data.lastPrice;
            const priceChangePercent = data.priceChangePercent;
            document.getElementById('ada-price').textContent = `$${parseFloat(adaPrice).toFixed(4)}`;
            document.getElementById('ada-change').textContent = `${priceChangePercent}%`;
        })
        .catch(error => {
            console.error('Error fetching the ADA price:', error);
            document.getElementById('ada-price').textContent = 'Failed to fetch the price.';
            document.getElementById('eth-change').textContent = 'Failed to fetch the change.';
        });
}

// 初次載入頁面時顯示 ADA 價格
fetchADAPrice();

setInterval(fetchADAPrice, 1000); 

//------------------------------------------------------------------------------------
// 使用 fetch API 獲取 MEXC SNEK 價格
function fetchSNEKPrice() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=snek')
        .then(response => response.json()) // 解析 JSON 響應
        .then(data => {
            console.log(data);
            // 更新頁面上顯示的 SNEK 價格
            const snekData = data[0];
            const snekPrice = snekData.current_price; // 正確的字段應該是 data.snek.usd
            const snekPriceChange = snekData.price_change_percentage_24h; 
            document.getElementById('snek-price').textContent = `$${snekPrice.toFixed(7)}`;
            document.getElementById('snek-change').textContent = `${snekPriceChange.toFixed(3)}%`;
        })
        .catch(error => {
            console.error('Error fetching the SNEK price:', error);
            document.getElementById('snek-price').textContent = 'Failed to fetch the price.';
        });
}

// 初次載入頁面時顯示 SNEK 價格
fetchSNEKPrice();

// 每秒更新 SNEK 價格
setInterval(fetchSNEKPrice, 15000);