import { FormData } from "../interfaces";

export const initialdata:FormData[] = [
  { question: 'Nickname', answer: '' },
  { question: 'Discord Username', answer: '' },
  { question: 'Your primary language', answer: '' },
  { question: 'Are you already in contact with a recruiter', answer: '' },
  {
    question: "What's your in game Asphalt ID",
    answer: '',
    description: '(You may find it on the loading screen)',
  },
  {
    question: 'Lap recording',
    answer: '',
    description: '(Add link of your gameplay video to show your skills)',
  },
  {
    question:
      'Which position on Leaderboard are you usually on in TLEs and MP? *',
    answer: '',
  },
  {
    question: 'Link to your YouTube channel',
    answer: '',
    description: '(Skip this if you do not have a YouTube channel)',
  },
];