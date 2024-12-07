import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { handleApplicationCommand, handleMessageComponent, getCommandSendObject, getMessageComponentSendObj } from './scripts/handler/commandHandler';
// import { SessionHandler } from './scripts/handler/sessionHandler'
import mongoose from 'mongoose';
// import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(session({
//   secret: process.env.SESSION_SECRET!,
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 28800000, // 8h
//     // secure: true
//   }
// }));

mongoose.connect('mongodb://localhost/scRoll', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY!), async function (req, res) {

  // SessionHandler.setSession(req.session);
  const { type, data } = req.body;

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
    handleMessageComponent(data.custom_id, data.values);
    sendObj = getMessageComponentSendObj(data.custom_id);
  }

  // req.session = SessionHandler.getSession();
  // req.session.save();

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
