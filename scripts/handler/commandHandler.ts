import { COMMAND } from "../constants/commandConstants.js";
import { InteractionResponseType } from 'discord-interactions';
import { getAtkMessageComponent } from "../messageComponents";
import { ATK_PREFIX, ATK_SUBMIT, ATK_VALUE } from "../constants/constants";
import { handleAtkMessageComponent } from "../interactions/atk";
import AtkModel from "../../mongodb/schema/atkSchema.js";
// import { AtkResult } from "../types/AtkResult.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleApplicationCommand = (command: unknown, options: any) => {
    switch (command) {
        case COMMAND.ATK: 
            { 
                const newAtkModel = new AtkModel({ [ATK_VALUE]: options[0].value });
                newAtkModel.save();
                break; 
            }
    }
}

export const handleMessageComponent = async (custom_id: string, values: string[]): Promise<string | undefined> => {

    if (custom_id.startsWith(ATK_PREFIX)) {
        return await handleAtkMessageComponent(custom_id, values);
    }
    return;
}

export const getCommandSendObject = (command: unknown) => {
    switch (command) {
        case COMMAND.ATK: 
           return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: getAtkMessageComponent()
            }
        }
}

export const getMessageComponentSendObj = (custom_id: unknown, text?: string) => {
    switch (custom_id) {
        case ATK_SUBMIT: 
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: 
                    text ?? `Atk-Informationen erfolgreich angekommen` },
            };
        default: return { type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE };
        }
}
