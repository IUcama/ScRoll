import { STARTFIGHT_SELECTEDATTENDEES, STARTFIGHT_USERSELECTION, STARTFIGHT_ENEMYSELECTION, ATK_VALUE, ATK_ENEMYSELECTION, ATK_DIFFICULTY, ATK_SUBMIT } from "./constants.js";
import { enemies } from "../options/Enemies.js";
import { difficultyList } from "../options/difficulty.js";

export const beginFightMessageComponent = {
    "content": "This is a message with components",
    "components": [
        {
            "type": 1,
            "components": [
                {
                    "type": 5,
                    "custom_id": STARTFIGHT_USERSELECTION,
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
                    "custom_id": STARTFIGHT_SELECTEDATTENDEES
                }
            ]

        }
    ]
};



export async function getAtkMessageComponent() {

    let enemyList = enemies.map(e => { 
            const obj = {};
            obj["label"] = `${e.label}`;
            obj["value"] = `${e.label.toLowerCase()}`;
        return obj;
    })

    return {
        "content": "Gib die ensprechenden Informationen für den Angriff an.",
        "components": [
            {
                "type": 1,
                "components": [
                    {
                        "type": 3,
                        "custom_id": ATK_ENEMYSELECTION,
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
                        "custom_id": ATK_DIFFICULTY,
                        "options": difficultyList,
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
                        "custom_id": ATK_SUBMIT
                    }
                ]
            },
        ]
    };
}