"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useLanguage } from "@/app/context/LanguageContext";

type HairStyleMode =
  | "sleek-gloss"
  | "soft-waves"
  | "wig-volume"
  | "curls-halo";

interface HairShadeOption {
  code: string;
  nameAr: string;
  nameEn: string;
  finishAr: string;
  finishEn: string;
  hex: string;
  shimmerHex: string;
  priceEgp: number;
}

interface HairBurstItem {
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

const HAIR_SHADES: HairShadeOption[] = [
  {
    code: "H01",
    nameAr: "كستنائي ذهبي لامع",
    nameEn: "Golden Chestnut Gloss",
    finishAr: "لمعان مرآتي",
    finishEn: "Mirror Shimmer",
    hex: "#6B3E26",
    shimmerHex: "#FBBF24",
    priceEgp: 850,
  },
  {
    code: "H02",
    nameAr: "أشقر عسلي مشرق",
    nameEn: "Radiant Honey Blonde",
    finishAr: "بريق شمسي",
    finishEn: "Sunlit Shine",
    hex: "#C58B47",
    shimmerHex: "#FEF08A",
    priceEgp: 890,
  },
  {
    code: "H03",
    nameAr: "برغندي مخملي لامع",
    nameEn: "Velvet Burgundy Glow",
    finishAr: "لمعة حريرية",
    finishEn: "Silky Sheen",
    hex: "#6E1D34",
    shimmerHex: "#F472B6",
    priceEgp: 870,
  },
  {
    code: "H04",
    nameAr: "أسود فاحم بلمعان كريستال",
    nameEn: "Crystal Obsidian",
    finishAr: "لمعان عميق",
    finishEn: "Crystal Gloss",
    hex: "#141622",
    shimmerHex: "#67E8F9",
    priceEgp: 820,
  },
];

const HAIR_STYLE_MODES: {
  id: HairStyleMode;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
}[] = [
  {
    id: "sleek-gloss",
    titleAr: "انسيابي لامع",
    titleEn: "Sleek Gloss",
    badgeAr: "حريري",
    badgeEn: "Silky",
  },
  {
    id: "soft-waves",
    titleAr: "تموجات ناعمة",
    titleEn: "Soft Waves",
    badgeAr: "انسيابي",
    badgeEn: "Wavy",
  },
  {
    id: "wig-volume",
    titleAr: "باروكة كثيفة فخمة",
    titleEn: "Luxury Wig Volume",
    badgeAr: "باروكة",
    badgeEn: "Full Wig",
  },
  {
    id: "curls-halo",
    titleAr: "كيرلي بهالة لمعان",
    titleEn: "Curls & Shimmer Halo",
    badgeAr: "لامع",
    badgeEn: "Shimmer",
  },
];

// Hair, wig, crown & shine items bursting outward suddenly on entry
const HAIR_WIG_BURST_ITEMS: HairBurstItem[] = [
  { id: "hw1", glyph: "💇‍♀️", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "40vh", endX: "5vw", endY: "15vh", rotateDeg: -20, delayMs: 0 },
  { id: "hw2", glyph: "✨", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "40vh", endX: "92vw", endY: "16vh", rotateDeg: 25, delayMs: 20 },
  { id: "hw3", glyph: "👑", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "40vh", endX: "3.5vw", endY: "44vh", rotateDeg: -14, delayMs: 40 },
  { id: "hw4", glyph: "💫", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "40vh", endX: "94vw", endY: "45vh", rotateDeg: 18, delayMs: 60 },
  { id: "hw5", glyph: "💇‍♀️", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "40vh", endX: "6vw", endY: "75vh", rotateDeg: 16, delayMs: 80 },
  { id: "hw6", glyph: "🌟", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "40vh", endX: "91vw", endY: "76vh", rotateDeg: -22, delayMs: 100 },
  { id: "hw7", glyph: "✨", sizeClass: "text-lg sm:text-xl", startX: "50vw", startY: "40vh", endX: "19vw", endY: "91vh", rotateDeg: -12, delayMs: 120 },
  { id: "hw8", glyph: "👑", sizeClass: "text-lg sm:text-xl", startX: "50vw", startY: "40vh", endX: "80vw", endY: "91vh", rotateDeg: 14, delayMs: 140 },
];

export default function HairCenterPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [isDark, setIsDark] = useState(true);
  const [burstActive, setBurstActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [trackingReady, setTrackingReady] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [cameraError, setCameraError] = useState("");
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState("");
  const [photoDecisionDone, setPhotoDecisionDone] = useState<"kept" | null>(
    null
  );

  const [styleMode, setStyleMode] = useState<HairStyleMode>("wig-volume");
  const [selectedShade, setSelectedShade] = useState<HairShadeOption>(
    HAIR_SHADES[0]
  );
  const [hairIntensity, setHairIntensity] = useState(58);
  const [shimmerLevel, setShimmerLevel] = useState(72);
  const [beforeAfterMode, setBeforeAfterMode] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const triggerHairBurst = useCallback(() => {
    setBurstActive(false);
    const frame = requestAnimationFrame(() => {
      setTimeout(() => {
        setBurstActive(true);
      }, 25);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const cleanup = triggerHairBurst();
    return cleanup;
  }, [triggerHairBurst]);

  const liveSettingsRef = useRef({
    styleMode,
    selectedShade,
    hairIntensity,
    shimmerLevel,
    beforeAfterMode,
    facingMode,
  });

  useEffect(() => {
    liveSettingsRef.current = {
      styleMode,
      selectedShade,
      hairIntensity,
      shimmerLevel,
      beforeAfterMode,
      facingMode,
    };
  }, [
    styleMode,
    selectedShade,
    hairIntensity,
    shimmerLevel,
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

  const ensureLandmarker = useCallback(async () => {
    if (landmarkerRef.current) {
      setTrackingReady(true);
      return landmarkerRef.current;
    }

    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      const detector = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numFaces: 1,
      });
      landmarkerRef.current = detector;
      setTrackingReady(true);
      return detector;
    } catch {
      setTrackingReady(false);
      return null;
    }
  }, []);

  const paintHairAndWigShimmer = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      landmarks?: { x: number; y: number }[]
    ) => {
      const {
        styleMode: mode,
        selectedShade: shade,
        hairIntensity: intensity,
        shimmerLevel: shimmer,
        beforeAfterMode: isBefore,
      } = liveSettingsRef.current;

      if (isBefore || !landmarks || landmarks.length < 468) return;

      const pt = (idx: number) => ({
        x: landmarks[idx].x * width,
        y: landmarks[idx].y * height,
      });

      const forehead = pt(10);
      const chin = pt(152);
      const leftTemple = pt(234);
      const rightTemple = pt(454);

      const faceW = Math.max(
        80,
        Math.hypot(rightTemple.x - leftTemple.x, rightTemple.y - leftTemple.y)
      );
      const faceH = Math.max(
        100,
        Math.hypot(chin.x - forehead.x, chin.y - forehead.y)
      );

      const crownCenterX = (leftTemple.x + rightTemple.x) * 0.5;
      const crownCenterY = forehead.y - faceH * 0.24;

      const volumeScale =
        mode === "wig-volume"
          ? 1.24
          : mode === "curls-halo"
          ? 1.18
          : mode === "soft-waves"
          ? 1.12
          : 1.04;

      const rx = faceW * 0.72 * volumeScale;
      const ry = faceH * 0.56 * volumeScale;

      ctx.save();
      ctx.globalAlpha = (intensity / 100) * 0.52;
      ctx.fillStyle = shade.hex;
      ctx.filter = "blur(12px)";

      // Crown & side wig/hair volume
      ctx.beginPath();
      ctx.ellipse(
        crownCenterX,
        crownCenterY,
        rx,
        ry,
        0,
        Math.PI * 0.85,
        Math.PI * 2.15
      );
      ctx.fill();

      // Side hair cascades framing face
      const sideDropY = forehead.y + faceH * 0.48;
      const sideRadiusX = faceW * (mode === "wig-volume" ? 0.26 : 0.19);
      const sideRadiusY = faceH * (mode === "wig-volume" ? 0.54 : 0.42);

      ctx.beginPath();
      ctx.ellipse(
        leftTemple.x - rx * 0.58,
        sideDropY,
        sideRadiusX,
        sideRadiusY,
        0.14,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(
        rightTemple.x + rx * 0.58,
        sideDropY,
        sideRadiusX,
        sideRadiusY,
        -0.14,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Glossy hair & wig shine band
      ctx.filter = "blur(8px)";
      ctx.globalAlpha = (shimmer / 100) * 0.48;
      ctx.strokeStyle = shade.shimmerHex;
      ctx.lineWidth = Math.max(4, width * 0.011);
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.ellipse(
        crownCenterX,
        forehead.y - faceH * 0.08,
        rx * 0.74,
        ry * 0.22,
        0,
        Math.PI * 1.12,
        Math.PI * 1.88
      );
      ctx.stroke();

      // Sparkle glints on hair & wig
      const glints = [
        { x: crownCenterX - rx * 0.35, y: forehead.y - faceH * 0.14 },
        { x: crownCenterX + rx * 0.38, y: forehead.y - faceH * 0.12 },
        { x: leftTemple.x - rx * 0.56, y: forehead.y + faceH * 0.22 },
        { x: rightTemple.x + rx * 0.56, y: forehead.y + faceH * 0.22 },
      ];

      ctx.filter = "none";
      ctx.globalAlpha = (shimmer / 100) * 0.9;
      ctx.fillStyle = shade.shimmerHex;
      glints.forEach((g) => {
        ctx.beginPath();
        ctx.arc(g.x, g.y, Math.max(2.5, width * 0.004), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
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
    setFaceDetected(false);
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

        const detector = landmarkerRef.current;
        if (detector) {
          const res = detector.detectForVideo(video, performance.now());
          const lm = res.faceLandmarks?.[0];
          if (lm) {
            setFaceDetected(true);
            paintHairAndWigShimmer(ctx, w, h, lm);
          } else {
            setFaceDetected(false);
          }
        }
        ctx.restore();
      }
    }

    rafIdRef.current = requestAnimationFrame(loopCameraRender);
  }, [paintHairAndWigShimmer]);

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

        await ensureLandmarker();
        rafIdRef.current = requestAnimationFrame(loopCameraRender);
      } catch {
        setCameraError(
          isArabic
            ? "لم يتم السماح بفتح الكاميرا — اضغطي سماح (Allow) في نافذة المتصفح وجربي مرة أخرى."
            : "Camera access was denied — allow camera permissions in your browser and try again."
        );
      }
    },
    [ensureLandmarker, facingMode, isArabic, loopCameraRender, stopCamera]
  );

