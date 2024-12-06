import 'dotenv/config';
import { InstallGlobalCommands } from './scripts/utils.js';
import { COMMAND } from './scripts/constants/commandConstants.js';

// const BEGIN_FIGHT_COMMAND = {
//   name: 'beginfight',
//   description: 'begin a new fight',
//   type: 1,
//   integration_types: [0, 1],
//   contexts: [0, 2],
// };

// const END_FIGHT_COMMAND = {
//   name: 'endfight',
//   description: 'end the existing fight',
//   type: 1,
//   integration_types: [0, 1],
//   contexts: [0, 2],
// };

const ATK_COMMAND = {
  name: COMMAND.ATK,
  description: 'Attack an opponent',
  options: [
    {
      type: 4,
      name: 'angriffswert',
      description: 'Waffen-Acc + Attribute + Skill + Heroic',
      required: true,
      min_value: 0,
      max_value: 100,
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};


InstallGlobalCommands(process.env.APP_ID, 
  [
    // BEGIN_FIGHT_COMMAND,
    // END_FIGHT_COMMAND,
    ATK_COMMAND,
  ]
);
