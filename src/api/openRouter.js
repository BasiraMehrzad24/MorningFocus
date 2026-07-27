import axios from "axios";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function generateMotivation(goal) {
  try {
    // send goal to OpenRouter and request AI motivation
    const response = await axios.post(
      API_URL,
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are MorningFocus AI.

When the user gives you today's goal, respond ONLY with valid JSON.

Return exactly this format:

{
  "motivation": "Three short motivating sentences.",
  "steps": [
    "First practical step.",
    "Second practical step.",
    "Third practical step."
  ]
}

Rules:
- Return ONLY valid JSON.
- No markdown.
- No code blocks.
- No extra text.
- Exactly 3 steps.
- Keep the motivation under 60 words.
- Make the steps practical and achievable today.
`,
          },
          {
            role: "user",
            content: `My goal today is: ${goal}`,
          },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // extract AI response
    const content = response.data.choices[0].message.content;

    // convert JSON string into a JavaScript object
    const parsed = JSON.parse(content);

    return parsed;
  } catch (error) {
    console.error(error);

    throw new Error("Failed to generate motivation.");
  }
}