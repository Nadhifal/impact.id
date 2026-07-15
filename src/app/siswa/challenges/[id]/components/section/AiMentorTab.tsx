"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Brain, Send, Smile, Plus, Sparkles, BookOpen } from "lucide-react";
import { Card } from "@/app/shared/components/ui/card";
import { initialChatMessages, ChatMessage } from "../../data";

export function AiMentorTab() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chips = [
    "Simulasi pertanyaan 1",
    "Tips menjawab waste management",
    "Contoh lainnya"
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      initials: "JD"
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);
    try {
      const response = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      
      const data = await response.json();
      setIsTyping(false);
      
      if (!response.ok) {
        throw new Error(data.error || "Gagal mendapatkan respons dari AI");
      }

      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.reply || "Maaf, respon AI Mentor tidak dapat dimuat.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error: any) {
      console.error("AI Mentor error:", error);
      setIsTyping(false);
      
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: "Maaf, terjadi kesalahan saat menghubungi AI Mentor: " + error.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Active Challenge Module Map */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="bg-white border border-zinc-100 shadow-md p-6 rounded-2xl space-y-6">
          <div className="space-y-2">
            <span className="bg-emerald-50 text-emerald-600 text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider block w-fit">
              ACTIVE CHALLENGE
            </span>
            <span className="text-[10px] text-zinc-400 font-bold block">Updated 2h ago</span>
            <h3 className="text-base font-extrabold text-slate-800 leading-snug">
              Professional UMKM Operations: Coffee Shop Specialist
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Prepare for high-level operational roles in local business ecosystems. Focus on waste management, supplier reliability, and workflow optimization.
            </p>
          </div>

          {/* Module timeline blocks */}
          <div className="space-y-4 pt-4 border-t border-zinc-50">
            <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest block">
              MODULES
            </h4>

            {/* Module 1 */}
            <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-200/50 flex items-center justify-center shrink-0">
                <BookOpen className="w-4.5 h-4.5 text-zinc-500" />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-slate-700">Supply Chain Basics</h5>
                <p className="text-[9px] text-zinc-400 font-bold">5 Tasks • Completed</p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="p-4 bg-[#EEEDFE]/40 border border-[#EEEDFE] rounded-xl flex items-center gap-3 ring-2 ring-[#584FBC]/10">
              <div className="w-8 h-8 rounded-lg bg-[#584FBC]/15 flex items-center justify-center shrink-0">
                <Brain className="w-4.5 h-4.5 text-[#584FBC]" />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-[#584FBC]">Interview Simulation</h5>
                <p className="text-[9px] text-[#584FBC]/75 font-bold">Current Module</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Resources banner card */}
        <Card className="bg-white border border-zinc-100 shadow-md overflow-hidden rounded-2xl flex flex-col justify-end min-h-[160px] p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-zinc-200 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=250&q=80')] bg-cover bg-center" />
          
          <div className="relative z-20 space-y-1">
            <h4 className="text-sm font-extrabold text-white">Resource Library Access</h4>
          </div>
        </Card>
      </div>

      {/* Right Column: AI Chat Container */}
      <Card className="lg:col-span-8 bg-white border border-zinc-100 shadow-md rounded-3xl flex flex-col justify-between overflow-hidden min-h-[600px]">
        {/* Chat Header */}
        <div className="px-6 py-4 bg-zinc-50/50 border-b border-zinc-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#584FBC] text-white flex items-center justify-center">
              <Brain className="w-4.5 h-4.5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">AI Mentor</h3>
              <p className="text-[10px] text-zinc-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Mentor is online
              </p>
            </div>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 max-h-[420px] scrollbar-none bg-white">
          <div className="flex justify-center">
            <span className="bg-zinc-100 text-zinc-500 text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider">
              HARI INI
            </span>
          </div>

          {messages.map((msg) => {
            const isAi = msg.sender === "ai";
            return (
              <div
                key={msg.id}
                className={`flex gap-4 max-w-[85%] ${
                  isAi ? "mr-auto items-start" : "ml-auto flex-row-reverse items-start text-right"
                }`}
              >
                {/* Avatar / Initials */}
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-sm text-xs font-bold ${
                  isAi ? "bg-[#584FBC] text-white" : "bg-zinc-200 text-slate-700"
                }`}>
                  {isAi ? <Brain className="w-4.5 h-4.5 fill-current" /> : msg.initials}
                </div>

                {/* Bubble message */}
                <div className="space-y-1.5">
                  <div className={`p-4 rounded-2xl text-xs font-semibold leading-relaxed ${
                    isAi
                      ? "bg-zinc-50 border border-zinc-100 text-slate-800"
                      : "bg-[#584FBC] text-white"
                  }`}>
                    {msg.text.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                    ))}
                  </div>
                  <span className="text-[9px] text-zinc-400 font-bold block">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-4 max-w-[85%] mr-auto items-start">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-[#584FBC] text-white shadow-sm">
                <Brain className="w-4.5 h-4.5 fill-current" />
              </div>
              <div className="bg-zinc-50 border border-zinc-100 text-slate-800 p-4 rounded-2xl text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Quick replies & Inputs */}
        <div className="p-6 border-t border-zinc-100 bg-zinc-50/20 shrink-0 space-y-4">
          {/* Quick chips */}
          <div className="flex flex-wrap gap-2">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="py-2 px-4 border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-slate-700 text-xs font-bold rounded-full transition-all cursor-pointer shadow-sm flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#584FBC]" />
                {chip}
              </button>
            ))}
          </div>

          {/* Form input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex items-center gap-3 p-3 bg-white border border-zinc-100 rounded-2xl shadow-sm"
          >
            <button
              type="button"
              className="p-2 text-zinc-400 hover:text-slate-600 hover:bg-zinc-50 rounded-xl transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik pesan Anda..."
              className="flex-1 bg-transparent text-xs font-semibold text-slate-800 placeholder-zinc-400 focus:outline-none"
            />
            <button
              type="button"
              className="p-2 text-zinc-400 hover:text-slate-600 hover:bg-zinc-50 rounded-xl transition-all"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="p-3 bg-[#584FBC] hover:bg-[#4940a2] text-white rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-current" />
            </button>
          </form>
          
          <p className="text-[10px] text-zinc-400 text-center font-bold">
            AI Mentor can make mistakes. Consider checking important information.
          </p>
        </div>
      </Card>
    </div>
  );
}
