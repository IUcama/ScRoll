import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { ATK_SUBMIT } from './scripts/constants/constants.js';
import { handleCommand, getCommandSendObject } from './scripts/handler/commandHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {

  const { type, data } = req.body;
  let sendObj = null;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const command = data.name;
    const options = data.options;

    handleCommand(command, options);
    sendObj = getCommandSendObject(command, options);

  }

  if (type === InteractionType.MESSAGE_COMPONENT) {
    const { component_type, custom_id } = data;

    if (custom_id.startsWith("Atk_")) {
      if (custom_id !== ATK_SUBMIT) {
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
  }


  if (sendObj) {
    return res.send(sendObj);
  } else {
    const errorMsg = `unknown type: ${type}`;
    console.error(errorMsg);
    return res.status(400).json({ error: errorMsg });
  }

  
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
