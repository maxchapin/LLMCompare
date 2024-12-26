import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

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

export const handleFreeModelCall = async (model, prompt) => {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        inputs: prompt,
        parameters: {
          max_length: 500,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        }
      }
    );

    // Handle different response formats
    if (Array.isArray(response.data) && response.data[0]?.generated_text) {
      return response.data[0].generated_text;
    } else if (typeof response.data === 'string') {
      return response.data;
    } else if (response.data?.output) {
      return response.data.output;
    } else {
      throw new Error('Unexpected response format from model');
    }

  } catch (error) {
    if (error.response?.status === 503) {
      throw new Error('Model is warming up, please try again in a few seconds');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid request format for this model. Please try a different prompt.');
    }
    throw new Error(`Free Model Error (${model}): ${error.message}`);
  }
}; 