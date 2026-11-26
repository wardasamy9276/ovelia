"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useLanguage } from "@/app/context/LanguageContext";

type MakeupLayerKey = "lipstick" | "blush" | "eyeliner" | "concealer";

interface ShadePreset {
  code: string;
  nameAr: string;
  nameEn: string;
  hex: string;
  priceEgp: number;
}

const LAYER_SHADES: Record<
  MakeupLayerKey,
  {
    titleAr: string;
    titleEn: string;
    icon: string;
    shades: ShadePreset[];
  }
> = {
  lipstick: {
    titleAr: "أحمر الشفاه",
    titleEn: "Lipstick",
    icon: "💄",
    shades: [
      { code: "L01", nameAr: "نيود روز دافئ", nameEn: "Warm Nude Rose", hex: "#C97A7E", priceEgp: 580 },
      { code: "L04", nameAr: "توتي مخملي", nameEn: "Velvet Berry", hex: "#9E2A4B", priceEgp: 580 },
      { code: "L09", nameAr: "أحمر كلاسيكي", nameEn: "Classic Crimson", hex: "#B8293D", priceEgp: 580 },
      { code: "L08", nameAr: "كراميل جلوس", nameEn: "Caramel Gloss", hex: "#D4886A", priceEgp: 580 },
    ],
  },
  blush: {
    titleAr: "أحمر الخدود (البلاشر)",
    titleEn: "Cheek Blush",
    icon: "🌸",
    shades: [
      { code: "B01", nameAr: "وردي ناعم", nameEn: "Soft Rose", hex: "#E17B8B", priceEgp: 610 },
      { code: "B03", nameAr: "خوخي مشرق", nameEn: "Radiant Peach", hex: "#F29B7E", priceEgp: 610 },
      { code: "B05", nameAr: "مرجاني دافئ", nameEn: "Warm Coral", hex: "#E86F68", priceEgp: 610 },
    ],
  },
  eyeliner: {
    titleAr: "الآيلاينر والكحل",
    titleEn: "Eyeliner & Kohl",
    icon: "✒️",
    shades: [
      { code: "E01", nameAr: "أسود فاحم 24h", nameEn: "24h Jet Black", hex: "#111827", priceEgp: 520 },
      { code: "E02", nameAr: "بني إسبرسو", nameEn: "Espresso Brown", hex: "#3E2723", priceEgp: 520 },
      { code: "E04", nameAr: "أزرق ليلي", nameEn: "Midnight Navy", hex: "#1E3A8A", priceEgp: 520 },
    ],
  },
  concealer: {
    titleAr: "الكونسيلر والإشراقة",
    titleEn: "Concealer & Glow",
    icon: "🪄",
    shades: [
      { code: "03W", nameAr: "فانيلا دافئة", nameEn: "Warm Vanilla", hex: "#E8C39E", priceEgp: 690 },
      { code: "05N", nameAr: "بيج محايد", nameEn: "Neutral Beige", hex: "#DDA97E", priceEgp: 690 },
      { code: "07C", nameAr: "عاجي بارد", nameEn: "Cool Ivory", hex: "#F0D1B2", priceEgp: 690 },
    ],
  },
};

// MediaPipe FaceMesh landmark indices
const UPPER_LIP_OUTER = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
const LOWER_LIP_OUTER = [291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61];
const UPPER_LIP_INNER = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308];
const LOWER_LIP_INNER = [308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78];

const RIGHT_EYE_UPPER = [33, 246, 161, 160, 159, 158, 157, 173, 133];
const LEFT_EYE_UPPER = [362, 398, 384, 385, 386, 387, 388, 466, 263];

