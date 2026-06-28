const getApiKey = () => process.env.REACT_APP_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
function removeCodeFence(text) {
  return text.replace(/^```(?:javascript|js)?\n?/, '').replace(/\n?```$/, '');
}

const extractAssistantContent = (response) => {
  const choices = response?.choices ?? [];

  return choices
    .map((choice) => choice?.message?.content ?? removeCodeFence(choice?.content) ?? '')
    .filter(Boolean)
    .join('\n\n');
};

const AIService = {
  async chat(prompt, language = 'JavaScript') {
    const apiKey = getApiKey();

    if (!apiKey) {
      throw new Error('OpenRouter API key is missing. Set REACT_APP_OPENROUTER_API_KEY in your environment.');
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          messages: [
            {
              role: 'system',
              content: `You are an expert ${language} programmer.

Rules:
- Always generate ${language} code unless the user explicitly requests another language.
- Use modern best practices.
- Return complete, working code whenever possible.
- Explain only if the user asks for an explanation.
- Wrap all code in markdown code fences with the correct language.
- If fixing code, preserve the original functionality while improving quality.`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error ${response.status}: ${error}`);
      }

      const data = await response.json();
      const content = extractAssistantContent(data);

      return {
        content,
        raw: data,
        choices: data?.choices ?? [],
      };
    } catch (error) {
      console.error('Error in AIService:', error);
      throw error;
    }
  },
};

export default AIService;
