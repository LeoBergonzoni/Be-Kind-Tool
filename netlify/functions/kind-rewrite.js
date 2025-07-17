const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Riformula le frasi in maniera gentile, professionale e corretta.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const response = completion.data.choices[0].message.content.trim();
    console.log('RISPOSTA GREZZA:', JSON.stringify(completion.data));

    return {
      statusCode: 200,
      body: JSON.stringify({ result: response }),
    };
  } catch (error) {
    console.error("Errore OpenAI:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Errore durante la generazione." }),
    };
  }
};