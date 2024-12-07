import { ATK_DIFFICULTY, ATK_ENEMYSELECTION, ATK_SUBMIT, ATK_VALUE } from "../constants/constants";
import AtkModel from '../../mongodb/schema/atkSchema'

export const handleAtkMessageComponent = async (custom_id: string, values: string[]) => {

    if (custom_id === ATK_SUBMIT) {
        // TODO: handle submit
        // todo: now clear db again?
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
            atkModel.save().then((res) => {
                console.log("saved?", res)
            });
            console.log(atkModel.Atk_Difficulty);
            console.log(atkModel.Atk_EnemySelection);
            console.log(atkModel.Atk_Value);
        } else {
            const newAtkModel = new AtkModel({
                [custom_id]: values
            });
            console.log(newAtkModel);
            newAtkModel.save().then((res) => {
                console.log("saved2?", res)
            });
        }
        // AtkModel
    }
}