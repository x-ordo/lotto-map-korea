import { LotteryStore, LuckAnalysis } from "@/types";

/**
 * Generates 6 unique random numbers between 1 and 45.
 * This is done on the client-side to reduce API costs.
 */
export const generateLuckyNumbers = (): number[] => {
  const numbers = new Set<number>();
  const buffer = new Uint32Array(1);
  
  while (numbers.size < 6) {
    crypto.getRandomValues(buffer);
    const randomNumber = (buffer[0] % 45) + 1;
    numbers.add(randomNumber);
  }
  
  return Array.from(numbers).sort((a, b) => a - b);
};

/**
 * Calls the backend proxy to get a "Luck Analysis" from the AI.
 * The lucky numbers are generated separately.
 */
export const analyzeLuck = async (store: LotteryStore, userPrompt: string = ''): Promise<Omit<LuckAnalysis, 'luckyNumber'>> => {
  const prompt = `
    Analyze this lottery store: "${store.name}" located at "${store.address}".
    It has ${store.winCount1st} first prize wins and ${store.winCount2nd} second prize wins.
    User additional request: "${userPrompt}"
    
    Return a creative and fun "Luck Analysis" for this store in JSON format.
    - score: A luck score out of 100.
    - recommendation: A short catchy recommendation phrase.
    - insights: A brief analysis of why this store might be lucky or advice for the user.
  `;

  const response = await fetch('/api/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error from proxy:', errorData);
    throw new Error(errorData.message || 'Failed to get luck analysis');
  }

  const data = await response.json();
  
  // The proxy returns the full Gemini response, so we need to extract the text and parse it.
  const content = data.candidates[0].content.parts[0].text;
  return JSON.parse(content);
};
