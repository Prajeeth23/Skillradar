import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { chatCareerAssistantApi } from '../../api/career';
import { ChatMessage } from '../../types/career';

export const CareerAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello ${user?.name || 'there'}! I am your SkillRadar AI Career Assistant. I have analyzed your verified project history, explicit technical proficiencies, and discovered transferable capabilities.\n\nAsk me anything about role matching, how to close competency gaps, or how your hidden skills unlock new internal opportunities!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggested_actions: [
        'What roles fit my current skills?',
        'What hidden skills have been discovered?',
        'Why am I matched for Product Engineer?',
        'What skills should I learn next?',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || sending) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const response = await chatCareerAssistantApi(textToSend);
      const assistantMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'assistant',
        text: response.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggested_actions: response.suggested_actions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl shadow-xs overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 bg-[#FAFAFA] border-b border-[#E5E5EA] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B4FE8] to-[#712AE2] flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">AI Career Assistant</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#16a34a] border border-[#22C55E]/20 font-mono">
                Grounded in Your Dossier
              </span>
            </div>
            <p className="text-[11px] text-[#6B6B76]">
              Personalized career guidance based on verified telemetry & hidden talents.
            </p>
          </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#FAFAFA]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-[#5B4FE8] text-white'
                  : 'bg-[#5B4FE8]/10 border border-[#5B4FE8]/20 text-[#5B4FE8]'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#5B4FE8] text-white shadow-xs'
                  : 'bg-[#FFFFFF] border border-[#E5E5EA] text-[#1A1A1E] shadow-xs'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div
                className={`text-[10px] mt-2 font-mono ${
                  msg.sender === 'user' ? 'text-white/80' : 'text-[#9B9BA5]'
                }`}
              >
                {msg.timestamp}
              </div>

              {/* Suggested Action Chips */}
              {msg.suggested_actions && msg.suggested_actions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[#E5E5EA] flex flex-wrap gap-1.5">
                  {msg.suggested_actions.map((act) => (
                    <button
                      key={act}
                      onClick={() => handleSend(act)}
                      className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#F4F3FF] border border-[#E5E5EA] text-[#5B4FE8] text-[11px] font-medium transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span>{act}</span>
                      <ArrowRight className="w-3 h-3 text-[#5B4FE8]" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#5B4FE8]/10 border border-[#5B4FE8]/20 text-[#5B4FE8] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E5E5EA] text-xs text-[#6B6B76] flex items-center gap-2 shadow-xs">
              <Loader2 className="w-4 h-4 animate-spin text-[#5B4FE8]" />
              <span>Analyzing your skills and opportunity requirements...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 bg-[#FFFFFF] border-t border-[#E5E5EA]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your skills, role match reasons, or learning paths..."
            className="flex-1 px-4 py-2.5 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] placeholder-[#9B9BA5] focus:outline-none focus:border-[#5B4FE8] focus:ring-1 focus:ring-[#5B4FE8]"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="p-2.5 rounded-xl bg-[#5B4FE8] hover:bg-[#4A3FD1] disabled:opacity-50 text-white transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
