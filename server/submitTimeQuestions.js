import { generateCaptcha } from "./generateCaptcha.js";

export const submitTimeQuestions = [
  { question: 'Nickname', answer: '' },
  { question: 'Discord Username', answer: '' },
  {
    question: "What's your in game Asphalt ID",
    answer: '',
    description: '(You may find it on the loading screen)',
  },
  {
    question: 'Lap recording',
    answer: '',
    description: '(Add link of your gameplay video, we may take some time to validate your lap record)',
  },
  {
    question:`${generateCaptcha()}`,
    answer:'',
    description:'sorry, only humans are allowed'
  }
];