import { COMMAND } from "../constants/commandConstants.js";
import { InteractionResponseType } from 'discord-interactions';
import { getAtkMessageComponent } from "../messageComponents";
import { ATK_PREFIX, ATK_SUBMIT } from "../constants/constants";
import { handleAtkMessageComponent } from "../interactions/atk";
// import SessionHandler from "./sessionHandler.js";

export const handleApplicationCommand = (command: unknown) => {
    switch (command) {
        case COMMAND.ATK: 
        //    saveAtkValue(+options[0]);
        // monsterdv, difficulty, atkVal-result
        break;
    }
}

export const handleMessageComponent = (custom_id: string, values: string[]) => {

    if (custom_id.startsWith(ATK_PREFIX)) {
        handleAtkMessageComponent(custom_id, values);
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
    // const session = SessionHandler.getSession();
    switch (custom_id) {
        case ATK_SUBMIT: 
        // console.log(SessionHandler.getSession());
            return {
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: 
                    `Atk-Informationen erfolgreich angekommen` },
            };
        default: return { type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE };
        }
}
