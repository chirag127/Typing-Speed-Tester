import { Paragraph } from '@/types';

export const paragraphs: Paragraph[] = [
  // Tech Category
  {
    id: 'tech-1',
    category: 'tech',
    title: 'JavaScript Fundamentals',
    difficulty: 'medium',
    content: 'JavaScript is a versatile programming language that powers the modern web. It supports multiple programming paradigms including object-oriented, functional, and procedural programming. Variables can be declared using var, let, or const keywords, each with different scoping rules. Functions are first-class citizens in JavaScript, meaning they can be assigned to variables, passed as arguments, and returned from other functions.'
  },
  {
    id: 'tech-2',
    category: 'tech',
    title: 'React Components',
    difficulty: 'hard',
    content: 'React components are the building blocks of React applications. They can be defined as functions or classes, with functional components being the preferred approach in modern React development. Components accept props as input and return JSX elements that describe what should appear on the screen. The useState and useEffect hooks allow functional components to manage state and perform side effects.'
  },
  {
    id: 'tech-3',
    category: 'tech',
    title: 'Database Design',
    difficulty: 'medium',
    content: 'Database design is the process of creating a detailed data model of a database. This involves defining tables, establishing relationships between entities, and ensuring data integrity through constraints. Normalization is a key principle that helps eliminate data redundancy and improve data consistency. Primary keys uniquely identify records, while foreign keys establish relationships between tables.'
  },
  {
    id: 'tech-4',
    category: 'tech',
    title: 'API Development',
    difficulty: 'hard',
    content: 'Application Programming Interfaces (APIs) serve as intermediaries that allow different software applications to communicate with each other. RESTful APIs follow specific architectural principles including statelessness, uniform interface, and client-server separation. HTTP methods like GET, POST, PUT, and DELETE correspond to different operations on resources. Proper error handling and status codes are essential for robust API design.'
  },
  {
    id: 'tech-5',
    category: 'tech',
    title: 'Cloud Computing',
    difficulty: 'easy',
    content: 'Cloud computing delivers computing services over the internet, including servers, storage, databases, networking, and software. The three main service models are Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Cloud deployment models include public, private, hybrid, and multi-cloud configurations.'
  },

  // Casual Category
  {
    id: 'casual-1',
    category: 'casual',
    title: 'Morning Coffee',
    difficulty: 'easy',
    content: 'The aroma of freshly brewed coffee fills the kitchen as the morning sun streams through the window. There is something magical about that first sip of coffee that awakens the senses and prepares the mind for the day ahead. Whether you prefer a strong espresso or a mild breakfast blend, coffee has become an essential part of many people\'s daily routine.'
  },
  {
    id: 'casual-2',
    category: 'casual',
    title: 'Weekend Adventures',
    difficulty: 'medium',
    content: 'Weekends offer the perfect opportunity to explore new places and try different activities. Some people enjoy hiking through scenic trails, while others prefer visiting museums or art galleries. The key is to step outside your comfort zone and embrace new experiences. Whether it\'s trying a new restaurant, learning a hobby, or simply spending time with friends and family, weekends are meant for creating memorable moments.'
  },
  {
    id: 'casual-3',
    category: 'casual',
    title: 'Reading Benefits',
    difficulty: 'easy',
    content: 'Reading is one of the most beneficial activities for mental health and cognitive development. It improves vocabulary, enhances concentration, and stimulates imagination. Regular reading can reduce stress levels and provide an escape from daily pressures. Books transport us to different worlds and allow us to experience life from various perspectives.'
  },
  {
    id: 'casual-4',
    category: 'casual',
    title: 'Cooking at Home',
    difficulty: 'medium',
    content: 'Cooking at home has numerous advantages beyond just saving money. It allows you to control the ingredients, ensuring healthier meals for you and your family. The process of preparing food can be therapeutic and creative, offering a break from digital screens and work stress. Sharing homemade meals brings people together and creates lasting memories around the dinner table.'
  },
  {
    id: 'casual-5',
    category: 'casual',
    title: 'Garden Therapy',
    difficulty: 'easy',
    content: 'Gardening is a rewarding hobby that connects us with nature and provides both physical and mental benefits. Working with soil, planting seeds, and watching plants grow can be incredibly satisfying. Gardens provide fresh air, exercise, and the joy of harvesting your own vegetables or enjoying beautiful flowers. Even small indoor plants can brighten up living spaces.'
  },

  // Random Category
  {
    id: 'random-1',
    category: 'random',
    title: 'Ocean Mysteries',
    difficulty: 'medium',
    content: 'The ocean covers more than seventy percent of Earth\'s surface, yet we have explored less than five percent of it. Deep beneath the waves lie mysterious creatures, underwater mountains, and ancient shipwrecks waiting to be discovered. Bioluminescent organisms create natural light shows in the darkness, while thermal vents support unique ecosystems that thrive without sunlight.'
  },
  {
    id: 'random-2',
    category: 'random',
    title: 'Space Exploration',
    difficulty: 'hard',
    content: 'Human space exploration represents one of our greatest achievements and continues to push the boundaries of what is possible. From the first moon landing to the International Space Station, each mission teaches us more about our universe and our place within it. Future missions to Mars and beyond will require innovative technologies and international cooperation to overcome the challenges of long-duration spaceflight.'
  },
  {
    id: 'random-3',
    category: 'random',
    title: 'Ancient Civilizations',
    difficulty: 'medium',
    content: 'Ancient civilizations built remarkable structures that continue to amaze us today. The pyramids of Egypt, the Great Wall of China, and Machu Picchu demonstrate the ingenuity and determination of our ancestors. These monuments were constructed without modern machinery, relying instead on human creativity, mathematical precision, and collaborative effort across generations.'
  },
  {
    id: 'random-4',
    category: 'random',
    title: 'Musical Instruments',
    difficulty: 'easy',
    content: 'Musical instruments have been part of human culture for thousands of years. From simple drums made of animal skins to complex orchestral instruments, music allows us to express emotions and tell stories without words. Learning to play an instrument develops discipline, improves memory, and provides a lifelong source of joy and creative expression.'
  },
  {
    id: 'random-5',
    category: 'random',
    title: 'Weather Patterns',
    difficulty: 'medium',
    content: 'Weather patterns are influenced by complex interactions between the atmosphere, oceans, and land surfaces. Understanding these patterns helps meteorologists predict future conditions and warn people about severe weather events. Climate change is altering traditional weather patterns, leading to more frequent extreme events and requiring adaptation strategies for communities worldwide.'
  }
];

export const getParagraphsByCategory = (category: Paragraph['category']): Paragraph[] => {
  return paragraphs.filter(p => p.category === category);
};

export const getRandomParagraph = (category?: Paragraph['category']): Paragraph => {
  const availableParagraphs = category ? getParagraphsByCategory(category) : paragraphs;
  const randomIndex = Math.floor(Math.random() * availableParagraphs.length);
  return availableParagraphs[randomIndex];
};

export const getParagraphById = (id: string): Paragraph | undefined => {
  return paragraphs.find(p => p.id === id);
};
