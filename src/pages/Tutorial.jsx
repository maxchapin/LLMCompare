import React from 'react';
import { Container, Typography, Paper, Box, Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Tutorial = () => {
  const tutorials = [
    {
      title: "Getting Started",
      content: `
        1. Choose a model from the dropdown menu
        2. Get the appropriate API key for your chosen model:
           • OpenAI (GPT models) - https://platform.openai.com/api-keys
           • Google (Gemini) - https://makersuite.google.com/app/apikey
           • Anthropic (Claude) - https://console.anthropic.com/account/keys
           • Mistral - https://console.mistral.ai/api-keys
           • Hugging Face (Free models) - https://huggingface.co/settings/tokens
           
        Note: All models require an API key, even the "free" models. The free models use Hugging Face's API, which requires a free API key.
        
        3. Enter your API key in the text field
        4. Enter your prompt in the text area
        5. Click "Generate" to see the results
        
        Pro Tip: You can run multiple models simultaneously to compare their responses!
      `
    },
    {
      title: "API Keys",
      content: `
        Different models require different API keys:

        Paid Models:
        • OpenAI (GPT-4, GPT-3.5) - Requires credit card, pay per use
        • Google (Gemini) - Free trial available with credit card
        • Anthropic (Claude) - Requires credit card, pay per use
        • Mistral - Pay per use, competitive pricing

        Free Models (via Hugging Face):
        • Requires free account and API key
        • No credit card needed
        • Some models (like Llama 2) require Pro subscription
        • Rate limits apply

        Your API keys are never stored on our servers - all requests are made directly from your browser.
      `
    },
    {
      title: "Free vs Paid Models",
      content: `
        Free Models:
        • Require only a Hugging Face API key
        • Include models like Phi-2 and Zephyr
        • May have longer response times
        
        Paid Models:
        • Require provider-specific API keys
        • Include GPT-4, Claude, Gemini
        • Generally faster and more capable
        
        Note: Some Hugging Face models (like Llama 2) require a Pro subscription.
      `
    }
  ];

  const faqs = [
    {
      question: "Are my API keys secure?",
      answer: "Yes! Your API keys are never stored on our servers. All API calls are made directly from your browser to the AI providers. You can verify this in our open-source code."
    },
    {
      question: "Why use multiple models?",
      answer: "Different models have different strengths and biases. Comparing responses can help you understand these differences and choose the best model for your needs."
    },
    {
      question: "Why are some models slower?",
      answer: "Free models hosted on Hugging Face may need to 'warm up' if they haven't been used recently. Paid models typically provide more consistent response times."
    },
    {
      question: "What's the difference between model sizes?",
      answer: "Larger models (like GPT-4, Claude 3 Opus) are generally more capable but more expensive. Smaller models are faster and cheaper but may be less sophisticated. Medium models often provide a good balance."
    },
    {
      question: "How do I report issues?",
      answer: "Visit our GitHub repository at https://github.com/maxchapin/LLMCompare to report issues or contribute improvements. We're open source!"    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        How to Use LLM Compare
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Start Guide
        </Typography>
        {tutorials.map((section, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              {section.title}
            </Typography>
            <Typography variant="body1" component="div" style={{ whiteSpace: 'pre-line' }}>
              {section.content}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Frequently Asked Questions
      </Typography>

      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Tutorial; 