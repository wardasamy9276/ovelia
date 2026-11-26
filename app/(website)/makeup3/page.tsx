"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useLanguage } from "@/app/context/LanguageContext";
import AccessoriesShowcase from "./accessories"

type AccessoryZoneKey = "earrings" | "necklace" | "tiara" | "sunglasses";

interface AccessoryPieceOption {
  code: string;
  nameAr: string;
  nameEn: string;
  materialAr: string;
  materialEn: string;
  primaryHex: string;
  accentHex: string;
  priceEgp: number;
}

interface AccessoryPresetSet {
  id: string;
  nameAr: string;
  nameEn: string;
  badgeAr: string;
  badgeEn: string;
  pieces: Record<AccessoryZoneKey, AccessoryPieceOption>;
}

interface AccessoryBurstItem {
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

const ACCESSORY_ZONES: Record<
  AccessoryZoneKey,
  {
    titleAr: string;
    titleEn: string;
    icon: string;
    descAr: string;
    descEn: string;
    pieces: AccessoryPieceOption[];
  }
> = {
  earrings: {
    titleAr: "الأقراط الفاخرة",
    titleEn: "Luxury Earrings",
    icon: "💎",
    descAr: "أقراط كريستال وذهب متدلية تضيء ملامحك",
    descEn: "Drop crystal & gold earrings framing your face",
    pieces: [
      {
        code: "ER01",
        nameAr: "دمعة الألماس الملكي",
        nameEn: "Royal Diamond Drop",
        materialAr: "فضة مطلية بلاتين وكريستال",
        materialEn: "Platinum-Plated & Crystal",
        primaryHex: "#E2E8F0",
        accentHex: "#67E8F9",
        priceEgp: 950,
      },
      {
        code: "ER02",
        nameAr: "لؤلؤ ذهبي كلاسيك",
        nameEn: "Golden Pearl Classic",
        materialAr: "ذهب عيار 18 مطلي ولؤلؤ",
        materialEn: "18K Gold Vermeil & Pearl",
        primaryHex: "#FBBF24",
        accentHex: "#FFFBEB",
        priceEgp: 1050,
      },
      {
        code: "ER03",
        nameAr: "زمرد السهرة",
        nameEn: "Emerald Evening Drop",
        materialAr: "ذهب وردي وحجر زمرد",
        materialEn: "Rose Gold & Emerald",
        primaryHex: "#34D399",
        accentHex: "#FDE68A",
        priceEgp: 1120,
      },
    ],
  },
  necklace: {
    titleAr: "العقد والقلادة",
    titleEn: "Necklace & Pendant",
    icon: "📿",
    descAr: "سلاسل وقلادات رقيقة مرصعة ببريق ناعم",
    descEn: "Delicate chains & luminous pendants",
    pieces: [
      {
        code: "NK01",
        nameAr: "قلادة نجمة أورفيليا",
        nameEn: "Orvelia Star Pendant",
        materialAr: "ذهب أصفر لامع",
        materialEn: "Polished Yellow Gold",
        primaryHex: "#F59E0B",
        accentHex: "#FEF08A",
        priceEgp: 1250,
      },
      {
        code: "NK02",
        nameAr: "تشوكر كريستال ناعم",
        nameEn: "Crystal Halo Choker",
        materialAr: "بلاتين وفصوص زركون",
        materialEn: "Platinum & Zirconia",
        primaryHex: "#CBD5E1",
        accentHex: "#38BDF8",
        priceEgp: 1380,
      },
      {
        code: "NK03",
        nameAr: "لؤلؤة الفجر الوردية",
        nameEn: "Rose Dawn Pearl",
        materialAr: "ذهب وردي ولؤلؤ طبيعي",
        materialEn: "Rose Gold & Freshwater Pearl",
        primaryHex: "#F472B6",
        accentHex: "#FDF2F8",
        priceEgp: 1190,
      },
    ],
  },
  tiara: {
    titleAr: "التاج وطوق الرأس",
    titleEn: "Tiara & Headband",
    icon: "👑",
    descAr: "تيجان وأطواق مرصعة للمناسبات والسهرات",
    descEn: "Jeweled tiaras & satin headbands",
    pieces: [
      {
        code: "TR01",
        nameAr: "تاج الأميرة الذهبي",
        nameEn: "Golden Princess Tiara",
        materialAr: "ذهب مطلي وكريستال شامبين",
        materialEn: "Gold Plated & Champagne Crystal",
        primaryHex: "#FBBF24",
        accentHex: "#FEF3C7",
        priceEgp: 1450,
      },
      {
        code: "TR02",
        nameAr: "طوق اللؤلؤ الماسي",
        nameEn: "Diamond Pearl Crown",
        materialAr: "فضة إسترليني ولؤلؤ",
        materialEn: "Sterling Silver & Pearl",
        primaryHex: "#E2E8F0",
        accentHex: "#A5F3FC",
        priceEgp: 1320,
      },
    ],
  },
  sunglasses: {
    titleAr: "النظارات الشمسية",
    titleEn: "Designer Sunglasses",
    icon: "🕶️",
    descAr: "إطارات عصرية وعدسات متدرجة بإطار ذهبي",
    descEn: "Chic frames & tinted gold-rimmed lenses",
    pieces: [
      {
        code: "SG01",
        nameAr: "كات آي أسود وذهب",
        nameEn: "Noir Gold Cat-Eye",
        materialAr: "أسيتات فاخر وذراع ذهبي",
        materialEn: "Luxury Acetate & Gold Temple",
        primaryHex: "#111827",
        accentHex: "#FBBF24",
        priceEgp: 1590,
      },
      {
        code: "SG02",
        nameAr: "عدسة عسلية دافئة",
        nameEn: "Amber Glow Aviator",
        materialAr: "إطار معدني ذهبي وعدسة UV",
        materialEn: "Gold Wireframe & UV Tint",
        primaryHex: "#92400E",
        accentHex: "#FDE68A",
        priceEgp: 1490,
      },
      {
        code: "SG03",
        nameAr: "وردي كريستالي شفاف",
        nameEn: "Rose Crystal Frame",
        materialAr: "إطار وردي شفاف وعدسة متدرجة",
        materialEn: "Translucent Rose & Gradient Tint",
        primaryHex: "#9D174D",
        accentHex: "#FBCFE8",
        priceEgp: 1540,
      },
    ],
  },
};

const QUICK_ACCESSORY_SETS: AccessoryPresetSet[] = [
  {
    id: "set-royal",
    nameAr: "طقم السهرة الملكي",
    nameEn: "Royal Evening Set",
    badgeAr: "سهرة",
    badgeEn: "Gala",
    pieces: {
      earrings: ACCESSORY_ZONES.earrings.pieces[0],
      necklace: ACCESSORY_ZONES.necklace.pieces[1],
      tiara: ACCESSORY_ZONES.tiara.pieces[1],
      sunglasses: ACCESSORY_ZONES.sunglasses.pieces[0],
    },
  },
  {
    id: "set-golden",
    nameAr: "طقم الذهب واللؤلؤ",
    nameEn: "Gold & Pearl Ensemble",
    badgeAr: "كلاسيك",
    badgeEn: "Classic",
    pieces: {
      earrings: ACCESSORY_ZONES.earrings.pieces[1],
      necklace: ACCESSORY_ZONES.necklace.pieces[0],
      tiara: ACCESSORY_ZONES.tiara.pieces[0],
      sunglasses: ACCESSORY_ZONES.sunglasses.pieces[1],
    },
  },
  {
    id: "set-chic",
    nameAr: "إطلالة النهار العصرية",
    nameEn: "Chic Daytime Glam",
    badgeAr: "يومي",
    badgeEn: "Chic",
    pieces: {
      earrings: ACCESSORY_ZONES.earrings.pieces[2],
      necklace: ACCESSORY_ZONES.necklace.pieces[2],
      tiara: ACCESSORY_ZONES.tiara.pieces[0],
      sunglasses: ACCESSORY_ZONES.sunglasses.pieces[2],
    },
  },
];

// Sudden jewelry, crown, ring, sunglasses & sparkle burst on entry
const ACCESSORY_BURST_ITEMS: AccessoryBurstItem[] = [
  { id: "ac1", glyph: "💎", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "40vh", endX: "5vw", endY: "15vh", rotateDeg: -18, delayMs: 0 },
  { id: "ac2", glyph: "👑", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "40vh", endX: "92vw", endY: "16vh", rotateDeg: 22, delayMs: 20 },
  { id: "ac3", glyph: "💍", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "40vh", endX: "3.5vw", endY: "44vh", rotateDeg: -15, delayMs: 40 },
  { id: "ac4", glyph: "🕶️", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "40vh", endX: "94vw", endY: "45vh", rotateDeg: 16, delayMs: 60 },
  { id: "ac5", glyph: "📿", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "40vh", endX: "6vw", endY: "75vh", rotateDeg: 18, delayMs: 80 },
  { id: "ac6", glyph: "✨", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "40vh", endX: "91vw", endY: "76vh", rotateDeg: -20, delayMs: 100 },
  { id: "ac7", glyph: "💫", sizeClass: "text-lg sm:text-xl", startX: "50vw", startY: "40vh", endX: "19vw", endY: "91vh", rotateDeg: -12, delayMs: 120 },
  { id: "ac8", glyph: "💎", sizeClass: "text-lg sm:text-xl", startX: "50vw", startY: "40vh", endX: "80vw", endY: "91vh", rotateDeg: 15, delayMs: 140 },
];

export default function AccessoriesCenterPage() {
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

  const [activeZone, setActiveZone] = useState<AccessoryZoneKey>("earrings");
  const [enabledZones, setEnabledZones] = useState<
    Record<AccessoryZoneKey, boolean>
  >({
    earrings: true,
    necklace: true,
    tiara: false,
    sunglasses: false,
  });

  const [selectedPieces, setSelectedPieces] = useState<
    Record<AccessoryZoneKey, AccessoryPieceOption>
  >({
    earrings: ACCESSORY_ZONES.earrings.pieces[0],
    necklace: ACCESSORY_ZONES.necklace.pieces[0],
    tiara: ACCESSORY_ZONES.tiara.pieces[0],
    sunglasses: ACCESSORY_ZONES.sunglasses.pieces[0],
  });

  const [scaleMap, setScaleMap] = useState<Record<AccessoryZoneKey, number>>({
    earrings: 65,
    necklace: 60,
    tiara: 65,
    sunglasses: 70,
  });

  const [sparkleIntensity, setSparkleIntensity] = useState(75);
  const [beforeAfterMode, setBeforeAfterMode] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const triggerAccessoryBurst = useCallback(() => {
    setBurstActive(false);
    const frame = requestAnimationFrame(() => {
      setTimeout(() => {
        setBurstActive(true);
      }, 25);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const cleanup = triggerAccessoryBurst();
    return cleanup;
  }, [triggerAccessoryBurst]);

  const liveSettingsRef = useRef({
    enabledZones,
    selectedPieces,
    scaleMap,
    sparkleIntensity,
    beforeAfterMode,
    facingMode,
  });

  useEffect(() => {
    liveSettingsRef.current = {
      enabledZones,
      selectedPieces,
      scaleMap,
      sparkleIntensity,
      beforeAfterMode,
      facingMode,
    };
  }, [
    enabledZones,
    selectedPieces,
    scaleMap,
    sparkleIntensity,
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

  const paintAccessoriesOnFace = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      landmarks?: { x: number; y: number }[]
    ) => {
      const {
        enabledZones: zones,
        selectedPieces: pieces,
        scaleMap: scales,
        sparkleIntensity: sparkle,
        beforeAfterMode: isBefore,
      } = liveSettingsRef.current;

      if (isBefore || !landmarks || landmarks.length < 468) return;

      const pt = (idx: number) => ({
        x: landmarks[idx].x * width,
        y: landmarks[idx].y * height,
      });

      const forehead = pt(10);
      const chin = pt(152);
      const leftEar = pt(234);
      const rightEar = pt(454);
      const leftEyeOuter = pt(33);
      const rightEyeOuter = pt(263);
      const noseBridge = pt(168);

      const faceW = Math.max(
        80,
        Math.hypot(rightEar.x - leftEar.x, rightEar.y - leftEar.y)
      );
      const faceH = Math.max(
        100,
        Math.hypot(chin.x - forehead.x, chin.y - forehead.y)
      );

      // 1. Tiara / Crown above forehead
      if (zones.tiara) {
        const piece = pieces.tiara;
        const scale = 0.75 + (scales.tiara / 100) * 0.5;
        const cx = (leftEar.x + rightEar.x) * 0.5;
        const cy = forehead.y - faceH * 0.14;
        const halfSpan = faceW * 0.44 * scale;

        ctx.save();
        ctx.strokeStyle = piece.primaryHex;
        ctx.lineWidth = Math.max(3, width * 0.005);
        ctx.shadowColor = piece.accentHex;
        ctx.shadowBlur = (sparkle / 100) * 14;

        ctx.beginPath();
        ctx.moveTo(cx - halfSpan, cy + faceH * 0.06);
        ctx.lineTo(cx - halfSpan * 0.55, cy - faceH * 0.06);
        ctx.lineTo(cx - halfSpan * 0.25, cy + faceH * 0.01);
        ctx.lineTo(cx, cy - faceH * 0.12);
        ctx.lineTo(cx + halfSpan * 0.25, cy + faceH * 0.01);
        ctx.lineTo(cx + halfSpan * 0.55, cy - faceH * 0.06);
        ctx.lineTo(cx + halfSpan, cy + faceH * 0.06);
        ctx.stroke();

        // Gemstones on tiara peaks
        const gems = [
          { x: cx, y: cy - faceH * 0.12, r: 5 * scale },
          { x: cx - halfSpan * 0.55, y: cy - faceH * 0.06, r: 3.8 * scale },
          { x: cx + halfSpan * 0.55, y: cy - faceH * 0.06, r: 3.8 * scale },
        ];
        ctx.fillStyle = piece.accentHex;
        gems.forEach((g) => {
          ctx.beginPath();
          ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // 2. Designer Sunglasses across eyes
      if (zones.sunglasses) {
        const piece = pieces.sunglasses;
        const scale = 0.85 + (scales.sunglasses / 100) * 0.35;
        const eyeDist = Math.hypot(
          rightEyeOuter.x - leftEyeOuter.x,
          rightEyeOuter.y - leftEyeOuter.y
        );
        const lensW = eyeDist * 0.48 * scale;
        const lensH = lensW * 0.62;
        const leftLensX = noseBridge.x - eyeDist * 0.27;
        const rightLensX = noseBridge.x + eyeDist * 0.27;
        const lensY = noseBridge.y + faceH * 0.02;

        ctx.save();
        ctx.fillStyle = piece.primaryHex;
        ctx.globalAlpha = 0.82;
        ctx.strokeStyle = piece.accentHex;
        ctx.lineWidth = Math.max(2.5, width * 0.004);

        // Left lens
        ctx.beginPath();
        ctx.roundRect(leftLensX - lensW * 0.5, lensY - lensH * 0.5, lensW, lensH, 14);
        ctx.fill();
        ctx.stroke();

        // Right lens
        ctx.beginPath();
        ctx.roundRect(rightLensX - lensW * 0.5, lensY - lensH * 0.5, lensW, lensH, 14);
        ctx.fill();
        ctx.stroke();

        // Bridge bar
        ctx.beginPath();
        ctx.moveTo(leftLensX + lensW * 0.5, lensY - lensH * 0.15);
        ctx.lineTo(rightLensX - lensW * 0.5, lensY - lensH * 0.15);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Luxury Drop Earrings near earlobes
      if (zones.earrings) {
        const piece = pieces.earrings;
        const scale = 0.75 + (scales.earrings / 100) * 0.65;
        const dropLen = faceH * 0.15 * scale;
        const gemR = Math.max(5, faceW * 0.032 * scale);

        const ears = [
          { x: leftEar.x - faceW * 0.04, y: leftEar.y + faceH * 0.08 },
          { x: rightEar.x + faceW * 0.04, y: rightEar.y + faceH * 0.08 },
        ];

        ctx.save();
        ctx.strokeStyle = piece.primaryHex;
        ctx.lineWidth = Math.max(2, width * 0.0035);
        ctx.shadowColor = piece.accentHex;
        ctx.shadowBlur = (sparkle / 100) * 16;

        ears.forEach((ear) => {
          // Stud
          ctx.fillStyle = piece.primaryHex;
          ctx.beginPath();
          ctx.arc(ear.x, ear.y, gemR * 0.45, 0, Math.PI * 2);
          ctx.fill();

          // Drop chain
          ctx.beginPath();
          ctx.moveTo(ear.x, ear.y);
          ctx.lineTo(ear.x, ear.y + dropLen);
          ctx.stroke();

          // Teardrop crystal/pearl
          ctx.fillStyle = piece.accentHex;
          ctx.beginPath();
          ctx.ellipse(
            ear.x,
            ear.y + dropLen + gemR * 0.6,
            gemR * 0.72,
            gemR,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });
        ctx.restore();
      }

      // 4. Necklace & Pendant below chin
      if (zones.necklace) {
        const piece = pieces.necklace;
        const scale = 0.8 + (scales.necklace / 100) * 0.45;
        const neckCenterX = chin.x;
        const neckTopY = chin.y + faceH * 0.24;
        const chainHalfW = faceW * 0.56 * scale;
        const dropY = neckTopY + faceH * 0.16 * scale;

        ctx.save();
        ctx.strokeStyle = piece.primaryHex;
        ctx.lineWidth = Math.max(2.5, width * 0.004);
        ctx.shadowColor = piece.accentHex;
        ctx.shadowBlur = (sparkle / 100) * 14;

        ctx.beginPath();
        ctx.moveTo(neckCenterX - chainHalfW, neckTopY - faceH * 0.06);
        ctx.quadraticCurveTo(neckCenterX, dropY, neckCenterX + chainHalfW, neckTopY - faceH * 0.06);
        ctx.stroke();

        // Pendant charm
        const charmR = Math.max(6, faceW * 0.042 * scale);
        ctx.fillStyle = piece.accentHex;
        ctx.beginPath();
        ctx.arc(neckCenterX, dropY - faceH * 0.025, charmR, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = piece.primaryHex;
        ctx.stroke();
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
            paintAccessoriesOnFace(ctx, w, h, lm);
          } else {
            setFaceDetected(false);
          }
        }
        ctx.restore();
      }
    }

    rafIdRef.current = requestAnimationFrame(loopCameraRender);
  }, [paintAccessoriesOnFace]);

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
    a.download = "orvelia-accessories-center.png";
    a.click();
    notify(
      isArabic
        ? "تم الإبقاء على الصورة وتحميلها على جهازك!"
        : "Kept and downloaded your accessories photo!"
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
          paintAccessoriesOnFace(ctx, img.width, img.height, res.faceLandmarks[0]);
        }
        detector.close();
      } catch {
        // Ignore offline fallback
      }

      setCapturedPhotoUrl(canvas.toDataURL("image/png"));
      setPhotoDecisionDone(null);
      notify(
        isArabic
          ? "تم تركيب قطع الإكسسوارات المختارة على صورتك!"
          : "Applied selected accessories to your uploaded photo!"
      );
    };
    img.src = URL.createObjectURL(file);
  };

  const applyAccessorySet = (preset: AccessoryPresetSet) => {
    setSelectedPieces(preset.pieces);
    setEnabledZones({
      earrings: true,
      necklace: true,
      tiara: true,
      sunglasses: false,
    });
    notify(
      isArabic
        ? `تم تطبيق "${preset.nameAr}" على إطلالتك!`
        : `Applied "${preset.nameEn}" set!`
    );
  };

  const totalAccessoriesPrice = useMemo(() => {
    return (Object.keys(enabledZones) as AccessoryZoneKey[]).reduce(
      (acc, k) => (enabledZones[k] ? acc + selectedPieces[k].priceEgp : acc),
      0
    );
  }, [enabledZones, selectedPieces]);

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
      {/* Sudden Luxury Accessories Burst on Entry */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      >
        {ACCESSORY_BURST_ITEMS.map((item) => (
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
            className={`fixed select-none drop-shadow-[0_6px_18px_rgba(251,191,36,0.35)] ${item.sizeClass}`}
          >
            {item.glyph}
          </span>
        ))}
      </div>

      {toastMsg && (
        <div className="fixed bottom-5 start-5 z-50 rounded-2xl border border-emerald-400/40 bg-[#0b1222] px-4 py-3 text-xs font-extrabold text-emerald-300 shadow-2xl sm:text-sm">
          💎 {toastMsg}
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
              <span className="text-cyan-400">/accessories</span>
            </div>

            <h1 className="mt-1.5 text-2xl font-black sm:text-3xl">
              {isArabic
                ? "مركز الإكسسوارات والمجوهرات — Orvelia Accessories Center"
                : "Orvelia Accessories & Jewelry Center"}
            </h1>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              {isArabic
                ? "جرّبي الأقراط، القلادات، التيجان، والنظارات الفاخرة مباشرة بالكاميرا أو على صورتك."
                : "Try luxury earrings, pendants, tiaras, and sunglasses live on camera or photo."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={triggerAccessoryBurst}
              className={`rounded-2xl border px-3.5 py-2.5 text-xs font-extrabold sm:text-sm ${
                isDark
                  ? "border-amber-400/35 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20"
                  : "border-amber-300 bg-amber-50 text-amber-900"
              }`}
            >
              💎 {isArabic ? "إطلاق بريق الإكسسوارات" : "Launch Jewelry Sparkle"}
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

      {/* Curated Sets Bar */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className={`rounded-2xl border p-4 ${cardSurface}`}>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <span className="text-xs font-extrabold text-amber-300 sm:text-sm">
              👑{" "}
              {isArabic
                ? "أطقم مجوهرات وإكسسوارات جاهزة:"
                : "Curated Jewelry & Accessory Sets:"}
            </span>

            <div className="flex flex-wrap gap-2">
              {QUICK_ACCESSORY_SETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyAccessorySet(preset)}
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

      {/* Main Accessories Center Grid */}
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
                        ? "تم رصد الوجه — مركز الإكسسوارات نشط"
                        : "Face Tracked — Accessories Live"
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
                  alt="Snapped Accessories Look"
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
                      ? "اختاري «حذف» لحفظ وتنزيل الصورة، أو «احذفها» لإزالتها."
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
                  ✓ {isArabic ? "حذف" : "Keep"}
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

        {/* Accessories Zones & Piece Picker Panel (5 Cols) */}
        <aside className="space-y-4 lg:col-span-5">
          <div className={`rounded-3xl border p-5 sm:p-6 ${cardSurface}`}>
            <h2 className="text-lg font-extrabold">
              {isArabic
                ? "أقسام وقطع مركز الإكسسوارات"
                : "Accessories Center Zones & Pieces"}
            </h2>
            <p className={`mt-1 text-xs ${muted}`}>
              {isArabic
                ? "اختاري القسم والقطعة واضبطي المقاس وبريق اللمعان."
                : "Select a category, pick your piece, and customize scale & shine."}
            </p>

            {/* Zone Tabs */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(Object.keys(ACCESSORY_ZONES) as AccessoryZoneKey[]).map(
                (zoneKey) => {
                  const z = ACCESSORY_ZONES[zoneKey];
                  const active = activeZone === zoneKey;
                  return (
                    <div
                      key={zoneKey}
                      className={`flex items-center justify-between rounded-2xl border p-2.5 ${
                        active
                          ? "border-amber-400 bg-amber-500/15"
                          : isDark
                          ? "border-white/10 bg-white/[0.03]"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveZone(zoneKey)}
                        className="flex items-center gap-2 text-start text-xs font-extrabold"
                      >
                        <span>{z.icon}</span>
                        <span>{isArabic ? z.titleAr : z.titleEn}</span>
                      </button>

                      <input
                        type="checkbox"
                        checked={enabledZones[zoneKey]}
                        onChange={(e) =>
                          setEnabledZones((prev) => ({
                            ...prev,
                            [zoneKey]: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 cursor-pointer accent-emerald-400"
                      />
                    </div>
                  );
                }
              )}
            </div>

            {/* Active Zone Pieces & Controls */}
            <div className={`mt-5 rounded-2xl border p-4 ${subSurface}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-amber-300">
                    {isArabic
                      ? ACCESSORY_ZONES[activeZone].titleAr
                      : ACCESSORY_ZONES[activeZone].titleEn}
                  </span>
                  <p className={`text-[11px] ${muted}`}>
                    {isArabic
                      ? ACCESSORY_ZONES[activeZone].descAr
                      : ACCESSORY_ZONES[activeZone].descEn}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-emerald-400">
                  {selectedPieces[activeZone].priceEgp}{" "}
                  {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {ACCESSORY_ZONES[activeZone].pieces.map((item) => {
                  const isChosen =
                    selectedPieces[activeZone].code === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        setSelectedPieces((prev) => ({
                          ...prev,
                          [activeZone]: item,
                        }));
                        setEnabledZones((prev) => ({
                          ...prev,
                          [activeZone]: true,
                        }));
                      }}
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
                            background: `linear-gradient(135deg, ${item.primaryHex}, ${item.accentHex})`,
                          }}
                        />
                        <div className="text-start">
                          <div>{isArabic ? item.nameAr : item.nameEn}</div>
                          <div className={`text-[10px] font-normal ${muted}`}>
                            {isArabic ? item.materialAr : item.materialEn}
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
                    <span>{isArabic ? "حجم القطعة:" : "Piece Scale:"}</span>
                    <span className="text-cyan-400">
                      {scaleMap[activeZone]}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={25}
                    max={100}
                    value={scaleMap[activeZone]}
                    onChange={(e) =>
                      setScaleMap((prev) => ({
                        ...prev,
                        [activeZone]: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-amber-400"
                  />
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs font-bold">
                    <span>
                      {isArabic ? "بريق ولمعان الأحجار:" : "Gemstone Sparkle:"}
                    </span>
                    <span className="text-amber-300">{sparkleIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={100}
                    value={sparkleIntensity}
                    onChange={(e) =>
                      setSparkleIntensity(Number(e.target.value))
                    }
                    className="w-full accent-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Add Selected Accessories to Bag */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center justify-between text-sm font-extrabold">
                <span>
                  {isArabic
                    ? "إجمالي القطع المفعّلة:"
                    : "Active Pieces Total:"}
                </span>
                <span className="text-lg text-emerald-400">
                  {totalAccessoriesPrice.toLocaleString()}{" "}
                  {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  notify(
                    isArabic
                      ? "تمت إضافة قطع الإكسسوارات المختارة إلى حقيبتك!"
                      : "Added selected accessory pieces to your bag!"
                  )
                }
                className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 py-3 text-xs font-extrabold text-slate-950 sm:text-sm"
              >
                🛍️{" "}
                {isArabic
                  ? "أضيفي الإكسسوارات لحقيبة التسوق"
                  : "Add Accessories to Bag"}
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
                      ? "تجربة الجمال والإكسسوارات بالذكاء الاصطناعي"
                      : "AI Beauty & Virtual Accessories Studio"}
                  </p>
                </div>
              </div>

              <p className={`max-w-md text-xs leading-relaxed ${muted}`}>
                {isArabic
                  ? "اكتشفي أحدث تشكيلات الأقراط، القلادات، التيجان، والنظارات وجرّبيها مباشرة بالكاميرا بدقة فورية."
                  : "Discover curated earrings, pendants, tiaras, and sunglasses with real-time camera try-on."}
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
                    href="/accessories"
                    className="text-cyan-400 transition hover:underline"
                  >
                    {isArabic ? "مركز الإكسسوارات" : "Accessories Center"}
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
                    ? "تتم معالجة تتبع الوجه وتركيب القطع محلياً داخل متصفحك، ولكِ حرية حفظ الصورة الملتقطة أو حذفها فوراً."
                    : "Face tracking and accessory rendering run locally in your browser—keep or delete any snapshot anytime."}
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
              ORVELIA ACCESSORIES STUDIO
            </span>
          </div>
        </div>
      </footer> */}
      <AccessoriesShowcase />
    </div>
  );
}