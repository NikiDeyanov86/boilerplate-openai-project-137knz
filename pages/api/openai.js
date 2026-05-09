// file: /pages/api/openai.js

import OpenAI from "openai";
import { getFunctions, getSystemPrompt } from "../../prompts/promptUtils";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const userInput = req.body.payload?.content || "";

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        getSystemPrompt(),
        {
          role: "user",
          content: userInput,
        },
      ],

      tools: getFunctions().map((fn) => ({
        type: "function",
        function: fn,
      })),

      tool_choice: "auto",
      temperature: 0.4,
    });

    const message = response.choices[0].message;

    if (!message.tool_calls?.length) {
      return res.status(500).json({
        error: { message: "No structured output returned" },
      });
    }

    const raw = message.tool_calls[0].function.arguments;

    let result = JSON.parse(typeof raw === "string" ? raw : JSON.stringify(raw));

    if (typeof result === "string") {
      result = JSON.parse(result);
    }

    if (!Array.isArray(result.cars)) {
      return res.status(500).json({
        error: { message: "Invalid response format" },
      });
    }

    // -----------------------------
    // FORCE fuel economy formatting (safety net)
    // -----------------------------
    result.cars = result.cars.map((car) => {
      if (!car) return car;

      if (car.fuelEconomy && typeof car.fuelEconomy === "string") {
        // normalize common mistakes like "7 L/100km (approx)"
        car.fuelEconomy = car.fuelEconomy
          .replace(/mpg/gi, "")
          .replace(/km\/l/gi, "")
          .trim();

        if (!car.fuelEconomy.includes("L/100km")) {
          car.fuelEconomy = `${car.fuelEconomy} L/100km`;
        }
      }

      return car;
    });

    // enforce ranking
    result.cars.sort(
      (a, b) => (b.fitScore ?? b.rating ?? 0) - (a.fitScore ?? a.rating ?? 0)
    );

    return res.status(200).json({ result });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: { message: "OpenAI request failed" },
    });
  }
}