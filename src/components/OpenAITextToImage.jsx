import React, { useState, useEffect } from 'react';
import OpenAI from "openai";

const OpenAITextToImage = ({ apiKey, input }) => {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        const generateImage = async () => {
            try {
                const openai = new OpenAI({
                    apiKey: apiKey,
                    dangerouslyAllowBrowser: true,
                });

                const response = await openai.images.generate({ model: "dall-e-3", prompt: input });

                // Check if the response contains image data
                if (response && response.data) {
                    setImageData(response.data[0].url);
                } else {
                    console.error('No image data found in response:', response);
                }
            } catch (error) {
                console.error('Error generating image:', error);
            }
        };

        generateImage();
    }, [apiKey, input]);

    return (
        <div>
            {/* Render the image if imageData is available */}
            {imageData && <img src={imageData} alt="Generated Image" />}
        </div>
    );
};

export default OpenAITextToImage;
