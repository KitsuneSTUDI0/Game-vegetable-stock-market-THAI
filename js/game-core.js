/* ========================================
   Sproutfolio 👑 Alpha Test 0.0.1
   game-core.js (6 TURNS FIXED SAFE FINAL)
======================================== */

let currentCards = [];
let playerHasChosen = false;
let gameLocked = false;

let gameHour = 13;
let gameOver = false;

/* 🟢 ตัวนับตา */
let turnCount = 0;

/* ----------------------------------------
   คลังผู้เล่น
---------------------------------------- */

const playerInventory = {
    broccoli: 0,
    corn: 0,
    carrot: 0,
    tomato: 0,
    eggplant: 0
};

const botInventory = {
    broccoli: 0,
    corn: 0,
    carrot: 0,
    tomato: 0,
    eggplant: 0
};



/* ----------------------------------------
   สุ่มผัก
---------------------------------------- */

function randomVegetable() {
    return VEGETABLES[Math.floor(Math.random() * VEGETABLES.length)].emoji;
}

function generateCard() {
    return [randomVegetable(), randomVegetable(), randomVegetable()];
}

function generateCards() {
    currentCards = [generateCard(), generateCard(), generateCard()];
}

/* ----------------------------------------
   LOCK UI (FIX สำคัญ)
---------------------------------------- */

function updateCardButtonsLock() {

    const buttons = [
        document.getElementById("card1"),
        document.getElementById("card2"),
        document.getElementById("card3")
    ];

    buttons.forEach((btn, i) => {

        if (!btn) return;

        // 🟢 ถ้าเกมจบ = ล็อกหมด
        if (gameOver) {
            btn.disabled = true;
            return;
        }

        btn.disabled = (gameLocked || playerHasChosen || !currentCards[i]);
    });
}

/* ----------------------------------------
   PLAYER
---------------------------------------- */

function addCardToPlayer(card) {
    card.forEach(e => {
        if (e === "🥦") playerInventory.broccoli++;
        if (e === "🌽") playerInventory.corn++;
        if (e === "🥕") playerInventory.carrot++;
        if (e === "🍅") playerInventory.tomato++;
        if (e === "🍆") playerInventory.eggplant++;
    });
}

/* ----------------------------------------
   BOT
---------------------------------------- */

function addCardToBot(card) {
    card.forEach(e => {
        if (e === "🥦") botInventory.broccoli++;
        if (e === "🌽") botInventory.corn++;
        if (e === "🥕") botInventory.carrot++;
        if (e === "🍅") botInventory.tomato++;
        if (e === "🍆") botInventory.eggplant++;
    });
}

/* ----------------------------------------
   PLAYER SELECT
---------------------------------------- */

function selectCard(index) {

    if (gameLocked || playerHasChosen || gameOver) return;

    const card = currentCards[index];
    if (!card) return;

    gameLocked = true;
    updateCardButtonsLock();

    addCardToPlayer(card);
    updateInventoryUI();

    showEvent("👤 : เลือก\n" + card.join(" "));

    currentCards[index] = null;
    playerHasChosen = true;

    renderCards();
    updateCardButtonsLock();

    setTimeout(() => botTurn(), 1700);
}

/* ----------------------------------------
   BOT TURN (FIX กันหลุด)
---------------------------------------- */

function botTurn() {

    if (gameOver) return;

    const available = [];

    currentCards.forEach((c, i) => {
        if (c) available.push(i);
    });

    if (!available.length) return;

    const idx = available[Math.floor(Math.random() * available.length)];
    const card = currentCards[idx];

    addCardToBot(card);

    currentCards[idx] = null;

    updateInventoryUI();

    showEvent("🤖 : เลือก\n" + card.join(" "));

    const remaining = currentCards.filter(c => c);

    if (remaining.length === 1) {
        setTimeout(() => resolveVolatilityCard(remaining[0]), 1700);
    } else {
        endTurn();
    }
}

/* ----------------------------------------
   VOLATILITY
---------------------------------------- */

function resolveVolatilityCard(card) {

    showEvent("⚡ การ์ดความผันผวน\n" + card.join(" "));

    setTimeout(() => {

        const broken = applyVolatility(card);

        setTimeout(() => {

            if (broken.length > 0) {
                showEvent("💥 ตลาดแตก!\n" + broken.join(" "));
            }

            setTimeout(() => endTurn(), 800);

        }, 800);

    }, 800);
}

/* ----------------------------------------
   MARKET
---------------------------------------- */

function applyVolatility(card) {

    card.forEach(e => {
        if (e === "🥦") market.broccoli++;
        if (e === "🌽") market.corn++;
        if (e === "🥕") market.carrot++;
        if (e === "🍅") market.tomato++;
        if (e === "🍆") market.eggplant++;
    });

    const broken = [];

    Object.keys(market).forEach(key => {

    // หุ้นเต็ม 5 ยังไม่แตก
    // ต้องโดนเพิ่มอีก 1 ก่อน
        if (market[key] > 5) {

            const emojiMap = {
                broccoli: "🥦",
                corn: "🌽",
                carrot: "🥕",
                tomato: "🍅",
                eggplant: "🍆"
            };

            broken.push(emojiMap[key]);
            market[key] = 0;
        }
    });

    renderMarket();
    return broken;
}

/* ----------------------------------------
   TIME (SAFE FIX)
---------------------------------------- */

function updateTime() {

    gameHour++;

    const hour = Math.floor(gameHour);
    const min = (gameHour % 1) * 60;

    const display =
        hour < 12
            ? `${hour}:${min === 0 ? "00" : min} AM`
            : `${hour - 12}:${min === 0 ? "00" : min} PM`;

    const timeEl = document.getElementById("timeText");
    if (timeEl) timeEl.textContent = display;
}

/* ----------------------------------------
   SCORE
---------------------------------------- */

function calculateScore(inv) {

    let score = 0;

    const priceMap = {
        broccoli: 1,
        corn: 1,
        carrot: 1,
        tomato: 1,
        eggplant: 1
    };

    Object.keys(inv).forEach(k => {
        score += inv[k] * priceMap[k];
    });

    return score;
}

/* ----------------------------------------
   END TURN (6 TURNS FIXED 100%)
---------------------------------------- */

function endTurn() {

    setTimeout(() => {

        playerHasChosen = false;
        gameLocked = false;

        turnCount++;

        // 🟢 ครบ 6 ตา = จบเกม
        if (turnCount >= 6) {

            gameOver = true;
            gameLocked = true;
            playerHasChosen = true;

            gameHour = 18.25;

            updateTime();
            updateCardButtonsLock();

            showEvent("⛔ ตลาดปิด\nครบ 6 ตาแล้ว");

            setTimeout(() => {

                const p = calculateScore(playerInventory);
                const b = calculateScore(botInventory);

                showEndGame(p, b);

            }, 2000);

            return;
        }

        updateTime();

        generateCards();
        renderCards();
        updateCardButtonsLock();

        showEvent("🔄 เปิดรอบใหม่\n📈 หุ้นใหม่เข้าตลาดแล้ว");

    }, 2500);
}

/* ----------------------------------------
   START GAME
---------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {

    turnCount = 0;

    generateStartingMarket();
    renderMarket();

    generateCards();
    renderCards();
    updateCardButtonsLock();

    showEvent("💹 ตลาดกำลังเริ่มเปิด\n📊 เตรียมตัวเลือกการลงทุน");

    document.getElementById("card1").onclick = () => selectCard(0);
    document.getElementById("card2").onclick = () => selectCard(1);
    document.getElementById("card3").onclick = () => selectCard(2);

    console.log("Sproutfolio Started 👑");
});