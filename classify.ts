import dotenv from 'dotenv';
import { OpenAI } from 'openai';

// Load environment variables from .env file
dotenv.config();

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define our categories and their descriptions
const categories: Record<string, string> = {
  ease_of_use:
    'How intuitive and user-friendly the product is. Includes navigation flow, clarity of UI elements, and minimal learning curve.',
  functionality:
    'How well the product performs its core functions. Includes feature completeness, reliability, and performance.',
  ease_of_setup:
    'How simple it is to install, configure, and get started with the product. Includes documentation quality and initial onboarding.',
  look_and_feel:
    'The visual appeal and aesthetic quality of the interface. Includes design consistency, visual hierarchy, and emotional response.',
};

// Function to get embeddings from OpenAI
async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.replace(/\n/g, ' '), // Ensure newlines are replaced
  });

  // Check if embeddings data is present
  if (!response.data || response.data.length === 0 || !response.data[0].embedding) {
    throw new Error('Failed to retrieve embeddings from OpenAI API.');
  }

  return response.data[0].embedding;
}

// Function to calculate the dot product of two vectors
function dotProduct(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length for dot product');
  }
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

// Function to calculate the magnitude (norm) of a vector
function magnitude(vec: number[]): number {
  let sumOfSquares = 0;
  for (let i = 0; i < vec.length; i++) {
    sumOfSquares += vec[i] * vec[i];
  }
  return Math.sqrt(sumOfSquares);
}

// Function to normalize a vector (make its magnitude 1)
function normalize(vec: number[]): number[] {
  const mag = magnitude(vec);
  if (mag === 0) {
    // Return a zero vector of the same length
    return new Array(vec.length).fill(0);
  }
  return vec.map((val) => val / mag);
}

// Function to calculate cosine similarity between two vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  // Normalize the vectors
  const normalizedA = normalize(vecA);
  const normalizedB = normalize(vecB);

  // Calculate dot product of normalized vectors
  const similarity = dotProduct(normalizedA, normalizedB);

  // Clamp the result to [-1, 1] due to potential floating-point inaccuracies
  return Math.max(-1, Math.min(1, similarity));
}

// Main function to classify text against our categories
async function classifyText(text: string): Promise<Record<string, number>> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set in the environment variables.');
  }
  // Get embedding for our input text
  const textEmbedding = await getEmbedding(text);

  // Calculate similarity scores for each category
  const results: Record<string, number> = {};

  // We fetch all category embeddings in parallel for efficiency
  const categoryPromises = Object.entries(categories).map(
    async ([category, description]) => {
      const categoryEmbedding = await getEmbedding(description);
      const similarity = cosineSimilarity(textEmbedding, categoryEmbedding);
      results[category] = similarity;
    },
  );

  await Promise.all(categoryPromises);

  // Sort by similarity score (highest first)
  const sortedResults = Object.fromEntries(
    Object.entries(results).sort(([, a], [, b]) => b - a),
  );

  return sortedResults;
}

// Example usage
async function main() {
  const sampleText =
    'The interface is very elegant. Visually satisfying and modern. A real delight for the user.' 

  try {
    const results = await classifyText(sampleText);
    console.log('Classification results:');

    // Print all categories with their scores
    Object.entries(results).forEach(([category, score]) => {
      console.log(`${category}: ${score.toFixed(4)}`);
    });

    // Get the top category
    const topCategory = Object.keys(results)[0];
    console.log(
      `\nBest matching category: ${topCategory} with score: ${results[topCategory].toFixed(4)}`,
    );

  } catch (error) {
    console.error('Error during classification:', error instanceof Error ? error.message : error);
  }
}

main(); 