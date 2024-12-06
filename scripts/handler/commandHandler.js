import { COMMAND } from "../constants/commandConstants.js";
import { InteractionResponseType } from 'discord-interactions';
import { getAtkMessageComponent } from "../messageComponents.js";
import { ATK_PREFIX, ATK_SUBMIT } from "../constants/constants.js";
import { handleAtkMessageComponent } from "../interactions/atk.js";

export const handleApplicationCommand = (command, options) => {
    switch (command) {
        case COMMAND.ATK: 
        //    saveAtkValue(+options[0]);
        // monsterdv, difficulty, atkVal-result
        break;
    }
}

export const handleMessageComponent = (custom_id, component_type) => {

    if (custom_id.startsWith(ATK_PREFIX)) {
        handleAtkMessageComponent(custom_id, component_type);
    }    
}

export const getCommandSendObject = (command, options) => {
    switch (command) {
        case COMMAND.ATK: 
           return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: getAtkMessageComponent()
            }
        }
}

export const getMessageComponentSendObj = (custom_id, component_type) => {
    switch (custom_id) {
        case ATK_SUBMIT: 
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: `Atk-Informationen erfolgreich angekommen` },
            };
        default: return { type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE };
        }
}
