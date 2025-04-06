# Demo to use embeddings

This project uses the code from [The simplest guide to using embeddings](https://tomdekan.com/articles/use-embeddings), showing how to classify text into predefined categories using OpenAI's text embeddings and cosine similarity in TypeScript.

## Prerequisites

* Node.js (v16 or later recommended)
* pnpm (You can install it via `npm install -g pnpm`)
* An OpenAI API key

## Setup

1. **Clone the repository (or create the files as provided):**

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

1. **Development Mode (using `ts-node`):**
    This command compiles and runs the TypeScript file directly. It's useful during development as it doesn't require a separate build step.

```bash
    pnpm run dev
```

## Categories

The script currently classifies text into the following categories based on their descriptions:

*   **ease_of_use**: How intuitive and user-friendly the product is. Includes navigation flow, clarity of UI elements, and minimal learning curve.
*   **functionality**: How well the product performs its core functions. Includes feature completeness, reliability, and performance.
*   **ease_of_setup**: How simple it is to install, configure, and get started with the product. Includes documentation quality and initial onboarding.
*   **look_and_feel**: The visual appeal and aesthetic quality of the interface. Includes design consistency, visual hierarchy, and emotional response.

You can easily modify or add categories by editing the `categories` object in `classify.ts` .
