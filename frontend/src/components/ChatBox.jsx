import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const ChatBox = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/chat/', { prompt });
      setResponse(res.data.ciphergenix_response);
    } catch (error) {
      setResponse("CipherGenix could not process your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask CipherGenix your AI security question..."
      />
      <br />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
      <div style={{ marginTop: '20px' }}>
        <strong>CipherGenix:</strong>
        <p className="response-text">{response}</p>
      </div>
    </div>
  );
};

export default ChatBox;
