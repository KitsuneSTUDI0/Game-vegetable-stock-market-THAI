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

    setTimeout(() => botTurn(), 1700);
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
        }, 1700);

    } else {
        endTurn();
    }
}

/* ----------------------------------------
   ⚡ การ์ดผันผวน + ตลาด
---------------------------------------- */

function resolveVolatilityCard(card) {

    // 1) แสดงการ์ดผันผวน
    showEvent("⚡ การ์ดความผันผวน\n" + card.join(" "));

    setTimeout(() => {

        // 2) อัปเดตตลาด + รับผลตลาดแตก
        const broken = applyVolatility(card);

        setTimeout(() => {

            // 3) ถ้ามีตลาดแตก
            if (broken.length > 0) {
                showEvent("💥 ตลาดแตก!\n" + broken.join(" "));
            }

            // 4) ไปเทิร์นต่อ
            setTimeout(() => {
                endTurn();
            }, 800);

        }, 800);

    }, 800);
}

/* ----------------------------------------
   ตลาดหุ้นเปลี่ยนจริง ตลาดแตก
---------------------------------------- */

function applyVolatility(card) {

    // 📌 1. เปลี่ยนตลาด (ล้วน ๆ ไม่มีเวลา)
    card.forEach(e => {

        if (e === "🥦") market.broccoli++;
        if (e === "🌽") market.corn++;
        if (e === "🥕") market.carrot++;
        if (e === "🍅") market.tomato++;
        if (e === "🍆") market.eggplant++;

    });

    // 📌 2. เช็คตลาดแตก
    const broken = [];

    Object.keys(market).forEach(key => {

        if (market[key] >= 5) {

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

    // 📌 ส่งผลลัพธ์กลับไปให้ flow คุม
    return broken;
}
/* ----------------------------------------
   หมดเวลา
---------------------------------------- */

function updateTime() {

    gameHour++;

if (gameHour >= 18) {

    gameHour = 18;
    gameOver = true;

    showEvent("⛔ตลาดปิด⛔\nเทรดวันนี้จบแล้ว");

    setTimeout(() => {

        const playerScore = calculateScore(playerInventory);
        const botScore = calculateScore(botInventory);

        showEndGame(playerScore, botScore);

    }, 3000);
}

/* ----------------------------------------
   นับคะแนน
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

    Object.keys(inv).forEach(key => {
        score += inv[key] * priceMap[key];
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

    }, 2500);
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

    showEvent("💹 ตลาดกำลังเริ่มเปิด\n📊 เตรียมตัวเลือกการลงทุน");

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