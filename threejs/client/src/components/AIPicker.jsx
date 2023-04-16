import React, { useRef, useState } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';
import { getRandomPrompt } from '../config/helpers';

const AIPicker = ({ handleDecals, onFinal }) => {
  const [generatingImg, setGeneratingImg] = useState(false);
  const promptRef = useRef();

  const handleSurprise = () => {
    const randomPrompt = getRandomPrompt(promptRef.current.value);
    promptRef.current.value = randomPrompt;
  };

  const handleSubmit = async (type) => {
    const prompt = promptRef.current.value;
    if (!prompt) return alert('Please enter a prompt!');

    try {
      // Call DALL-E from backend
      setGeneratingImg(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dalle`, {
        prompt: prompt,
      });
      const { data } = response;
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      onFinal();
    }
  };

  return (
    <div className="aipicker-container">
      <div className="flex items-center gap-2">
        <label htmlFor="prompt" className="block text-sm font-semibold text-gray-900">
          Prompt
        </label>
        <button
          type="button"
          onClick={handleSurprise}
          className="font-semibold text-xs bg-gray-800 py-1 px-2 rounded-md text-white"
        >
          Surprise me
        </button>
      </div>
      <textarea
        id="prompt"
      placeholder="Ask AI..."
        rows={5}
        ref={promptRef}
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton type="outline" title="Asking AI..." customStyles="text-xs" />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />
            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
