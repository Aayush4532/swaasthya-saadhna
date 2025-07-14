"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { UserButton } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SaadhoChatPage() {
  const quotes = useMemo(
    () => [
      "जीवन कोई समस्या नहीं, एक अनुभव है। उसे जीओ, सुलझाओ नहीं।",
      "मौन वह उत्तर है, जिसे शब्द कभी दे नहीं सकते।",
      "हर क्षण मृत्यु है, हर क्षण पुनर्जन्म।",
      "जो तुमसे छिन जाए, वह कभी तुम्हारा था ही नहीं।",
      "स्वयं को जानना ही सबसे बड़ी शिक्षा है।",
      "तुम जहाँ हो, वहीं से जीवन शुरू होता है।",
      "जितना कम जानो, उतना शुद्ध देखो।",
      "तुम विचार नहीं हो, तुम उनका साक्षी हो।",
      "जब भीतर शांति हो, बाहर की हलचल व्यर्थ लगती है।",
      "जो स्वीकार कर लेता है, वह मुक्त हो जाता है।",
      "जीवन की गति समझने के लिए रुकना ज़रूरी है।",
      "सब कुछ बदलता है, सिवाय उस 'साक्षी' के जो देख रहा है।",
      "सत्य को पाने के लिए अहंकार को खोना पड़ता है।",
      "मृत्यु डरावनी नहीं, वह तो एक गहन विराम है।",
      "जो बीत गया, वह सपना था। जो आ रहा है, वह भ्रम है। जो है, वही सत्य है।",
      "तर्क अंत तक नहीं ले जाता, मौन वहाँ से शुरू होता है।",
      "समझाने की नहीं, महसूस करने की ज़रूरत है।",
      "असली प्रेम पाने से नहीं, देने से आता है।",
      "ध्यान क्रिया नहीं, स्थिति है।",
      "जब मन शांत होता है, तब जीवन स्पष्ट होता है।",
      "असली क्रांति भीतर घटती है।",
      "ईश्वर की खोज बाहर नहीं, भीतर है।",
      "हर जवाब से पहले एक गहरा प्रश्न होता है।",
      "त्याग कमजोरी नहीं, गहराई का प्रमाण है।",
      "शब्द सीमित हैं, अनुभूति अनंत।",
      "जो खोता है, वही पाता है।",
      "जीवन वह है जो घट रहा है, योजना नहीं।",
      "जहाँ भय है, वहाँ स्वयं नहीं है।",
      "संपत्ति वह नहीं जो जमा की जाए, वह है जो बांटी जाए।",
      "शांति कोई लक्ष्य नहीं, रास्ता है।",
      "सत्य अनिश्चितता में छिपा होता है।",
      "जहाँ प्रेम है, वहाँ द्वंद्व नहीं।",
      "माया को देखना ही मुक्ति की शुरुआत है।",
      "हर दिन मृत्यु है — पुराने का अंत, नए का स्वागत।",
      "ज्ञान जब अहंकार बन जाए, तो अज्ञान बन जाता है।",
      "कभी-कभी सवाल ही उत्तर होते हैं।",
      "जितना भीतर उतरोगे, उतना सरल हो जाओगे।",
      "सांसें गिनो नहीं, समझो।",
      "आत्मा को सिद्ध नहीं करना पड़ता — वह स्वयं सिद्ध है।",
      "समय कोई लकीर नहीं — वह एक बिंदु है।",
      "अहंकार की दीवारें जितनी ऊँची, आत्मा उतनी बंद।",
      "जीवन में स्थिरता नहीं, संतुलन चाहिए।",
      "जो अकेला है, वही सम्पूर्ण हो सकता है।",
      "ज्ञान तब तक अधूरा है, जब तक वह जीवन न बन जाए।",
      "तुम जो खोज रहे हो, वह तुम ही हो।",
      "जीवन समझाया नहीं जा सकता, केवल जिया जा सकता है।",
      "साक्षी होना ही आध्यात्मिकता की शुरुआत है।",
      "मन द्वार है, आत्मा आकाश।",
      "प्रेम में तर्क नहीं, समर्पण होता है।",
      "जो छोड़ देता है, वही सब पा जाता है।",
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
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="/saadho.png"
              className="w-full h-full object-cover scale-180 translate-y-[6px]"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Swasthya Saadho AI</h1>
            <p className="text-sm text-gray-400">आपकी मानसिक स्वास्थ्य साथी</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={clearChat} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4-4m0 0l-4 4m4-4v8" /></svg>
            नया चैट
          </button>
          <button onClick={exportChat} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7v14" /></svg>
            निर्यात करें
          </button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="flex-1 your-scrollable-div overflow-y-auto p-4 bg-gray-800 space-y-4">
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
            : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v6m0 4v4m0 4v2m-3-2h6" /></svg>
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