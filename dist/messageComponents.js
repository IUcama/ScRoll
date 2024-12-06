"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beginFightMessageComponent = void 0;
exports.getAtkMessageComponent = getAtkMessageComponent;
const constants_js_1 = require("./constants/constants.js");
const Enemies_js_1 = require("../options/Enemies.js");
const difficulty_js_1 = require("../options/difficulty.js");
exports.beginFightMessageComponent = {
    "content": "This is a message with components",
    "components": [
        {
            "type": 1,
            "components": [
                {
                    "type": 5,
                    "custom_id": constants_js_1.STARTFIGHT_USERSELECTION,
                    "min_values": 1,
                    "max_values": 10
                },
            ]
        },
        // {
        //     "type": 1,
        //     "components": [
        //         {
        //             "type": 3,
        //             "custom_id": STARTFIGHT_ENEMYSELECTION,
        //             "options":  [
        //                 enemies.map(e => {
        //                       return { label: e.name, value: e.name };
        //                     })
        //                 ],
        //             "min_values": 1,
        //             "max_values": 10
        //         },
        //     ]
        // },
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "label": "Annehmen",
                    "style": 1,
                    "custom_id": constants_js_1.STARTFIGHT_SELECTEDATTENDEES
                }
            ]
        }
    ]
};
function getAtkMessageComponent() {
    let enemyList = Enemies_js_1.enemies.map(e => {
        const obj = {};
        obj["label"] = `${e.label}`;
        obj["value"] = `${e.label.toLowerCase()}`;
        return obj;
    });
    return {
        "content": "Gib die ensprechenden Informationen für den Angriff an.",
        "components": [
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": constants_js_1.ATK_ENEMYSELECTION,
                        "options": enemyList,
                        "placeholder": "Wähle einen Gegner",
                        "min_values": 1,
                        "max_values": 3
                    }
                ]
            },
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": constants_js_1.ATK_DIFFICULTY,
                        "options": difficulty_js_1.difficultyList,
                        "placeholder": "Schwierigkeit",
                        // "min_values": 1,
                        // "max_values": 1
                    }
                ]
            },
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Bestätigen",
                        "style": 1,
                        "custom_id": constants_js_1.ATK_SUBMIT
                    }
                ]
            },
        ]
    };
}
