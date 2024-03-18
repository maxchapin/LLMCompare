import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';

const ImageDisplayComponent = ({ apiKey, input }) => {
  const [imageDataList, setImageDataList] = useState([]);

  //console.log(apiKey)
  console.log(input)

  useEffect(() => {
    const runStableJS = async () => {
      if (!apiKey || !prompt) return; // Check if apiKey and prompt are provided

      const engineId = 'stable-diffusion-v1-6';
      const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
      
      try {
        const response = await fetch(
          `${apiHost}/v1/generation/${engineId}/text-to-image`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              text_prompts: [{ text: input }],
              cfg_scale: 7,
              height: 1024,
              width: 1024,
              steps: 30,
              samples: 1,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Non-200 response: ${await response.text()}`);
        }

        const responseJSON = await response.json();
        const imageBase64List = responseJSON.artifacts.map(image => image.base64);
        setImageDataList(imageBase64List);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    runStableJS();
  }, [apiKey, prompt]); // Re-run effect when apiKey or prompt changes

  return (
    <div>
      {imageDataList.map((imageData, index) => (
        <img
          key={index}
          src={`data:image/png;base64,${imageData}`}
          alt={`Generated Image ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default ImageDisplayComponent;
