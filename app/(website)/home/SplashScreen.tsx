// "use client";

// import React, { useEffect, useState } from "react";

// export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setFadeOut(true);
//       setTimeout(onFinish, 700);
//     }, 2800);

//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   return (
//     <div
//       className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050B14] transition-opacity duration-700 ${
//         fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
//       }`}
//     >
//       {/* خلفية النجوم المتلألئة المتحركة */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <span
//             key={i}
//             className="absolute rounded-full bg-cyan-300 animate-ping"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               width: `${Math.random() * 4 + 2}px`,
//               height: `${Math.random() * 4 + 2}px`,
//               animationDuration: `${Math.random() * 3 + 1.5}s`,
//               animationDelay: `${Math.random() * 2}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative flex flex-col items-center justify-center">
//         {/* هالة التوهج الخلفية النابضة */}
//         <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/30 to-amber-500/20 blur-[60px] animate-pulse" />

//         {/* أشعة الضوء الدائرية المتحركة خلف الوردة */}
//         <div className="absolute w-56 h-56 rounded-full border border-cyan-500/20 animate-[spin_12s_linear_infinite] pointer-events-none" />
//         <div className="absolute w-64 h-64 rounded-full border border-dashed border-amber-400/20 animate-[spin_18s_linear_infinite_reverse] pointer-events-none" />

//         {/* الوردة المتحركة واللامعة */}
//         <svg
//           viewBox="0 0 200 200"
//           className="w-52 h-52 relative z-10 drop-shadow-[0_0_35px_rgba(34,211,238,0.85)] animate-[float_4s_ease-in-out_infinite]"
//         >
//           <defs>
//             <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#22d3ee" />
//               <stop offset="40%" stopColor="#818cf8" />
//               <stop offset="100%" stopColor="#f59e0b" />
//             </linearGradient>

//             <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
//               <stop offset="0%" stopColor="#fef08a" />
//               <stop offset="60%" stopColor="#f59e0b" />
//               <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
//             </radialGradient>

//             <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="rgba(255,255,255,0)" />
//               <stop offset="50%" stopColor="rgba(255,255,255,0.95)" />
//               <stop offset="100%" stopColor="rgba(255,255,255,0)" />
//               <animate attributeName="x1" from="-100%" to="200%" dur="2s" repeatCount="indefinite" />
//               <animate attributeName="x2" from="0%" to="300%" dur="2s" repeatCount="indefinite" />
//             </linearGradient>
//           </defs>

//           {/* البتلات الخلفية مع دوران خفيف */}
//           <g className="origin-center animate-[spin_20s_linear_infinite]">
//             {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
//               <path
//                 key={angle}
//                 d="M100 100 C80 50, 120 50, 100 100 Z"
//                 fill="url(#petalGrad)"
//                 fillOpacity="0.3"
//                 stroke="#38bdf8"
//                 strokeWidth="1.5"
//                 transform={`rotate(${angle} 100 100) scale(1.4) translate(-26 -26)`}
//               />
//             ))}
//           </g>

//           {/* البتلات الأساسية مع لمسات البريق المتنقل */}
//           <g className="origin-center animate-[pulse_3s_ease-in-out_infinite]">
//             {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
//               <path
//                 key={angle}
//                 d="M100 100 C72 35, 128 35, 100 100 Z"
//                 fill="url(#petalGrad)"
//                 fillOpacity="0.8"
//                 stroke="url(#shimmer)"
//                 strokeWidth="2.2"
//                 transform={`rotate(${angle} 100 100)`}
//               />
//             ))}
//           </g>

//           {/* قلب الوردة النابض */}
//           <circle cx="100" cy="100" r="19" fill="url(#coreGrad)">
//             <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" />
//           </circle>
//           <circle cx="100" cy="100" r="7" fill="#ffffff" opacity="0.98">
//             <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
//           </circle>
//         </svg>

//         {/* عنوان المشروع مع تأثير تدرج لوني ولمعان */}
//         <h2 className="mt-8 text-2xl font-extrabold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-200 to-amber-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] animate-pulse">
//           ORVELIA
//         </h2>

