import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import emailjs from '@emailjs/browser';
import { css } from '../utils/css';
import { ArrowRight, Svg } from './ui';
import { topics } from '../data/portfolio';
import { generateRAGResponse } from '../services/ragService';
import { loadAllDocuments } from '../utils/documentLoader';

const GREETING = "Hi! I'm Dimas's portfolio assistant. Ask me about his projects, experience, skills or achievements.";

const tabStyle = (on) => css(
  'display:flex;align-items:center;justify-content:center;gap:8px;height:40px;border:none;border-radius:999px;font-size:13px;font-weight:700;' +
  (on ? 'background:#121214;color:#F4EEE3;' : 'background:transparent;color:#5F594F;')
);

const fieldLabel = 'font-size: 12px; font-weight: 600; letter-spacing: 0.08em';
const inputBox = 'border: 1px solid #DDD3C2; padding: 0 14px; font-size: 16px; background: #FBF8F3; color: #121214';

// Chat (RAG + Groq, same pipeline as before) and contact form (EmailJS) in one card.
const ContactPanel = ({ mode, setMode }) => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const scrollRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [topic, setTopic] = useState(topics[0]);
  const [formError, setFormError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let alive = true;
    loadAllDocuments()
      .catch((err) => console.error('Error initializing:', err))
      .finally(() => {
        if (!alive) return;
        setMessages([{ role: 'assistant', content: GREETING }]);
        setReady(true);
      });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const ask = async (q) => {
    const text = (q || '').trim();
    if (!text || loading || !ready) return;
    const history = messages.filter((m) => m.role !== 'system').map(({ role, content }) => ({ role, content }));
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setDraft('');
    setLoading(true);
    try {
      const response = await generateRAGResponse(text, history);
      setMessages([...next, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages([...next, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setFormError('');
  };

  const validate = () => {
    if (!form.name.trim()) return 'Please add your name.';
    if (!form.email.trim()) return 'Please add your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return 'Please enter a valid email address.';
    if (!form.message.trim()) return 'Please write a short message.';
    return '';
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setFormError(err); return; }
    setSending(true);
    try {
      const time = new Date().toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
      });
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: `[${topic}] ${form.message}`, time },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setFormError('');
    } catch (error) {
      console.error('Failed to send email:', error);
      setFormError('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSent(false);
    setMode('chat');
    setForm({ name: '', email: '', message: '' });
    setFormError('');
  };

  const isChat = mode === 'chat';
  const isForm = mode === 'form';
  const chips = [
    { label: 'Show AI projects', act: () => ask('Show me his AI projects') },
    { label: 'Is he open to work?', act: () => ask('Is he open to work?') },
    { label: 'Leave a message', act: () => setMode('form') },
  ];

  return (
    <div id="contact" style={css('scroll-margin-top: 96px; width: min(485px, 100%); height: clamp(600px, 50vw, 720px); display: flex; flex-direction: column; background: #FFFFFF; border: 1.5px solid #121214; border-radius: 20px; box-shadow: 8px 8px 0 #121214; overflow: hidden')}>
      <div style={css('background: #121214; color: #F4EEE3; padding: 18px 20px; display: flex; align-items: center; gap: 12px')}>
        <span aria-hidden="true" style={css('width: 42px; height: 42px; flex-shrink: 0; border-radius: 50%; background: #3B5BA5; border: 2px solid #F26A2E; color: #F4EEE3; display: flex; align-items: center; justify-content: center')}>
          <Svg size={22} sw={1.8}><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V5" /><circle cx="12" cy="4" r="1" /><circle cx="9" cy="13" r="1" /><circle cx="15" cy="13" r="1" /><path d="M9.5 16.5h5" /><path d="M2 13v2" /><path d="M22 13v2" /></Svg>
        </span>
        <div style={css('display: flex; flex-direction: column; gap: 3px; flex-grow: 1')}>
          <span style={css('font-size: 16px; font-weight: 700')}>AI Assistant</span>
          <span style={css('display: flex; align-items: center; gap: 6px; font-size: 12px; color: #B9B2A6')}><span style={css('width: 8px; height: 8px; border-radius: 50%; background: #3BB273')}></span>{loading ? 'Typing...' : ready ? 'Online · RAG enabled' : 'Initializing...'}</span>
        </div>
        <span style={css("font-family: 'Oswald', sans-serif; font-size: 12px; letter-spacing: 0.2em; color: #B9B2A6")}>DF</span>
      </div>

      <div role="tablist" aria-label="Chat or contact form" style={css('margin: 14px 16px 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px; padding: 4px; background: #F4EEE3; border-radius: 999px')}>
        <button role="tab" aria-selected={isChat} onClick={() => setMode('chat')} style={tabStyle(isChat)}>
          <Svg><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></Svg>Chat
        </button>
        <button role="tab" aria-selected={isForm} onClick={() => setMode('form')} style={tabStyle(isForm)}>
          <Svg><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Svg>Contact form
        </button>
      </div>

      {isChat && (
        <div style={css('flex-grow: 1; min-height: 0; display: flex; flex-direction: column')}>
          <div ref={scrollRef} style={css('flex-grow: 1; min-height: 0; overflow-y: auto; padding: 18px 16px 8px; display: flex; flex-direction: column; gap: 10px')}>
            <span style={css('align-self: center; font-size: 11px; letter-spacing: 0.2em; color: #8A8378')}>TODAY</span>
            {messages.map((m, i) => (
              m.role === 'user' ? (
                <div key={i} className="md" style={css('align-self: flex-end; max-width: 84%; background: #121214; color: #F4EEE3; padding: 12px 14px; border-radius: 16px 16px 4px 16px; font-size: 14px; line-height: 1.5')}><ReactMarkdown>{m.content}</ReactMarkdown></div>
              ) : (
                <div key={i} className="md" style={css('align-self: flex-start; max-width: 84%; background: #F4EEE3; color: #121214; padding: 12px 14px; border-radius: 16px 16px 16px 4px; font-size: 14px; line-height: 1.5')}><ReactMarkdown>{m.content}</ReactMarkdown></div>
              )
            ))}
            {loading && (
              <div style={css('align-self: flex-start; background: #F4EEE3; color: #5F594F; padding: 12px 14px; border-radius: 16px 16px 16px 4px; font-size: 14px; line-height: 1.5')}>...</div>
            )}
          </div>
          <div style={css('padding: 8px 16px 0; display: flex; flex-wrap: wrap; gap: 6px')}>
            {chips.map((c) => (
              <button key={c.label} className="qchip" onClick={c.act} style={css('font-size: 12px; font-weight: 600; padding: 8px 12px; min-height: 34px; border-radius: 999px; border: 1px solid #121214; background: #FFFFFF; color: #121214')}>{c.label}</button>
            ))}
          </div>
          <div style={css('padding: 12px 16px 16px; display: flex; gap: 8px; align-items: center')}>
            <label htmlFor="chat-input" style={css('position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)')}>Message AI Assistant</label>
            <input id="chat-input" value={draft} disabled={!ready || loading} onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); ask(draft); } }}
              placeholder="Ask about projects, skills..."
              style={css('flex-grow: 1; min-width: 0; height: 46px; border: 1px solid #DDD3C2; border-radius: 999px; padding: 0 16px; font-size: 16px; background: #FBF8F3; color: #121214')} />
            <button aria-label="Send" onClick={() => ask(draft)} disabled={!draft.trim() || !ready || loading}
              style={css(`width: 46px; height: 46px; flex-shrink: 0; border-radius: 50%; border: none; background: #F26A2E; color: #121214; display: flex; align-items: center; justify-content: center; opacity: ${!draft.trim() || !ready || loading ? 0.5 : 1}`)}>
              <Svg size={18} sw={2.2}><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></Svg>
            </button>
          </div>
        </div>
      )}

      {isForm && !sent && (
        <form onSubmit={submit} noValidate style={css('flex-grow: 1; min-height: 0; overflow-y: auto; padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 14px')}>
          <p style={css('margin: 0; font-size: 14px; line-height: 1.5; color: #5F594F')}>Prefer a human? Dimas reads every message and replies by email.</p>
          <div style={css('display: flex; flex-direction: column; gap: 6px')}>
            <label htmlFor="f-name" style={css(fieldLabel)}>NAME</label>
            <input id="f-name" value={form.name} onChange={setField('name')} placeholder="Your name" style={css(`height: 44px; border-radius: 10px; ${inputBox}`)} />
          </div>
          <div style={css('display: flex; flex-direction: column; gap: 6px')}>
            <label htmlFor="f-email" style={css(fieldLabel)}>EMAIL</label>
            <input id="f-email" type="email" value={form.email} onChange={setField('email')} placeholder="you@company.com" style={css(`height: 44px; border-radius: 10px; ${inputBox}`)} />
          </div>
          <div style={css('display: flex; flex-direction: column; gap: 8px')}>
            <span style={css(fieldLabel)}>TOPIC</span>
            <div style={css('display: flex; flex-wrap: wrap; gap: 6px')}>
              {topics.map((t) => (
                <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}
                  style={css('font-size:12px;font-weight:600;padding:0 12px;height:34px;border-radius:999px;border:1px solid #121214;' + (topic === t ? 'background:#121214;color:#F4EEE3;' : 'background:#FFFFFF;color:#121214;'))}>{t}</button>
              ))}
            </div>
          </div>
          <div style={css('display: flex; flex-direction: column; gap: 6px; flex-grow: 1; min-height: 0')}>
            <label htmlFor="f-msg" style={css(fieldLabel)}>MESSAGE</label>
            <textarea id="f-msg" value={form.message} onChange={setField('message')} placeholder="Tell me a bit about what you have in mind"
              style={css('flex-grow: 1; min-height: 80px; resize: none; border: 1px solid #DDD3C2; border-radius: 10px; padding: 12px 14px; font-size: 16px; line-height: 1.5; background: #FBF8F3; color: #121214')}></textarea>
          </div>
          {formError && (
            <span role="alert" style={css('display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #B3261E')}>
              <Svg><circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><path d="M12 16.5v.01" /></Svg>{formError}
            </span>
          )}
          <button type="submit" disabled={sending} style={css(`flex-shrink: 0; height: 50px; border: none; border-radius: 999px; background: #121214; color: #F4EEE3; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px; opacity: ${sending ? 0.7 : 1}`)}>
            {sending ? 'Sending...' : 'Send message'} <ArrowRight />
          </button>
        </form>
      )}

      {isForm && sent && (
        <div style={css('flex-grow: 1; padding: 32px 24px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 16px')}>
          <span style={css('width: 56px; height: 56px; border-radius: 50%; background: #F26A2E; display: flex; align-items: center; justify-content: center; color: #121214')}><Svg size={26} sw={2.4}><path d="M5 12l5 5 9-10" /></Svg></span>
          <span style={css('font-size: 30px; font-weight: 900; letter-spacing: -0.04em; line-height: 1')}>Message sent.</span>
          <span style={css('font-size: 14px; line-height: 1.6; color: #5F594F')}>Thanks{form.name ? `, ${form.name.trim().split(' ')[0]}` : ''}. Your note about "{topic}" is in. Expect a reply at {form.email || 'your email'} soon.</span>
          <button onClick={reset} style={css('margin-top: 8px; font-size: 14px; font-weight: 600; padding: 12px 18px; min-height: 44px; border-radius: 999px; border: 1px solid #121214; background: #FFFFFF; color: #121214')}>Back to chat</button>
        </div>
      )}
    </div>
  );
};

export default ContactPanel;
