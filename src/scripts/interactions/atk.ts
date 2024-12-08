import { ATK_DIFFICULTY, ATK_ENEMYSELECTION, ATK_SUBMIT, ATK_VALUE } from "../constants/constants";
import AtkModel from '../../mongodb/schema/atkSchema'
import { enemies } from "../../options/enemies";
import { roll } from "./roll";
import { DiceEnum } from "../enums/diceEnum";
import { DiceResult } from "../types/DiceResult";

export const handleAtkMessageComponent = async (custom_id: string, values: string[]): Promise<string | undefined> => {

    if (custom_id === ATK_SUBMIT) {

        const atkModel = await AtkModel.findOne();
        
        // TODO: allow/ update to multiple enemies
        const enemyLabel = atkModel?.Atk_EnemySelection[0].label;
        const enemy = enemies.find(e => e.id === enemyLabel);

        const difficulty = atkModel?.Atk_Difficulty ?? 0;
        const atkVal = atkModel?.Atk_Value ?? 0;

        const rollResult: DiceResult = roll(atkVal, DiceEnum.D10);

        // TODO: check for parryDV also
        // TODO: patzer?

        const hitValue = rollResult.successes - (enemy!.dodgeDV + difficulty);
        const hit = hitValue > 0;

        // todo: now clear db again?
        await AtkModel.findOneAndDelete();

        const hitText = hit ? "getroffen" : "verfehlt";
        const hitExtraSuccesses = hitValue > 0 ? hitValue : "Keine";
        const returnText = 
        `
        Würfel-Ergebnis: ${rollResult.rolls}
        Erfolge: ${rollResult.successes}
        
        Du hast ${hitText}!
        ${hitExtraSuccesses} überschüssige Erfolge
        `;

        return returnText;

    } else {
        let dataToSave;
        switch (custom_id) {
            case ATK_DIFFICULTY: 
                dataToSave = +values[0];
                break;
            case ATK_ENEMYSELECTION: 
                dataToSave = values.map(x => { return { label: x } });
                break;
            case ATK_VALUE: 
                dataToSave = +values[0];
                break;
        }

        const atkModel = await AtkModel.findOne();
        if (atkModel) {
            atkModel[custom_id] = dataToSave;
            atkModel.save();
        } else {
            const newAtkModel = new AtkModel({[custom_id]: dataToSave});
            newAtkModel.save();
        }
    }

    return;
}