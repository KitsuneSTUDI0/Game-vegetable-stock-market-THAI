/* ========================================
   Sproutfolio 👑 UI FIXED VERSION (FULL FIX)
======================================== */

/* =========================
   ตลาดหุ้น
========================= */
function renderMarket() {

    document.getElementById("stock-broccoli").textContent = stockToCoins(market.broccoli);
    document.getElementById("stock-corn").textContent = stockToCoins(market.corn);
    document.getElementById("stock-carrot").textContent = stockToCoins(market.carrot);
    document.getElementById("stock-tomato").textContent = stockToCoins(market.tomato);
    document.getElementById("stock-eggplant").textContent = stockToCoins(market.eggplant);
}

/* =========================
   การ์ด
========================= */
function renderCards() {

    const cardElements = [
        document.getElementById("card1"),
        document.getElementById("card2"),
        document.getElementById("card3")
    ];

    currentCards.forEach((card, i) => {

        if (!cardElements[i]) return;

        if (!card) {
            cardElements[i].textContent = "ถูกเลือกแล้ว";
            cardElements[i].disabled = true;
        } else {
            cardElements[i].textContent = card.join(" ");

            if (!gameOver) {
                cardElements[i].disabled = false;
            }
        }
    });
}

/* =========================
   event log
========================= */
function showEvent(text) {
    const el = document.getElementById("eventLog");
    if (el) el.textContent = text;
}

/* =========================
   inventory UI
========================= */
function updateInventoryUI() {

    // 👤 player
    document.getElementById("player-broccoli").textContent = playerInventory.broccoli;
    document.getElementById("player-corn").textContent = playerInventory.corn;
    document.getElementById("player-carrot").textContent = playerInventory.carrot;
    document.getElementById("player-tomato").textContent = playerInventory.tomato;
    document.getElementById("player-eggplant").textContent = playerInventory.eggplant;

    // 🤖 bot
    document.getElementById("bot-broccoli").textContent = botInventory.broccoli;
    document.getElementById("bot-corn").textContent = botInventory.corn;
    document.getElementById("bot-carrot").textContent = botInventory.carrot;
    document.getElementById("bot-tomato").textContent = botInventory.tomato;
    document.getElementById("bot-eggplant").textContent = botInventory.eggplant;
}

/* =========================
   END GAME (FIX)
========================= */
function showEndGame(playerScore, botScore) {

    const screen = document.getElementById("endGameScreen");
    if (!screen) return;

    document.getElementById("endPlayerScore").textContent =
        "👤 ผู้เล่น : " + playerScore;

    document.getElementById("endBotScore").textContent =
        "🤖 บอท : " + botScore;

    if (playerScore > botScore) {
        document.getElementById("endTitle").textContent = "🎉 คุณชนะ!";
        document.getElementById("endMessage").textContent = "ตลาดนี้คุณคุมเกมได้ดีมาก";
    } 
    else if (playerScore < botScore) {
        document.getElementById("endTitle").textContent = "💀 คุณแพ้!";
        document.getElementById("endMessage").textContent = "บอทชนะตลาดนี้ไปแล้ว";
    } 
    else {
        document.getElementById("endTitle").textContent = "🤝 เสมอ!";
        document.getElementById("endMessage").textContent = "ตลาดสูสีมาก";
    }

    screen.classList.remove("hidden");
//ปุ่มเริ่มใหม่
    document.getElementById("restartBtn").onclick = () => {
    location.reload();
};
}

/* =========================
   INVENTORY POPUP FIX
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("inventoryBtn");
    const modal = document.getElementById("inventoryModal");
    const close = document.getElementById("closeInventory");

    if (!btn || !modal || !close) return;

    btn.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    close.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
});

