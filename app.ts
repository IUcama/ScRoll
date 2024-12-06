import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { handleApplicationCommand, handleMessageComponent, getCommandSendObject, getMessageComponentSendObj } from './scripts/handler/commandHandler';
import { SessionHandler } from './scripts/handler/sessionHandler'
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 28800000, // 8h
    secure: true 
  } 
}));

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY!), async function (req, res) {

  const { type, data } = req.body;
  // req.session.test = "TestSessionEntry";
  SessionHandler.setSession(req.session);
  
  let sendObj: unknown = null;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    // data.options
    handleApplicationCommand(data.name);
    sendObj = getCommandSendObject(data.name);
  }

  if (type === InteractionType.MESSAGE_COMPONENT) {
    // data.component_type
    handleMessageComponent(data.custom_id);
    sendObj = getMessageComponentSendObj(data.custom_id);
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
