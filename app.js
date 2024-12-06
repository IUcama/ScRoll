import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { getRandomEmoji } from './scripts/utils.js';

import { attack, beginFight, endFight } from './scripts/combat.js';
import { getAtkMessageComponent, beginFightMessageComponent } from './scripts/messageComponents.js';
import STARTFIGHT_SELECTEDATTENDEES, { ATK_ENEMYSELECTION, ATK_SUBMIT } from './scripts/constants/constants.js';
import ATK_COMMANDNAME from './scripts/constants/commandConstants.js';

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  // Interaction type and data
  const { type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name, options } = data;

    // "test" command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: `hello world ${getRandomEmoji()}`,
        },
      });
    }

    if (name === 'beginfight') {
      const messageComponent = beginFightMessageComponent;
      return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            // data: {
            //   content: `${result}`,
            // },
            data: messageComponent
          });

      // if (options[0] && options[1]) {
      //   const result = beginFight(options[0].value, options[1].value);
      //   return res.send({
      //     type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      //     data: {
      //       content: `${result}`,
      //     },
      //   });
      // } else {
      //   return res.send({
      //     type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      //     data: {
      //       content: `Fehler in der Übergabe der Optionen:
      //       Option1: ${options[0]}
      //       Option2: ${options[1]}`,
      //     },
      //   });
      // }
    }

    if (name === 'endfight') {
      const result = endFight();
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `${result}`,
        },
      });
    }

    if (name === ATK_COMMANDNAME) {
      console.log("ATK received, sending back msg with atkMessageComponent");

      const { name, options } = data;
      const atkValue = +options[0] // dice amount

      // monsterdv, difficulty, atkVal-result
      const result = attack();

      const atkMsgComp = await getAtkMessageComponent();

      
      return res.send({
        // type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: atkMsgComp,
      });
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  if (type === InteractionType.MESSAGE_COMPONENT) {
    const { component_type, custom_id } = data;

    if (custom_id === STARTFIGHT_SELECTEDATTENDEES && component_type === 2) {
      console.log("handle startfight selectedAttendees")

      // TODO: handle/save startfight selectedAttendees
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Informationen erfolgreich angekommen`,
        },
      });
    }

    if (custom_id.startsWith("Atk_")) {
      if (custom_id !== ATK_SUBMIT) {
        // only handle submit, ignore the rest by sending ACK // update: needs to save state
        return res.send({ type: InteractionResponseType.DEFERRED_UPDATE_MESSAGE });      
      }

      if (custom_id === ATK_SUBMIT) {
        // TODO: handle submit atk
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Atk-Informationen erfolgreich angekommen`,
          },
        });
      }

    }
    


    console.error('unknown interaction type', type);
    return res.status(400).json({ error: 'unknown interaction type' });
  }

  console.error('unknown type', type);
  return res.status(400).json({ error: 'unknown type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
