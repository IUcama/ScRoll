import { COMMAND } from "../constants/commandConstants.js";
import { InteractionResponseType } from 'discord-interactions';
import { getAtkMessageComponent } from "../messageComponents";
import { ATK_PREFIX, ATK_SUBMIT } from "../constants/constants";
import { handleAtkMessageComponent } from "../interactions/atk";

export const handleApplicationCommand = (command: unknown) => {
    switch (command) {
        case COMMAND.ATK: 
        //    saveAtkValue(+options[0]);
        // monsterdv, difficulty, atkVal-result
        break;
    }
}

export const handleMessageComponent = (custom_id: string) => {

    if (custom_id.startsWith(ATK_PREFIX)) {
        handleAtkMessageComponent(custom_id);
    }    
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

export const getMessageComponentSendObj = (custom_id: unknown) => {
    switch (custom_id) {
        case ATK_SUBMIT: 
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: `Atk-Informationen erfolgreich angekommen` },
            };
        default: return { type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE };
        }
}
