import 'dotenv/config';
import { InstallGlobalCommands } from './scripts/utils.ts';
import { COMMAND } from './scripts/constants/commandConstants.ts';
import { DiceEnum } from './scripts/enums/diceEnum.ts';

const ROLL_COMMAND = {
  name: COMMAND.ROLL,
  description: 'Roll dice',
  options: [
    {
      type: 4,
      name: 'amount',
      description: 'Anzahl',
      required: true,
      min_value: 1,
      max_value: 100,
    },
    {
      type: 4,
      name: 'dicetype',
      description: 'Würfelart',
      required: false,
      choices: [
        { name: 'D2', value: DiceEnum.D2 },
        { name: 'D3', value: DiceEnum.D3 },
        { name: 'D4', value: DiceEnum.D4 },
        { name: 'D6', value: DiceEnum.D6 },
        { name: 'D8', value: DiceEnum.D8 },
        { name: 'D10', value: DiceEnum.D10 },
        { name: 'D12', value: DiceEnum.D12 },
        { name: 'D20', value: DiceEnum.D20 },
        { name: 'D100', value: DiceEnum.D100 },
      ],
    }
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

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
    ROLL_COMMAND,
    ATK_COMMAND,
  ]
);
