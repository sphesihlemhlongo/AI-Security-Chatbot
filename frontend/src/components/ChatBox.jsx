import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './response.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';


const ChatBox = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('https://web-production-8e40c.up.railway.app/chat/', { prompt });
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
        <div className="response">
        <ReactMarkdown
            components={{
            code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
                ) : (
                <code className={className} {...props}>
                    {children}
                </code>
                );
            }
            }}
        >
            {response}
        </ReactMarkdown>
    </div>
      </div>
    </div>
  );
};

export default ChatBox;
