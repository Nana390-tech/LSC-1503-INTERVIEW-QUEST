
import { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'organizer',
    name: 'The Organizer',
    icon: '📋',
    color: 'bg-blue-500',
    items: [
      { id: 'org_1', text: 'I plan my work and keep things in order.' },
      { id: 'org_2', text: 'I help the team finish work on time.' },
      { id: 'org_3', text: 'I stay calm and focused when I have a lot to do.' }
    ],
    vocabulary: ['Organized', 'Careful', 'Reliable', 'Good planner', 'Steady', 'Punctual', 'Orderly']
  },
  {
    id: 'shaper',
    name: 'The Challenger',
    icon: '⚡',
    color: 'bg-purple-500',
    items: [
      { id: 'sha_1', text: 'I ask questions to understand things clearly.' },
      { id: 'sha_2', text: 'I like to talk about different ideas to find the best one.' },
      { id: 'sha_3', text: 'I speak up when I see something that can be better.' }
    ],
    vocabulary: ['Honest', 'Curious', 'Direct', 'Brave', 'Open-minded', 'Active thinker']
  },
  {
    id: 'doer',
    name: 'The Doer',
    icon: '🛠️',
    color: 'bg-emerald-500',
    items: [
      { id: 'doe_1', text: 'I like to start working immediately and finish tasks.' },
      { id: 'doe_2', text: 'I am good at fixing problems with my hands or tools.' },
      { id: 'doe_3', text: 'I find quick ways to solve small issues.' }
    ],
    vocabulary: ['Fast worker', 'Practical', 'Hard-working', 'Problem-solver', 'Active', 'Useful']
  },
  {
    id: 'creative',
    name: 'The Creative',
    icon: '🎨',
    color: 'bg-orange-500',
    items: [
      { id: 'cre_1', text: 'I have many new and interesting ideas.' },
      { id: 'cre_2', text: 'I love brainstorming and thinking of new ways to work.' },
      { id: 'cre_3', text: 'I can find a solution when there is no clear answer.' }
    ],
    vocabulary: ['Creative', 'Smart', 'Full of ideas', 'Original', 'Resourceful', 'Imaginative']
  },
  {
    id: 'helper',
    name: 'The Helper',
    icon: '🤝',
    color: 'bg-rose-500',
    items: [
      { id: 'hel_1', text: 'I enjoy working with others and helping them.' },
      { id: 'hel_2', text: 'I listen to my teammates and support their ideas.' },
      { id: 'hel_3', text: 'I am friendly and make people feel happy at work.' }
    ],
    vocabulary: ['Friendly', 'Kind', 'Team player', 'Helpful', 'Good listener', 'Positive', 'Patient']
  },
  {
    id: 'thinker',
    name: 'The Thinker',
    icon: '🧠',
    color: 'bg-indigo-500',
    items: [
      { id: 'thi_1', text: 'I listen to advice and try to get better at my job.' },
      { id: 'thi_2', text: 'I think carefully before I make a decision.' },
      { id: 'thi_3', text: 'I stay quiet and calm during a busy day.' }
    ],
    vocabulary: ['Calm', 'Thoughtful', 'Careful', 'Logical', 'Serious', 'Good at learning']
  },
  {
    id: 'leader',
    name: 'The Leader',
    icon: '👑',
    color: 'bg-amber-500',
    items: [
      { id: 'lea_1', text: 'I help my teammates succeed and do their best.' },
      { id: 'lea_2', text: 'I show others how to work by doing it myself first.' },
      { id: 'lea_3', text: 'I guide my group to reach our goal.' }
    ],
    vocabulary: ['Leader', 'Example', 'Responsible', 'Confident', 'Fair', 'Supportive']
  },
  {
    id: 'supporter',
    name: 'The Supporter',
    icon: '🛡️',
    color: 'bg-cyan-500',
    items: [
      { id: 'sup_1', text: 'I like helping the leader and making sure the team is okay.' }
    ],
    vocabulary: ['Loyal', 'Supportive', 'Quiet worker', 'Reliable', 'Cooperative']
  }
];

export const RATING_LABELS = [
  'Not me',
  'A little bit',
  'Sometimes',
  'Mostly me',
  'Exactly me'
];
