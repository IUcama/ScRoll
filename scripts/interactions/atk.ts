import { ATK_DIFFICULTY, ATK_ENEMYSELECTION, ATK_SUBMIT, ATK_VALUE } from "../constants/constants.js";

export const handleAtkMessageComponent = (custom_id, component_type) => {
    switch (custom_id) {
        case ATK_VALUE:
            // save atk_val
            break;
        case ATK_ENEMYSELECTION:
            // save enemyselection
            break;
        case ATK_DIFFICULTY:
            // save difficulty
            break;
        case ATK_SUBMIT:
            // save submit
            break;                           
    }

}