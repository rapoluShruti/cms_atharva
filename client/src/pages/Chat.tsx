import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synth = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Synthesis
  useEffect(() => {
    synth.current = window.speechSynthesis;
    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setIsSpeaking(true);

    // Simulate API response with delay
    setTimeout(() => {
      const responses = [
        "For tomato plants, ensure they receive 6-8 hours of direct sunlight daily. Water deeply 2-3 times per week, keeping the soil consistently moist but not waterlogged. This will help prevent fungal diseases.",
        "Pest management is crucial! I recommend using neem oil spray every 7-10 days during the growing season. Also, remove any infected leaves immediately to prevent spread.",
        "Crop rotation is essential for soil health. Alternate your crops annually - if you grew wheat this year, plant legumes or vegetables next year to restore nitrogen naturally.",
        "The pH level matters! Most vegetables prefer soil pH between 6.0-7.0. Test your soil regularly and amend it with lime or sulfur as needed.",
        "During monsoon season, ensure excellent drainage to prevent waterlogging. Use raised beds if needed, and reduce irrigation frequency during heavy rains.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: Date.now().toString() + "a",
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);

      // Speak the response
      if (synth.current && !synth.current.speaking) {
        synth.current.cancel();
        
        utteranceRef.current = new SpeechSynthesisUtterance(randomResponse);
        utteranceRef.current.rate = 0.95;
        utteranceRef.current.pitch = 1;
        utteranceRef.current.volume = 1;

        utteranceRef.current.onstart = () => {
          setIsSpeaking(true);
        };

        utteranceRef.current.onend = () => {
          setIsSpeaking(false);
        };

        utteranceRef.current.onerror = () => {
          setIsSpeaking(false);
        };

        synth.current.speak(utteranceRef.current);
      }
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 px-6 py-4 flex items-center gap-4">
        <button 
          onClick={() => setLocation("/home")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">Agriculture Expert</h1>
          <p className="text-xs text-emerald-600 font-semibold">AI Chatbot • Always Available</p>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 flex flex-col">
        {/* Avatar with Chat Bubble */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Avatar Container - Realistic Human Face */}
            <div className="relative w-48 h-56 rounded-3xl overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-orange-50">
              {/* Head/Face Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-orange-100" />
              
              {/* Face Content */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6">
                {/* Eyes Container */}
                <div className="flex gap-6 mb-6">
                  {/* Left Eye */}
                  <div className="relative w-8 h-10 bg-white rounded-full flex items-center justify-center border-2 border-gray-300">
                    <motion.div
                      animate={isSpeaking ? { y: [0, 2, 0] } : { y: 0 }}
                      transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2 }}
                      className="w-5 h-6 bg-gray-800 rounded-full"
                    />
                  </div>

                  {/* Right Eye */}
                  <div className="relative w-8 h-10 bg-white rounded-full flex items-center justify-center border-2 border-gray-300">
                    <motion.div
                      animate={isSpeaking ? { y: [0, 2, 0] } : { y: 0 }}
                      transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2 }}
                      className="w-5 h-6 bg-gray-800 rounded-full"
                    />
                  </div>
                </div>

                {/* Mouth - Animated */}
                <div className="mt-4 flex flex-col items-center">
                  {isSpeaking ? (
                    <>
                      {/* Speaking mouth open */}
                      <motion.div
                        animate={{ scaleY: [0.3, 1, 0.3], scaleX: [0.8, 1, 0.8] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        className="w-12 h-6 bg-gradient-to-b from-red-400 to-red-500 rounded-full border-2 border-gray-400"
                      />
                      
                      {/* Sound waves from mouth */}
                      <div className="mt-3 flex gap-2 items-end">
                        <motion.div
                          animate={{ height: ["12px", "24px", "12px"] }}
                          transition={{ duration: 0.4, repeat: Infinity }}
                          className="w-1.5 bg-emerald-500 rounded-full"
                        />
                        <motion.div
                          animate={{ height: ["12px", "32px", "12px"] }}
                          transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
                          className="w-1.5 bg-emerald-500 rounded-full"
                        />
                        <motion.div
                          animate={{ height: ["12px", "28px", "12px"] }}
                          transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
                          className="w-1.5 bg-emerald-500 rounded-full"
                        />
                        <motion.div
                          animate={{ height: ["12px", "24px", "12px"] }}
                          transition={{ duration: 0.4, repeat: Infinity, delay: 0.3 }}
                          className="w-1.5 bg-emerald-500 rounded-full"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Closed mouth smile */}
                      <svg className="w-12 h-6" viewBox="0 0 100 50">
                        <path
                          d="M 20 30 Q 50 45 80 30"
                          stroke="#333"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </>
                  )}
                </div>
              </div>

              {/* Blinking eyelids */}
              {!isSpeaking && (
                <motion.div
                  animate={{ scaleY: [1, 0, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  className="absolute top-16 left-0 right-0 h-16 bg-gradient-to-b from-yellow-100 to-yellow-100 z-20"
                />
              )}
            </div>

            {/* Status Badge */}
            <motion.div
              animate={{ scale: isSpeaking ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 0.6, repeat: isSpeaking ? Infinity : false }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
            >
              {isSpeaking && (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-3 h-3 bg-white rounded-full"
                />
              )}
            </motion.div>

            {/* Glow effect when speaking */}
            {isSpeaking && (
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 border-4 border-emerald-400 rounded-3xl"
              />
            )}
          </motion.div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 max-w-2xl mx-auto w-full">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-lg font-bold text-gray-900 mb-2">Welcome to Your Agricultural AI Assistant</p>
              <p className="text-gray-600 mb-6">Ask me anything about crop management, pest control, soil health, or farming techniques!</p>
              
              {/* Suggested Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "How to prevent plant diseases?",
                  "Best practices for crop rotation",
                  "Optimal watering schedules",
                  "Natural pest management"
                ].map((question, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      setInput(question);
                    }}
                    className="p-3 bg-white border border-emerald-200 rounded-xl text-sm font-medium text-gray-700 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((message, idx) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mr-3">
                      <span className="text-xl">🧑‍🌾</span>
                    </div>
                  )}

                  <div
                    className={`max-w-sm ${
                      message.role === "user"
                        ? "bg-emerald-600 text-white rounded-3xl rounded-tr-lg px-5 py-3"
                        : "bg-white border border-emerald-200 text-gray-800 rounded-3xl rounded-tl-lg px-5 py-3 shadow-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.role === "user" ? "text-emerald-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
                <span className="text-xl">🧑‍🌾</span>
              </div>
              <div className="bg-white border border-emerald-200 rounded-3xl rounded-tl-lg px-5 py-3 shadow-sm">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-emerald-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-emerald-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-6 py-4 w-full">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about crops, diseases, farming techniques..."
              disabled={loading}
              className="flex-1 bg-gray-50 border border-emerald-200 rounded-2xl px-5 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all disabled:opacity-50"
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            💡 The avatar will respond to your questions with expert agricultural advice
          </p>
        </div>
      </div>
    </div>
  );
}
