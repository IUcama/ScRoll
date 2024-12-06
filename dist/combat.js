"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beginFight = beginFight;
exports.endFight = endFight;
exports.attack = attack;
function beginFight(option0, option1) {
    console.log("BeginFight, option0", option0);
    console.log("BeginFight, option1", option1);
    const players = option0;
    const enemies = option1;
    return "debug result of beginFight";
}
function endFight() {
    return "debug result of endFight";
}
function attack() {
    return "debug result of attack";
}
