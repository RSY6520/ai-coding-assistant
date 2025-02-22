import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/generate-code', async (req, res) => {
    const { code, language } = req.body;

    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo",
            prompt: `Suggest improvements or completions for the following ${language} code:\n\n${code}`,
            max_tokens: 150
        });

        res.json({ suggestion: response.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4000, () => console.log('Server running on port 4000'));
