"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "already_joined">("idle");
  const [count, setCount] = useState<number>(863);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch live waitlist count on mount
    async function fetchCount() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return; // Skip if no DB configured yet
      
      const { count: dbCount, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });
        
      if (!error && dbCount !== null) {
        setCount(863 + dbCount);
      }
    }
    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    setErrorMessage("");
    
    // Incase user hasn't put in keys yet, just simulate success after a delay
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setTimeout(() => {
        setCount(c => c + 1);
        setStatus("success");
      }, 1000);
      return;
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);
      
    if (error) {
      if (error.code === '23505' || error.message?.includes('duplicate')) {
         setStatus("already_joined");
      } else {
         setStatus("error");
         setErrorMessage(error.message || "Something went wrong.");
      }
    } else {
      setCount(c => c + 1);
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-6 text-white text-center rounded-[2rem] m-2 md:m-4 border border-white/10">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <a href="/" className="text-3xl font-bold tracking-[-0.04em] text-white mb-24 opacity-80 hover:opacity-100 transition-opacity">
          Sky
        </a>
        <h1 className="text-[4rem] md:text-[6rem] leading-[0.95] font-bold tracking-[-0.05em] mb-8">
          Join the waitlist
        </h1>
        <p className="text-xl md:text-[22px] font-medium leading-[1.4] text-gray-400 mb-12 max-w-2xl">
          Sky is an intelligent Mac agent that works natively with your apps. We are currently rolling out early access.
        </p>
        
        {(status === "success" || status === "already_joined") ? (
          <div className="w-full max-w-md bg-[#1A1A1A] p-8 rounded-[24px] border border-[#333333] flex flex-col items-center justify-center z-10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#B392F8] to-transparent opacity-80" />
             <div className="w-12 h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-5 shadow-inner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
             <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                {status === "already_joined" ? "You've already joined!" : "You're on the list"}
             </h3>
             <p className="text-gray-400 font-medium text-[15px] text-center">We'll reach out to your email shortly when your spot opens up.</p>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row w-full max-w-md items-center bg-[#1A1A1A] p-2 rounded-full border border-white/10 shadow-2xl relative z-10" onSubmit={handleSubmit}>
             <input 
               type="email" 
               placeholder="Enter your email" 
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               disabled={status === "loading"}
               className="bg-transparent flex-1 px-6 py-4 sm:py-2 text-white outline-none placeholder:text-gray-500 w-full disabled:opacity-50"
             />
             <button type="submit" disabled={status === "loading"} className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-full font-bold text-[15px] hover:bg-gray-200 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[140px]">
                {status === "loading" ? "Joining..." : "Join waitlist"}
             </button>
          </form>
        )}
        
        {status === "error" && (
          <div className="mt-4 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-sm font-medium">
             {errorMessage}
          </div>
        )}

        <div className="mt-12 flex flex-col items-center">
          <p className="text-[15px] text-gray-400 font-medium tracking-wide">
            <strong className="text-white bg-white/10 px-2.5 py-1 rounded-md mr-1">{count.toLocaleString()}</strong> people already joined the wishlist
          </p>
        </div>
      </div>
    </div>
  );
}
