import { DiceEnum } from "../enums/diceEnum";
import { DiceResult } from "../types/DiceResult";

export const roll = (amount: number, diceType: DiceEnum = DiceEnum.D10): DiceResult => {
    const diceResult: DiceResult = { rolls: [], successes: 0 };

    for (let i = 0; i < amount; i++) {
        const rollResult = Math.floor((Math.random() * diceType) + 1);
        diceResult.rolls.push(rollResult);
    }

    diceResult.successes = calculateSuccesses(diceResult.rolls, diceType);
    return diceResult;
}

const calculateSuccesses = (rollResults: number[], diceType: DiceEnum = DiceEnum.D10): number => {
    switch (diceType) {
        case DiceEnum.D2: return rollResults.reduce((sum, r) => sum+=r==2?1:0, 0);
        case DiceEnum.D10:  
            return rollResults.reduce((sum, r) => {
                if(r === 10) {
                    return sum += 2;
                } else if (r >= 7) {
                    return sum += 1;
                } else {
                    return sum;
                }
            }, 0);
    }

    console.error("Calculation of successes: DiceType not found! ", diceType);
    return -1;
}

export const printRollResult = (diceResult: DiceResult) => {
    if (diceResult.successes >= 0) {
        return `
        Würfel-Ergebnis: ${diceResult.rolls}
        Erfolge: ${diceResult.successes}
        `;
    } else {
        return `
        Würfel-Ergebnis: ${diceResult.rolls}
        `;  
    }
}
 