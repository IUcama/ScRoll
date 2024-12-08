import { ATK_DIFFICULTY, ATK_ENEMYSELECTION, ATK_SUBMIT, ATK_VALUE } from "../constants/constants";
import AtkModel from '../../mongodb/schema/atkSchema'
import { enemies } from "../../options/enemies";

export const handleAtkMessageComponent = async (custom_id: string, values: string[]): Promise<string | undefined> => {

    if (custom_id === ATK_SUBMIT) {
        // TODO: handle submit

        // get vals from db
        const atkModel = await AtkModel.findOne();
        
        // TODO: allow/ update to multiple enemies
        const enemyLabel = atkModel?.Atk_EnemySelection[0].label;
        const enemy = enemies.find(e => e.id === enemyLabel);

        const difficulty = atkModel?.Atk_Difficulty ?? 0;

        // roll
        const rollResults = new Array<number>();
        let successes = 0;
        const atkVal = atkModel?.Atk_Value ?? 0;
        console.log("atkVal", atkVal);


        for (let i = 0; i < atkVal; i++) {
            const rollResult = Math.floor((Math.random() * 10) + 1);
            if (rollResult === 10) {
                successes += 2;
            } else if (rollResult >= 7) {
                successes += 1;
            }
            rollResults.push(rollResult);
        }

        // calc if hit or miss against the enemy

        // TODO: check for parryDV also
        const hitValue = successes - (enemy!.dodgeDV + difficulty);
        const hit = hitValue > 0;

        console.log("ATK-Calculation DEBUG VALUES");
        console.log("difficulty", difficulty);
        console.log("enemy!.dodgeDV", enemy!.dodgeDV);
        console.log("rollResults", rollResults);
        console.log("successes", successes);
        console.log("hitValue", hitValue);
        console.log("hit", hit);

        // todo: now clear db again?
        await AtkModel.findOneAndDelete();

        // show/return to user the roll result + calcResult
        // return { hit, successes, rollResults } as AtkResult;
        const hitText = hit ? "getroffen" : "verfehlt";
        const hitExtraSuccesses = hitValue > 0 ? hitValue : "Keine";
        const returnText = 
        `
        Würfel-Ergebnis: ${rollResults}
        Erfolge: ${successes}
        
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