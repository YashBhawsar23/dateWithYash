// import {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   type CSSProperties,
//   type ReactElement,
// } from "react";
// import { CAT_IMAGES } from "./data/catImages";
// import "./styles/dateAsk.css";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface FloatingEmoji {
//   id: number;
//   emoji: string;
//   left: string;
//   fontSize: string;
//   duration: string;
//   delay: string;
// }

// interface ConfettiPiece {
//   id: number;
//   left: string;
//   color: string;
//   width: string;
//   height: string;
//   borderRadius: string;
//   duration: string;
//   delay: string;
// }

// interface NoBtnPosition {
//   left: number;
//   top: number;
// }

// // ─── Constants ────────────────────────────────────────────────────────────────

// const MAX_RUNAWAY = 4;

// const MESSAGES: string[] = [
//   "Will you go on a date with me? 🌸",
//   "Are you sure? I'm really fun, I promise! 🥺",
//   "Come onnn, it'll be SO much fun! 🙈",
//   "Last chance... I'll bring your favourite food! 🍕😇",
//   "Okay fine... but the Yes button misses you! 💔",
//   "The Yes button won't stop growing until you click it... 👀",
// ];

// const YES_SCALES: number[] = [1.0, 1.3, 1.6, 2.0, 2.5, 3.0];
// const BG_EMOJIS: string[] = ["💗", "💖", "💕", "💞", "🌸", "✨", "🦋", "🍓"];
// const CONFETTI_COLORS: string[] = [
//   "#ff6b9d", "#fde68a", "#6ee7b7", "#c084fc",
//   "#ff3d7f", "#38bdf8", "#fb923c",
// ];

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function randomBetween(min: number, max: number): number {
//   return min + Math.random() * (max - min);
// }

// function generateFloatingEmojis(count: number): FloatingEmoji[] {
//   return Array.from({ length: count }, (_, i) => ({
//     id: i,
//     emoji: BG_EMOJIS[Math.floor(Math.random() * BG_EMOJIS.length)],
//     left: `${randomBetween(0, 100)}vw`,
//     fontSize: `${randomBetween(1, 2.8)}rem`,
//     duration: `${randomBetween(6, 18)}s`,
//     delay: `${randomBetween(0, 12)}s`,
//   }));
// }

// function generateConfetti(count: number): ConfettiPiece[] {
//   return Array.from({ length: count }, (_, i) => ({
//     id: i,
//     left: `${randomBetween(0, 100)}vw`,
//     color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
//     width: `${randomBetween(6, 14)}px`,
//     height: `${randomBetween(6, 14)}px`,
//     borderRadius: Math.random() > 0.5 ? "50%" : "2px",
//     duration: `${randomBetween(1.5, 4)}s`,
//     delay: `${randomBetween(0, 1.2)}s`,
//   }));
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function FloatingBackground(): ReactElement {
//   const [emojis] = useState<FloatingEmoji[]>(() => generateFloatingEmojis(20));
//   return (
//     <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
//       {emojis.map((e) => (
//         <span key={e.id} style={{
//           position: "absolute", fontSize: e.fontSize, left: e.left, bottom: "-10vh",
//           opacity: 0.18, animation: `floatUp ${e.duration} ${e.delay} linear infinite`,
//         }}>
//           {e.emoji}
//         </span>
//       ))}
//     </div>
//   );
// }

// function ConfettiLayer({ pieces }: { pieces: ConfettiPiece[] }): ReactElement {
//   return (
//     <>
//       {pieces.map((p) => (
//         <div key={p.id} style={{
//           position: "fixed", top: "-12px", left: p.left, width: p.width, height: p.height,
//           background: p.color, borderRadius: p.borderRadius, pointerEvents: "none", zIndex: 999,
//           animation: `confettiFall ${p.duration} ${p.delay} linear forwards`,
//         }} />
//       ))}
//     </>
//   );
// }

// function YesScreen(): ReactElement {
//   return (
//     <div style={{
//       display: "flex", flexDirection: "column", alignItems: "center",
//       gap: "12px", animation: "yesIn 0.7s cubic-bezier(.34,1.56,.64,1) both",
//     }}>
//       <p style={{ fontSize: "1.1rem", color: "#9333ea", fontWeight: 700, marginBottom: "0px" }}>
//         Knew you would say yes! 😏💕
//       </p>
//       {/* Tenor GIF */}
//       <img
//         src="https://media.tenor.com/eNHbizSfVb0AAAAj/lovemode-cute.gif"
//         alt="love mode cats"
//         style={{
//           width: "min(280px, 70vw)",
//           height: "auto",
//           borderRadius: "24px",
//           filter: "drop-shadow(0 6px 24px rgba(255,107,157,0.40))",
//           animation: "spinPop 0.8s cubic-bezier(.34,1.56,.64,1) both",
//         }}
//       />
//       <h2 style={{
//         fontFamily: "'Pacifico', cursive", fontSize: "2rem", color: "#ff3d7f",
//         textShadow: "0 2px 12px rgba(255,61,127,0.18)",
//       }}>
//         YAY!!! 🥳💕
//       </h2>
//       <p style={{ color: "#a21caf", fontSize: "0.98rem", fontWeight: 700 }}>
//         Get ready for the most magical date! 💌
//       </p>
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function DateAsk(): ReactElement {
//   const [noCount, setNoCount] = useState<number>(0);
//   const [msgKey, setMsgKey] = useState<number>(0);
//   const [isShaking, setIsShaking] = useState<boolean>(false);
//   const [saidYES, setSaidYES] = useState<boolean>(false);
//   const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
//   const [noPos, setNoPos] = useState<NoBtnPosition | null>(null);

//   const cardRef = useRef<HTMLDivElement>(null);
//   const noBtnRef = useRef<HTMLButtonElement>(null);
//   const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     return () => {
//       if (shakeTimer.current) clearTimeout(shakeTimer.current);
//     };
//   }, []);

//   // ── Derived values ──────────────────────────────────────────────────────────
//   const msgIndex = Math.min(noCount, MESSAGES.length - 1);
//   // Cat image cycles: 0→Cat1(shy), 1→Cat2(pleading), 2→Cat3(heart), 3→Cat5(love), 4+→Cat4(kiss)
//   const catImgOrder = [0, 1, 2, 4, 3];
//   const catImgIndex = CAT_IMAGES[catImgOrder[Math.min(noCount, catImgOrder.length - 1)]];
//   const yesScale = YES_SCALES[Math.min(noCount, YES_SCALES.length - 1)];
//   const isRunaway = noCount >= MAX_RUNAWAY;

//   // ── Handlers ────────────────────────────────────────────────────────────────

//   const handleNo = useCallback((): void => {
//     setNoCount((n) => n + 1);
//     setMsgKey((k) => k + 1);
//     if (shakeTimer.current) clearTimeout(shakeTimer.current);
//     setIsShaking(true);
//     shakeTimer.current = setTimeout(() => setIsShaking(false), 520);
//   }, []);

//   const handleYes = useCallback((): void => {
//     setSaidYES(true);
//     setConfetti(generateConfetti(90));
//   }, []);

//   const moveNoBtn = useCallback((): void => {
//     if (!cardRef.current || !noBtnRef.current) return;
//     const cardRect = cardRef.current.getBoundingClientRect();
//     const btnRect = noBtnRef.current.getBoundingClientRect();

//     const paddingX = 10;
//     const paddingY = 10;
//     const maxLeft = cardRect.width - btnRect.width - paddingX;
//     const maxTop = cardRect.height - btnRect.height - paddingY;

//     const currentLeft = noPos?.left ?? cardRect.width / 2;
//     const currentTop  = noPos?.top  ?? cardRect.height * 0.75;

//     let attempts = 0;
//     let newLeft: number = 0, newTop: number = 0;
//     do {
//       newLeft = paddingX + Math.random() * maxLeft;
//       newTop  = paddingY + Math.random() * maxTop;
//       attempts++;
//     } while (
//       attempts < 10 &&
//       Math.abs(newLeft - currentLeft) < cardRect.width * 0.35 &&
//       Math.abs(newTop  - currentTop)  < cardRect.height * 0.25
//     );

//     setNoPos({ left: newLeft, top: newTop });
//   }, [noPos]);

//   useEffect(() => {
//     if (confetti.length === 0) return;
//     const maxDuration = Math.max(...confetti.map((p) =>
//       parseFloat(p.duration) + parseFloat(p.delay)
//     )) * 1000 + 300;
//     const t = setTimeout(() => setConfetti([]), maxDuration);
//     return () => clearTimeout(t);
//   }, [confetti]);

//   // ── Styles ──────────────────────────────────────────────────────────────────

//   const yesBtnStyle: CSSProperties = {
//     fontFamily: "'Nunito', sans-serif", fontWeight: 800, border: "none",
//     borderRadius: "50px", cursor: "pointer",
//     letterSpacing: "0.5px", whiteSpace: "nowrap",
//     background: "linear-gradient(135deg, #ff6b9d, #ff3d7f)", color: "white",
//     fontSize: `${1.1 * yesScale}rem`,
//     padding: `${14 * Math.min(yesScale, 1.8)}px ${36 * Math.min(yesScale, 2.2)}px`,
//     boxShadow: `0 ${4 * yesScale}px ${20 * yesScale}px rgba(255,61,127,${0.35 + noCount * 0.06})`,
//     transition: "transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s, font-size 0.35s cubic-bezier(.34,1.56,.64,1), padding 0.35s",
//   };

//   const noBtnStyle: CSSProperties = {
//     fontFamily: "'Nunito', sans-serif", fontWeight: 800, border: "none",
//     borderRadius: "50px", cursor: isRunaway ? "default" : "pointer",
//     letterSpacing: "0.5px", whiteSpace: "nowrap",
//     background: "linear-gradient(135deg, #e0e0e0, #bdbdbd)", color: "#666",
//     fontSize: "0.95rem", padding: "12px 28px",
//     boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
//     transition: isRunaway ? "left 0.12s ease, top 0.12s ease" : undefined,
//     ...(noPos !== null ? { position: "absolute" as const, left: `${noPos.left}px`, top: `${noPos.top}px` } : {}),
//   };

//   // ── Render ──────────────────────────────────────────────────────────────────

//   return (
//     <>
//       <FloatingBackground />
//       <ConfettiLayer pieces={confetti} />

//       <div style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #fff0f6 0%, #fce7ff 50%, #e0f2fe 100%)",
//         display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
//       }}>
//         <div ref={cardRef} className="date-card" style={{
//           background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)",
//           borderRadius: "32px",
//           boxShadow: "0 8px 60px rgba(255,107,157,0.22), 0 2px 20px rgba(192,132,252,0.12)",
//           position: "relative", zIndex: 10, border: "1.5px solid rgba(255,180,210,0.4)",
//           animation: "cardIn 0.7s cubic-bezier(.34,1.56,.64,1) both",
//           textAlign: "center",
//           minHeight: isRunaway ? "560px" : undefined,
//         }}>
//           {saidYES ? (
//             <YesScreen />
//           ) : (
//             <>
//               {/* Cat column */}
//               <div className="cat-col" style={{ marginBottom: "12px", display: "flex", justifyContent: "center" }}>
//                 <img
//                   key={noCount}
//                   src={catImgIndex}
//                   alt="cute cat"
//                   className="cat-img"
//                   style={{
//                     objectFit: "contain",
//                     borderRadius: "50%",
//                     animation: "catBounce 1.8s ease-in-out infinite, catPop 0.45s cubic-bezier(.34,1.56,.64,1) both",
//                     filter: "drop-shadow(0 6px 18px rgba(255,107,157,0.30))",
//                   }}
//                 />
//               </div>
//               {/* Content column */}
//               <div className="content-col">

//               {noCount === 0 && (
//                 <>
//                   <h1 className="title-text" style={{
//                     fontFamily: "'Pacifico', cursive",
//                     color: "#ff3d7f", marginBottom: "8px", lineHeight: 1.3,
//                     textShadow: "0 2px 12px rgba(255,61,127,0.13)",
//                   }}>
//                     Hey, you! 💕
//                   </h1>
//                   <p className="subtitle-text" style={{ color: "#a166b0", marginBottom: "6px", fontWeight: 600 }}>
//                     I have something super important to ask you...
//                   </p>
//                   <div className="hearts-row" style={{
//                     fontSize: "1.4rem", letterSpacing: "4px", margin: "8px 0 20px",
//                     animation: "heartPulse 1.4s ease-in-out infinite",
//                   }}>
//                     💗 💖 💗
//                   </div>
//                 </>
//               )}

//               <div
//                 key={msgKey}
//                 role="status"
//                 aria-live="polite"
//                 className="msg-box"
//                 style={{
//                 fontSize: "1.05rem", color: "#7e22ce",
//                 background: "linear-gradient(135deg, #fdf4ff, #fff0f8)",
//                 borderRadius: "16px", padding: "14px 18px", marginBottom: "24px",
//                 fontWeight: 700, minHeight: "52px",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 border: "1.5px solid #f0abfc", animation: "msgFadeIn 0.5s ease",
//               }}>
//                 {MESSAGES[msgIndex]}
//               </div>

//               <div className="btn-row" style={{
//                 display: "flex", gap: "16px", justifyContent: "center",
//                 alignItems: "center", flexWrap: "wrap", position: "relative",
//                 minHeight: noPos !== null ? "160px" : undefined,
//               }}>
//                 <button
//                   type="button"
//                   style={yesBtnStyle}
//                   aria-label="Yes, I will go on a date"
//                   onClick={handleYes}
//                   onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08) translateY(-2px)"; }}
//                   onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
//                   onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.96)"; }}
//                   onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08) translateY(-2px)"; }}
//                 >
//                   Yes!! 🥰
//                 </button>

//                 <button
//                   type="button"
//                   ref={noBtnRef}
//                   className={isShaking ? "shake-anim" : ""}
//                   style={noBtnStyle}
//                   aria-label={isRunaway ? "No — button moves when hovered" : "No, not this time"}
//                   onClick={isRunaway ? undefined : handleNo}
//                   onMouseEnter={isRunaway ? moveNoBtn : undefined}
//                   onMouseMove={isRunaway ? moveNoBtn : undefined}
//                   onTouchStart={isRunaway ? moveNoBtn : undefined}
//                   onTouchMove={isRunaway ? moveNoBtn : undefined}
//                 >
//                   {isRunaway ? "No (catch me if you can 😈)" : "No 😐"}
//                 </button>
//               </div>
//               </div>{/* /content-col */}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type ReactElement,
} from "react";
import { CAT_IMAGES } from "./data/catImages";
import "./styles/dateAsk.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: string;
  fontSize: string;
  duration: string;
  delay: string;
}

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  width: string;
  height: string;
  borderRadius: string;
  duration: string;
  delay: string;
}