//         {/* شريط التحميل الخفيف السفلي */}
//         <div className="w-36 h-1 bg-slate-800 rounded-full mt-5 overflow-hidden">
//           <div className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-amber-400 animate-[loading_2.5s_ease-in-out_infinite]" />
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(2deg); }
//         }
//         @keyframes loading {
//           0% { width: 0%; transform: translateX(-100%); }
//           50% { width: 70%; transform: translateX(20%); }
//           100% { width: 100%; transform: translateX(100%); }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";

export default function SplashScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 700);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#030712] transition-opacity duration-700 ${
        fadeOut
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
    >
      {/* خلفية النجوم */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => {
          const starSize = 2 + (i % 4);
          const duration = 1 + (i % 3);
          const delay = (i % 5) * 0.2;

          return (
            <span
              key={i}
              className="splash-star absolute rounded-full bg-white"
              style={{
                top: `${10 + ((i * 17) % 80)}%`,
                left: `${5 + ((i * 29) % 90)}%`,
                width: `${starSize}px`,
                height: `${starSize}px`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* الحاوية المركزية */}
      <div className="relative flex flex-col items-center justify-center">

        {/* الهالة المركزية */}
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-400/30 via-indigo-500/40 to-amber-400/30 blur-[80px] animate-pulse" />

        {/* أشعة الضوء الدائرية */}
        <div className="absolute w-64 h-64 rounded-full border border-cyan-400/30 animate-[spin_10s_linear_infinite] pointer-events-none shadow-[0_0_30px_rgba(34,211,238,0.3)]" />

        <div className="absolute w-72 h-72 rounded-full border border-dashed border-amber-300/30 animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />

        {/* الوردة المتحركة */}
        <svg
          viewBox="0 0 200 200"
          className="w-56 h-56 relative z-10 drop-shadow-[0_0_45px_rgba(34,211,238,0.95)] animate-[float_4s_ease-in-out_infinite]"
        >
          <defs>
            <linearGradient
              id="petalGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fef08a" />
              <stop offset="80%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>

            {/* لمعان متحرك */}
            <linearGradient
              id="strongShimmer"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />

              <animate
                attributeName="x1"
                from="-100%"
                to="200%"
                dur="1.8s"
                repeatCount="indefinite"
              />

              <animate
                attributeName="x2"
                from="0%"
                to="300%"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </linearGradient>
          </defs>

          {/* البتلات الخلفية */}
          <g className="origin-center animate-[spin_25s_linear_infinite]">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <path
                key={angle}
                d="M100 100 C75 45, 125 45, 100 100 Z"
                fill="url(#petalGrad)"
                fillOpacity="0.4"
                stroke="#38bdf8"
                strokeWidth="2"
                transform={`rotate(${angle} 100 100) scale(1.45) translate(-26 -26)`}
              />
            ))}
          </g>

          {/* البتلات الأساسية */}
          <g className="origin-center animate-[pulse_2.5s_ease-in-out_infinite]">
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
              (angle) => (
                <path
                  key={angle}
                  d="M100 100 C70 30, 130 30, 100 100 Z"
                  fill="url(#petalGrad)"
                  fillOpacity="0.85"
                  stroke="url(#strongShimmer)"
                  strokeWidth="2.8"
                  transform={`rotate(${angle} 100 100)`}
                />
              )
            )}
          </g>

          {/* قلب الوردة */}
          <circle cx="100" cy="100" r="20" fill="url(#coreGrad)">
            <animate
              attributeName="r"
              values="15;24;15"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="100" cy="100" r="8" fill="#ffffff" opacity="1">
            <animate
              attributeName="opacity"
              values="0.8;1;0.8"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* اسم العلامة التجارية */}
        <h2 className="mt-8 text-3xl font-black tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse">
          ORVELIA
        </h2>

        {/* شريط التحميل */}
        <div className="w-40 h-1.5 bg-slate-900 rounded-full mt-6 overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-cyan-400 via-white to-amber-400 animate-[loading_2.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .splash-star {
          animation-name: starPulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes starPulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.7);
          }

          50% {
            opacity: 1;
            transform: scale(1.5);
            box-shadow: 0 0 12px #ffffff;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-12px) rotate(3deg);
          }
        }

        @keyframes loading {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }

          50% {
            width: 75%;
            transform: translateX(20%);
          }

          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
