"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAtkMessageComponent = void 0;
const constants_1 = require("../constants/constants");
const handleAtkMessageComponent = (custom_id) => {
    switch (custom_id) {
        case constants_1.ATK_VALUE:
            // save atk_val
            break;
        case constants_1.ATK_ENEMYSELECTION:
            // save enemyselection
            break;
        case constants_1.ATK_DIFFICULTY:
            // save difficulty
            break;
        case constants_1.ATK_SUBMIT:
            // save submit
            break;
    }
};
exports.handleAtkMessageComponent = handleAtkMessageComponent;