export default function RealCameraTryOnPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [isDark, setIsDark] = useState(true);

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
  const [capturedImageUrl, setCapturedImageUrl] = useState("");
  const [photoKept, setPhotoKept] = useState(false);

  const [activeTab, setActiveTab] = useState<MakeupLayerKey>("lipstick");
  const [enabledLayers, setEnabledLayers] = useState<
    Record<MakeupLayerKey, boolean>
  >({
    lipstick: true,
    blush: true,
    eyeliner: true,
    concealer: true,
  });

  const [selectedShades, setSelectedShades] = useState<
    Record<MakeupLayerKey, ShadePreset>
  >({
    lipstick: LAYER_SHADES.lipstick.shades[1],
    blush: LAYER_SHADES.blush.shades[0],
    eyeliner: LAYER_SHADES.eyeliner.shades[0],
    concealer: LAYER_SHADES.concealer.shades[0],
  });

  const [opacityMap, setOpacityMap] = useState<Record<MakeupLayerKey, number>>({
    lipstick: 58,
    blush: 38,
    eyeliner: 85,
    concealer: 35,
  });

  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Keep latest settings in refs for the 60fps animation loop
  const settingsRef = useRef({
    enabledLayers,
    selectedShades,
    opacityMap,
    showBeforeAfter,
    facingMode,
  });

  useEffect(() => {
    settingsRef.current = {
      enabledLayers,
      selectedShades,
      opacityMap,
      showBeforeAfter,
      facingMode,
    };
  }, [enabledLayers, selectedShades, opacityMap, showBeforeAfter, facingMode]);

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
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? "" : prev));
    }, 3000);
  };

  const initFaceLandmarker = useCallback(async () => {
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

  const drawMakeupOnCanvas = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      landmarks?: { x: number; y: number }[]
    ) => {
      const {
        enabledLayers: layers,
        selectedShades: shades,
        opacityMap: opacities,
        showBeforeAfter: isBefore,
      } = settingsRef.current;

      if (isBefore || !landmarks || landmarks.length < 468) return;

      const toPt = (idx: number) => ({
        x: landmarks[idx].x * width,
        y: landmarks[idx].y * height,
      });

      // 1. Concealer under-eye brightening
      if (layers.concealer) {
        ctx.save();
        ctx.globalAlpha = (opacities.concealer / 100) * 0.45;
        ctx.fillStyle = shades.concealer.hex;
        ctx.filter = "blur(10px)";

        const rightUnderEye = toPt(111);
        const leftUnderEye = toPt(340);
        const eyeSpan = Math.max(16, Math.hypot(toPt(133).x - toPt(33).x, toPt(133).y - toPt(33).y) * 0.42);

        ctx.beginPath();
        ctx.ellipse(rightUnderEye.x, rightUnderEye.y + 6, eyeSpan, eyeSpan * 0.36, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(leftUnderEye.x, leftUnderEye.y + 6, eyeSpan, eyeSpan * 0.36, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Cheek Blush
      if (layers.blush) {
        ctx.save();
        ctx.globalAlpha = (opacities.blush / 100) * 0.52;
        ctx.fillStyle = shades.blush.hex;
        ctx.filter = "blur(16px)";

        const rightCheek = toPt(205);
        const leftCheek = toPt(425);
        const cheekRadius = Math.max(20, Math.hypot(toPt(234).x - toPt(127).x, toPt(234).y - toPt(127).y) * 0.55);

        ctx.beginPath();
        ctx.arc(rightCheek.x, rightCheek.y, cheekRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(leftCheek.x, leftCheek.y, cheekRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Eyeliner along upper lash line + subtle wing
      if (layers.eyeliner) {
        ctx.save();
        ctx.globalAlpha = opacities.eyeliner / 100;
        ctx.strokeStyle = shades.eyeliner.hex;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = Math.max(2, width * 0.0042);

        // Right eye upper lash + wing
        ctx.beginPath();
        RIGHT_EYE_UPPER.forEach((idx, i) => {
          const p = toPt(idx);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        const rOuter = toPt(33);
        ctx.lineTo(rOuter.x - width * 0.014, rOuter.y - height * 0.012);
        ctx.stroke();

        // Left eye upper lash + wing
        ctx.beginPath();
        LEFT_EYE_UPPER.forEach((idx, i) => {
          const p = toPt(idx);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        const lOuter = toPt(263);
        ctx.lineTo(lOuter.x + width * 0.014, lOuter.y - height * 0.012);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Lipstick contour
      if (layers.lipstick) {
        ctx.save();
        ctx.globalAlpha = (opacities.lipstick / 100) * 0.72;
        ctx.fillStyle = shades.lipstick.hex;
        ctx.filter = "blur(1.5px)";

        ctx.beginPath();
        UPPER_LIP_OUTER.forEach((idx, i) => {
          const p = toPt(idx);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        LOWER_LIP_OUTER.slice(1).forEach((idx) => {
          const p = toPt(idx);
          ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();

        // Cut out inner mouth opening
        ctx.moveTo(toPt(UPPER_LIP_INNER[0]).x, toPt(UPPER_LIP_INNER[0]).y);
        UPPER_LIP_INNER.forEach((idx) => {
          const p = toPt(idx);
          ctx.lineTo(p.x, p.y);
        });
        LOWER_LIP_INNER.slice(1).forEach((idx) => {
          const p = toPt(idx);
          ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fill("evenodd");
        ctx.restore();
      }
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

  const renderFrameLoop = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !streamRef.current) return;

    if (video.readyState >= 2) {
      const targetW = video.videoWidth || 640;
      const targetH = video.videoHeight || 480;
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.save();
        if (settingsRef.current.facingMode === "user") {
          ctx.translate(targetW, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, targetW, targetH);

        const detector = landmarkerRef.current;
        if (detector) {
          const result = detector.detectForVideo(video, performance.now());
          const faceLandmarks = result.faceLandmarks?.[0];
          if (faceLandmarks) {
            setFaceDetected(true);
            drawMakeupOnCanvas(ctx, targetW, targetH, faceLandmarks);
          } else {
            setFaceDetected(false);
          }
        }
        ctx.restore();
      }
    }

    rafIdRef.current = requestAnimationFrame(renderFrameLoop);
  }, [drawMakeupOnCanvas]);

  const startCamera = useCallback(
    async (targetFacing: "user" | "environment" = facingMode) => {
      setCameraError("");
      setCapturedImageUrl("");
      setPhotoKept(false);
      stopCamera();

      if (
        typeof navigator === "undefined" ||
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setCameraError(
          isArabic
            ? "المتصفح لا يدعم الوصول للكاميرا مباشرة أو الرابط غير آمن (استخدمي localhost أو https)."
            : "Camera access requires a supported browser over localhost or https."
        );
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: targetFacing,
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

        await initFaceLandmarker();
        rafIdRef.current = requestAnimationFrame(renderFrameLoop);
      } catch {
        setCameraError(
          isArabic
            ? "لم يتم السماح بفتح الكاميرا — اضغطي السماح (Allow) في نافذة المتصفح وجربي مرة أخرى."
            : "Camera permission was denied — allow camera access in your browser prompt and try again."
        );
      }
    },
    [facingMode, initFaceLandmarker, isArabic, renderFrameLoop, stopCamera]
  );

  // Auto-request camera when user opens the page
  useEffect(() => {
    startCamera("user");
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const handleFlipCamera = () => {
    const next = facingMode === "user" ? "environment" : "user";
    setFacingMode(next);
    startCamera(next);
  };

  const handleCapturePhoto = () => {
    const canvas = canvasRef.current;
    if (!canvas || !cameraActive) {
      notify(
        isArabic
          ? "شغّلي الكاميرا أولاً لالتقاط صورة الإطلالة."
          : "Start the camera first to capture your look."
      );
      return;
    }
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImageUrl(dataUrl);
    setPhotoKept(false);
    notify(
      isArabic
        ? "تم التقاط الصورة — اختاري تحت يا إما تخليها أو تحذفيها."
        : "Photo captured — choose below to keep or delete it."
    );
  };

  const handleKeepPhoto = () => {
    if (!capturedImageUrl) return;
    setPhotoKept(true);
    const link = document.createElement("a");
    link.href = capturedImageUrl;
    link.download = "orvelia-ar-look.png";
    link.click();
    notify(
      isArabic
        ? "تم الإبقاء على الصورة وتحميلها على جهازك!"
        : "Photo kept and downloaded to your device!"
    );
  };

  const handleDeletePhoto = () => {
    setCapturedImageUrl("");
    setPhotoKept(false);
    notify(
      isArabic ? "تم حذف الصورة الملتقطة." : "Captured photo deleted."
    );
  };

  const handlePhotoFileApply = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const imageDetector = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          runningMode: "IMAGE",
          numFaces: 1,
        });
        const res = imageDetector.detect(img);
        const landmarks = res.faceLandmarks?.[0];
        if (landmarks) {
          setFaceDetected(true);
          drawMakeupOnCanvas(ctx, img.width, img.height, landmarks);
        }
        imageDetector.close();
      } catch {
        // Ignore if offline
      }

      setCapturedImageUrl(canvas.toDataURL("image/png"));
      setPhotoKept(false);
      notify(
        isArabic
          ? "تم تطبيق درجات المكياج على الصورة المرفوعة!"
          : "Applied makeup shades to your uploaded photo!"
      );
    };
    img.src = URL.createObjectURL(file);
  };

  const totalLookPrice = useMemo(() => {
    return (Object.keys(enabledLayers) as MakeupLayerKey[]).reduce(
      (sum, k) => (enabledLayers[k] ? sum + selectedShades[k].priceEgp : sum),
      0
    );
  }, [enabledLayers, selectedShades]);

  const pageBg = isDark ? "bg-[#040710] text-white" : "bg-slate-50 text-slate-900";
  const cardSurface = isDark
    ? "bg-[#0a101f]/95 border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-sm";
  const subSurface = isDark
    ? "bg-[#060a14] border-white/10"
    : "bg-slate-100/80 border-slate-200";
  const muted = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div dir={dir} className={`min-h-screen transition-colors ${pageBg}`}>
      {toastMsg && (
        <div className="fixed bottom-5 start-5 z-50 rounded-2xl border border-emerald-400/40 bg-[#0b1222] px-4 py-3 text-xs font-extrabold text-emerald-300 shadow-2xl sm:text-sm">
          ✨ {toastMsg}
        </div>
      )}

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold">
              <Link href="/beauty" className="text-amber-400 hover:underline">
                {isArabic ? "← عالم الجمال" : "← Beauty World"}
              </Link>
              <span className={muted}>/</span>
              <span className="text-cyan-400">
                {isArabic ? "التجربة المباشرة بالكاميرا" : "Live Camera Try-On"}
              </span>
            </div>
            <h1 className="mt-1.5 text-2xl font-black sm:text-3xl">
              {isArabic
                ? "جرّبي الإطلالة كاملة قدام الكاميرا الآن"
                : "Try the Full Look Live on Your Camera"}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
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
              🖼️ {isArabic ? "تجربة على صورة" : "Try on Photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoFileApply}
              className="hidden"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Live Camera Canvas Viewport */}
        <section className="space-y-4 lg:col-span-7">
          {cameraError && (
            <div className="rounded-2xl border border-amber-400/40 bg-amber-500/15 p-4 text-xs font-bold text-amber-200">
              ⚠️ {cameraError}
            </div>
          )}

          <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-black shadow-2xl ${cardSurface}`}>
            {/* Hidden source video */}
            <video ref={videoRef} playsInline muted className="hidden" />

            {/* Live rendered canvas */}
            <canvas
              ref={canvasRef}
              className="h-full w-full object-cover"
            />

            {/* Status & Controls Bar */}
            <div className="absolute top-4 start-4 end-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
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
                          ? "تم رصد الوجه — تطبيق مباشر"
                          : "Face Tracked — Live AR"
                        : isArabic
                        ? "وجّهي وجهك للكاميرا..."
                        : "Align face in frame..."
                      : isArabic
                      ? "جاري تحميل تتبع الوجه..."
                      : "Loading face tracker..."
                    : isArabic
                    ? "الكاميرا متوقفة"
                    : "Camera Off"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {cameraActive && (
                  <>
                    <button
                      type="button"
                      onClick={handleFlipCamera}
                      className="rounded-xl border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md"
                    >
                      🔄 {isArabic ? "تبديل الكاميرا" : "Flip"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCapturePhoto}
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
                  onClick={() => setShowBeforeAfter((p) => !p)}
                  className="rounded-xl border border-amber-400/40 bg-black/70 px-3 py-1.5 text-xs font-extrabold text-amber-300 backdrop-blur-md"
                >
                  👁️ {isArabic ? "قبل / بعد" : "Before / After"}
                </button>
              </div>
            </div>
          </div>

          {/* Captured Photo Decision Bar: Keep or Delete */}
          {capturedImageUrl && (
            <div className={`flex flex-col justify-between gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center ${cardSurface}`}>
              <div className="flex items-center gap-3">
                <img
                  src={capturedImageUrl}
                  alt="Captured Look"
                  className="h-16 w-16 rounded-xl border border-white/15 object-cover"
                />
                <div>
                  <p className="text-xs font-extrabold sm:text-sm">
                    {photoKept
                      ? isArabic
                        ? "تم الإبقاء على الصورة ✓"
                        : "Photo Kept ✓"
                      : isArabic
                      ? "تم التقاط الصورة — تحبي تخليها ولا تحذفيها؟"
                      : "Photo captured — keep it or delete it?"}
                  </p>
                  <p className={`text-[11px] ${muted}`}>
                    {isArabic
                      ? "حذف» يحفظ وينزّل الصورة، و«احذفها» يمسحها فوراً."
                      : "Keep saves & downloads the photo; Delete discards it immediately."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleKeepPhoto}
                  className="rounded-xl bg-emerald-400 px-4 py-2 text-xs font-extrabold text-slate-950 transition hover:opacity-95"
                >
                  ✓ {isArabic ? "حفظ" : "Keep Photo"}
                </button>

                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  className="rounded-xl border border-rose-400/40 bg-rose-500/15 px-4 py-2 text-xs font-extrabold text-rose-300 transition hover:bg-rose-500/25"
                >
                  🗑️ {isArabic ? "احذفها" : "Delete"}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Shade & Layer Controls */}
        <aside className="space-y-4 lg:col-span-5">
          <div className={`rounded-3xl border p-5 sm:p-6 ${cardSurface}`}>
            <h2 className="text-lg font-extrabold">
              {isArabic ? "درجات المكياج على الكاميرا" : "Live Camera Shade Controls"}
            </h2>
            <p className={`mt-1 text-xs ${muted}`}>
              {isArabic
                ? "بدّلي بين الشفاه، البلاشر، الآيلاينر، والكونسيلر وشوفي النتيجة فوراً."
                : "Switch between lips, blush, eyeliner, and concealer in real time."}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {(Object.keys(LAYER_SHADES) as MakeupLayerKey[]).map((key) => {
                const layer = LAYER_SHADES[key];
                const isTab = activeTab === key;
                return (
                  <div
                    key={key}
                    className={`flex items-center justify-between rounded-2xl border p-2.5 ${
                      isTab
                        ? "border-amber-400 bg-amber-500/15"
                        : isDark
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTab(key)}
                      className="flex items-center gap-2 text-start text-xs font-extrabold"
                    >
                      <span>{layer.icon}</span>
                      <span>{isArabic ? layer.titleAr : layer.titleEn}</span>
                    </button>
                    <input
                      type="checkbox"
                      checked={enabledLayers[key]}
                      onChange={(e) =>
                        setEnabledLayers((prev) => ({
                          ...prev,
                          [key]: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 cursor-pointer accent-emerald-400"
                    />
                  </div>
                );
              })}
            </div>

            <div className={`mt-5 rounded-2xl border p-4 ${subSurface}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-300">
                  {isArabic
                    ? `درجات ${LAYER_SHADES[activeTab].titleAr}:`
                    : `${LAYER_SHADES[activeTab].titleEn} Shades:`}
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {selectedShades[activeTab].priceEgp}{" "}
                  {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {LAYER_SHADES[activeTab].shades.map((sh) => {
                  const active = selectedShades[activeTab].code === sh.code;
                  return (
                    <button
                      key={sh.code}
                      type="button"
                      onClick={() => {
                        setSelectedShades((prev) => ({ ...prev, [activeTab]: sh }));
                        setEnabledLayers((prev) => ({ ...prev, [activeTab]: true }));
                      }}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                        active
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
                        <span>{isArabic ? sh.nameAr : sh.nameEn}</span>
                      </div>
                      <span className="font-mono text-[11px] text-amber-300">
                        {sh.code}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="mb-1 flex justify-between text-xs font-bold">
                  <span>{isArabic ? "كثافة اللون:" : "Intensity:"}</span>
                  <span className="text-cyan-400">{opacityMap[activeTab]}%</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={100}
                  value={opacityMap[activeTab]}
                  onChange={(e) =>
                    setOpacityMap((prev) => ({
                      ...prev,
                      [activeTab]: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-amber-400"
                />
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center justify-between text-sm font-extrabold">
                <span>{isArabic ? "إجمالي الإطلالة:" : "Look Total:"}</span>
                <span className="text-lg text-emerald-400">
                  {totalLookPrice.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  notify(
                    isArabic
                      ? "تمت إضافة الدرجات المختارة من الكاميرا إلى حقيبة الجمال!"
                      : "Added your live try-on shades to your beauty bag!"
                  )
                }
                className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 py-3 text-xs font-extrabold text-slate-950 sm:text-sm"
              >
                🛍️{" "}
                {isArabic
                  ? "أضيفي الإطلالة لحقيبة الجمال"
                  : "Add Look to Beauty Bag"}
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}