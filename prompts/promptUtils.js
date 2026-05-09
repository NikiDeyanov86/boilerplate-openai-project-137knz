// file: /prompts/promptUtils.js

export function getSystemPrompt() {
  return {
    role: "system",
    content: `
You are an expert automotive recommendation engine.

CRITICAL TASK:
- Recommend 5–10 real production vehicles only.
- Rank them using fitScore (0–100).

FIELDS REQUIRED:

- manufacturer
- model
- productionYears
- chassisType
- engine
- drivetrain
- transmission
- fuelEconomy (MUST be in L/100km only)
- acceleration (0-100 km/h)
- estimatedPrice
- rating (1–10)
- fitScore (0–100)
- reliabilityScore
- maintenanceCost
- commonIssues
- reasoning

RULES:
- Output 5–10 cars only.
- Be realistic and conservative with specs.
- Do NOT include images.
`
  };
}

export function getUserPrompt(input) {
  return {
    role: "user",
    content: `
User car requirements:
${input}

Return 5–10 best matching vehicles ranked by fitScore.
`
  };
}

/**
 * IMPORTANT:
 * This function is REQUIRED by your API route.
 * It defines the tool schema for OpenAI function calling.
 */
export function getFunctions() {
  return [
    {
      name: "generate_car_recommendations",
      description:
        "Returns structured car recommendations based on user needs.",
      parameters: {
        type: "object",
        properties: {
          cars: {
            type: "array",
            items: {
              type: "object",
              properties: {
                manufacturer: { type: "string" },
                model: { type: "string" },
                productionYears: { type: "string" },
                chassisType: { type: "string" },

                engine: { type: "string" },
                drivetrain: { type: "string" },
                transmission: { type: "string" },

                fuelEconomy: {
                  type: "string",
                  description: "Must be in L/100km (e.g. 6.5 L/100km)",
                },

                acceleration: { type: "string" },

                estimatedPrice: { type: "string" },
                rating: { type: "number" },
                fitScore: { type: "number" },

                reliabilityScore: { type: "string" },
                maintenanceCost: { type: "string" },

                commonIssues: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      issue: { type: "string" },
                      repairCostEstimate: { type: "string" },
                    },
                  },
                },

                purchaseLinks: {
                  type: "array",
                  items: { type: "string" },
                },

                reasoning: { type: "string" },
              },
              required: [
                "manufacturer",
                "model",
                "productionYears",
                "chassisType",
                "fuelEconomy",
                "estimatedPrice",
                "fitScore",
              ],
            },
          },
        },
        required: ["cars"],
      },
    },
  ];
}