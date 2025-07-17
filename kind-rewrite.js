const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  const { prompt } = JSON.parse(event.body);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // ⚠️ mai inserire qui direttamente la chiave!
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // puoi usare anche "gpt-4" se hai accesso
      messages: [
        { role: "system", content: "Sei un assistente gentile, professionale e diplomatico." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ result: completion.data.choices[0].message.content.trim() })
    };
  } catch (err) {
    console.error("Errore OpenAI:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Errore nella generazione della risposta." })
    };
  }
};