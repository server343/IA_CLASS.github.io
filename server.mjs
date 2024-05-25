import express from 'express';
import { HfInference } from '@huggingface/inference';

const app = express();
const hf = new HfInference('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');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'

app.post('/generate-text', async (req, res) => {
    const inputText = req.body.text;
    try {
        const response = await hf.textGeneration({
            model: 'meta-llama/Meta-Llama-3-7B-Instruct',
            inputs: inputText
        });
        res.json({ text: response.generated_text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate text' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