  useEffect(() => {
    startCamera("user");
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
    a.download = "orvelia-hair-wig-center.png";
    a.click();
    notify(
      isArabic
        ? "تم الإبقاء على الصورة وتحميلها على جهازك!"
        : "Kept and downloaded your hair & wig photo!"
    );
  };

  const handleDeleteSnappedPhoto = () => {
    setCapturedPhotoUrl("");
    setPhotoDecisionDone(null);
    notify(isArabic ? "تم حذف الصورة الملتقطة." : "Deleted snapped photo.");
  };

  const handleUploadPortrait = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const detector = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          runningMode: "IMAGE",
          numFaces: 1,
        });
        const res = detector.detect(img);
        if (res.faceLandmarks?.[0]) {
          setFaceDetected(true);
          paintHairAndWigShimmer(ctx, img.width, img.height, res.faceLandmarks[0]);
        }
        detector.close();
      } catch {
        // Ignore offline fallback
      }

      setCapturedPhotoUrl(canvas.toDataURL("image/png"));
      setPhotoDecisionDone(null);
      notify(
        isArabic
          ? "تم تطبيق إطلالة الشعر والباروكة اللامعة على الصورة المرفوعة!"
          : "Applied glossy hair & wig look to your uploaded photo!"
      );
    };
    img.src = URL.createObjectURL(file);
  };

  const totalPrice = useMemo(() => selectedShade.priceEgp, [selectedShade]);

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
      {/* Sudden Hair, Wig & Shimmer Burst on Entry */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      >
        {HAIR_WIG_BURST_ITEMS.map((item) => (
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
            className={`fixed select-none drop-shadow-[0_6px_18px_rgba(250,204,21,0.38)] ${item.sizeClass}`}
          >
            {item.glyph}
          </span>
        ))}
      </div>

      {toastMsg && (
        <div className="fixed bottom-5 start-5 z-50 rounded-2xl border border-emerald-400/40 bg-[#0b1222] px-4 py-3 text-xs font-extrabold text-emerald-300 shadow-2xl sm:text-sm">
          ✨ {toastMsg}
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
              <span className="text-cyan-400">/virtual-try-on/hair</span>
            </div>

            <h1 className="mt-1.5 text-2xl font-black sm:text-3xl">
              {isArabic
                ? "مركز الشعر والباروكة اللامعة — Orvelia Hair Center"
                : "Orvelia Hair & Shimmer Wig Center"}
            </h1>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              {isArabic
                ? "جرّبي ألوان الشعر والباروكات واللمعان مباشرة بالكاميرا أو على صورتك."
                : "Try hair colors, full wig volume, and glossy shimmer live on camera or photo."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={triggerHairBurst}
              className={`rounded-2xl border px-3.5 py-2.5 text-xs font-extrabold sm:text-sm ${
                isDark
                  ? "border-amber-400/35 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20"
                  : "border-amber-300 bg-amber-50 text-amber-900"
              }`}
            >
              ✨ {isArabic ? "إطلاق بريق الشعر والباروكة" : "Launch Hair & Shimmer"}
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
              🖼️ {isArabic ? "رفع صورة للتجربة" : "Upload Photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadPortrait}
              className="hidden"
            />
          </div>
        </div>
      </header>

      {/* Hair & Wig Styles Bar */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className={`rounded-2xl border p-4 ${cardSurface}`}>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <span className="text-xs font-extrabold text-amber-300 sm:text-sm">
              💇‍♀️{" "}
              {isArabic
                ? "أنماط الشعر والباروكات واللمعان:"
                : "Hair, Wig & Shimmer Styles:"}
            </span>

            <div className="flex flex-wrap gap-2">
              {HAIR_STYLE_MODES.map((m) => {
                const active = styleMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setStyleMode(m.id);
                      notify(
                        isArabic
                          ? `تم تفعيل نمط "${m.titleAr}"`
                          : `Activated "${m.titleEn}"`
                      );
                    }}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                      active
                        ? "border-amber-400 bg-amber-500/20 text-white"
                        : isDark
                        ? "border-white/10 bg-white/5 text-slate-200 hover:border-amber-400/50 hover:bg-amber-500/10"
                        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-500"
                    }`}
                  >
                    <span>{isArabic ? m.titleAr : m.titleEn}</span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-300">
                      {isArabic ? m.badgeAr : m.badgeEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Hair Center Grid */}
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
                    ? faceDetected
                      ? isArabic
                        ? "تم رصد الوجه — مركز الشعر نشط"
                        : "Face Tracked — Hair Live"
                      : isArabic
                      ? "وجّهي وجهك أمام الكاميرا..."
                      : "Center face in view..."
                    : isArabic
                    ? "جاري تجهيز التتبع..."
                    : "Preparing tracker..."
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
                  alt="Snapped Hair Look"
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

        {/* Hair & Wig Shade Picker Panel (5 Cols) */}
        <aside className="space-y-4 lg:col-span-5">
          <div className={`rounded-3xl border p-5 sm:p-6 ${cardSurface}`}>
            <h2 className="text-lg font-extrabold">
              {isArabic
                ? "درجات الشعر والباروكات واللمعان"
                : "Hair, Wig & Shimmer Shades"}
            </h2>
            <p className={`mt-1 text-xs ${muted}`}>
              {isArabic
                ? "اختاري لون الشعر أو الباروكة واضبطي الكثافة واللمعان."
                : "Pick a hair/wig shade and adjust volume and shimmer."}
            </p>

            <div className={`mt-5 rounded-2xl border p-4 ${subSurface}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-amber-300">
                    {isArabic ? selectedShade.nameAr : selectedShade.nameEn}
                  </span>
                  <p className={`text-[11px] ${muted}`}>
                    {isArabic ? selectedShade.finishAr : selectedShade.finishEn}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-emerald-400">
                  {selectedShade.priceEgp} {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {HAIR_SHADES.map((sh) => {
                  const isChosen = selectedShade.code === sh.code;
                  return (
                    <button
                      key={sh.code}
                      type="button"
                      onClick={() => setSelectedShade(sh)}
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
                          className="h-5 w-5 rounded-full border border-white/30"
                          style={{ backgroundColor: sh.hex }}
                        />
                        <div className="text-start">
                          <div>{isArabic ? sh.nameAr : sh.nameEn}</div>
                          <div className={`text-[10px] font-normal ${muted}`}>
                            {isArabic ? sh.finishAr : sh.finishEn}
                          </div>
                        </div>
                      </div>

                      <span className="font-mono text-[11px] text-amber-300">
                        {sh.code}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 space-y-3 border-t border-white/10 pt-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs font-bold">
                    <span>
                      {isArabic ? "كثافة اللون والباروكة:" : "Shade & Wig Density:"}
                    </span>
                    <span className="text-cyan-400">{hairIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={100}
                    value={hairIntensity}
                    onChange={(e) => setHairIntensity(Number(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs font-bold">
                    <span>
                      {isArabic ? "درجة اللمعان والبريق:" : "Gloss & Shimmer:"}
                    </span>
                    <span className="text-amber-300">{shimmerLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={shimmerLevel}
                    onChange={(e) => setShimmerLevel(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Add Selected Hair Look to Bag */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center justify-between text-sm font-extrabold">
                <span>
                  {isArabic ? "سعر الدرجة / الباروكة:" : "Selected Shade Price:"}
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
                      ? "تمت إضافة درجة الشعر والباروكة اللامعة إلى حقيبة الجمال!"
                      : "Added hair & shimmer wig shade to your beauty bag!"
                  )
                }
                className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 py-3 text-xs font-extrabold text-slate-950 sm:text-sm"
              >
                🛍️{" "}
                {isArabic
                  ? "أضيفي الشعر والباروكة لحقيبة الجمال"
                  : "Add Hair & Wig to Beauty Bag"}
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-10 border-t border-white/10">
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
                      ? "تجربة الجمال والذكاء الاصطناعي"
                      : "AI Beauty & Virtual Try-On Studio"}
                  </p>
                </div>
              </div>

              <p className={`max-w-md text-xs leading-relaxed ${muted}`}>
                {isArabic
                  ? "اكتشفي درجات الشعر والباروكات واللمعان والتجربة المباشرة بالكاميرا بدقة فورية لتختاري الإطلالة الأنسب لكِ بثقة."
                  : "Explore hair shades, full wig styles, and glossy shimmer with real-time camera try-on."}
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
                    className="text-cyan-400 transition hover:underline"
                  >
                    {isArabic ? "مركز المكياج (AR)" : "Makeup Center (AR)"}
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
                    ? "تتم معالجة تتبع الوجه وتطبيق الدرجات محلياً داخل متصفحك، ولكِ حرية حفظ الصورة الملتقطة أو حذفها فوراً."
                    : "Face tracking and shade rendering run locally in your browser—keep or delete any snapshot anytime."}
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
              ORVELIA HAIR STUDIO
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}