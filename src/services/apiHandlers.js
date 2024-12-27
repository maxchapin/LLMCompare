import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { HfInference } from '@huggingface/inference';

export const handleOpenAICall = async (model, apiKey, prompt) => {
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error(`OpenAI Error: ${error.message}`);
  }
};

export const handleGoogleCall = async (apiKey, prompt) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error(`Google AI Error: ${error.message}`);
  }
};

export const handleClaudeCall = async (model, apiKey, prompt) => {
  try {
    const response = await axios.post('https://prod.llmcompare.vercel.app/api/process_claude/', {
      api_key: apiKey,
      model: model,
      system: prompt,
    });

    if (!response.data.output) {
      throw new Error('No response received from Claude');
    }

    return response.data.output;
  } catch (error) {
    throw new Error(`Claude Error: ${error.message}`);
  }
};

export const handleMistralCall = async (model, apiKey, prompt) => {
  try {
    const response = await axios.post('https://api.mistral.ai/v1/chat/completions', {
      model: model,
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.data.choices?.[0]?.message?.content) {
      throw new Error('No response received from Mistral');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error(`Mistral Error: ${error.message}`);
  }
};

export const handleFreeModelCall = async (model, apiKey, prompt) => {
  if (!apiKey) {
    throw new Error('Hugging Face API key is required');
  }

  try {
    const inference = new HfInference(apiKey);
    
    const response = await inference.textGeneration({
      model: model,
      inputs: prompt,
    });

    if (response.generated_text) {
      return response.generated_text;
    } else {
      throw new Error('Unexpected response format from model');
    }

  } catch (error) {
    if (error.message.includes('requires a Pro subscription')) {
      throw new Error(`This model requires a Hugging Face Pro subscription. Visit https://huggingface.co/pricing to learn more.`);
    }
    if (error.message.includes('token seems invalid')) {
      throw new Error('Please check your Hugging Face API token');
    }
    throw new Error(`Hugging Face API Error: ${error.message}`);
  }
}; 