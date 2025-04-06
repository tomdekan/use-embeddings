# OpenAI Text Classifier using Embeddings

This project demonstrates how to classify text into predefined categories using OpenAI's text embeddings and cosine similarity in TypeScript.

## Features

* Fetches text embeddings from OpenAI (`text-embedding-3-small`).
* Calculates cosine similarity between text embeddings and category description embeddings.
* Classifies input text based on the highest similarity score.
* Uses `dotenv` to manage API keys securely.
* Built with TypeScript and uses `pnpm` for package management.

## Prerequisites

* Node.js (v16 or later recommended)
* pnpm (You can install it via `npm install -g pnpm`)
* An OpenAI API key

## Setup

1.  **Clone the repository (or create the files as provided):**
    

```bash
    # If you cloned a repo, navigate into it
    # cd your-repo-name
    ```

2.  **Install dependencies:**
    

```bash
    pnpm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root directory of the project and add your OpenAI API key:
    

```
    OPENAI_API_KEY=your_openai_api_key_here
    ```

    Replace `your_openai_api_key_here` with your actual key.

## Usage

There are two main ways to run the script:

1.  **Development Mode (using `ts-node`):**
    This command compiles and runs the TypeScript file directly. It's useful during development as it doesn't require a separate build step.
    

```bash
    pnpm run dev
    ```

2.  **Production Mode:**
    First, build the TypeScript code into JavaScript:
    

```bash
    pnpm run build
    ```

    This command compiles `classify.ts` into the `dist` directory.

    Then, run the compiled JavaScript file:
    

```bash
    pnpm run start
    ```

## How it Works

1.  **Initialization**: The script loads the OpenAI API key from the `.env` file and initializes the OpenAI client.
2.  **Category Definitions**: Predefined categories and their detailed descriptions are stored in the `categories` object.
3.  **Embedding Generation**: The `getEmbedding` function sends text (either the input text or a category description) to the OpenAI API to get its vector embedding.
4.  **Cosine Similarity**: The `cosineSimilarity` function calculates the similarity between two vectors. It uses helper functions `dotProduct`,  `magnitude`, and `normalize`.
5.  **Classification**: The `classifyText` function takes an input text string:
    - It gets the embedding for the input text.
    - It fetches embeddings for all category descriptions concurrently using `Promise.all`.
    - It calculates the cosine similarity between the input text embedding and each category embedding.
    - It returns an object with categories as keys and their similarity scores as values, sorted in descending order of score.
6.  **Main Execution**: The `main` function provides an example usage:
    - Defines a sample text.
    - Calls `classifyText` to get the classification results.
    - Prints the similarity score for each category.
    - Identifies and prints the best matching category.
    - Demonstrates filtering categories based on a similarity threshold.

## Customization

* **Categories**: Modify the `categories` object in `classify.ts` to change or add new classification categories and their descriptions.
* **OpenAI Model**: Change the `model` parameter in the `getEmbedding` function if you want to use a different embedding model (e.g.,  `text-embedding-3-large`).
* **Threshold**: Adjust the `threshold` variable in the `main` function to change the cutoff for considering categories relevant. 
# use-embeddings
# use-embeddings
