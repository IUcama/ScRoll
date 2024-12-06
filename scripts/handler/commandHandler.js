import { COMMAND } from "../constants/commandConstants.js";
import { InteractionResponseType } from 'discord-interactions';
import { getAtkMessageComponent } from "../messageComponents.js";

export const handleCommand = (command, options) => {
    switch (command) {
        case COMMAND.ATK: 
        //    saveAtkValue(+options[0]);
        // monsterdv, difficulty, atkVal-result

        
        break;
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