import { Starship } from './components/Starship';

export const shipImages = {
  'Explorer I': 'https://th.bing.com/th/id/OIG3.gooVtfDcC884K.9Tp1Ao?pid=ImgGn',
  'Miner X': 'https://th.bing.com/th/id/OIG2.tDkjIUsIUA.2TA3uVtij?pid=ImgGn',
  'Voyager Elite': 'https://th.bing.com/th/id/OIG2.DSuQ_I8Z9hFaE2p1qNuK?pid=ImgGn',
};

export const starterShips: Starship[] = [
  {
    id: 'starter-ship1',
    name: 'Explorer I',
    description: 'A reliable starter ship for new space adventurers.',
    abilities: ['Basic Scanning', 'Short-range Travel'],
    cost: 1000,
    maintenance: 50,
    production: 100,
    roi: 10,
    image: shipImages['Explorer I'],
    usageCount: 0,
    rarity: 'Common'
  },
  {
    id: 'starter-ship2',
    name: 'Miner X',
    description: 'Specialized for resource gathering in asteroid fields.',
    abilities: ['Advanced Scanning', 'Resource Extraction'],
    cost: 2000,
    maintenance: 100,
    production: 250,
    roi: 15,
    image: shipImages['Miner X'],
    usageCount: 0,
    rarity: 'Uncommon'
  },
  {
    id: 'starter-ship3',
    name: 'Voyager Elite',
    description: 'Long-range ship capable of deep space exploration.',
    abilities: ['Long-range Travel', 'Advanced Life Support'],
    cost: 3000,
    maintenance: 150,
    production: 300,
    roi: 20,
    image: shipImages['Voyager Elite'],
    usageCount: 0,
    rarity: 'Rare'
  }
];