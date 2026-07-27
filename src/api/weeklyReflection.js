import axios from "axios";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// generate an ai-powered weekly productivity reflection
export async function generateWeeklyReflection({
  weeklyStats,
  formattedGoals,
}) {
  // build the ai prompt
  const prompt = `
You are an experienced productivity coach.

Analyze the user's weekly productivity.

Weekly Statistics:

- Total Goals: ${weeklyStats.totalGoals}
- Completed Goals: ${weeklyStats.completedGoals}
- Pending Goals: ${weeklyStats.pendingGoals}
- Completion Rate: ${weeklyStats.completionRate}%

Goals:

${formattedGoals}

Please return ONLY valid JSON.

Format:

{
  "summary": "",
  "strengths": "",
  "improvements": "",
  "motivation": "",
  "nextWeekTip": ""
}
`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are MorningFocus AI.

Analyze the user's weekly productivity.

Return ONLY valid JSON.

Format:

{
  "summary": "...",
  "strengths": "...",
  "improvements": "...",
  "motivation": "...",
  "nextWeekTip": "..."
}

Rules:
- Return ONLY valid JSON.
- No markdown.
- No code block.
- Keep each section concise.
- Be encouraging but honest.
`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.6,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let content = response.data.choices[0].message.content;

    // remove markdown if the model returns it
    content = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(content);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate weekly reflection.");
  }
}