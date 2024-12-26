from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from openai import OpenAI
import json
import base64
import os
import requests
import anthropic

@csrf_exempt
def process_text_input(request):
    
    if request.method == 'GET':
        data = json.loads(request.body.decode('utf-8'))
        user_input = data.get('input', '')
        openAIKey = data.get('key', '')
        selectedModel = data.get('model', '')
        temperature = data.get('temperature', '')
        
        # Send user input to OpenAI API (you need to set up OpenAI API key)
        client = OpenAI(
            api_key=openAIKey
        )

        chat_completion = client.chat.completions.create(
            model=selectedModel,
            temperature=temperature,
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant.",
                },
                {
                    "role": "user",
                    "content": user_input,
                }
            ],
            
        )
        #print(output)
        # Extract the content of the assistant's reply
        output = chat_completion.choices[0].message.content
        
        return JsonResponse({'output': output})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def process_claude(request):
    #print(request)
    #print("Running process_claude")
    if request.method == 'POST':
        #print("if POST")
        data = json.loads(request.body.decode('utf-8'))
        api_key = data.get('api_key', '')
        model = data.get('model', '')  # Default model
        system = data.get('system', '')

        #print(api_key)
        #print(system)

        # Validate input data
        if not all([api_key, system]):
            return JsonResponse({'error': 'Missing required parameters'}, status=400)

        # Create an instance of the Anthropc client
        try:
            client = anthropic.Anthropic(api_key=api_key)
        except Exception as e:
            #print("didnt work")
            return JsonResponse({'error': str(e)}, status=500)

        # Make the API call to generate a response message
        try:
            #print("try")

            message = client.messages.create(
                model="claude-3-opus-20240229",     
                max_tokens=1024,
                messages=[
                    {"role": "user", "content": system}
                ]
            )

            response = message.content[0].text
            print(response)

            return JsonResponse({'output': response})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def process_image_input(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            user_input = data.get('input', '')
            openai_key = data.get('key', '')

            # Send user input to OpenAI API (you need to set up OpenAI API key)
            client = OpenAI(api_key=openai_key)

            response = client.images.generate(
                model="dall-e-3",
                prompt=user_input,
                size="1024x1024",
                quality="standard",
                n=1,
            )

            image_url = response.data[0].url

            return JsonResponse({'output': image_url})
        except Exception as e:
            return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def process_stablefusion(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            user_input = data.get('input', '')
            stableAIKey = data.get('key', '')

            engine_id = "stable-diffusion-v1-6"
            api_host = 'https://api.stability.ai'

            if stableAIKey is None:
                raise Exception("Missing Stability API key.")

            response = requests.post(
                f"{api_host}/v1/generation/{engine_id}/text-to-image",
                headers={
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": f"Bearer {stableAIKey}"
                },
                json={
                    "text_prompts": [
                        {
                            "text": user_input
                        }
                    ],
                    "cfg_scale": 7,
                    "height": 512,
                    "width": 512,
                    "samples": 1,
                    "steps": 30,
                },
            )

            if response.status_code != 200:
                raise Exception("Non-200 response: " + str(response.text))

            data = response.json()

            # List to store base64 image data
            image_data_list = []

            for i, image in enumerate(data["artifacts"]):
                # Append the base64 image data to the list
                image_data_list.append(image["base64"])

            # for i, image in enumerate(image_url["artifacts"]):
            #     with open(f"./out/v1_txt2img_{i}.png", "wb") as f:
            #         f.write(base64.b64decode(image["base64"]))

            return JsonResponse({'output': image_data_list[0]})
        except Exception as e:
            return JsonResponse({'error': str(e)})
