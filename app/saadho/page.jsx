"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { UserButton } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SaadhoChatPage() {
  const quotes = useMemo(
    () => [
      "हर अंधेरी रात के बाद उजाला आता है। आपका संघर्ष आपकी ताकत बनता है।",
      "बूंद-बूंद से सागर बनता है। छोटे-छोटे कदम बड़े परिवर्तन लाते हैं।",
      "आपकी दृढ़ता आपकी सबसे बड़ी प्रतिभा है। हार मानना विकल्प नहीं।",
      "जो रिस्क लेते हैं, वही आगे बढ़ते हैं।",
      "पहला कदम विश्वास से शुरू होता है।",
      "आशा की किरण अंधकार में भी रास्ता दिखाती है।",
      "आपका कल आज के छोटे निर्णयों पर निर्भर करता है।",
      "शांति आपके भीतर है।",
      "हर दिन नई शुरुआत का अवसर है।",
      "आपकी मुस्कान आपकी सबसे बड़ी जीत है।",
      "परिवर्तन आपके विचारों से शुरू होता है।",
      "आपके प्रयास ही आपकी असली पहचान हैं।",
      "हर मुश्किल के बाद आराम भी आता है।",
      "आपकी उर्जा आपके इरादों में निहित है।",
      "जब आप गिरते हैं, उठ खड़े होना सीखिए।",
      "हार मानना विकल्प नहीं, प्रयास जारी रखें।",
      "आपकी कहानी अभी खत्म नहीं हुई है।",
      "छोटी सफलता भी बड़ी दिशा दिखाती है।",
      "आपकी शांति आपके आत्मविश्वास से आती है।",
      "अपने आप से प्यार कीजिए।",
      "दर्द ही आपकी सबसे बड़ी शिक्षक है।",
      "आपका मन आपका साथी है, नहीं आपका विरोधी।",
      "संघर्ष आपका मार्गदर्शक है।",
      "हर साँस एक नई शुरुआत है।",
      "आपकी सोच आपका संसार बनाती है।",
      "समस्या नहीं समाधान पर ध्यान दें।",
      "आपका आत्म-आलोचना आपका विकास करती है।",
      "सकारात्मक सोच से सकारात्मक परिणाम आते हैं।",
      "आपका आज आपके भविष्य की नींव है।",
      "छोटा कदम बड़े सपने तक ले जाता है।",
      "आपका आत्मविश्वास आपकी सबसे बड़ी पूँजी है।",
      "जहाँ सोच वहाँ रास्ता।",
      "आपका संकल्प आपकी असली परिभाषा है।",
      "हर दिन एक नया अध्याय है।",
      "आपकी खुशी आपके अंदर है।",
      "अंधेरा सिर्फ रोशनी का इंतज़ार है।",
      "उम्मीद कभी मत खोइए।",
      "आपका ध्यान आपके लक्ष्य तक पहुँचाता है।",
      "छोटी जीतें बड़ी जीत का रास्ता बनाती हैं।",
      "आपका मन आपके शरीर का कुंजीपालक है।",
      "जो आपका होता है, वो आपके पास आता है।",
      "शिक्षा अनुभव से आती है।",
      "आपका धैर्य आपका सहारा है।",
      "जब आप शांत होते हैं, तब आप स्पष्ट देख सकते हैं।",
      "आपकी यात्रा आपके कदमों में है।",
      "आत्म-प्रेम ही असली प्रेम है।",
      "हर चुनौती एक अवसर है।",
      "आपका विश्वास आपके सपनों की नींव है।",
    ],
    []
  );

  const getRandomQuote = useCallback(
    () => quotes[Math.floor(Math.random() * quotes.length)],
    [quotes]
  );

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const endRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("saadho-chat-history");
    if (saved) setMessages(JSON.parse(saved));
    else {
      const welcome = "नमस्ते! मैं आपकी मानसिक स्वास्थ्य साथी—Saadho AI हूँ। कैसे आपकी सहायता कर सकता हूँ?";
      const quote = getRandomQuote();
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages([{ from: "ai", text: `${welcome}\n\n“${quote}”`, timestamp }]);
    }
  }, [getRandomQuote]);

  useEffect(() => {
    localStorage.setItem("saadho-chat-history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) return;
    const recog = new SR();
    recog.continuous = false;
    recog.interimResults = true;
    recog.lang = "hi-IN";
    recog.onresult = (e) => setInput(Array.from(e.results).map(r => r[0].transcript).join(""));
    recog.onend = () => setIsListening(false);
    recog.onerror = () => setIsListening(false);
    recognitionRef.current = recog;
    return () => recog.stop();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(prev => [...prev, { from: "user", text: input.trim(), timestamp: time }]);
    setInput("");
    setMessages(prev => [...prev, { from: "typing", text: "", timestamp: "" }]);
    try {
      const res = await fetch("/api/config/gemini", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: input.trim() }) });
      if (!res.ok) throw new Error();
      const { reply } = await res.json();
      const rt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages(prev => prev.filter(m => m.from !== "typing").concat({ from: "ai", text: reply, timestamp: rt }));
    } catch {
      const et = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages(prev => prev.filter(m => m.from !== "typing").concat({ from: "ai", text: "दुर्भाग्यवश, कोई त्रुटि हुई है। कृपया पुनः प्रयास करें।", timestamp: et }));
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const startListening = () => { recognitionRef.current?.start(); setIsListening(true); };
  const stopListening = () => { recognitionRef.current?.stop(); setIsListening(false); };

  const clearChat = () => {
    localStorage.removeItem("saadho-chat-history");
    const welcome = "नमस्ते! मैं आपकी मानसिक स्वास्थ्य साथी—Saadho AI हूँ। कैसे आपकी सहायता कर सकता हूँ?";
    const quote = getRandomQuote();
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([{ from: "ai", text: `${welcome}\n\n“${quote}”`, timestamp }]);
  };

  const exportChat = () => {
    const txt = messages.filter(m => m.from !== "typing").map(m => `${m.from === 'user' ? 'आप' : 'Saadho'}: ${m.text} [${m.timestamp}]`).join("\n\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" }));
    a.download = `chat-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-100">
      <header className="flex items-center justify-between p-4 bg-gray-900 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-indigo-700 flex items-center justify-center text-white text-2xl">🕉️</div>
          <div>
            <h1 className="text-2xl font-bold">Swasthya Saadho AI</h1>
            <p className="text-sm text-gray-400">आपकी मानसिक स्वास्थ्य साथी</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={clearChat} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4-4m0 0l-4 4m4-4v8"/></svg>
            नया चैट
          </button>
          <button onClick={exportChat} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7v14"/></svg>
            निर्यात करें
          </button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-gray-800 space-y-4">
        {messages.map((msg, i) => {
          const user = msg.from === "user";
          const typing = msg.from === "typing";
          const base = "max-w-md px-5 py-3 rounded-xl shadow";
          const style = typing
            ? "bg-gray-700 italic self-start"
            : user
              ? "bg-indigo-600 text-white self-end"
              : "bg-gray-700 text-gray-100 self-start";
          return (
            <div key={i} className={`flex ${user ? "justify-end" : "justify-start"}`}>
              <div className={`${base} ${style}`}>{
                typing
                  ? <span className="animate-pulse">Saadho AI टाइप कर रहा है...</span>
                  : user
                    ? <span>{msg.text}</span>
                    : <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
              }</div>
              {!typing && <div className="text-xs text-gray-500 mt-1 ml-2">{msg.timestamp}</div>}
            </div>
          );
        })}
        <div ref={endRef} />
      </main>

      <footer className="flex items-center p-4 bg-gray-900">
        <button onClick={isListening ? stopListening : startListening} disabled={loading} className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 mr-3">
          {isListening
            ? <span className="block w-5 h-5 bg-white rounded-full animate-pulse"></span>
            : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v6m0 4v4m0 4v2m-3-2h6"/></svg>
          }
        </button>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          disabled={loading}
          placeholder="अपना संदेश टाइप करें..."
          className="flex-1 px-4 py-2 bg-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100"
          rows={1}
        />
        <button onClick={handleSend} disabled={!input.trim() || loading} className="ml-3 px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition">
          {loading ? 'भेज रहे...' : 'भेजें'}
        </button>
      </footer>
    </div>
  );
}