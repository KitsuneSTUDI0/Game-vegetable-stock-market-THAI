/* ========================================
   Sproutfolio 👑 Alpha Test 0.0.1
   market-system.js

   ระบบตลาดหุ้นผัก
======================================== */

const market = {
    broccoli: 0,
    corn: 0,
    carrot: 0,
    tomato: 0,
    eggplant: 0
};

/* ========================================
   สุ่มค่าหุ้นเริ่มต้น
   1 - 4
======================================== */

function generateStartingMarket() {

    market.broccoli = randomStock();
    market.corn = randomStock();
    market.carrot = randomStock();
    market.tomato = randomStock();
    market.eggplant = randomStock();

}

/* ========================================
   สุ่มหุ้น
======================================== */

function randomStock() {
    return Math.floor(Math.random() * 4) + 1;
}

/* ========================================
   แปลงตัวเลขเป็น 🪙
======================================== */

function stockToCoins(value) {

    if (value <= 0) {
        return "❌";
    }

    return "🪙".repeat(value);
}