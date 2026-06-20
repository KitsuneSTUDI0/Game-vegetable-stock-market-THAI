/* ========================================
   Sproutfolio 👑 Alpha Test 0.0.1
   vegetables.js

   เก็บข้อมูลผักทั้งหมดของเกม
======================================== */

const VEGETABLES = [
    {
        key: "broccoli",
        emoji: "🥦",
        name: "บรอกโคลี"
    },
    {
        key: "corn",
        emoji: "🌽",
        name: "ข้าวโพด"
    },
    {
        key: "carrot",
        emoji: "🥕",
        name: "แครอท"
    },
    {
        key: "tomato",
        emoji: "🍅",
        name: "มะเขือเทศ"
    },
    {
        key: "eggplant",
        emoji: "🍆",
        name: "มะเขือม่วง"
    }
];

/* ========================================
   ฟังก์ชันช่วยค้นหาผัก
======================================== */

function getVegetableByKey(key) {
    return VEGETABLES.find(veg => veg.key === key);
}