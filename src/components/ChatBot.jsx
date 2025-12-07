import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import ReactMarkdown from 'react-markdown';
import { generateRAGResponse } from '../services/ragService';
import { loadAllDocuments } from '../utils/documentLoader';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chatbot with RAG
  const initializeChatbot = async () => {
    if (isInitialized || isInitializing) return;

    setIsInitializing(true);

    const initialized = localStorage.getItem('documentsLoaded');

    if (!initialized) {
      setMessages([{
        role: 'system',
        content: '📚 Loading documents... Please wait.'
      }]);

      try {
        // Load documents into memory
        const count = await loadAllDocuments();

        localStorage.setItem('documentsLoaded', 'true');

        setMessages([{
          role: 'assistant',
          content: `Hi! I'm Dimas's AI assistant. I've loaded ${count} chunks of information about his experience, projects, and achievements. What would you like to know?`
        }]);

        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing:', error);
        setMessages([{
          role: 'system',
          content: 'Error loading documents. You can still ask questions, but responses may be less accurate.'
        }]);
        setIsInitialized(true);
      }
    } else {
      // Already initialized, just load documents silently
      try {
        await loadAllDocuments();
        setMessages([{
          role: 'assistant',
          content: 'Hi! I\'m Dimas\'s AI assistant. I can answer questions about his experience, projects, skills, and achievements. What would you like to know?'
        }]);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading documents:', error);
        setMessages([{
          role: 'assistant',
          content: 'Hi! I\'m Dimas\'s AI assistant. Ready to answer your questions!'
        }]);
        setIsInitialized(true);
      }
    }

    setIsInitializing(false);
  };

  // Handle opening chat
  const handleOpen = () => {
    setIsOpen(true);
    if (!isInitialized && !isInitializing) {
      initializeChatbot();
    }
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    const newMessages = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Prepare conversation history
      const conversationHistory = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      // Generate RAG response (local, in-browser)
      const response = await generateRAGResponse(userMessage, conversationHistory);

      // Add assistant response
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
    'What are Dimas\'s main skills?',
    'Tell me about his recent projects',
    'What are his achievements?',
    'What is his work experience?'
  ];

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={handleOpen} aria-label="Open chat">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <span>DF</span>
              </div>
              <div className="chatbot-title">
                <h3>Dimas's AI Assistant</h3>
                <p className="chatbot-status">
                  {isInitialized ? 'Online - RAG Enabled' : 'Initializing...'}
                </p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'message-user' : message.role === 'system' ? 'message-system' : 'message-assistant'}`}
              >
                <div className="message-content">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message message-assistant">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && messages[0].role === 'assistant' && !isLoading && (
            <div className="suggested-questions">
              <p>Try asking:</p>
              <div className="suggested-questions-list">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="suggested-question-btn"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chatbot-input-container">
            <textarea
              className="chatbot-input"
              placeholder="Ask me anything about Dimas..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || !isInitialized}
              rows="1"
            />
            <button
              className="chatbot-send-btn"
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
      )}
    </>
  );
};

export default ChatBot;