interface NoBtnPosition {
  left: number;
  top: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_RUNAWAY = 4;

const MESSAGES: string[] = [
  "Will you go on a date with me? 🌸",
  "Are you sure? I'm really fun, I promise! 🥺",
  "Come onnn, it'll be SO much fun! 🙈",
  "Last chance... I'll bring your favourite food! 🍕😇",
  "Okay fine... but the Yes button misses you! 💔",
  "The Yes button won't stop growing until you click it... 👀",
];

const YES_SCALES: number[] = [1.0, 1.3, 1.6, 2.0, 2.5, 3.0];
const BG_EMOJIS: string[] = ["💗", "💖", "💕", "💞", "🌸", "✨", "🦋", "🍓"];
const CONFETTI_COLORS: string[] = [
  "#ff6b9d", "#fde68a", "#6ee7b7", "#c084fc",
  "#ff3d7f", "#38bdf8", "#fb923c",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function generateFloatingEmojis(count: number): FloatingEmoji[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: BG_EMOJIS[Math.floor(Math.random() * BG_EMOJIS.length)],
    left: `${randomBetween(0, 100)}vw`,
    fontSize: `${randomBetween(1, 2.8)}rem`,
    duration: `${randomBetween(6, 18)}s`,
    delay: `${randomBetween(0, 12)}s`,
  }));
}

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${randomBetween(0, 100)}vw`,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    width: `${randomBetween(6, 14)}px`,
    height: `${randomBetween(6, 14)}px`,
    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    duration: `${randomBetween(1.5, 4)}s`,
    delay: `${randomBetween(0, 1.2)}s`,
  }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FloatingBackground(): ReactElement {
  const [emojis] = useState<FloatingEmoji[]>(() => generateFloatingEmojis(20));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {emojis.map((e) => (
        <span key={e.id} style={{
          position: "absolute", fontSize: e.fontSize, left: e.left, bottom: "-10vh",
          opacity: 0.18, animation: `floatUp ${e.duration} ${e.delay} linear infinite`,
        }}>
          {e.emoji}
        </span>
      ))}
    </div>
  );
}

function ConfettiLayer({ pieces }: { pieces: ConfettiPiece[] }): ReactElement {
  return (
    <>
      {pieces.map((p) => (
        <div key={p.id} style={{
          position: "fixed", top: "-12px", left: p.left, width: p.width, height: p.height,
          background: p.color, borderRadius: p.borderRadius, pointerEvents: "none", zIndex: 999,
          animation: `confettiFall ${p.duration} ${p.delay} linear forwards`,
        }} />
      ))}
    </>
  );
}

function YesScreen(): ReactElement {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: "12px", animation: "yesIn 0.7s cubic-bezier(.34,1.56,.64,1) both",
    }}>
      <p style={{ fontSize: "1.1rem", color: "#9333ea", fontWeight: 700, marginBottom: "0px" }}>
        Knew you would say yes! 😏💕
      </p>
      {/* Tenor GIF */}
      <img
        src="https://media.tenor.com/eNHbizSfVb0AAAAj/lovemode-cute.gif"
        alt="love mode cats"
        style={{
          width: "min(280px, 70vw)",
          height: "auto",
          borderRadius: "24px",
          filter: "drop-shadow(0 6px 24px rgba(255,107,157,0.40))",
          animation: "spinPop 0.8s cubic-bezier(.34,1.56,.64,1) both",
        }}
      />
      <h2 style={{
        fontFamily: "'Pacifico', cursive", fontSize: "2rem", color: "#ff3d7f",
        textShadow: "0 2px 12px rgba(255,61,127,0.18)",
      }}>
        You just made me the happiest person! ❤️
      </h2>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DateAsk(): ReactElement {
  const [noCount, setNoCount] = useState<number>(0);
  const [msgKey, setMsgKey] = useState<number>(0);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [saidYES, setSaidYES] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [noPos, setNoPos] = useState<NoBtnPosition | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
    };
  }, []);

  // ── Derived values ──────────────────────────────────────────────────────────
  const msgIndex = Math.min(noCount, MESSAGES.length - 1);
  // Cat image cycles: 0→Cat1(shy), 1→Cat2(pleading), 2→Cat3(heart), 3→Cat5(love), 4+→Cat4(kiss)
  const catImgOrder = [0, 1, 2, 4, 3];
  const catImgIndex = CAT_IMAGES[catImgOrder[Math.min(noCount, catImgOrder.length - 1)]];
  const yesScale = YES_SCALES[Math.min(noCount, YES_SCALES.length - 1)];
  const isRunaway = noCount >= MAX_RUNAWAY;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleNo = useCallback((): void => {
    setNoCount((n) => n + 1);
    setMsgKey((k) => k + 1);
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    setIsShaking(true);
    shakeTimer.current = setTimeout(() => setIsShaking(false), 520);
  }, []);

  const handleYes = useCallback((): void => {
    setSaidYES(true);
    setConfetti(generateConfetti(90));
  }, []);

  const moveNoBtn = useCallback((): void => {
    if (!cardRef.current || !noBtnRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    const btnRect = noBtnRef.current.getBoundingClientRect();

    const paddingX = 10;
    const paddingY = 10;
    const maxLeft = cardRect.width - btnRect.width - paddingX;
    const maxTop = cardRect.height - btnRect.height - paddingY;

    const currentLeft = noPos?.left ?? cardRect.width / 2;
    const currentTop  = noPos?.top  ?? cardRect.height * 0.75;

    let attempts = 0;
    let newLeft: number = 0, newTop: number = 0;
    do {
      newLeft = paddingX + Math.random() * maxLeft;
      newTop  = paddingY + Math.random() * maxTop;
      attempts++;
    } while (
      attempts < 10 &&
      Math.abs(newLeft - currentLeft) < cardRect.width * 0.35 &&
      Math.abs(newTop  - currentTop)  < cardRect.height * 0.25
    );

    setNoPos({ left: newLeft, top: newTop });
  }, [noPos]);

  useEffect(() => {
    if (confetti.length === 0) return;
    const maxDuration = Math.max(...confetti.map((p) =>
      parseFloat(p.duration) + parseFloat(p.delay)
    )) * 1000 + 300;
    const t = setTimeout(() => setConfetti([]), maxDuration);
    return () => clearTimeout(t);
  }, [confetti]);

  // ── Styles ──────────────────────────────────────────────────────────────────

  const yesBtnStyle: CSSProperties = {
    fontFamily: "'Nunito', sans-serif", fontWeight: 800, border: "none",
    borderRadius: "50px", cursor: "pointer",
    letterSpacing: "0.5px", whiteSpace: "nowrap",
    background: "linear-gradient(135deg, #ff6b9d, #ff3d7f)", color: "white",
    fontSize: `${1.1 * yesScale}rem`,
    padding: `${14 * Math.min(yesScale, 1.8)}px ${36 * Math.min(yesScale, 2.2)}px`,
    boxShadow: `0 ${4 * yesScale}px ${20 * yesScale}px rgba(255,61,127,${0.35 + noCount * 0.06})`,
    transition: "transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s, font-size 0.35s cubic-bezier(.34,1.56,.64,1), padding 0.35s",
  };

  const noBtnStyle: CSSProperties = {
    fontFamily: "'Nunito', sans-serif", fontWeight: 800, border: "none",
    borderRadius: "50px", cursor: isRunaway ? "default" : "pointer",
    letterSpacing: "0.5px", whiteSpace: "nowrap",
    background: "linear-gradient(135deg, #e0e0e0, #bdbdbd)", color: "#666",
    fontSize: "0.95rem", padding: "12px 28px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.10)",
    transition: isRunaway ? "left 0.12s ease, top 0.12s ease" : undefined,
    ...(noPos !== null ? { position: "absolute" as const, left: `${noPos.left}px`, top: `${noPos.top}px` } : {}),
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <FloatingBackground />
      <ConfettiLayer pieces={confetti} />

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff0f6 0%, #fce7ff 50%, #e0f2fe 100%)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        <div ref={cardRef} className="date-card" style={{
          background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)",
          borderRadius: "32px",
          boxShadow: "0 8px 60px rgba(255,107,157,0.22), 0 2px 20px rgba(192,132,252,0.12)",
          position: "relative", zIndex: 10, border: "1.5px solid rgba(255,180,210,0.4)",
          animation: "cardIn 0.7s cubic-bezier(.34,1.56,.64,1) both",
          textAlign: "center",
          minHeight: isRunaway ? "560px" : undefined,
        }}>
          {saidYES ? (
            <YesScreen />
          ) : (
            <>
              {/* Cat column */}
              <div className="cat-col" style={{ marginBottom: "12px", display: "flex", justifyContent: "center" }}>
                <img
                  key={noCount}
                  src={catImgIndex}
                  alt="cute cat"
                  className="cat-img"
                  style={{
                    objectFit: "contain",
                    borderRadius: "50%",
                    animation: "catBounce 1.8s ease-in-out infinite, catPop 0.45s cubic-bezier(.34,1.56,.64,1) both",
                    filter: "drop-shadow(0 6px 18px rgba(255,107,157,0.30))",
                  }}
                />
              </div>
              {/* Content column */}
              <div className="content-col">

              {noCount === 0 && (
                <>
                  <h1 className="title-text" style={{
                    fontFamily: "'Pacifico', cursive",
                    color: "#ff3d7f", marginBottom: "8px", lineHeight: 1.3,
                    textShadow: "0 2px 12px rgba(255,61,127,0.13)",
                  }}>
                    Hey, you! 💕
                  </h1>
                  <p className="subtitle-text" style={{ color: "#a166b0", marginBottom: "6px", fontWeight: 600 }}>
                    I have something super important to ask you...
                  </p>
                  <div className="hearts-row" style={{
                    fontSize: "1.4rem", letterSpacing: "4px", margin: "8px 0 20px",
                    animation: "heartPulse 1.4s ease-in-out infinite",
                  }}>
                    💗 💖 💗
                  </div>
                </>
              )}

              <div
                key={msgKey}
                role="status"
                aria-live="polite"
                className="msg-box"
                style={{
                fontSize: "1.05rem", color: "#7e22ce",
                background: "linear-gradient(135deg, #fdf4ff, #fff0f8)",
                borderRadius: "16px", padding: "14px 18px", marginBottom: "24px",
                fontWeight: 700, minHeight: "52px",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1.5px solid #f0abfc", animation: "msgFadeIn 0.5s ease",
              }}>
                {MESSAGES[msgIndex]}
              </div>

              <div className="btn-row" style={{
                display: "flex", gap: "16px", justifyContent: "center",
                alignItems: "center", flexWrap: "wrap", position: "relative",
                minHeight: noPos !== null ? "160px" : undefined,
              }}>
                <button
                  type="button"
                  style={yesBtnStyle}
                  aria-label="Yes, I will go on a date"
                  onClick={handleYes}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08) translateY(-2px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                  onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.96)"; }}
                  onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08) translateY(-2px)"; }}
                >
                  Yes!! 🥰
                </button>

                <button
                  type="button"
                  ref={noBtnRef}
                  className={isShaking ? "shake-anim" : ""}
                  style={noBtnStyle}
                  aria-label={isRunaway ? "No — button moves when hovered" : "No, not this time"}
                  onClick={isRunaway ? undefined : handleNo}
                  onMouseEnter={isRunaway ? moveNoBtn : undefined}
                  onMouseMove={isRunaway ? moveNoBtn : undefined}
                  onTouchStart={isRunaway ? moveNoBtn : undefined}
                  onTouchMove={isRunaway ? moveNoBtn : undefined}
                >
                  {isRunaway ? "No (catch me if you can 😈)" : "No 😐"}
                </button>
              </div>
              </div>{/* /content-col */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
