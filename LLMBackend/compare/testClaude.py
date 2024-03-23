import anthropic

client = anthropic.Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    api_key="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",
)
message = client.messages.create(
    model="claude-3-opus-20240229",
    max_tokens=1000,
    temperature=0,
    system="Hello",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "You are a chatbot"
                }
            ]
        }
    ]
)
print("text:")
print(message.content)