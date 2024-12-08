import { DiceEnum } from "../enums/diceEnum";

export interface DiceResult {
    diceType: DiceEnum,
    rolls: number[],
    successes: number,
}