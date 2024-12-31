// 使用 fetch API 獲取 Binance BTC 價格
function fetchBTCPrice() {
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
        .then(response => response.json()) // 解析 JSON 響應
        .then(data => {
            // 更新頁面上顯示的 BTC 價格
            const btcPrice = data.price;
            document.getElementById('btc-price').textContent = `$${btcPrice}`;
        })
        .catch(error => {
            console.error('Error fetching the BTC price:', error);
            document.getElementById('btc-price').textContent = 'Failed to fetch the price.';
        });
}

// 初次載入頁面時顯示 BTC 價格
fetchBTCPrice();

setInterval(fetchBTCPrice, 1000); 

//---------------------------------------------------------------------------------------------------

// 使用 fetch API 獲取 Binance ETH 價格
function fetchETHPrice() {
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT')
        .then(response => response.json()) // 解析 JSON 響應
        .then(data => {
            // 更新頁面上顯示的 ETH 價格
            const ethPrice = data.price;
            document.getElementById('eth-price').textContent = `$${ethPrice}`;
        })
        .catch(error => {
            console.error('Error fetching the ETH price:', error);
            document.getElementById('eth-price').textContent = 'Failed to fetch the price.';
        });
}

// 初次載入頁面時顯示 ETH 價格
fetchETHPrice();

setInterval(fetchETHPrice, 1000); 

//---------------------------------------------------------------------------------------------------
// 使用 fetch API 獲取 Binance ADA 價格
function fetchADAPrice() {
    fetch('https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT')
        .then(response => response.json()) // 解析 JSON 響應
        .then(data => {
            // 更新頁面上顯示的 ETH 價格
            const adaPrice = data.price;
            document.getElementById('ada-price').textContent = `$${adaPrice}`;
        })
        .catch(error => {
            console.error('Error fetching the ADA price:', error);
            document.getElementById('ada-price').textContent = 'Failed to fetch the price.';
        });
}

// 初次載入頁面時顯示 ADA 價格
fetchADAPrice();

setInterval(fetchADAPrice, 1000); 
