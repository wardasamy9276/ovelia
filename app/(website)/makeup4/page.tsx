"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useLanguage } from "@/app/context/LanguageContext";

import   NailArtBuilderStudi  from "./nails"
type NailShapeMode = "almond" | "square" | "stiletto" | "french-tip";

interface NailPolishOption {
  code: string;
  nameAr: string;
  nameEn: string;
  finishAr: string;
  finishEn: string;
  hex: string;
  shimmerHex: string;
  priceEgp: number;
}

interface NailPresetLook {
  id: string;
  nameAr: string;
  nameEn: string;
  badgeAr: string;
  badgeEn: string;
  shape: NailShapeMode;
  polish: NailPolishOption;
  glitter: number;
}

interface NailBurstItem {
  id: string;
  glyph: string;
  sizeClass: string;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  rotateDeg: number;
  delayMs: number;
}

const NAIL_POLISH_SHADES: NailPolishOption[] = [
  {
    code: "N01",
    nameAr: "روبي مخملي لامع",
    nameEn: "Velvet Ruby Gloss",
    finishAr: "جل لامع",
    finishEn: "Mirror Gel",
    hex: "#B81D43",
    shimmerHex: "#FDE68A",
    priceEgp: 420,
  },
  {
    code: "N02",
    nameAr: "نيود روز حريري",
    nameEn: "Silky Nude Rose",
    finishAr: "كلاسيك ناعم",
    finishEn: "Soft Satin",
    hex: "#D98A94",
    shimmerHex: "#FFF1F2",
    priceEgp: 390,
  },
  {
    code: "N03",
    nameAr: "زمرد ملكي بلمعة ذهب",
    nameEn: "Royal Emerald Gold",
    finishAr: "ميتاليك جليتر",
    finishEn: "Metallic Shimmer",
    hex: "#0F766E",
    shimmerHex: "#FBBF24",
    priceEgp: 460,
  },
  {
    code: "N04",
    nameAr: "لؤلؤي شامبين",
    nameEn: "Champagne Pearl",
    finishAr: "بريق لؤلؤي",
    finishEn: "Pearl Shimmer",
    hex: "#E7C6A5",
    shimmerHex: "#FFFFFF",
    priceEgp: 440,
  },
  {
    code: "N05",
    nameAr: "أسود ليلي كريستال",
    nameEn: "Midnight Crystal Noir",
    finishAr: "جل كريستالي",
    finishEn: "Crystal Gel",
    hex: "#18181B",
    shimmerHex: "#67E8F9",
    priceEgp: 450,
  },
];

const NAIL_SHAPES: {
  id: NailShapeMode;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
}[] = [
  {
    id: "almond",
    titleAr: "لوزي أنيق",
    titleEn: "Almond",
    badgeAr: "الأكثر طلباً",
    badgeEn: "Popular",
  },
  {
    id: "square",
    titleAr: "مربع عصري",
    titleEn: "Modern Square",
    badgeAr: "كلاسيك",
    badgeEn: "Chic",
  },
  {
    id: "stiletto",
    titleAr: "ستيليتو طويل",
    titleEn: "Glam Stiletto",
    badgeAr: "جريء",
    badgeEn: "Bold",
  },
  {
    id: "french-tip",
    titleAr: "فرينش تيب لامع",
    titleEn: "Shimmer French",
    badgeAr: "ناعم",
    badgeEn: "French",
  },
];

const QUICK_NAIL_PRESETS: NailPresetLook[] = [
  {
    id: "nail-preset-1",
    nameAr: "فرينش عرائسي لؤلؤي",
    nameEn: "Bridal Pearl French",
    badgeAr: "ناعم",
    badgeEn: "Bridal",
    shape: "french-tip",
    polish: NAIL_POLISH_SHADES[1],
    glitter: 70,
  },
  {
    id: "nail-preset-2",
    nameAr: "سهرة روبي وجليتر",
    nameEn: "Ruby Glitter Gala",
    badgeAr: "سهرة",
    badgeEn: "Gala",
    shape: "almond",
    polish: NAIL_POLISH_SHADES[0],
    glitter: 85,
  },
  {
    id: "nail-preset-3",
    nameAr: "زمرد وذهب ملكي",
    nameEn: "Emerald & Gold Luxe",
    badgeAr: "فاخر",
    badgeEn: "Luxe",
    shape: "stiletto",
    polish: NAIL_POLISH_SHADES[2],
    glitter: 90,
  },
];

