import React, { useState } from 'react'

const AIPicker = ({onFinal}) => {
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt!")

    try {
      // Call DALL-E
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      onFinal()
    }
  }

  return (
    <div>AIPicker</div>
  )
}

export default AIPicker