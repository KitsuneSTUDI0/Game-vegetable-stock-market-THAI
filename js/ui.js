/* ========================================
   Sproutfolio 👑 Alpha Test 0.0.1
   ui.js
======================================== */

/* ========================================
   แสดงตลาดหุ้นบนหน้าจอ
======================================== */

function renderMarket() {

    document.getElementById("stock-broccoli").textContent =
        stockToCoins(market.broccoli);

    document.getElementById("stock-corn").textContent =
        stockToCoins(market.corn);

    document.getElementById("stock-carrot").textContent =
        stockToCoins(market.carrot);

    document.getElementById("stock-tomato").textContent =
        stockToCoins(market.tomato);

    document.getElementById("stock-eggplant").textContent =
        stockToCoins(market.eggplant);

}

/* ========================================
   แสดงการ์ดทั้ง 3 ใบ
======================================== */

function renderCards() {

    const cardElements = [
        document.getElementById("card1"),
        document.getElementById("card2"),
        document.getElementById("card3")
    ];

    currentCards.forEach((card,index)=>{

        if(card === null){

            cardElements[index].textContent =
                "การ์ดนี้ถูกเลือกไปแล้ว";

            cardElements[index].disabled = true;

        }else{

            cardElements[index].textContent =
                card.join(" ");

        }

    });

}
/* ========================================
   แสดงข้อความ
======================================== */

function showEvent(text){

    document.getElementById(
        "eventLog"
    ).textContent = text;

}
/* ========================================
   อัปเดตคลัง ผู้เล่น
======================================== */

function updateInventoryUI(){

    document.getElementById(
        "player-broccoli"
    ).textContent =
        playerInventory.broccoli;

    document.getElementById(
        "player-corn"
    ).textContent =
        playerInventory.corn;

    document.getElementById(
        "player-carrot"
    ).textContent =
        playerInventory.carrot;

    document.getElementById(
        "player-tomato"
    ).textContent =
        playerInventory.tomato;

    document.getElementById(
        "player-eggplant"
    ).textContent =
        playerInventory.eggplant;
        /* ========================================
   อัปเดตคลัง บอท
======================================== */
document.getElementById("bot-broccoli").textContent =
    botInventory.broccoli;

document.getElementById("bot-corn").textContent =
    botInventory.corn;

document.getElementById("bot-carrot").textContent =
    botInventory.carrot;

document.getElementById("bot-tomato").textContent =
    botInventory.tomato;

document.getElementById("bot-eggplant").textContent =
    botInventory.eggplant;

}