/* ========================================
   Sproutfolio 👑 Alpha Test 0.0.1
   game-core.js (FULL FIXED VERSION)
======================================== */

let currentCards = [];
let playerHasChosen = false;
let gameLocked = false;

let gameHour = 13; // ⏰ เริ่ม 01:00 PM
let gameOver = false;

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

/* ----------------------------------------
   การ์ด
---------------------------------------- */

function generateCard() {
    return [randomVegetable(), randomVegetable(), randomVegetable()];
}

function generateCards() {
    currentCards = [generateCard(), generateCard(), generateCard()];
}

/* ----------------------------------------
   LOCK UI ปุ่มการ์ด
---------------------------------------- */

function updateCardButtonsLock() {

    const buttons = [
        document.getElementById("card1"),
        document.getElementById("card2"),
        document.getElementById("card3")
    ];

    buttons.forEach((btn, i) => {
        btn.disabled = (gameLocked || playerHasChosen || !currentCards[i]);
    });
}

/* ----------------------------------------
   เพิ่มของผู้เล่น
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
   เพิ่มของบอท
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
   ผู้เล่นเลือก
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

    setTimeout(() => botTurn(), 1500);
}

/* ----------------------------------------
   บอทเลือก
---------------------------------------- */

function botTurn() {

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

        setTimeout(() => {
            resolveVolatilityCard(remaining[0]);
        }, 1500);

    } else {
        endTurn();
    }
}

/* ----------------------------------------
   ⚡ การ์ดผันผวน + ตลาด
---------------------------------------- */

function resolveVolatilityCard(card) {

    showEvent("⚡ การ์ดความผันผวน\n" + card.join(" "));

    applyVolatility(card);

    setTimeout(() => endTurn(), 1500);
}

/* ----------------------------------------
   ตลาดหุ้นเปลี่ยนจริง ตลาดแตก
---------------------------------------- */

function applyVolatility(card) {

    // 📍 STEP 1: โชว์การ์ดผันผวนก่อน
    showEvent("⚡ การ์ดความผันผวน\n" + card.join(" "));

    setTimeout(() => {

        // 📍 STEP 2: อัปเดตตลาด
        card.forEach(e => {

            if (e === "🥦") market.broccoli++;
            if (e === "🌽") market.corn++;
            if (e === "🥕") market.carrot++;
            if (e === "🍅") market.tomato++;
            if (e === "🍆") market.eggplant++;

        });

        // 📍 STEP 3: เช็คตลาดแตก + ใช้ emoji
        Object.keys(market).forEach(key => {

            if (market[key] >= 5) {

                const emojiMap = {
                    broccoli: "🥦",
                    corn: "🌽",
                    carrot: "🥕",
                    tomato: "🍅",
                    eggplant: "🍆"
                };

                showEvent("💥 ตลาดแตก!\n    " + emoji);

                market[key] = 0;
            }

        });

        // 📍 STEP 4: render ตลาด
        renderMarket();

    }, 1500);
}
/* ----------------------------------------
   หมดเวลา
---------------------------------------- */

function updateTime() {

    gameHour++;

if (gameHour >= 18) {

    gameHour = 18;
    gameOver = true;

    showEvent("⛔ ตลาดปิด\nเทรดวันนี้จบแล้ว");

    setTimeout(() => {

        const playerScore = calculateScore(playerInventory);
        const botScore = calculateScore(botInventory);

        showEndGame(playerScore, botScore);

    }, 1500);
}

/* ----------------------------------------
   นับคะแนน
---------------------------------------- */

function calculateScore(inv) {

    let score = 0;

    Object.keys(inv).forEach(key => {
        score += inv[key] * (market[key] || 0);
    });

    return score;
}

    const display =
        gameHour <= 12
            ? `${gameHour}:00 AM`
            : `${gameHour - 12}:00 PM`;

    document.getElementById("timeText").textContent = display;
}

/* ----------------------------------------
   ปุ่มรีเซ็ตเกม
---------------------------------------- */

document.getElementById("restartBtn").addEventListener("click", () => {
    location.reload();
});

/* ----------------------------------------
   จบตา
---------------------------------------- */

function endTurn() {

    setTimeout(() => {

        playerHasChosen = false;
        gameLocked = false;

        updateTime();

        // 🔥 ถ้าเกมจบ = หยุดระบบทั้งหมด
        if (gameOver) return;

        generateCards();
        renderCards();
        updateCardButtonsLock();

        showEvent("🔄 เปิดรอบใหม่\n📈 หุ้นใหม่เข้าตลาดแล้ว");

    }, 1500);
}

/* ----------------------------------------
   เริ่มเกม
---------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {

    generateStartingMarket();
    renderMarket();

    generateCards();
    renderCards();
    updateCardButtonsLock();

    document.getElementById("card1").onclick = () => selectCard(0);
    document.getElementById("card2").onclick = () => selectCard(1);
    document.getElementById("card3").onclick = () => selectCard(2);

    console.log("Sproutfolio Started 👑");
});

/* ----------------------------------------
   Popup คลัง
---------------------------------------- */

document.getElementById("inventoryBtn")
.addEventListener("click", () => {
    document.getElementById("inventoryModal").classList.remove("hidden");
});

document.getElementById("closeInventory")
.addEventListener("click", () => {
    document.getElementById("inventoryModal").classList.add("hidden");
});

    function showEndGame(playerScore, botScore) {

    const screen = document.getElementById("endGameScreen");

    const title = document.getElementById("endTitle");
    const msg = document.getElementById("endMessage");

    const pScore = document.getElementById("endPlayerScore");
    const bScore = document.getElementById("endBotScore");

    let resultText = "";

    if (playerScore > botScore) {

        resultText = `
👤 คุณคือนักลงทุนที่มั่งคั่งที่สุด
`;

        title.textContent = "🎉 ยินดีด้วย 🎉";

    } else if (playerScore < botScore) {

        resultText = `
🤖 ดูเหมือนว่าบอทจะมีความสามารถมากกว่าคุณ
`;

        title.textContent = "😢 แพ้แล้ว";

    } else {

        resultText = `
👤🤝🤖
ดูเหมือนว่าคุณและบอทจะต้องเป็นหุ้นส่วนกัน
`;

        title.textContent = "🤝 เสมอ";
    }

    msg.textContent = resultText;

    pScore.textContent = `มูลค่าหุ้น 👤 : ${playerScore}K`;
    bScore.textContent = `มูลค่าหุ้น 🤖 : ${botScore}K`;

    screen.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {

    const restartBtn = document.getElementById("restartBtn");

    restartBtn.addEventListener("click", () => {
        location.reload();
    });

});