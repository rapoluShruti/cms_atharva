import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Send, Sprout, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [, setLocation] = useLocation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your agricultural expert. How can I help you with your crops today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response for now (since we don't have the chat endpoint in the shared schema provided in context)
    // In a real implementation, we would call the chat API here.
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand your concern. Based on typical symptoms, ensure proper drainage and avoid overwatering. Would you like me to recommend specific fungicides?"
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button 
          onClick={() => setLocation("/")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <Bot className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Dr. Green</h1>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Online
            </p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-sm' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 safe-bottom">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all outline-none text-gray-800 placeholder:text-gray-400"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-emerald-600/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
