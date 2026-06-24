const { GoogleGenerativeAI } = require("@google/generative-ai");

const askTutor = async (req, res) => {
  try {
    const { question, language } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
You are an AI tutor helping first-generation learners understand the internet.

Rules:
- Reply completely in ${language}
- Use very simple language
- Keep answers short
- Maximum 5 sentences
- Do NOT use markdown
- Do NOT use *
- Do NOT use **
- Do NOT use #
- Do NOT use bullet points
- Do NOT use emojis
- Make the answer sound natural when read aloud

Question:
${question}
`;

    const result = await model.generateContent(prompt);

    res.json({
      answer: result.response.text(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

const evaluateEmail = async (req, res) => {
  try {
    const { scenario, subject, message, language } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
Reply completely in ${language}.

You are an email tutor helping first-generation learners.

Scenario:
${scenario}

Subject:
${subject}

Email:
${message}

Evaluate the email.

Rules:
- Use simple language
- Keep feedback short
- Do NOT use markdown
- Do NOT use *
- Do NOT use **
- Do NOT use #
- Do NOT use bullet points
- Do NOT use emojis
- Make feedback sound natural when read aloud

Format exactly like this:

Score: X/10

Good:
Your good points here.

Needs Improvement:
Things to improve here.

Better Email:
Improved email here.
`;

    const result = await model.generateContent(prompt);

    res.json({
      feedback: result.response.text(),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  askTutor,
  evaluateEmail,
};
