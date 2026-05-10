function updateCoin(priceId, changeId, price, changePercent, digits = 2) {
    const priceEl = document.getElementById(priceId);
    const changeEl = document.getElementById(changeId);

    if (!priceEl || !changeEl) return;

    const value = parseFloat(changePercent);
    const safePrice = parseFloat(price);

    if (isNaN(value) || isNaN(safePrice)) return;

    priceEl.textContent = `$${safePrice.toFixed(digits)}`;
    changeEl.textContent = `${value.toFixed(2)}%`;

    changeEl.classList.remove('positive', 'negative');
    changeEl.classList.add(value >= 0 ? 'positive' : 'negative');
}
function fetchBTCPrice() {
    fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
        .then(res => res.json())
        .then(data => {
            updateCoin(
                'btc-price',
                'btc-change',
                data.lastPrice,
                data.priceChangePercent,
                2
            );
        });
}

function fetchETHPrice() {
    fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT')
        .then(res => res.json())
        .then(data => {
            updateCoin(
                'eth-price',
                'eth-change',
                data.lastPrice,
                data.priceChangePercent,
                2
            );
        });
}

function fetchADAPrice() {
    fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ADAUSDT')
        .then(res => res.json())
        .then(data => {
            updateCoin(
                'ada-price',
                'ada-change',
                data.lastPrice,
                data.priceChangePercent,
                4
            );
        });
}
function fetchSNEKPrice() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=snek')
        .then(res => res.json())
        .then(data => {
            
            if (!data || !data[0]) return;
            const snek = data[0];
            updateCoin(
                'snek-price',
                'snek-change',
                snek.current_price,
                snek.price_change_percentage_24h,
                7
            );
        });
}
fetchBTCPrice();
fetchETHPrice();
fetchADAPrice();
fetchSNEKPrice();

setInterval(fetchBTCPrice, 2500);
setInterval(fetchETHPrice, 2500);
setInterval(fetchADAPrice, 2500);
setInterval(fetchSNEKPrice, 12500);