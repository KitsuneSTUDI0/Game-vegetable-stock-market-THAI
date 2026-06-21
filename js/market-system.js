const market = {
    broccoli: 0,
    corn: 0,
    carrot: 0,
    tomato: 0,
    eggplant: 0
};

function generateStartingMarket() {

    market.broccoli = randomStock();
    market.corn = randomStock();
    market.carrot = randomStock();
    market.tomato = randomStock();
    market.eggplant = randomStock();
}

function randomStock() {
    return Math.floor(Math.random() * 4) + 1;
}

function stockToCoins(value) {
    return value <= 0 ? "❌" : "🪙".repeat(value);
}