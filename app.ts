import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { handleApplicationCommand, handleMessageComponent, getCommandSendObject, getMessageComponentSendObj } from './scripts/handler/commandHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {

  const { type, data } = req.body;
  let sendObj: any = null;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    handleApplicationCommand(data.name, data.options);
    sendObj = getCommandSendObject(data.name, data.options);
  }

  if (type === InteractionType.MESSAGE_COMPONENT) {
    handleMessageComponent(data.custom_id, data.component_type);
    sendObj = getMessageComponentSendObj(data.custom_id, data.component_type);
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