// Sudden nail polish, manicure & shimmer burst on entry
const NAIL_BURST_ITEMS: NailBurstItem[] = [
  { id: "nl1", glyph: "💅", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "40vh", endX: "5vw", endY: "15vh", rotateDeg: -20, delayMs: 0 },
  { id: "nl2", glyph: "✨", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "40vh", endX: "92vw", endY: "16vh", rotateDeg: 24, delayMs: 20 },
  { id: "nl3", glyph: "💎", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "40vh", endX: "3.5vw", endY: "44vh", rotateDeg: -14, delayMs: 40 },
  { id: "nl4", glyph: "🌸", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "40vh", endX: "94vw", endY: "45vh", rotateDeg: 18, delayMs: 60 },
  { id: "nl5", glyph: "💅", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "40vh", endX: "6vw", endY: "75vh", rotateDeg: 16, delayMs: 80 },
  { id: "nl6", glyph: "🌟", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "40vh", endX: "91vw", endY: "76vh", rotateDeg: -22, delayMs: 100 },
  { id: "nl7", glyph: "✨", sizeClass: "text-lg sm:text-xl", startX: "50vw", startY: "40vh", endX: "19vw", endY: "91vh", rotateDeg: -12, delayMs: 120 },
  { id: "nl8", glyph: "💎", sizeClass: "text-lg sm:text-xl", startX: "50vw", startY: "40vh", endX: "80vw", endY: "91vh", rotateDeg: 15, delayMs: 140 },
];

// MediaPipe HandLandmarker fingertip & DIP joint pairs [DIP, TIP]
const FINGER_PAIRS: [number, number][] = [
  [3, 4],   // Thumb
  [7, 8],   // Index
  [11, 12], // Middle
  [15, 16], // Ring
  [19, 20], // Pinky
];

