"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageComponentSendObj = exports.getCommandSendObject = exports.handleMessageComponent = exports.handleApplicationCommand = void 0;
const commandConstants_js_1 = require("../constants/commandConstants.js");
const discord_interactions_1 = require("discord-interactions");
const messageComponents_js_1 = require("../messageComponents.js");
const constants_js_1 = require("../constants/constants.js");
const atk_js_1 = require("../interactions/atk.js");
const handleApplicationCommand = (command, options) => {
    switch (command) {
        case commandConstants_js_1.COMMAND.ATK:
            //    saveAtkValue(+options[0]);
            // monsterdv, difficulty, atkVal-result
            break;
    }
};
exports.handleApplicationCommand = handleApplicationCommand;
const handleMessageComponent = (custom_id, component_type) => {
    if (custom_id.startsWith(constants_js_1.ATK_PREFIX)) {
        (0, atk_js_1.handleAtkMessageComponent)(custom_id, component_type);
    }
};
exports.handleMessageComponent = handleMessageComponent;
const getCommandSendObject = (command, options) => {
    switch (command) {
        case commandConstants_js_1.COMMAND.ATK:
            return {
                type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: (0, messageComponents_js_1.getAtkMessageComponent)()
            };
    }
};
exports.getCommandSendObject = getCommandSendObject;
const getMessageComponentSendObj = (custom_id, component_type) => {
    switch (custom_id) {
        case constants_js_1.ATK_SUBMIT:
            return {
                type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: { content: `Atk-Informationen erfolgreich angekommen` },
            };
        default: return { type: discord_interactions_1.InteractionResponseType.DEFERRED_UPDATE_MESSAGE };
    }
};
exports.getMessageComponentSendObj = getMessageComponentSendObj;
