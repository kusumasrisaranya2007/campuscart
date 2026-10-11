import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  IndianRupee, 
  ShieldCheck, 
  Sparkles,
  Bot
} from 'lucide-react';
import { Product, ChatMessage, StudentUser } from '../types';

interface BuyerSellerChatModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: StudentUser | null;
  glitchMode: boolean;
}

export const BuyerSellerChatModal: React.FC<BuyerSellerChatModalProps> = ({
  product,
  isOpen,
  onClose,
  currentUser,
  glitchMode,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or load conversation for this product
  useEffect(() => {
    if (!product || !isOpen) return;

    const storageKey = `campus_cart_chat_${product.id}`;
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        setMessages(JSON.parse(saved));
        return;
      } catch (e) {
        // fallback
      }
    }

    // Default seed dialogue
    const initialSeed: ChatMessage[] = [
      {
        id: 'msg-1',
        productId: product.id,
        senderId: product.seller.contactEmail,
        senderName: product.seller.name,
        text: `Hey! Thanks for checking out my listing for "${product.title}". Let me know if you want to inspect it or arrange a pickup!`,
        timestamp: '10:14 AM',
        isSeller: true,
      },
    ];
    setMessages(initialSeed);
  }, [product, isOpen]);

  // Save messages to localStorage
  useEffect(() => {
    if (product && messages.length > 0) {
      localStorage.setItem(`campus_cart_chat_${product.id}`, JSON.stringify(messages));
    }
  }, [messages, product]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen || !product) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      productId: product.id,
      senderId: currentUser?.email || 'guest-student',
      senderName: currentUser?.name || 'You (Student Buyer)',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSeller: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate realistic seller response
    setTimeout(() => {
      let reply = `Sounds great! I'm free tomorrow after 2 PM near ${product.campus} library or canteen. Can meet there!`;
      if (text.toLowerCase().includes('price') || text.toLowerCase().includes('discount') || text.toLowerCase().includes('negotiable')) {
        reply = `I could do ₹${Math.max(100, product.price - 50)} if you can pick it up tomorrow at the department block!`;
      } else if (text.toLowerCase().includes('condition') || text.toLowerCase().includes('working')) {
        reply = `It's in ${product.condition} condition. You're welcome to test it out completely before making any payment!`;
      }

      const sellerReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        productId: product.id,
        senderId: product.seller.contactEmail,
        senderName: product.seller.name,
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSeller: true,
      };

      setMessages((prev) => [...prev, sellerReply]);
      setIsTyping(false);
    }, 1200);
  };

  const QUICK_REPLIES = [
    "Hi! Is this still available?",
    "Can we meet at the campus library?",
    "Is the price negotiable?",
    "Does it come with original cables / notes?",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[640px] text-left">
        
        {/* Chat Header: Seller Details + Product Summary */}
        <div className="p-4 bg-[#FAF7F0] border-b border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {product.seller.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                  <span>{product.seller.name}</span>
                  {product.seller.isVerified && (
                    <span title="Verified College Student">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  {product.seller.college} · {product.seller.department}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Mini Banner */}
          <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200/90 text-xs">
            <div className="flex items-center gap-2.5 truncate pr-2">
              <img
                src={product.image}
                alt={product.title}
                className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-100"
              />
              <div className="truncate">
                <div className="font-bold text-slate-800 truncate">{product.title}</div>
                <div className="text-[11px] text-slate-500">{product.condition} · {product.campus}</div>
              </div>
            </div>
            <div className="font-extrabold text-emerald-700 tabular-nums shrink-0 text-sm">
              ₹{product.price.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="px-4 py-2 bg-amber-50/80 border-b border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Campus safety rule: Only pay after physically inspecting the item at an open campus area.</span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
          {messages.map((msg) => {
            const isMe = !msg.isSeller;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[10px] text-slate-400 mb-1 px-1">
                  {msg.senderName} · {msg.timestamp}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    isMe
                      ? 'bg-emerald-700 text-white rounded-tr-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic bg-white px-3 py-1.5 rounded-full border border-slate-200 w-fit">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              <span>{product.seller.name} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Quick Ask:</span>
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              onClick={() => handleSendMessage(reply)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-[11px] font-medium text-slate-600 shrink-0 transition-colors border border-slate-200"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type message to student seller..."
            className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl transition-colors shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
