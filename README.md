# CarGPT - AI buying assistant

This is a simplified AI car buying assistant boilerplate project that integrates the OpenAI API within a Next.js application. The user describes the car he needs, this prompt is sent to OpenAI API for processing and the result is a list of vehicle models that best meet the user's description.

## Getting Started

### Prerequisites

Ensure the following are installed on your machine:

-   [Node.js](https://nodejs.org/en/download/) (Version 12 or higher)
-   [npm](https://www.npmjs.com/get-npm) (generally bundled with Node.js) or [Yarn](https://yarnpkg.com/getting-started/install)

### Installation

1.  Clone this repository:

    `git clone https://github.com/your-username/nextjs-openai-boilerplate.git`

2.  Move to the project directory:

    `cd nextjs-openai-boilerplate`

3.  Install dependencies:

    `npm install`

    or

    `yarn install`

4.  Create a `.env.local` file in the root directory of the project and include your OpenAI API key:

    `OPENAI_API_KEY=your_openai_api_key`

    Substitute `your_openai_api_key` with your actual OpenAI API key. Your API key can be located in your [OpenAI Dashboard](https://platform.openai.com/account/api-keys).

5.  Kick start the development server:

    `npm run dev`

    or

    `yarn dev`

6.  Access the application by navigating to [http://localhost:3000](http://localhost:3000/). The boilerplate application should be live now.

## Disclaimer
The use of the OpenAI API and the output it generates depends on the usage policies set by OpenAI. Make sure to review the OpenAI use case policy before using this boilerplate to build applications.
