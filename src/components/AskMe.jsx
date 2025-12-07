import React, { useState, useEffect, useRef } from 'react';
import './AskMe.css';
import SectionTitle from './SectionTitle';
import ReactMarkdown from 'react-markdown';
import { generateRAGResponse } from '../services/ragService';
import { loadAllDocuments } from '../utils/documentLoader';

const AskMe = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize on mount
  useEffect(() => {
    initializeChatbot();
  }, []);

  // Initialize chatbot
  const initializeChatbot = async () => {
    if (isInitialized) return;

    try {
      await loadAllDocuments();
      setMessages([{
        role: 'assistant',
        content: 'Hi! I\'m Dimas\'s AI assistant. Ask me anything about his experience, projects, skills, and achievements!'
      }]);
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing:', error);
      setMessages([{
        role: 'assistant',
        content: 'Hi! Ready to answer your questions about Dimas!'
      }]);
      setIsInitialized(true);
    }
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    const newMessages = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      const response = await generateRAGResponse(userMessage, conversationHistory);

      setMessages([
        ...newMessages,
        { role: 'assistant', content: response }
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Suggested questions
  const suggestedQuestions = [
    'What are Dimas\'s main technical skills?',
    'Tell me about his AI/ML projects',
    'What achievements has he won?',
    'What is his educational background?',
    'Tell me about his robotics experience',
    'What programming languages does he know?'
  ];

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <section id="askme" className="askme">
      <div className="askme-container">
        <SectionTitle>ASK ME ANYTHING</SectionTitle>
        <p className="askme-subtitle">Powered by AI - Get instant answers about my experience, skills, and projects</p>

        <div className="chat-embedded-container">
          {/* Messages Area */}
          <div className="chat-messages-area">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'}`}
              >
                <div className="chat-message-content">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message chat-message-assistant">
                <div className="chat-message-content chat-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="chat-suggested-section">
              <p className="chat-suggested-title">Try asking:</p>
              <div className="chat-suggested-grid">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="chat-suggested-btn"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <textarea
                className="chat-input-field"
                placeholder="Ask me anything about Dimas..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading || !isInitialized}
                rows="1"
              />
              <button
                className="chat-send-button"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading || !isInitialized}
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskMe;
