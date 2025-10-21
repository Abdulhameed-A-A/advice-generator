import { Advice } from '@/types/advice';

export async function getRandomAdvice(): Promise<Advice> {
  try {
    const response = await fetch('https://api.adviceslip.com/advice', {
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch advice');
    }
    
    const data = await response.json();
    return {
      id: data.slip.id,
      advice: data.slip.advice,
    };
  } catch{
    return {
      id: 117,
      advice: "And which one of your God's Favour would you deny"
    };
  }
}