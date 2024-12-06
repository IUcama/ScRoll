import 'dotenv/config';
import { getRPSChoices } from './scripts/game.js';
import { capitalize, InstallGlobalCommands } from './scripts/utils.js';

// import { enemies } from './resources/Enemies.js';

// Get the game choices from game.js
// function createCommandChoices() {
//   const choices = getRPSChoices();
//   const commandChoices = [];

//   for (let choice of choices) {
//     commandChoices.push({
//       name: capitalize(choice),
//       value: choice.toLowerCase(),
//     });
//   }

//   return commandChoices;
// }

// const TEST_COMMAND = {
//   name: 'test',
//   description: 'Basic command',
//   type: 1,
//   integration_types: [0, 1],
//   contexts: [0, 1, 2],
// };

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
  name: 'atk',
  description: 'Attack an opponent',
  options: [
    {
      type: 4,
      name: 'angriffswert',
      description: 'Waffen-Acc + Attribute + Skill + Heroic',
      required: true,
      min_value: 0,
      max_value: 100,
      // choices: createCommandChoices(),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};


InstallGlobalCommands(process.env.APP_ID, 
  [
    // TEST_COMMAND, 
    // BEGIN_FIGHT_COMMAND,
    // END_FIGHT_COMMAND,
    ATK_COMMAND,
  ]
);
