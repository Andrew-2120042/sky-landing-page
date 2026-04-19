"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Navigation, MousePointer2, Bot, Mail, Calendar, Video, MessageSquare, ShoppingCart, FileText, Search, Brain, Zap, Briefcase, Clock, Music, Folder, MessageCircle, Reply, Menu } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <ScrollText />
        <StickyCardsSection />
        <CapabilitiesSection />
      </main>
      <Footer />
    </div>
  );
}

function NavBar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  return (
    <>
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isScrolled ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur z-40 flex items-center justify-between px-6 lg:px-10"
      >
        <div className="flex items-center gap-10 lg:gap-16">
          <div className="text-3xl font-bold tracking-[-0.04em] text-black">Sky</div>
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#5c5c5c]">
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="/waitlist" className="bg-black text-white text-[15px] font-medium px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
            Join waitlist
          </a>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 24, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-6 lg:right-10 z-50 flex items-center gap-3"
          >
            <a href="/waitlist" className="bg-[#111111] hover:bg-black text-white text-[15px] font-bold px-7 h-12 flex flex-col justify-center rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/5 transition-colors">
              Join waitlist
            </a>
            <button className="w-12 h-12 bg-[#111111] hover:bg-black flex items-center justify-center rounded-full text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/5 transition-colors">
              <Menu size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  return (
    <section className="pt-40 pb-20 w-full flex flex-col items-center text-center relative overflow-hidden bg-[#FAFAFA]">
      {/* Ambient Studio Lighting Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[180%] max-w-[1200px] aspect-square bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_70%)] pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[150%] max-w-[1000px] aspect-square bg-[radial-gradient(circle_at_center,rgba(179,146,248,0.08)_0%,rgba(255,255,255,0)_60%)] pointer-events-none z-0 mix-blend-plus-lighter" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center w-full">
        <h1 className="text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[0.9] font-bold tracking-[-0.04em] max-w-[55rem] mx-auto text-[#0A0A0A] mt-8 mb-24 drop-shadow-sm">
          Your Mac finally does<br />what you tell it to.
        </h1>

        <div className="w-full max-w-6xl mx-auto aspect-[16/9] bg-black rounded-[24px] overflow-hidden relative shadow-[0_30px_80px_rgba(0,0,0,0.12)] border border-gray-100 flex items-center justify-center group mt-4">
          <video 
            src="/demo2.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function ScrollText() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const text = "Press Option+Space. Say what you want. Walk away. Sky is a Mac agent that actually does your digital errands, ordering, cancelling, emailing, booking, completely in the background while you work.";
  const words = text.split(" ");

  return (
    <section className="py-40 px-6 max-w-[65rem] mx-auto min-h-[120vh] flex flex-col justify-center items-start">
      <h2 ref={containerRef} className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-left">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </h2>
    </section>
  );
}

function Word({ children, progress, range }: { children: string, progress: any, range: [number, number] }) {
  const color = useTransform(progress, range, ["#e5e5e5", "#111111"]);
  return (
    <motion.span style={{ color }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

function EditorPlaceholder() {
  return (
    <section className="py-20 px-6 max-w-[75rem] mx-auto">
      <div className="w-full aspect-[16/10] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xl relative">
         <div className="h-12 bg-[#2D2D2D] flex items-center px-4 justify-between">
           <div className="flex items-center gap-4 text-white/70">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
               <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
               <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
             </div>
             <Navigation className="w-4 h-4 ml-4 opacity-50" />
             <MousePointer2 className="w-4 h-4 opacity-50" />
           </div>
           
           <div className="text-[13px] font-medium text-white">Showreel Q4</div>
           
           <div className="flex items-center gap-4">
             <div className="text-[13px] font-medium text-white/70 hover:text-white cursor-pointer mr-2">Preview</div>
             <button className="bg-brand-purple text-black text-[13px] font-semibold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity bg-[#B392F8]">
               Try for free
             </button>
           </div>
         </div>
         
         <div className="flex h-[calc(100%-3rem)] bg-white text-black">
           <div className="w-60 border-r border-gray-200 p-4 shrink-0 flex flex-col gap-1 overflow-y-auto">
             <div className="text-xs font-bold text-gray-400 mb-2 px-2 uppercase tracking-wider">Layers</div>
             {Array.from({length: 8}).map((_, i) => (
                <div key={i} className="h-7 w-full flex items-center gap-2 rounded hover:bg-[#F2F2F2] px-2 text-[13px] text-gray-700 cursor-default">
                  <div className="w-3 h-3 border border-gray-300 rounded-sm" /> Artboard {i + 1}
                </div>
             ))}
           </div>
           
           <div className="flex-1 bg-[#F5F5F5] flex flex-col items-center p-8 relative overflow-hidden">
             <div className="w-full max-w-xl aspect-[4/3] bg-white rounded shadow-sm border border-gray-200 flex flex-col mt-4">
                 <div className="grid grid-cols-3 gap-4 p-8 flex-1 content-center">
                     {Array.from({length: 9}).map((_, i) => (
                         <div key={i} className={`aspect-square w-full rounded bg-gray-50 border border-gray-100 shadow-sm flex items-center justify-center font-bold text-gray-300 text-2xl`}>
                             A{i+1}
                         </div>
                     ))}
                 </div>
             </div>
             
             <div className="absolute bottom-0 left-0 right-0 h-44 bg-white border-t border-gray-200 flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                 <div className="h-8 border-b border-gray-100 flex items-end">
                    {Array.from({length: 20}).map((_, i) => (
                        <div key={i} className="flex-1 border-l border-gray-200 h-2" />
                    ))}
                 </div>
                 <div className="flex-1 p-3 overflow-y-auto space-y-2">
                    <div className="h-6 w-[30%] bg-[#B392F8] rounded-md relative flex items-center text-[11px] text-black font-medium px-2 shadow-sm">Layer 1</div>
                    <div className="h-6 w-[25%] bg-[#EBE5FA] text-[#9F75F6] border border-[#B392F8]/30 rounded-md ml-[15%] relative flex items-center text-[11px] font-medium px-2">Layer 2</div>
                    <div className="h-6 w-[20%] bg-[#EBE5FA] text-[#9F75F6] border border-[#B392F8]/30 rounded-md ml-[40%] relative flex items-center text-[11px] font-medium px-2">Layer 3</div>
                 </div>
             </div>
           </div>

           <div className="w-72 border-l border-gray-200 shrink-0 bg-white flex flex-col">
             <div className="flex border-b border-gray-200">
                <div className="flex-1 text-center py-3 text-[13px] font-semibold text-black border-b-2 border-black -mb-[1px]">Design</div>
                <div className="flex-1 text-center py-3 text-[13px] font-medium text-gray-500 hover:text-black cursor-pointer">Animate</div>
             </div>
             <div className="p-5 space-y-8">
               <div>
                  <div className="text-[13px] font-semibold text-black mb-3">Move</div>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="h-9 bg-gray-50 rounded border border-gray-200 flex items-center justify-between px-3 text-[13px]">
                        <span className="text-gray-400">X</span>
                        <span className="font-semibold">40</span>
                     </div>
                     <div className="h-9 bg-gray-50 rounded border border-gray-200 flex items-center justify-between px-3 text-[13px]">
                        <span className="text-gray-400">Y</span>
                        <span className="font-semibold">0</span>
                     </div>
                  </div>
               </div>
               <div>
                  <div className="text-[13px] font-semibold text-black mb-3">Animation</div>
                  <div className="space-y-3 border border-gray-200 rounded-lg p-3 bg-gray-50/50">
                     <div className="flex justify-between items-center text-[13px]">
                        <span className="text-gray-500">Duration</span>
                        <span className="font-semibold">100ms</span>
                     </div>
                     <div className="flex justify-between items-center text-[13px]">
                        <span className="text-gray-500">Easing</span>
                        <span className="font-semibold">Natural</span>
                     </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-2 mt-2">
                 <div className="aspect-square bg-[#2c2c2c] rounded-lg p-3 flex flex-col justify-end text-[#a0a0a0] hover:text-white transition-colors cursor-pointer text-xs font-medium">
                   <div className="w-full h-full pb-2 flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M10.75 6.25l-2.5 5.5h7.5l-2.5 5.5"></path></svg>
                   </div>
                   Slow down
                 </div>
                 <div className="aspect-square bg-[#2c2c2c] rounded-lg p-3 flex flex-col justify-end text-[#a0a0a0] hover:text-white transition-colors cursor-pointer text-xs font-medium">
                   <div className="w-full h-full pb-2 flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M12 17v-6"></path><path d="M8 13l4-4 4 4"></path></svg>
                   </div>
                   Accelerate
                 </div>
               </div>
             </div>
           </div>
         </div>
      </div>
    </section>
  );
}


function StickyCardsSection() {
  return (
    <section className="py-32 px-6 max-w-[85rem] mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
        {/* Sticky Left Column */}
        <div className="lg:w-[40%] lg:sticky lg:top-40 shrink-0">
          <div className="inline-block bg-[#F5F5F5] rounded-full px-5 py-2 mb-8 text-[14px] font-semibold text-black">
            It acts, not just answers.
          </div>
          <h2 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-bold tracking-[-0.03em] leading-[1.05] text-black mb-8">
            Built for how you<br />actually work
          </h2>
          <p className="text-xl md:text-[22px] text-gray-500 leading-[1.6]">
            <strong className="text-black font-semibold">Every other AI tool tells you how to do things. Sky just does them.</strong> Send the mail, cancel the order, join the meeting — no app switching, no copy-pasting.
          </p>
        </div>

        {/* Scrolling Right Column (Cards) */}
        <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          <div className="flex flex-col gap-6">
            <div className="aspect-[4/5] bg-gradient-to-br from-[#1C1C1E] to-[#0A0A0A] rounded-xl flex items-center justify-center overflow-hidden w-full relative p-4 border border-white/5 shadow-inner">
               {/* Faux Background Apps */}
               <div className="absolute w-[120%] h-[50%] -top-4 -left-6 bg-white/5 border border-white/10 rounded-2xl blur-[2px] opacity-10 -rotate-6" />
               <div className="absolute w-[90%] h-[60%] -bottom-6 -right-4 bg-white/5 border border-white/10 rounded-2xl blur-[3px] opacity-10 rotate-3" />
               
               {/* Native macOS Notification */}
               <div className="w-[95%] bg-[#242426]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-[18px] p-3 z-10 flex gap-3">
                   {/* App Icon */}
                   <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-b from-[#B392F8] to-[#6039BB] flex items-center justify-center shrink-0 shadow-sm border border-white/10">
                       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center drop-shadow-md">
                           <div className="w-1.5 h-1.5 bg-black rounded-full" />
                       </div>
                   </div>
                   {/* Push Content */}
                   <div className="flex flex-col gap-0.5 justify-center mt-0.5 w-full">
                       <div className="flex justify-between items-center pr-1">
                           <span className="text-[13px] font-bold text-white tracking-wide">Sky</span>
                           <span className="text-[11px] font-medium text-white/40">now</span>
                       </div>
                       <span className="text-[13px] font-bold text-white mt-0.5">Meeting cancelled.</span>
                       <span className="text-[12px] font-medium text-white/60 leading-snug">I emailed Sarah and removed it from your calendar.</span>
                   </div>
               </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-3">Invisible background execution.</h3>
              <p className="text-[17px] text-gray-500 leading-relaxed font-medium">
                Sky works completely invisibly. You say what you need, Sky handles it behind the scenes. Get a notification when it's done. That's it.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 pt-12 md:pt-0">
            <div className="aspect-[4/5] bg-[#FAFAFA] rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden w-full p-8 relative group">
               <div className="w-full max-w-[200px] bg-white shadow-2xl rounded-[16px] border border-gray-100 p-4 flex flex-col gap-3 relative overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
                  {/* macOS Spotlight/Command Bar Mockup */}
                  <div className="w-full h-8 bg-gray-100 rounded-lg flex items-center px-3 mb-2 border border-gray-200/50">
                     <Search className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
                     <div className="w-16 h-1.5 bg-gray-300 rounded-full" />
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50/80 rounded-lg border border-blue-100">
                     <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center shrink-0 shadow-sm"><Calendar className="w-3 h-3 text-white" /></div>
                     <div className="w-12 h-1.5 bg-blue-300 rounded-full" />
                  </div>
                  <div className="flex items-center gap-3 p-2">
                     <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center shrink-0 shadow-sm"><MessageSquare className="w-3 h-3 text-white" /></div>
                     <div className="w-16 h-1.5 bg-gray-200 rounded-full" />
                  </div>
               </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-3">Deeply native macOS.</h3>
              <p className="text-[17px] text-gray-500 leading-relaxed font-medium">
                Not an Electron app. Not a browser extension. Built in Swift, speaks to your Calendar, Mail, Contacts, and any app on screen — natively.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="aspect-[4/5] bg-gradient-to-br from-[#E6F3FF] to-[#DDF1FF] rounded-xl border border-[#c4e6ff] flex flex-col items-center justify-center overflow-hidden w-full relative group">
               <div className="w-[85%] h-[75%] bg-white rounded-xl shadow-2xl p-5 flex flex-col relative group-hover:scale-[1.03] transition-transform duration-500 border border-white/50">
                  {/* Webpage Context Mock */}
                  <div className="flex gap-1.5 mb-6">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                  </div>
                  
                  {/* Text selection effect */}
                  <div className="space-y-3 relative mt-2 pl-2 border-l-2 border-gray-100">
                     <div className="w-full h-2 bg-blue-100 rounded-r-full" />
                     <div className="w-[90%] h-2 bg-blue-100 rounded-r-full" />
                     <div className="w-[60%] h-2 bg-blue-100 rounded-r-full relative">
                        {/* Summary Sparkle Tooltip */}
                        <div className="absolute -right-6 -top-8 bg-[#111111] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                           <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Summarize
                        </div>
                     </div>
                  </div>
                  <div className="w-2/3 h-2 bg-gray-100 rounded-full mt-6" />
               </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-3">Screen context built in.</h3>
              <p className="text-[17px] text-gray-500 leading-relaxed font-medium">
                Open a webpage and say summarize this. Select text and say make bullet points. Sky reads what's on screen so you never have to copy-paste context manually.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 pt-12 md:pt-0">
            <div className="aspect-[4/5] bg-[#E1FF00] rounded-xl flex items-center justify-center overflow-hidden w-full relative group p-8">
               <div className="w-full aspect-square max-w-[180px] bg-white rounded-[24px] shadow-2xl flex items-center justify-center overflow-hidden relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] border border-white/50">
                  {/* Image Grid Mock */}
                  <div className="absolute inset-0 grid grid-cols-2 gap-2 p-3 opacity-40">
                     <div className="bg-gray-100 rounded-xl" />
                     <div className="bg-gray-200 rounded-xl" />
                     <div className="bg-gray-200 rounded-xl" />
                     <div className="bg-gray-100 rounded-xl" />
                  </div>
                  {/* Glowing Search Ring */}
                  <div className="w-[72px] h-[72px] rounded-full bg-[#E1FF00] shadow-[0_0_40px_rgba(225,255,0,0.8)] flex items-center justify-center z-10 border-2 border-white">
                     <Search className="w-7 h-7 text-black" strokeWidth={2.5} />
                  </div>
               </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-3">Find anything you've ever seen.</h3>
              <p className="text-[17px] text-gray-500 leading-relaxed font-medium">
                Press ⌘F inside Sky. Type any word. Sky searches every screenshot on your Mac using on-device OCR — completely private, completely instant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const capabilities = [
  { icon: Mail, title: "Send email in any tone", body: "Say what you want to say. Sky rewrites it formally, casually, or apologetically — with subject, greeting, and sign-off." },
  { icon: Calendar, title: "Create events and reminders", body: "Natural language scheduling. Sky adds it to your Calendar or Reminders without you opening any app." },
  { icon: Video, title: "Join meetings automatically", body: "Say join my 4pm meeting. Sky finds the link in your calendar and opens it at the right time." },
  { icon: MessageSquare, title: "Text and call anyone", body: "Send iMessages or start calls by name. Sky finds the contact and handles it." },
  { icon: ShoppingCart, title: "Order and cancel online", body: "Amazon, Flipkart, and more — Sky navigates the checkout invisibly and places the order while you work." },
  { icon: MousePointer2, title: "Click anything on screen", body: "Sky reads every element on your Mac and can click, type, or navigate any app — natively." },
  { icon: FileText, title: "Summarize what's on screen", body: "Open any page, file, or email and say summarize this. Sky reads the content and gives you the key points." },
  { icon: Search, title: "Search your screenshots", body: "Press ⌘F. Type any word you remember seeing. Sky finds the exact screenshot instantly using on-device OCR." },
  { icon: Brain, title: "Remembers what you tell it", body: "Tell Sky who your boss is, your address, your preferences. It uses that context in every future command." },
  { icon: Zap, title: "Run multi-step flows", body: "Chain actions together. Open Zoom, click join, turn camera off — all from one sentence." },
  { icon: Briefcase, title: "Custom skills", body: "Describe a flow in plain English and Sky turns it into a repeatable skill. No code, no setup." },
  { icon: Clock, title: "Schedule anything", body: "Send that email at 9am. Set a weekly reminder. Sky runs it automatically at the right time." },
  { icon: Music, title: "Control your music", body: "Play, pause, skip, or search for a specific song or playlist. Works with Spotify and Apple Music." },
  { icon: Folder, title: "Find any file", body: "Ask Sky to find the PDF from last week or the deck you worked on in March. It searches your whole Mac." },
  { icon: MessageCircle, title: "Ask follow-up questions", body: "After every action a chat button appears. Ask what Sky just did, request changes, or dig deeper." },
  { icon: Reply, title: "Reply to open emails", body: "Sky reads the email you have open and drafts a reply in whatever tone you choose." }
];

function CapabilitiesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="pt-32 pb-16 w-full overflow-hidden">
      <div className="flex flex-col items-center text-center mb-16 px-6 max-w-[1100px] mx-auto">
        <div className="text-[13px] font-bold tracking-wider text-gray-500 uppercase mb-4">
          Capabilities
        </div>
        <h2 className="text-[3rem] md:text-[4.5rem] font-bold tracking-[-0.03em] leading-[1.05] text-black mb-6">
          Everything your Mac<br />should have always done.
        </h2>
        <p className="text-xl text-gray-500 font-medium">
          One hotkey. Plain English. Sky handles the rest.
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex pb-12 pt-4 group">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 12px)); }
          }
          .animate-marquee {
            animation: marquee 60s linear infinite;
          }
          .group:hover .animate-marquee {
            animation-play-state: paused;
          }
        `}} />
        <div className="flex w-max gap-6 animate-marquee px-3">
          {[...capabilities, ...capabilities].map((item, index) => {
             const i = index % capabilities.length;
             const Icon = item.icon;
             const themeStyles = [
               {
                 card: "bg-[#F5F5F5] border-transparent text-black", 
                 mockupBox: "bg-white shadow-sm border border-gray-100",
                 titleBlock: "bg-white text-black",
                 body: "text-gray-500"
               },
               {
                 card: "bg-[#F0F4F8] border-transparent text-black", // Subtly cool blue-gray
                 mockupBox: "bg-white shadow-sm border border-gray-100",
                 titleBlock: "bg-black text-white",
                 body: "text-gray-500"
               },
               {
                 card: "bg-[#FCF5FA] border-transparent text-black", // Subtly warm purple
                 mockupBox: "bg-white shadow-sm border border-gray-100",
                 titleBlock: "bg-white text-black",
                 body: "text-gray-500"
               },
               {
                 card: "bg-white border-gray-100 text-black", // Clean white
                 mockupBox: "bg-[#FAFAFA] border border-gray-100",
                 titleBlock: "bg-black text-white",
                 body: "text-gray-500"
               },
               {
                 card: "bg-[#111111] border-transparent text-white", // Deep dark
                 mockupBox: "bg-[#1A1A1A] border border-white/5",
                 titleBlock: "bg-[#222222] text-white",
                 body: "text-gray-400"
               }
             ];
             const theme = themeStyles[i % themeStyles.length];
             
             return (
               <div 
                 key={index}
                 className={`rounded-[32px] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 w-[320px] md:w-[400px] h-[480px] md:h-[540px] shrink-0 flex flex-col border border-transparent ${theme.card}`}
               >
                  <div className="p-6 md:p-8 pb-0 flex flex-col h-[55%] md:h-[60%]">
                     <div className={`w-full h-full rounded-[20px] flex items-center justify-center transition-transform hover:scale-[1.02] duration-500 shadow-sm ${theme.mockupBox}`}>
                        <Icon size={48} strokeWidth={1} className={theme.card.includes('text-white') ? 'text-white' : 'text-black'} />
                     </div>
                  </div>

                  <div className="px-6 md:px-8 pb-8 pt-8 flex flex-col items-start flex-1 justify-end">
                     <div className={`text-[18px] font-bold px-3 py-1.5 mb-4 leading-none tracking-tight rounded-[6px] inline-block shadow-sm ${theme.titleBlock}`}>
                       {item.title}
                     </div>
                     <p className={`text-[16px] leading-[1.5] font-medium pr-2 ${theme.body}`}>
                       {item.body}
                     </p>
                  </div>
               </div>
             );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pt-32 pb-32 px-6 lg:px-20 mx-auto w-full bg-[#111111] text-white rounded-t-[3rem] lg:rounded-t-[5rem] mt-24">
      <div className="flex flex-col items-center text-center mb-32 max-w-4xl mx-auto">
        <h2 className="text-[5rem] md:text-[7.5rem] leading-[0.95] font-bold tracking-[-0.05em] text-white mb-8">
          Get Sky today
        </h2>
        <p className="text-xl md:text-[22px] text-white font-medium leading-[1.4] mb-12">
          Your Mac was always capable of this. Sky just makes it listen.
        </p>
        <a href="/waitlist" className="bg-white hover:bg-gray-200 text-black text-lg font-semibold px-10 py-4 rounded-full transition-colors inline-block">
          Join waitlist
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 max-w-[90rem] mx-auto border-t border-white/10 pt-16">
        <div className="col-span-1">
          <h4 className="font-bold text-white mb-8">Product</h4>
          <ul className="space-y-4 text-[15px] text-gray-400 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Import from Figma</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Design</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Animate</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Collaborate</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Export</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-bold text-white mb-8">Templates</h4>
          <ul className="space-y-4 text-[15px] text-gray-400 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Devices</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Text animations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Logos</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Animated icons</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Charts</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Animated websites</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Buttons</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-bold text-white mb-8">Resources</h4>
          <ul className="space-y-4 text-[15px] text-gray-400 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Join our Discord ↗</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Documentation ↗</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tutorials ↗</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hire an expert ↗</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Figma animations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Lottie animations</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-bold text-white mb-8">Company</h4>
          <ul className="space-y-4 text-[15px] text-gray-400 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Customers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms & conditions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">AI Manifesto</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers ↗</a></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h4 className="font-bold text-white mb-8">Connect</h4>
          <ul className="space-y-4 text-[15px] text-gray-400 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Contact sales</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