export default function NailsCenterPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [isDark, setIsDark] = useState(true);
  const [burstActive, setBurstActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [trackingReady, setTrackingReady] = useState(false);
  const [handDetected, setHandDetected] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [cameraError, setCameraError] = useState("");
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState("");
  const [photoDecisionDone, setPhotoDecisionDone] = useState<"kept" | null>(
    null
  );

  const [nailShape, setNailShape] = useState<NailShapeMode>("almond");
  const [selectedPolish, setSelectedPolish] = useState<NailPolishOption>(
    NAIL_POLISH_SHADES[0]
  );
  const [polishOpacity, setPolishOpacity] = useState(82);
  const [glitterShimmer, setGlitterShimmer] = useState(75);
  const [nailLengthScale, setNailLengthScale] = useState(60);
  const [beforeAfterMode, setBeforeAfterMode] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const triggerNailBurst = useCallback(() => {
    setBurstActive(false);
    const frame = requestAnimationFrame(() => {
      setTimeout(() => {
        setBurstActive(true);
      }, 25);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const cleanup = triggerNailBurst();
    return cleanup;
  }, [triggerNailBurst]);

  const liveSettingsRef = useRef({
    nailShape,
    selectedPolish,
    polishOpacity,
    glitterShimmer,
    nailLengthScale,
    beforeAfterMode,
    facingMode,
  });

  useEffect(() => {
    liveSettingsRef.current = {
      nailShape,
      selectedPolish,
      polishOpacity,
      glitterShimmer,
      nailLengthScale,
      beforeAfterMode,
      facingMode,
    };
  }, [
    nailShape,
    selectedPolish,
    polishOpacity,
    glitterShimmer,
    nailLengthScale,
    beforeAfterMode,
    facingMode,
  ]);

  useEffect(() => {
    const syncTheme = () => {
      const saved = localStorage.getItem("orvelia-theme");
      if (saved === "dark" || saved === "light") {
        setIsDark(saved === "dark");
      } else {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };
    syncTheme();
    const obs = new MutationObserver(syncTheme);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? "" : prev));
    }, 3000);
  };

  const ensureHandLandmarker = useCallback(async () => {
    if (handLandmarkerRef.current) {
      setTrackingReady(true);
      return handLandmarkerRef.current;
    }

    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      const detector = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 2,
      });
      handLandmarkerRef.current = detector;
      setTrackingReady(true);
      return detector;
    } catch {
      setTrackingReady(false);
      return null;
    }
  }, []);

  const paintNailsOnHands = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      hands?: { x: number; y: number }[][]
    ) => {
      const {
        nailShape: shape,
        selectedPolish: polish,
        polishOpacity: opacity,
        glitterShimmer: glitter,
        nailLengthScale: lengthScale,
        beforeAfterMode: isBefore,
      } = liveSettingsRef.current;

      if (isBefore || !hands || hands.length === 0) return;

      const lenMultiplier = 0.75 + (lengthScale / 100) * 0.65;

      hands.forEach((landmarks) => {
        if (landmarks.length < 21) return;

        FINGER_PAIRS.forEach(([dipIdx, tipIdx], fingerIndex) => {
          const dip = {
            x: landmarks[dipIdx].x * width,
            y: landmarks[dipIdx].y * height,
          };
          const tip = {
            x: landmarks[tipIdx].x * width,
            y: landmarks[tipIdx].y * height,
          };

          const dx = tip.x - dip.x;
          const dy = tip.y - dip.y;
          const dist = Math.max(10, Math.hypot(dx, dy));
          const angle = Math.atan2(dy, dx);

          const isThumb = fingerIndex === 0;
          const nailLen = dist * (isThumb ? 0.52 : 0.62) * lenMultiplier;
          const nailHalfW = dist * (isThumb ? 0.24 : 0.19);

          ctx.save();
          ctx.translate(tip.x, tip.y);
          ctx.rotate(angle);

          ctx.globalAlpha = opacity / 100;
          ctx.fillStyle = polish.hex;
          ctx.shadowColor = polish.shimmerHex;
          ctx.shadowBlur = (glitter / 100) * 10;

          ctx.beginPath();
          if (shape === "square") {
            ctx.roundRect(-nailLen * 0.35, -nailHalfW, nailLen, nailHalfW * 2, 3);
          } else if (shape === "stiletto") {
            ctx.moveTo(-nailLen * 0.35, -nailHalfW);
            ctx.quadraticCurveTo(nailLen * 0.25, -nailHalfW * 0.85, nailLen * 0.85, 0);
            ctx.quadraticCurveTo(nailLen * 0.25, nailHalfW * 0.85, -nailLen * 0.35, nailHalfW);
            ctx.closePath();
          } else {
            // Almond & French base
            ctx.ellipse(nailLen * 0.15, 0, nailLen * 0.58, nailHalfW, 0, 0, Math.PI * 2);
          }
          ctx.fill();

          // French Tip white/shimmer edge
          if (shape === "french-tip") {
            ctx.fillStyle = polish.shimmerHex;
            ctx.globalAlpha = Math.min(1, (opacity / 100) * 1.1);
            ctx.beginPath();
            ctx.ellipse(
              nailLen * 0.52,
              0,
              nailLen * 0.2,
              nailHalfW * 0.88,
              0,
              -Math.PI * 0.5,
              Math.PI * 0.5
            );
            ctx.fill();
          }

          // Glossy highlight streak on nail
          ctx.fillStyle = polish.shimmerHex;
          ctx.globalAlpha = (glitter / 100) * 0.65;
          ctx.beginPath();
          ctx.ellipse(
            nailLen * 0.12,
            -nailHalfW * 0.28,
            nailLen * 0.34,
            nailHalfW * 0.22,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.restore();
        });
      });
    },
    []
  );

  const stopCamera = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setHandDetected(false);
  }, []);

  const loopCameraRender = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !streamRef.current) return;

    if (video.readyState >= 2) {
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 480;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.save();
        if (liveSettingsRef.current.facingMode === "user") {
          ctx.translate(w, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, w, h);

        const detector = handLandmarkerRef.current;
        if (detector) {
          const res = detector.detectForVideo(video, performance.now());
          const hands = res.landmarks;
          if (hands && hands.length > 0) {
            setHandDetected(true);
            paintNailsOnHands(ctx, w, h, hands);
          } else {
            setHandDetected(false);
          }
        }
        ctx.restore();
      }
    }

    rafIdRef.current = requestAnimationFrame(loopCameraRender);
  }, [paintNailsOnHands]);

  const startCamera = useCallback(
    async (mode: "user" | "environment" = facingMode) => {
      setCameraError("");
      setCapturedPhotoUrl("");
      setPhotoDecisionDone(null);
      stopCamera();

      if (
        typeof navigator === "undefined" ||
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setCameraError(
          isArabic
            ? "المتصفح الحالي لا يدعم تشغيل الكاميرا مباشرة أو يتطلب اتصالاً آمناً (localhost أو https)."
            : "Camera access requires a supported browser over localhost or https."
        );
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: mode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        streamRef.current = stream;
        setCameraActive(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        await ensureHandLandmarker();
        rafIdRef.current = requestAnimationFrame(loopCameraRender);
      } catch {
        setCameraError(
          isArabic
            ? "لم يتم السماح بفتح الكاميرا — اضغطي سماح (Allow) في نافذة المتصفح وجربي مرة أخرى."
            : "Camera access was denied — allow camera permissions in your browser and try again."
        );
      }
    },
    [ensureHandLandmarker, facingMode, isArabic, loopCameraRender, stopCamera]
  );

  useEffect(() => {
    startCamera("environment");
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const handleSnapPhoto = () => {
    const canvas = canvasRef.current;
    if (!canvas || !cameraActive) {
      notify(
        isArabic
          ? "شغّلي الكاميرا أولاً لالتقاط الصورة."
          : "Turn on the camera first to snap a photo."
      );
      return;
    }
    const url = canvas.toDataURL("image/png");
    setCapturedPhotoUrl(url);
    setPhotoDecisionDone(null);
    notify(
      isArabic
        ? "تم التقاط الصورة — اختاري تحت يا إما تخليها أو تحذفيها."
        : "Photo snapped — choose below to keep or delete it."
    );
  };

  const handleKeepSnappedPhoto = () => {
    if (!capturedPhotoUrl) return;
    setPhotoDecisionDone("kept");
    const a = document.createElement("a");
    a.href = capturedPhotoUrl;
    a.download = "orvelia-nails-center.png";
    a.click();
    notify(
      isArabic
        ? "تم الإبقاء على الصورة وتحميلها على جهازك!"
        : "Kept and downloaded your manicure photo!"
    );
  };

  const handleDeleteSnappedPhoto = () => {
    setCapturedPhotoUrl("");
    setPhotoDecisionDone(null);
    notify(isArabic ? "تم حذف الصورة الملتقطة." : "Deleted snapped photo.");
  };

  const handleUploadHandPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    const img = new Image();
    img.onload = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
        );
        const detector = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          },
          runningMode: "IMAGE",
          numHands: 2,
        });
        const res = detector.detect(img);
        if (res.landmarks && res.landmarks.length > 0) {
          setHandDetected(true);
          paintNailsOnHands(ctx, img.width, img.height, res.landmarks);
        }
        detector.close();
      } catch {
        // Ignore offline fallback
      }

      setCapturedPhotoUrl(canvas.toDataURL("image/png"));
      setPhotoDecisionDone(null);
      notify(
        isArabic
          ? "تم تطبيق طلاء وشكل الأظافر على صورة يدك!"
          : "Applied nail polish & shape to your uploaded hand photo!"
      );
    };
    img.src = URL.createObjectURL(file);
  };

  const applyPresetLook = (preset: NailPresetLook) => {
    setNailShape(preset.shape);
    setSelectedPolish(preset.polish);
    setGlitterShimmer(preset.glitter);
    notify(
      isArabic
        ? `تم تطبيق "${preset.nameAr}" على أظافرك!`
        : `Applied "${preset.nameEn}" look!`
    );
  };

  const totalPrice = useMemo(() => selectedPolish.priceEgp, [selectedPolish]);

  const pageBg = isDark
    ? "bg-[#040710] text-white"
    : "bg-slate-50 text-slate-900";
  const cardSurface = isDark
    ? "bg-[#0a101f]/95 border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-sm";
  const subSurface = isDark
    ? "bg-[#060a14] border-white/10"
    : "bg-slate-100/80 border-slate-200";
  const muted = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div dir={dir} className={`relative min-h-screen overflow-x-clip transition-colors ${pageBg}`}>
      {/* Sudden Manicure & Nail Polish Burst on Entry */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      >
        {NAIL_BURST_ITEMS.map((item) => (
          <span
            key={item.id}
            style={{
              left: burstActive ? item.endX : item.startX,
              top: burstActive ? item.endY : item.startY,
              transform: burstActive
                ? `translate(-50%, -50%) rotate(${item.rotateDeg}deg) scale(1)`
                : "translate(-50%, -50%) rotate(0deg) scale(0.25)",
              opacity: burstActive ? 0.88 : 0,
              transitionProperty: "left, top, transform, opacity",
              transitionDuration: "520ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${item.delayMs}ms`,
            }}
            className={`fixed select-none drop-shadow-[0_6px_18px_rgba(244,114,182,0.38)] ${item.sizeClass}`}
          >
            {item.glyph}
          </span>
        ))}
      </div>

      {toastMsg && (
        <div className="fixed bottom-5 start-5 z-50 rounded-2xl border border-emerald-400/40 bg-[#0b1222] px-4 py-3 text-xs font-extrabold text-emerald-300 shadow-2xl sm:text-sm">
          💅 {toastMsg}
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <Link href="/beauty" className="text-amber-400 hover:underline">
                {isArabic ? "← عالم الجمال" : "← Beauty World"}
              </Link>
              <span className={muted}>/</span>
              <span className="text-cyan-400">/nails</span>
            </div>

            <h1 className="mt-1.5 text-2xl font-black sm:text-3xl">
              {isArabic
                ? "مركز الأظافر والمانيكير الافتراضي — Orvelia Nails Studio"
                : "Orvelia Virtual Nails & Manicure Studio"}
            </h1>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              {isArabic
                ? "وجّهي يدك أمام الكاميرا أو ارفعي صورة لتجربة ألوان الجل والفرينش وأشكال الأظافر فوراً."
                : "Hold your hand up to the camera or upload a photo to try gel shades, French tips & shapes live."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={triggerNailBurst}
              className={`rounded-2xl border px-3.5 py-2.5 text-xs font-extrabold sm:text-sm ${
                isDark
                  ? "border-pink-400/35 bg-pink-500/10 text-pink-200 hover:bg-pink-500/20"
                  : "border-pink-300 bg-pink-50 text-pink-900"
              }`}
            >
              💅 {isArabic ? "إطلاق بريق المانيكير" : "Launch Nail Sparkle"}
            </button>

            <button
              type="button"
              onClick={() => startCamera(facingMode)}
              className="rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 sm:text-sm"
            >
              📷 {isArabic ? "تشغيل / إعادة الكاميرا" : "Start / Reset Camera"}
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border px-4 py-2.5 text-xs font-bold sm:text-sm ${
                isDark
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-slate-300 bg-white text-slate-800"
              }`}
            >
              🖼️ {isArabic ? "رفع صورة اليد" : "Upload Hand Photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadHandPhoto}
              className="hidden"
            />
          </div>
        </div>
      </header>

      {/* Quick Presets Bar */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className={`rounded-2xl border p-4 ${cardSurface}`}>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <span className="text-xs font-extrabold text-amber-300 sm:text-sm">
              ✨{" "}
              {isArabic
                ? "إطلالات مانيكير جاهزة بنقرة واحدة:"
                : "One-Click Manicure Presets:"}
            </span>

            <div className="flex flex-wrap gap-2">
              {QUICK_NAIL_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPresetLook(preset)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                    isDark
                      ? "border-white/10 bg-white/5 text-slate-200 hover:border-amber-400/50 hover:bg-amber-500/10"
                      : "border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-500"
                  }`}
                >
                  <span>{isArabic ? preset.nameAr : preset.nameEn}</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-300">
                    {isArabic ? preset.badgeAr : preset.badgeEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Nails Center Grid */}
      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Camera & Canvas Area (7 Cols) */}
        <section className="space-y-4 lg:col-span-7">
          {cameraError && (
            <div className="rounded-2xl border border-amber-400/40 bg-amber-500/15 p-4 text-xs font-bold text-amber-200">
              ⚠️ {cameraError}
            </div>
          )}

          <div
            className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-black shadow-2xl ${cardSurface}`}
          >
            <video ref={videoRef} playsInline muted className="hidden" />
            <canvas ref={canvasRef} className="h-full w-full object-cover" />

            {/* Top HUD */}
            <div className="absolute top-4 start-4 end-4 flex flex-wrap items-center justify-between gap-2">
              <span
                className={`rounded-full border px-3 py-1 text-[11px] font-extrabold backdrop-blur-md ${
                  cameraActive
                    ? "border-emerald-400/40 bg-black/65 text-emerald-300"
                    : "border-slate-500/40 bg-black/65 text-slate-300"
                }`}
              >
                ●{" "}
                {cameraActive
                  ? trackingReady
                    ? handDetected
                      ? isArabic
                        ? "تم رصد اليد — طلاء الأظافر نشط"
                        : "Hand Tracked — Nails Live"
                      : isArabic
                      ? "وجّهي يدك وأصابعك أمام الكاميرا..."
                      : "Hold hand in camera view..."
                    : isArabic
                    ? "جاري تجهيز تتبع اليد..."
                    : "Preparing hand tracker..."
                  : isArabic
                  ? "الكاميرا متوقفة"
                  : "Camera Off"}
              </span>

              <div className="flex items-center gap-2">
                {cameraActive && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        const next =
                          facingMode === "user" ? "environment" : "user";
                        setFacingMode(next);
                        startCamera(next);
                      }}
                      className="rounded-xl border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md"
                    >
                      🔄 {isArabic ? "تبديل الكاميرا" : "Flip"}
                    </button>
                    <button
                      type="button"
                      onClick={handleSnapPhoto}
                      className="rounded-xl border border-cyan-400/40 bg-cyan-950/75 px-3 py-1.5 text-xs font-extrabold text-cyan-200 backdrop-blur-md"
                    >
                      📸 {isArabic ? "التقاط" : "Snap"}
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="rounded-xl border border-rose-400/40 bg-rose-950/75 px-3 py-1.5 text-xs font-bold text-rose-200 backdrop-blur-md"
                    >
                      ⏹ {isArabic ? "إيقاف" : "Stop"}
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setBeforeAfterMode((prev) => !prev)}
                  className="rounded-xl border border-amber-400/40 bg-black/70 px-3 py-1.5 text-xs font-extrabold text-amber-300 backdrop-blur-md"
                >
                  👁️ {isArabic ? "قبل / بعد" : "Before / After"}
                </button>
              </div>
            </div>
          </div>

          {/* Decision Bar Under Snapped Photo: Keep or Delete */}
          {capturedPhotoUrl && (
            <div
              className={`flex flex-col justify-between gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center ${cardSurface}`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={capturedPhotoUrl}
                  alt="Snapped Manicure Look"
                  className="h-16 w-16 rounded-xl border border-white/15 object-cover"
                />
                <div>
                  <p className="text-xs font-extrabold sm:text-sm">
                    {photoDecisionDone === "kept"
                      ? isArabic
                        ? "تم الإبقاء على الصورة ✓"
                        : "Photo Kept ✓"
                      : isArabic
                      ? "تم التقاط الصورة — تحبي تخليها ولا تحذفيها؟"
                      : "Photo captured — keep it or delete it?"}
                  </p>
                  <p className={`text-[11px] ${muted}`}>
                    {isArabic
                      ? "اختاري «خليها» لحفظ وتنزيل الصورة، أو «احذفها» لإزالتها."
                      : "Choose Keep to save & download, or Delete to remove it."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleKeepSnappedPhoto}
                  className="rounded-xl bg-emerald-400 px-4 py-2 text-xs font-extrabold text-slate-950 transition hover:opacity-95"
                >
                  ✓ {isArabic ? "خليها" : "Keep"}
                </button>

                <button
                  type="button"
                  onClick={handleDeleteSnappedPhoto}
                  className="rounded-xl border border-rose-400/40 bg-rose-500/15 px-4 py-2 text-xs font-extrabold text-rose-300 transition hover:bg-rose-500/25"
                >
                  🗑️ {isArabic ? "احذفها" : "Delete"}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Nail Shapes & Polish Shades Panel (5 Cols) */}
        <aside className="space-y-4 lg:col-span-5">
          <div className={`rounded-3xl border p-5 sm:p-6 ${cardSurface}`}>
            <h2 className="text-lg font-extrabold">
              {isArabic
                ? "أشكال الأظافر ودرجات الجل"
                : "Nail Shapes & Gel Polish Shades"}
            </h2>
            <p className={`mt-1 text-xs ${muted}`}>
              {isArabic
                ? "اختاري قصة الظفر ودرجة اللون واضبطي الطول وبريق اللمعان."
                : "Select nail shape, pick a gel shade, and adjust length & shimmer."}
            </p>

            {/* Nail Shapes */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {NAIL_SHAPES.map((sh) => {
                const active = nailShape === sh.id;
                return (
                  <button
                    key={sh.id}
                    type="button"
                    onClick={() => setNailShape(sh.id)}
                    className={`flex items-center justify-between rounded-2xl border p-2.5 text-xs font-extrabold transition ${
                      active
                        ? "border-amber-400 bg-amber-500/15 text-white"
                        : isDark
                        ? "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10"
                        : "border-slate-200 bg-slate-50 text-slate-800"
                    }`}
                  >
                    <span>{isArabic ? sh.titleAr : sh.titleEn}</span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
                      {isArabic ? sh.badgeAr : sh.badgeEn}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Polish Shades & Controls */}
            <div className={`mt-5 rounded-2xl border p-4 ${subSurface}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-amber-300">
                    {isArabic ? selectedPolish.nameAr : selectedPolish.nameEn}
                  </span>
                  <p className={`text-[11px] ${muted}`}>
                    {isArabic ? selectedPolish.finishAr : selectedPolish.finishEn}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-emerald-400">
                  {selectedPolish.priceEgp} {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {NAIL_POLISH_SHADES.map((item) => {
                  const isChosen = selectedPolish.code === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => setSelectedPolish(item)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                        isChosen
                          ? "border-amber-400 bg-amber-500/20 text-white"
                          : isDark
                          ? "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10"
                          : "border-slate-200 bg-white text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-5 w-5 rounded-full border border-white/40"
                          style={{
                            background: `linear-gradient(135deg, ${item.hex}, ${item.shimmerHex})`,
                          }}
                        />
                        <div className="text-start">
                          <div>{isArabic ? item.nameAr : item.nameEn}</div>
                          <div className={`text-[10px] font-normal ${muted}`}>
                            {isArabic ? item.finishAr : item.finishEn}
                          </div>
                        </div>
                      </div>

                      <span className="font-mono text-[11px] text-amber-300">
                        {item.code}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 space-y-3 border-t border-white/10 pt-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs font-bold">
                    <span>{isArabic ? "طول الظفر:" : "Nail Length:"}</span>
                    <span className="text-cyan-400">{nailLengthScale}%</span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={100}
                    value={nailLengthScale}
                    onChange={(e) => setNailLengthScale(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs font-bold">
                    <span>
                      {isArabic ? "تغطية اللون:" : "Polish Coverage:"}
                    </span>
                    <span className="text-emerald-300">{polishOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={100}
                    value={polishOpacity}
                    onChange={(e) => setPolishOpacity(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs font-bold">
                    <span>
                      {isArabic ? "لمعان الجل والجليتر:" : "Gel & Glitter Shine:"}
                    </span>
                    <span className="text-amber-300">{glitterShimmer}%</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={100}
                    value={glitterShimmer}
                    onChange={(e) => setGlitterShimmer(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Add Selected Polish to Bag */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center justify-between text-sm font-extrabold">
                <span>
                  {isArabic ? "سعر الطلاء المختار:" : "Selected Polish Price:"}
                </span>
                <span className="text-lg text-emerald-400">
                  {totalPrice.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  notify(
                    isArabic
                      ? "تمت إضافة طلاء الأظافر المختار إلى حقيبة الجمال!"
                      : "Added selected nail polish to your beauty bag!"
                  )
                }
                className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 py-3 text-xs font-extrabold text-slate-950 sm:text-sm"
              >
                🛍️{" "}
                {isArabic
                  ? "أضيفي طلاء الأظافر للحقيبة"
                  : "Add Nail Polish to Bag"}
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      {/* <footer className="relative z-10 mt-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="space-y-3 md:col-span-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-emerald-400 text-base font-black text-slate-950">
                  O
                </span>
                <div>
                  <span className="text-lg font-black tracking-wide">
                    {isArabic ? "أورفيليا | ORVELIA" : "ORVELIA"}
                  </span>
                  <p className={`text-[11px] ${muted}`}>
                    {isArabic
                      ? "تجربة الجمال والمانيكير بالذكاء الاصطناعي"
                      : "AI Beauty & Virtual Manicure Studio"}
                  </p>
                </div>
              </div>

              <p className={`max-w-md text-xs leading-relaxed ${muted}`}>
                {isArabic
                  ? "جرّبي أحدث درجات طلاء الأظافر الجل، الفرينش، والأشكال العصرية مباشرة على يدك بالكاميرا بدقة فورية."
                  : "Explore gel polish shades, French tips, and nail shapes with real-time hand tracking."}
              </p>
            </div>

            <div className="space-y-2.5 md:col-span-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                {isArabic ? "روابط سريعة" : "Quick Links"}
              </h3>
              <ul className="space-y-2 text-xs font-bold">
                <li>
                  <Link href="/" className={`${muted} transition hover:text-amber-400`}>
                    {isArabic ? "الرئيسية" : "Home"}
                  </Link>
                </li>
                <li>
                  <Link href="/beauty" className={`${muted} transition hover:text-amber-400`}>
                    {isArabic ? "عالم الجمال" : "Beauty World"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/virtual-try-on/makeup"
                    className={`${muted} transition hover:text-amber-400`}
                  >
                    {isArabic ? "مركز المكياج (AR)" : "Makeup Center (AR)"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/nails"
                    className="text-cyan-400 transition hover:underline"
                  >
                    {isArabic ? "مركز الأظافر" : "Nails Studio"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <div className={`rounded-2xl border p-4 ${subSurface}`}>
                <p className="text-xs font-extrabold text-emerald-400">
                  🔒 {isArabic ? "خصوصية الكاميرا والصور" : "Camera & Photo Privacy"}
                </p>
                <p className={`mt-1.5 text-[11px] leading-relaxed ${muted}`}>
                  {isArabic
                    ? "تتم معالجة تتبع اليد وتطبيق ألوان الأظافر محلياً داخل متصفحك، ولكِ حرية حفظ الصورة الملتقطة أو حذفها فوراً."
                    : "Hand tracking and nail rendering run locally in your browser—keep or delete any snapshot anytime."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
            <p className={muted}>
              © {new Date().getFullYear()}{" "}
              {isArabic
                ? "أورفيليا (Orvelia). جميع الحقوق محفوظة."
                : "Orvelia. All rights reserved."}
            </p>
            <span className="font-mono text-[11px] text-amber-300/90">
              ORVELIA NAILS STUDIO
            </span>
          </div>
        </div>
      </footer> */}
      <NailArtBuilderStudi />
    </div>
  );
}