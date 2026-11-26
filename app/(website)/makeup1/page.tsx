// "use client";

// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import Link from "next/link";
// import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
// import { useLanguage } from "@/app/context/LanguageContext";

// type MakeupZoneKey =
//   | "lipstick"
//   | "blush"
//   | "eyeliner"
//   | "concealer"
//   | "brows";

// interface MakeupShadeOption {
//   code: string;
//   nameAr: string;
//   nameEn: string;
//   finishAr: string;
//   finishEn: string;
//   hex: string;
//   priceEgp: number;
// }

// interface MakeupPresetLook {
//   id: string;
//   nameAr: string;
//   nameEn: string;
//   badgeAr: string;
//   badgeEn: string;
//   shades: Record<MakeupZoneKey, MakeupShadeOption>;
// }

// const MAKEUP_ZONES: Record<
//   MakeupZoneKey,
//   {
//     titleAr: string;
//     titleEn: string;
//     icon: string;
//     descAr: string;
//     descEn: string;
//     shades: MakeupShadeOption[];
//   }
// > = {
//   lipstick: {
//     titleAr: "أحمر الشفاه",
//     titleEn: "Lipstick",
//     icon: "💄",
//     descAr: "درجات مخملية وساتان مرطبة للشفاه",
//     descEn: "Velvet & satin hydrating lip pigments",
//     shades: [
//       { code: "L01", nameAr: "نيود روز دافئ", nameEn: "Warm Nude Rose", finishAr: "ساتان", finishEn: "Satin", hex: "#C97A7E", priceEgp: 580 },
//       { code: "L04", nameAr: "توتي مخملي", nameEn: "Velvet Berry", finishAr: "مخملي", finishEn: "Velvet", hex: "#9E2A4B", priceEgp: 580 },
//       { code: "L09", nameAr: "أحمر كلاسيكي", nameEn: "Classic Crimson", finishAr: "مخملي غني", finishEn: "Rich Velvet", hex: "#B8293D", priceEgp: 580 },
//       { code: "L08", nameAr: "كراميل جلوس", nameEn: "Caramel Gloss", finishAr: "لامع", finishEn: "Glossy", hex: "#D4886A", priceEgp: 580 },
//     ],
//   },
//   blush: {
//     titleAr: "أحمر الخدود (البلاشر)",
//     titleEn: "Cheek Blush",
//     icon: "🌸",
//     descAr: "تورّد طبيعي ناعم للوجنتين",
//     descEn: "Soft natural cheek flush shades",
//     shades: [
//       { code: "B01", nameAr: "وردي ناعم", nameEn: "Soft Rose", finishAr: "كريمي", finishEn: "Cream", hex: "#E17B8B", priceEgp: 610 },
//       { code: "B03", nameAr: "خوخي مشرق", nameEn: "Radiant Peach", finishAr: "مشرق", finishEn: "Luminous", hex: "#F29B7E", priceEgp: 610 },
//       { code: "B05", nameAr: "مرجاني دافئ", nameEn: "Warm Coral", finishAr: "مخملي", finishEn: "Velvet", hex: "#E86F68", priceEgp: 610 },
//     ],
//   },
//   eyeliner: {
//     titleAr: "الآيلاينر والكحل",
//     titleEn: "Eyeliner & Kohl",
//     icon: "✒️",
//     descAr: "رسمة عين دقيقة مقاومة للماء 24 ساعة",
//     descEn: "24h waterproof precision eye definition",
//     shades: [
//       { code: "E01", nameAr: "أسود فاحم 24h", nameEn: "24h Jet Black", finishAr: "مطفي ثابت", finishEn: "Matte Lock", hex: "#111827", priceEgp: 520 },
//       { code: "E02", nameAr: "بني إسبرسو", nameEn: "Espresso Brown", finishAr: "دافئ", finishEn: "Warm Matte", hex: "#3E2723", priceEgp: 520 },
//       { code: "E04", nameAr: "أزرق ليلي", nameEn: "Midnight Navy", finishAr: "سهرة", finishEn: "Evening", hex: "#1E3A8A", priceEgp: 520 },
//     ],
//   },
//   concealer: {
//     titleAr: "الكونسيلر والإشراقة",
//     titleEn: "Concealer & Glow",
//     icon: "🪄",
//     descAr: "تفتيح وتوحيد تحت العين بدون تكتل",
//     descEn: "Crease-proof under-eye brightening",
//     shades: [
//       { code: "03W", nameAr: "فانيلا دافئة", nameEn: "Warm Vanilla", finishAr: "إشراقة طبيعية", finishEn: "Natural Glow", hex: "#E8C39E", priceEgp: 690 },
//       { code: "05N", nameAr: "بيج محايد", nameEn: "Neutral Beige", finishAr: "متوازن", finishEn: "Balanced", hex: "#DDA97E", priceEgp: 690 },
//       { code: "07C", nameAr: "عاجي بارد", nameEn: "Cool Ivory", finishAr: "مشرق", finishEn: "Bright", hex: "#F0D1B2", priceEgp: 690 },
//     ],
//   },
//   brows: {
//     titleAr: "محدد ومثبت الحواجب",
//     titleEn: "Brow Sculpt & Tint",
//     icon: "🤎",
//     descAr: "تحديد وتكثيف طبيعي لشكل الحاجب",
//     descEn: "Natural brow shaping & soft tint",
//     shades: [
//       { code: "BR01", nameAr: "بني متوسط", nameEn: "Medium Brown", finishAr: "طبيعي", finishEn: "Natural", hex: "#4A3222", priceEgp: 490 },
//       { code: "BR02", nameAr: "بني داكن", nameEn: "Dark Espresso", finishAr: "كثيف", finishEn: "Defined", hex: "#2A1B12", priceEgp: 490 },
//       { code: "BR03", nameAr: "أشقر دافئ", nameEn: "Warm Taupe", finishAr: "ناعم", finishEn: "Soft", hex: "#6E523B", priceEgp: 490 },
//     ],
//   },
// };

// const QUICK_LOOK_PRESETS: MakeupPresetLook[] = [
//   {
//     id: "preset-soft",
//     nameAr: "إطلالة صباحية ناعمة",
//     nameEn: "Soft Morning Glow",
//     badgeAr: "يومي",
//     badgeEn: "Daily",
//     shades: {
//       lipstick: MAKEUP_ZONES.lipstick.shades[0],
//       blush: MAKEUP_ZONES.blush.shades[1],
//       eyeliner: MAKEUP_ZONES.eyeliner.shades[1],
//       concealer: MAKEUP_ZONES.concealer.shades[0],
//       brows: MAKEUP_ZONES.brows.shades[0],
//     },
//   },
//   {
//     id: "preset-glam",
//     nameAr: "سهرة توتي مخملي",
//     nameEn: "Velvet Berry Glam",
//     badgeAr: "سهرة",
//     badgeEn: "Evening",
//     shades: {
//       lipstick: MAKEUP_ZONES.lipstick.shades[1],
//       blush: MAKEUP_ZONES.blush.shades[0],
//       eyeliner: MAKEUP_ZONES.eyeliner.shades[0],
//       concealer: MAKEUP_ZONES.concealer.shades[1],
//       brows: MAKEUP_ZONES.brows.shades[1],
//     },
//   },
//   {
//     id: "preset-coral",
//     nameAr: "إشراقة مرجانية مشرقة",
//     nameEn: "Radiant Coral Look",
//     badgeAr: "مشرق",
//     badgeEn: "Fresh",
//     shades: {
//       lipstick: MAKEUP_ZONES.lipstick.shades[3],
//       blush: MAKEUP_ZONES.blush.shades[2],
//       eyeliner: MAKEUP_ZONES.eyeliner.shades[0],
//       concealer: MAKEUP_ZONES.concealer.shades[2],
//       brows: MAKEUP_ZONES.brows.shades[2],
//     },
//   },
// ];

// // MediaPipe FaceMesh indices
// const UPPER_LIP_OUTER = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
// const LOWER_LIP_OUTER = [291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61];
// const UPPER_LIP_INNER = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308];
// const LOWER_LIP_INNER = [308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78];

// const RIGHT_EYE_UPPER = [33, 246, 161, 160, 159, 158, 157, 173, 133];
// const LEFT_EYE_UPPER = [362, 398, 384, 385, 386, 387, 388, 466, 263];

// const RIGHT_BROW = [70, 63, 105, 66, 107];
// const LEFT_BROW = [336, 296, 334, 293, 300];

// export default function MakeupCenterPage() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";
//   const dir = isArabic ? "rtl" : "ltr";

//   const [isDark, setIsDark] = useState(true);

//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const landmarkerRef = useRef<FaceLandmarker | null>(null);
//   const rafIdRef = useRef<number | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const [cameraActive, setCameraActive] = useState(false);
//   const [trackingReady, setTrackingReady] = useState(false);
//   const [faceDetected, setFaceDetected] = useState(false);
//   const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
//   const [cameraError, setCameraError] = useState("");
//   const [capturedPhotoUrl, setCapturedPhotoUrl] = useState("");
//   const [photoDecisionDone, setPhotoDecisionDone] = useState<"kept" | null>(
//     null
//   );

//   const [activeZone, setActiveZone] = useState<MakeupZoneKey>("lipstick");
//   const [enabledZones, setEnabledZones] = useState<
//     Record<MakeupZoneKey, boolean>
//   >({
//     lipstick: true,
//     blush: true,
//     eyeliner: true,
//     concealer: true,
//     brows: true,
//   });

//   const [selectedShades, setSelectedShades] = useState<
//     Record<MakeupZoneKey, MakeupShadeOption>
//   >({
//     lipstick: MAKEUP_ZONES.lipstick.shades[1],
//     blush: MAKEUP_ZONES.blush.shades[0],
//     eyeliner: MAKEUP_ZONES.eyeliner.shades[0],
//     concealer: MAKEUP_ZONES.concealer.shades[0],
//     brows: MAKEUP_ZONES.brows.shades[0],
//   });

//   const [intensityMap, setIntensityMap] = useState<Record<MakeupZoneKey, number>>(
//     {
//       lipstick: 60,
//       blush: 40,
//       eyeliner: 85,
//       concealer: 35,
//       brows: 50,
//     }
//   );

//   const [beforeAfterMode, setBeforeAfterMode] = useState(false);
//   const [toastMsg, setToastMsg] = useState("");

//   const liveSettingsRef = useRef({
//     enabledZones,
//     selectedShades,
//     intensityMap,
//     beforeAfterMode,
//     facingMode,
//   });

//   useEffect(() => {
//     liveSettingsRef.current = {
//       enabledZones,
//       selectedShades,
//       intensityMap,
//       beforeAfterMode,
//       facingMode,
//     };
//   }, [enabledZones, selectedShades, intensityMap, beforeAfterMode, facingMode]);

//   useEffect(() => {
//     const syncTheme = () => {
//       const saved = localStorage.getItem("orvelia-theme");
//       if (saved === "dark" || saved === "light") {
//         setIsDark(saved === "dark");
//       } else {
//         setIsDark(document.documentElement.classList.contains("dark"));
//       }
//     };
//     syncTheme();
//     const obs = new MutationObserver(syncTheme);
//     obs.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });
//     return () => obs.disconnect();
//   }, []);

//   const notify = (msg: string) => {
//     setToastMsg(msg);
//     setTimeout(() => {
//       setToastMsg((prev) => (prev === msg ? "" : prev));
//     }, 3000);
//   };

//   const ensureLandmarker = useCallback(async () => {
//     if (landmarkerRef.current) {
//       setTrackingReady(true);
//       return landmarkerRef.current;
//     }

//     try {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
//       );
//       const detector = await FaceLandmarker.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath:
//             "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
//           delegate: "GPU",
//         },
//         runningMode: "VIDEO",
//         numFaces: 1,
//       });
//       landmarkerRef.current = detector;
//       setTrackingReady(true);
//       return detector;
//     } catch {
//       setTrackingReady(false);
//       return null;
//     }
//   }, []);

//   const paintMakeupZones = useCallback(
//     (
//       ctx: CanvasRenderingContext2D,
//       width: number,
//       height: number,
//       landmarks?: { x: number; y: number }[]
//     ) => {
//       const {
//         enabledZones: zones,
//         selectedShades: shades,
//         intensityMap: intensities,
//         beforeAfterMode: isBefore,
//       } = liveSettingsRef.current;

//       if (isBefore || !landmarks || landmarks.length < 468) return;

//       const pt = (idx: number) => ({
//         x: landmarks[idx].x * width,
//         y: landmarks[idx].y * height,
//       });

//       // 1. Concealer under-eye brightening
//       if (zones.concealer) {
//         ctx.save();
//         ctx.globalAlpha = (intensities.concealer / 100) * 0.45;
//         ctx.fillStyle = shades.concealer.hex;
//         ctx.filter = "blur(10px)";

//         const rEyeSpan = Math.max(
//           14,
//           Math.hypot(pt(133).x - pt(33).x, pt(133).y - pt(33).y) * 0.42
//         );
//         const rUnder = pt(111);
//         const lUnder = pt(340);

//         ctx.beginPath();
//         ctx.ellipse(rUnder.x, rUnder.y + 6, rEyeSpan, rEyeSpan * 0.35, 0, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.beginPath();
//         ctx.ellipse(lUnder.x, lUnder.y + 6, rEyeSpan, rEyeSpan * 0.35, 0, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.restore();
//       }

//       // 2. Brows soft tint
//       if (zones.brows) {
//         ctx.save();
//         ctx.globalAlpha = (intensities.brows / 100) * 0.55;
//         ctx.strokeStyle = shades.brows.hex;
//         ctx.lineCap = "round";
//         ctx.lineJoin = "round";
//         ctx.lineWidth = Math.max(3, width * 0.0085);
//         ctx.filter = "blur(1.5px)";

//         ctx.beginPath();
//         RIGHT_BROW.forEach((idx, i) => {
//           const p = pt(idx);
//           if (i === 0) ctx.moveTo(p.x, p.y);
//           else ctx.lineTo(p.x, p.y);
//         });
//         ctx.stroke();

//         ctx.beginPath();
//         LEFT_BROW.forEach((idx, i) => {
//           const p = pt(idx);
//           if (i === 0) ctx.moveTo(p.x, p.y);
//           else ctx.lineTo(p.x, p.y);
//         });
//         ctx.stroke();
//         ctx.restore();
//       }

//       // 3. Blush on cheeks
//       if (zones.blush) {
//         ctx.save();
//         ctx.globalAlpha = (intensities.blush / 100) * 0.52;
//         ctx.fillStyle = shades.blush.hex;
//         ctx.filter = "blur(16px)";

//         const cheekR = Math.max(
//           18,
//           Math.hypot(pt(234).x - pt(127).x, pt(234).y - pt(127).y) * 0.52
//         );
//         const rCheek = pt(205);
//         const lCheek = pt(425);

//         ctx.beginPath();
//         ctx.arc(rCheek.x, rCheek.y, cheekR, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.beginPath();
//         ctx.arc(lCheek.x, lCheek.y, cheekR, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.restore();
//       }

//       // 4. Eyeliner upper lash & wing
//       if (zones.eyeliner) {
//         ctx.save();
//         ctx.globalAlpha = intensities.eyeliner / 100;
//         ctx.strokeStyle = shades.eyeliner.hex;
//         ctx.lineCap = "round";
//         ctx.lineJoin = "round";
//         ctx.lineWidth = Math.max(2, width * 0.0042);

//         ctx.beginPath();
//         RIGHT_EYE_UPPER.forEach((idx, i) => {
//           const p = pt(idx);
//           if (i === 0) ctx.moveTo(p.x, p.y);
//           else ctx.lineTo(p.x, p.y);
//         });
//         const rOuter = pt(33);
//         ctx.lineTo(rOuter.x - width * 0.014, rOuter.y - height * 0.012);
//         ctx.stroke();

//         ctx.beginPath();
//         LEFT_EYE_UPPER.forEach((idx, i) => {
//           const p = pt(idx);
//           if (i === 0) ctx.moveTo(p.x, p.y);
//           else ctx.lineTo(p.x, p.y);
//         });
//         const lOuter = pt(263);
//         ctx.lineTo(lOuter.x + width * 0.014, lOuter.y - height * 0.012);
//         ctx.stroke();
//         ctx.restore();
//       }

//       // 5. Lipstick contour
//       if (zones.lipstick) {
//         ctx.save();
//         ctx.globalAlpha = (intensities.lipstick / 100) * 0.72;
//         ctx.fillStyle = shades.lipstick.hex;
//         ctx.filter = "blur(1.5px)";

//         ctx.beginPath();
//         UPPER_LIP_OUTER.forEach((idx, i) => {
//           const p = pt(idx);
//           if (i === 0) ctx.moveTo(p.x, p.y);
//           else ctx.lineTo(p.x, p.y);
//         });
//         LOWER_LIP_OUTER.slice(1).forEach((idx) => {
//           const p = pt(idx);
//           ctx.lineTo(p.x, p.y);
//         });
//         ctx.closePath();

//         ctx.moveTo(pt(UPPER_LIP_INNER[0]).x, pt(UPPER_LIP_INNER[0]).y);
//         UPPER_LIP_INNER.forEach((idx) => {
//           const p = pt(idx);
//           ctx.lineTo(p.x, p.y);
//         });
//         LOWER_LIP_INNER.slice(1).forEach((idx) => {
//           const p = pt(idx);
//           ctx.lineTo(p.x, p.y);
//         });
//         ctx.closePath();
//         ctx.fill("evenodd");
//         ctx.restore();
//       }
//     },
//     []
//   );

//   const stopCamera = useCallback(() => {
//     if (rafIdRef.current !== null) {
//       cancelAnimationFrame(rafIdRef.current);
//       rafIdRef.current = null;
//     }
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => t.stop());
//       streamRef.current = null;
//     }
//     setCameraActive(false);
//     setFaceDetected(false);
//   }, []);

//   const loopCameraRender = useCallback(async () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     if (!video || !canvas || !streamRef.current) return;

//     if (video.readyState >= 2) {
//       const w = video.videoWidth || 640;
//       const h = video.videoHeight || 480;
//       if (canvas.width !== w || canvas.height !== h) {
//         canvas.width = w;
//         canvas.height = h;
//       }

//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.save();
//         if (liveSettingsRef.current.facingMode === "user") {
//           ctx.translate(w, 0);
//           ctx.scale(-1, 1);
//         }
//         ctx.drawImage(video, 0, 0, w, h);

//         const detector = landmarkerRef.current;
//         if (detector) {
//           const res = detector.detectForVideo(video, performance.now());
//           const lm = res.faceLandmarks?.[0];
//           if (lm) {
//             setFaceDetected(true);
//             paintMakeupZones(ctx, w, h, lm);
//           } else {
//             setFaceDetected(false);
//           }
//         }
//         ctx.restore();
//       }
//     }

//     rafIdRef.current = requestAnimationFrame(loopCameraRender);
//   }, [paintMakeupZones]);

//   const startCamera = useCallback(
//     async (mode: "user" | "environment" = facingMode) => {
//       setCameraError("");
//       setCapturedPhotoUrl("");
//       setPhotoDecisionDone(null);
//       stopCamera();

//       if (
//         typeof navigator === "undefined" ||
//         !navigator.mediaDevices ||
//         !navigator.mediaDevices.getUserMedia
//       ) {
//         setCameraError(
//           isArabic
//             ? "المتصفح الحالي لا يدعم تشغيل الكاميرا مباشرة أو يتطلب اتصالاً آمناً (localhost أو https)."
//             : "Camera access requires a supported browser over localhost or https."
//         );
//         return;
//       }

//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             facingMode: mode,
//             width: { ideal: 1280 },
//             height: { ideal: 720 },
//           },
//           audio: false,
//         });

//         streamRef.current = stream;
//         setCameraActive(true);

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           await videoRef.current.play();
//         }

//         await ensureLandmarker();
//         rafIdRef.current = requestAnimationFrame(loopCameraRender);
//       } catch {
//         setCameraError(
//           isArabic
//             ? "لم يتم السماح بفتح الكاميرا — اضغطي سماح (Allow) في نافذة المتصفح وجربي مرة أخرى."
//             : "Camera access was denied — allow camera permissions in your browser and try again."
//         );
//       }
//     },
//     [ensureLandmarker, facingMode, isArabic, loopCameraRender, stopCamera]
//   );

//   useEffect(() => {
//     startCamera("user");
//     return () => {
//       stopCamera();
//     };
//   }, [startCamera, stopCamera]);

//   const handleSnapPhoto = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || !cameraActive) {
//       notify(
//         isArabic
//           ? "شغّلي الكاميرا أولاً لالتقاط الصورة."
//           : "Turn on the camera first to snap a photo."
//       );
//       return;
//     }
//     const url = canvas.toDataURL("image/png");
//     setCapturedPhotoUrl(url);
//     setPhotoDecisionDone(null);
//     notify(
//       isArabic
//         ? "تم التقاط الصورة — اختاري تحت يا إما تخليها أو تحذفيها."
//         : "Photo snapped — choose below to keep or delete it."
//     );
//   };

//   const handleKeepSnappedPhoto = () => {
//     if (!capturedPhotoUrl) return;
//     setPhotoDecisionDone("kept");
//     const a = document.createElement("a");
//     a.href = capturedPhotoUrl;
//     a.download = "orvelia-makeup-center.png";
//     a.click();
//     notify(
//       isArabic
//         ? "تم الإبقاء على الصورة وتحميلها على جهازك!"
//         : "Kept and downloaded your makeup look photo!"
//     );
//   };

//   const handleDeleteSnappedPhoto = () => {
//     setCapturedPhotoUrl("");
//     setPhotoDecisionDone(null);
//     notify(isArabic ? "تم حذف الصورة الملتقطة." : "Deleted snapped photo.");
//   };

//   const handleUploadPortrait = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     stopCamera();
//     const img = new Image();
//     img.onload = async () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;
//       ctx.drawImage(img, 0, 0);

//       try {
//         const vision = await FilesetResolver.forVisionTasks(
//           "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
//         );
//         const detector = await FaceLandmarker.createFromOptions(vision, {
//           baseOptions: {
//             modelAssetPath:
//               "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
//           },
//           runningMode: "IMAGE",
//           numFaces: 1,
//         });
//         const res = detector.detect(img);
//         if (res.faceLandmarks?.[0]) {
//           setFaceDetected(true);
//           paintMakeupZones(ctx, img.width, img.height, res.faceLandmarks[0]);
//         }
//         detector.close();
//       } catch {
//         // Ignore offline fallback
//       }

//       setCapturedPhotoUrl(canvas.toDataURL("image/png"));
//       setPhotoDecisionDone(null);
//       notify(
//         isArabic
//           ? "تم تطبيق مكياج مركز أورفيليا على الصورة المرفوعة!"
//           : "Applied Orvelia makeup look to your uploaded photo!"
//       );
//     };
//     img.src = URL.createObjectURL(file);
//   };

//   const applyPresetLook = (preset: MakeupPresetLook) => {
//     setSelectedShades(preset.shades);
//     setEnabledZones({
//       lipstick: true,
//       blush: true,
//       eyeliner: true,
//       concealer: true,
//       brows: true,
//     });
//     notify(
//       isArabic
//         ? `تم تطبيق "${preset.nameAr}" على الإطلالة!`
//         : `Applied "${preset.nameEn}" preset!`
//     );
//   };

//   const totalMakeupPrice = useMemo(() => {
//     return (Object.keys(enabledZones) as MakeupZoneKey[]).reduce(
//       (acc, k) => (enabledZones[k] ? acc + selectedShades[k].priceEgp : acc),
//       0
//     );
//   }, [enabledZones, selectedShades]);

//   const pageBg = isDark
//     ? "bg-[#040710] text-white"
//     : "bg-slate-50 text-slate-900";
//   const cardSurface = isDark
//     ? "bg-[#0a101f]/95 border-white/10 text-white"
//     : "bg-white border-slate-200 text-slate-900 shadow-sm";
//   const subSurface = isDark
//     ? "bg-[#060a14] border-white/10"
//     : "bg-slate-100/80 border-slate-200";
//   const muted = isDark ? "text-slate-400" : "text-slate-600";

//   return (
//     <div dir={dir} className={`min-h-screen transition-colors ${pageBg}`}>
//       {toastMsg && (
//         <div className="fixed bottom-5 start-5 z-50 rounded-2xl border border-emerald-400/40 bg-[#0b1222] px-4 py-3 text-xs font-extrabold text-emerald-300 shadow-2xl sm:text-sm">
//           ✨ {toastMsg}
//         </div>
//       )}

//       {/* Header */}
//       <header className="border-b border-white/10">
//         <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
//           <div>
//             <div className="flex items-center gap-2 text-xs font-bold">
//               <Link href="/beauty" className="text-amber-400 hover:underline">
//                 {isArabic ? "← عالم الجمال" : "← Beauty World"}
//               </Link>
//               <span className={muted}>/</span>
//               <span className="text-cyan-400">
//                 /virtual-try-on/makeup
//               </span>
//             </div>

//             <h1 className="mt-1.5 text-2xl font-black sm:text-3xl">
//               {isArabic
//                 ? "مركز المكياج الافتراضي — Orvelia Makeup Center"
//                 : "Orvelia Virtual Makeup Center"}
//             </h1>
//             <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
//               {isArabic
//                 ? "جرّبي أحمر الشفاه، البلاشر، الآيلاينر، الكونسيلر، والحواجب مباشرة بالكاميرا أو على صورتك."
//                 : "Try lipstick, blush, eyeliner, concealer, and brows live on camera or on a photo."}
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-2.5">
//             <button
//               type="button"
//               onClick={() => startCamera(facingMode)}
//               className="rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 sm:text-sm"
//             >
//               📷 {isArabic ? "تشغيل / إعادة الكاميرا" : "Start / Reset Camera"}
//             </button>

//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               className={`rounded-2xl border px-4 py-2.5 text-xs font-bold sm:text-sm ${
//                 isDark
//                   ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
//                   : "border-slate-300 bg-white text-slate-800"
//               }`}
//             >
//               🖼️ {isArabic ? "رفع صورة للتجربة" : "Upload Photo"}
//             </button>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleUploadPortrait}
//               className="hidden"
//             />
//           </div>
//         </div>
//       </header>

//       {/* Quick Presets Bar */}
//       <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
//         <div className={`rounded-2xl border p-4 ${cardSurface}`}>
//           <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
//             <span className="text-xs font-extrabold text-amber-300 sm:text-sm">
//               ✨{" "}
//               {isArabic
//                 ? "إطلالات جاهزة بنقرة واحدة:"
//                 : "One-Click Makeup Presets:"}
//             </span>

//             <div className="flex flex-wrap gap-2">
//               {QUICK_LOOK_PRESETS.map((preset) => (
//                 <button
//                   key={preset.id}
//                   type="button"
//                   onClick={() => applyPresetLook(preset)}
//                   className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
//                     isDark
//                       ? "border-white/10 bg-white/5 text-slate-200 hover:border-amber-400/50 hover:bg-amber-500/10"
//                       : "border-slate-200 bg-slate-50 text-slate-800 hover:border-amber-500"
//                   }`}
//                 >
//                   <span>{isArabic ? preset.nameAr : preset.nameEn}</span>
//                   <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-300">
//                     {isArabic ? preset.badgeAr : preset.badgeEn}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Makeup Center Grid */}
//       <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:px-8">
//         {/* Camera & Canvas Area (7 Cols) */}
//         <section className="space-y-4 lg:col-span-7">
//           {cameraError && (
//             <div className="rounded-2xl border border-amber-400/40 bg-amber-500/15 p-4 text-xs font-bold text-amber-200">
//               ⚠️ {cameraError}
//             </div>
//           )}

//           <div
//             className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-black shadow-2xl ${cardSurface}`}
//           >
//             <video ref={videoRef} playsInline muted className="hidden" />
//             <canvas ref={canvasRef} className="h-full w-full object-cover" />

//             {/* Top HUD */}
//             <div className="absolute top-4 start-4 end-4 flex flex-wrap items-center justify-between gap-2">
//               <span
//                 className={`rounded-full border px-3 py-1 text-[11px] font-extrabold backdrop-blur-md ${
//                   cameraActive
//                     ? "border-emerald-400/40 bg-black/65 text-emerald-300"
//                     : "border-slate-500/40 bg-black/65 text-slate-300"
//                 }`}
//               >
//                 ●{" "}
//                 {cameraActive
//                   ? trackingReady
//                     ? faceDetected
//                       ? isArabic
//                         ? "تم رصد الوجه — مركز المكياج نشط"
//                         : "Face Tracked — Makeup Live"
//                       : isArabic
//                       ? "وجّهي وجهك أمام الكاميرا..."
//                       : "Center face in view..."
//                     : isArabic
//                     ? "جاري تجهيز التتبع..."
//                     : "Preparing tracker..."
//                   : isArabic
//                   ? "الكاميرا متوقفة"
//                   : "Camera Off"}
//               </span>

//               <div className="flex items-center gap-2">
//                 {cameraActive && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         const next = facingMode === "user" ? "environment" : "user";
//                         setFacingMode(next);
//                         startCamera(next);
//                       }}
//                       className="rounded-xl border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md"
//                     >
//                       🔄 {isArabic ? "تبديل الكاميرا" : "Flip"}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handleSnapPhoto}
//                       className="rounded-xl border border-cyan-400/40 bg-cyan-950/75 px-3 py-1.5 text-xs font-extrabold text-cyan-200 backdrop-blur-md"
//                     >
//                       📸 {isArabic ? "التقاط" : "Snap"}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={stopCamera}
//                       className="rounded-xl border border-rose-400/40 bg-rose-950/75 px-3 py-1.5 text-xs font-bold text-rose-200 backdrop-blur-md"
//                     >
//                       ⏹ {isArabic ? "إيقاف" : "Stop"}
//                     </button>
//                   </>
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => setBeforeAfterMode((prev) => !prev)}
//                   className="rounded-xl border border-amber-400/40 bg-black/70 px-3 py-1.5 text-xs font-extrabold text-amber-300 backdrop-blur-md"
//                 >
//                   👁️ {isArabic ? "قبل / بعد" : "Before / After"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Decision Bar Under Snapped Photo: Keep or Delete */}
//           {capturedPhotoUrl && (
//             <div
//               className={`flex flex-col justify-between gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center ${cardSurface}`}
//             >
//               <div className="flex items-center gap-3">
//                 <img
//                   src={capturedPhotoUrl}
//                   alt="Snapped Look"
//                   className="h-16 w-16 rounded-xl border border-white/15 object-cover"
//                 />
//                 <div>
//                   <p className="text-xs font-extrabold sm:text-sm">
//                     {photoDecisionDone === "kept"
//                       ? isArabic
//                         ? "تم الإبقاء على الصورة ✓"
//                         : "Photo Kept ✓"
//                       : isArabic
//                       ? "تم التقاط الصورة — تحبي تخليها ولا تحذفيها؟"
//                       : "Photo captured — keep it or delete it?"}
//                   </p>
//                   <p className={`text-[11px] ${muted}`}>
//                     {isArabic
//                       ? "اختاري «خليها» لحفظ وتنزيل الصورة، أو «احذفها» لإزالتها."
//                       : "Choose Keep to save & download, or Delete to remove it."}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2.5">
//                 <button
//                   type="button"
//                   onClick={handleKeepSnappedPhoto}
//                   className="rounded-xl bg-emerald-400 px-4 py-2 text-xs font-extrabold text-slate-950 transition hover:opacity-95"
//                 >
//                   ✓ {isArabic ? "خليها" : "Keep"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleDeleteSnappedPhoto}
//                   className="rounded-xl border border-rose-400/40 bg-rose-500/15 px-4 py-2 text-xs font-extrabold text-rose-300 transition hover:bg-rose-500/25"
//                 >
//                   🗑️ {isArabic ? "احذفها" : "Delete"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </section>

//         {/* Makeup Zones & Shade Picker Panel (5 Cols) */}
//         <aside className="space-y-4 lg:col-span-5">
//           <div className={`rounded-3xl border p-5 sm:p-6 ${cardSurface}`}>
//             <h2 className="text-lg font-extrabold">
//               {isArabic ? "أقسام ودرجات مركز المكياج" : "Makeup Center Zones & Shades"}
//             </h2>
//             <p className={`mt-1 text-xs ${muted}`}>
//               {isArabic
//                 ? "اختاري القسم والدرجة وفعّلي أو أوقفي أي طبقة على الكاميرا."
//                 : "Select a zone, pick your shade, and toggle layers live."}
//             </p>

//             {/* Zone Tabs */}
//             <div className="mt-4 grid grid-cols-2 gap-2">
//               {(Object.keys(MAKEUP_ZONES) as MakeupZoneKey[]).map((zoneKey) => {
//                 const z = MAKEUP_ZONES[zoneKey];
//                 const active = activeZone === zoneKey;
//                 return (
//                   <div
//                     key={zoneKey}
//                     className={`flex items-center justify-between rounded-2xl border p-2.5 ${
//                       active
//                         ? "border-amber-400 bg-amber-500/15"
//                         : isDark
//                         ? "border-white/10 bg-white/[0.03]"
//                         : "border-slate-200 bg-slate-50"
//                     }`}
//                   >
//                     <button
//                       type="button"
//                       onClick={() => setActiveZone(zoneKey)}
//                       className="flex items-center gap-2 text-start text-xs font-extrabold"
//                     >
//                       <span>{z.icon}</span>
//                       <span>{isArabic ? z.titleAr : z.titleEn}</span>
//                     </button>

//                     <input
//                       type="checkbox"
//                       checked={enabledZones[zoneKey]}
//                       onChange={(e) =>
//                         setEnabledZones((prev) => ({
//                           ...prev,
//                           [zoneKey]: e.target.checked,
//                         }))
//                       }
//                       className="h-4 w-4 cursor-pointer accent-emerald-400"
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Active Zone Shades & Intensity */}
//             <div className={`mt-5 rounded-2xl border p-4 ${subSurface}`}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <span className="text-xs font-extrabold text-amber-300">
//                     {isArabic
//                       ? MAKEUP_ZONES[activeZone].titleAr
//                       : MAKEUP_ZONES[activeZone].titleEn}
//                   </span>
//                   <p className={`text-[11px] ${muted}`}>
//                     {isArabic
//                       ? MAKEUP_ZONES[activeZone].descAr
//                       : MAKEUP_ZONES[activeZone].descEn}
//                   </p>
//                 </div>
//                 <span className="text-xs font-extrabold text-emerald-400">
//                   {selectedShades[activeZone].priceEgp}{" "}
//                   {isArabic ? "ج.م" : "EGP"}
//                 </span>
//               </div>

//               <div className="mt-3 space-y-2">
//                 {MAKEUP_ZONES[activeZone].shades.map((sh) => {
//                   const isChosen = selectedShades[activeZone].code === sh.code;
//                   return (
//                     <button
//                       key={sh.code}
//                       type="button"
//                       onClick={() => {
//                         setSelectedShades((prev) => ({
//                           ...prev,
//                           [activeZone]: sh,
//                         }));
//                         setEnabledZones((prev) => ({
//                           ...prev,
//                           [activeZone]: true,
//                         }));
//                       }}
//                       className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
//                         isChosen
//                           ? "border-amber-400 bg-amber-500/20 text-white"
//                           : isDark
//                           ? "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10"
//                           : "border-slate-200 bg-white text-slate-800"
//                       }`}
//                     >
//                       <div className="flex items-center gap-2.5">
//                         <span
//                           className="h-5 w-5 rounded-full border border-white/30"
//                           style={{ backgroundColor: sh.hex }}
//                         />
//                         <div className="text-start">
//                           <div>{isArabic ? sh.nameAr : sh.nameEn}</div>
//                           <div className={`text-[10px] font-normal ${muted}`}>
//                             {isArabic ? sh.finishAr : sh.finishEn}
//                           </div>
//                         </div>
//                       </div>

//                       <span className="font-mono text-[11px] text-amber-300">
//                         {sh.code}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>

//               <div className="mt-4 border-t border-white/10 pt-3">
//                 <div className="mb-1 flex justify-between text-xs font-bold">
//                   <span>{isArabic ? "كثافة الدرجة:" : "Shade Intensity:"}</span>
//                   <span className="text-cyan-400">
//                     {intensityMap[activeZone]}%
//                   </span>
//                 </div>
//                 <input
//                   type="range"
//                   min={15}
//                   max={100}
//                   value={intensityMap[activeZone]}
//                   onChange={(e) =>
//                     setIntensityMap((prev) => ({
//                       ...prev,
//                       [activeZone]: Number(e.target.value),
//                     }))
//                   }
//                   className="w-full accent-amber-400"
//                 />
//               </div>
//             </div>

//             {/* Add Selected Look to Bag */}
//             <div className="mt-5 border-t border-white/10 pt-4">
//               <div className="mb-3 flex items-center justify-between text-sm font-extrabold">
//                 <span>
//                   {isArabic ? "إجمالي الدرجات المفعّلة:" : "Active Zones Total:"}
//                 </span>
//                 <span className="text-lg text-emerald-400">
//                   {totalMakeupPrice.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
//                 </span>
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   notify(
//                     isArabic
//                       ? "تمت إضافة درجات مركز المكياج المختارة إلى حقيبة الجمال!"
//                       : "Added selected makeup center shades to your bag!"
//                   )
//                 }
//                 className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 py-3 text-xs font-extrabold text-slate-950 sm:text-sm"
//               >
//                 🛍️{" "}
//                 {isArabic
//                   ? "أضيفي الدرجات لحقيبة الجمال"
//                   : "Add Shades to Beauty Bag"}
//               </button>
//             </div>
//           </div>
//         </aside>
//       </main>
//     </div>
//   );
// }
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useLanguage } from "@/app/context/LanguageContext";

type MakeupZoneKey =
  | "lipstick"
  | "blush"
  | "eyeliner"
  | "concealer"
  | "brows";

interface MakeupShadeOption {
  code: string;
  nameAr: string;
  nameEn: string;
  finishAr: string;
  finishEn: string;
  hex: string;
  priceEgp: number;
}

interface MakeupPresetLook {
  id: string;
  nameAr: string;
  nameEn: string;
  badgeAr: string;
  badgeEn: string;
  shades: Record<MakeupZoneKey, MakeupShadeOption>;
}

interface BeautyBurstItem {
  id: string;
  glyph: string;
  label: string;
  sizeClass: string;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  rotateDeg: number;
  delayMs: number;
}

const MAKEUP_ZONES: Record<
  MakeupZoneKey,
  {
    titleAr: string;
    titleEn: string;
    icon: string;
    descAr: string;
    descEn: string;
    shades: MakeupShadeOption[];
  }
> = {
  lipstick: {
    titleAr: "أحمر الشفاه",
    titleEn: "Lipstick",
    icon: "💄",
    descAr: "درجات مخملية وساتان مرطبة للشفاه",
    descEn: "Velvet & satin hydrating lip pigments",
    shades: [
      { code: "L01", nameAr: "نيود روز دافئ", nameEn: "Warm Nude Rose", finishAr: "ساتان", finishEn: "Satin", hex: "#C97A7E", priceEgp: 580 },
      { code: "L04", nameAr: "توتي مخملي", nameEn: "Velvet Berry", finishAr: "مخملي", finishEn: "Velvet", hex: "#9E2A4B", priceEgp: 580 },
      { code: "L09", nameAr: "أحمر كلاسيكي", nameEn: "Classic Crimson", finishAr: "مخملي غني", finishEn: "Rich Velvet", hex: "#B8293D", priceEgp: 580 },
      { code: "L08", nameAr: "كراميل جلوس", nameEn: "Caramel Gloss", finishAr: "لامع", finishEn: "Glossy", hex: "#D4886A", priceEgp: 580 },
    ],
  },
  blush: {
    titleAr: "أحمر الخدود (البلاشر)",
    titleEn: "Cheek Blush",
    icon: "🌸",
    descAr: "تورّد طبيعي ناعم للوجنتين",
    descEn: "Soft natural cheek flush shades",
    shades: [
      { code: "B01", nameAr: "وردي ناعم", nameEn: "Soft Rose", finishAr: "كريمي", finishEn: "Cream", hex: "#E17B8B", priceEgp: 610 },
      { code: "B03", nameAr: "خوخي مشرق", nameEn: "Radiant Peach", finishAr: "مشرق", finishEn: "Luminous", hex: "#F29B7E", priceEgp: 610 },
      { code: "B05", nameAr: "مرجاني دافئ", nameEn: "Warm Coral", finishAr: "مخملي", finishEn: "Velvet", hex: "#E86F68", priceEgp: 610 },
    ],
  },
  eyeliner: {
    titleAr: "الآيلاينر والكحل",
    titleEn: "Eyeliner & Kohl",
    icon: "✒️",
    descAr: "رسمة عين دقيقة مقاومة للماء 24 ساعة",
    descEn: "24h waterproof precision eye definition",
    shades: [
      { code: "E01", nameAr: "أسود فاحم 24h", nameEn: "24h Jet Black", finishAr: "مطفي ثابت", finishEn: "Matte Lock", hex: "#111827", priceEgp: 520 },
      { code: "E02", nameAr: "بني إسبرسو", nameEn: "Espresso Brown", finishAr: "دافئ", finishEn: "Warm Matte", hex: "#3E2723", priceEgp: 520 },
      { code: "E04", nameAr: "أزرق ليلي", nameEn: "Midnight Navy", finishAr: "سهرة", finishEn: "Evening", hex: "#1E3A8A", priceEgp: 520 },
    ],
  },
  concealer: {
    titleAr: "الكونسيلر والإشراقة",
    titleEn: "Concealer & Glow",
    icon: "🪄",
    descAr: "تفتيح وتوحيد تحت العين بدون تكتل",
    descEn: "Crease-proof under-eye brightening",
    shades: [
      { code: "03W", nameAr: "فانيلا دافئة", nameEn: "Warm Vanilla", finishAr: "إشراقة طبيعية", finishEn: "Natural Glow", hex: "#E8C39E", priceEgp: 690 },
      { code: "05N", nameAr: "بيج محايد", nameEn: "Neutral Beige", finishAr: "متوازن", finishEn: "Balanced", hex: "#DDA97E", priceEgp: 690 },
      { code: "07C", nameAr: "عاجي بارد", nameEn: "Cool Ivory", finishAr: "مشرق", finishEn: "Bright", hex: "#F0D1B2", priceEgp: 690 },
    ],
  },
  brows: {
    titleAr: "محدد ومثبت الحواجب",
    titleEn: "Brow Sculpt & Tint",
    icon: "🤎",
    descAr: "تحديد وتكثيف طبيعي لشكل الحاجب",
    descEn: "Natural brow shaping & soft tint",
    shades: [
      { code: "BR01", nameAr: "بني متوسط", nameEn: "Medium Brown", finishAr: "طبيعي", finishEn: "Natural", hex: "#4A3222", priceEgp: 490 },
      { code: "BR02", nameAr: "بني داكن", nameEn: "Dark Espresso", finishAr: "كثيف", finishEn: "Defined", hex: "#2A1B12", priceEgp: 490 },
      { code: "BR03", nameAr: "أشقر دافئ", nameEn: "Warm Taupe", finishAr: "ناعم", finishEn: "Soft", hex: "#6E523B", priceEgp: 490 },
    ],
  },
};

const QUICK_LOOK_PRESETS: MakeupPresetLook[] = [
  {
    id: "preset-soft",
    nameAr: "إطلالة صباحية ناعمة",
    nameEn: "Soft Morning Glow",
    badgeAr: "يومي",
    badgeEn: "Daily",
    shades: {
      lipstick: MAKEUP_ZONES.lipstick.shades[0],
      blush: MAKEUP_ZONES.blush.shades[1],
      eyeliner: MAKEUP_ZONES.eyeliner.shades[1],
      concealer: MAKEUP_ZONES.concealer.shades[0],
      brows: MAKEUP_ZONES.brows.shades[0],
    },
  },
  {
    id: "preset-glam",
    nameAr: "سهرة توتي مخملي",
    nameEn: "Velvet Berry Glam",
    badgeAr: "سهرة",
    badgeEn: "Evening",
    shades: {
      lipstick: MAKEUP_ZONES.lipstick.shades[1],
      blush: MAKEUP_ZONES.blush.shades[0],
      eyeliner: MAKEUP_ZONES.eyeliner.shades[0],
      concealer: MAKEUP_ZONES.concealer.shades[1],
      brows: MAKEUP_ZONES.brows.shades[1],
    },
  },
  {
    id: "preset-coral",
    nameAr: "إشراقة مرجانية مشرقة",
    nameEn: "Radiant Coral Look",
    badgeAr: "مشرق",
    badgeEn: "Fresh",
    shades: {
      lipstick: MAKEUP_ZONES.lipstick.shades[3],
      blush: MAKEUP_ZONES.blush.shades[2],
      eyeliner: MAKEUP_ZONES.eyeliner.shades[0],
      concealer: MAKEUP_ZONES.concealer.shades[2],
      brows: MAKEUP_ZONES.brows.shades[2],
    },
  },
];

// Sudden beauty burst items (lipstick, eyeliner/pencil, brush, mirror, sparkle, blush)
const BEAUTY_BURST_ITEMS: BeautyBurstItem[] = [
  { id: "m1", glyph: "💄", label: "Lipstick", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "42vh", endX: "5vw", endY: "15vh", rotateDeg: -22, delayMs: 0 },
  { id: "m2", glyph: "✒️", label: "Eyeliner", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "42vh", endX: "92vw", endY: "16vh", rotateDeg: 28, delayMs: 25 },
  { id: "m3", glyph: "🖌️", label: "Brush", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "42vh", endX: "3.5vw", endY: "44vh", rotateDeg: -16, delayMs: 45 },
  { id: "m4", glyph: "🪞", label: "Mirror", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "42vh", endX: "94vw", endY: "45vh", rotateDeg: 18, delayMs: 65 },
  { id: "m5", glyph: "💄", label: "Lipstick", sizeClass: "text-xl sm:text-2xl", startX: "50vw", startY: "42vh", endX: "6vw", endY: "75vh", rotateDeg: 20, delayMs: 85 },
  { id: "m6", glyph: "🪄", label: "Wand", sizeClass: "text-2xl sm:text-3xl", startX: "50vw", startY: "42vh", endX: "91vw", endY: "76vh", rotateDeg: -24, delayMs: 105 },
  { id: "m7", glyph: "✒️", label: "Mascara / Liner", sizeClass: "text-lg sm:text-xl", startX: "50vw", startY: "42vh", endX: "19vw", endY: "91vh", rotateDeg: -14, delayMs: 125 },
  { id: "m8", glyph: "🌸", label: "Blush", sizeClass: "text-lg sm:text-xl", startX: "50vw", startY: "42vh", endX: "80vw", endY: "91vh", rotateDeg: 15, delayMs: 145 },
];

// MediaPipe FaceMesh indices
const UPPER_LIP_OUTER = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
const LOWER_LIP_OUTER = [291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61];
const UPPER_LIP_INNER = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308];
const LOWER_LIP_INNER = [308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78];

const RIGHT_EYE_UPPER = [33, 246, 161, 160, 159, 158, 157, 173, 133];
const LEFT_EYE_UPPER = [362, 398, 384, 385, 386, 387, 388, 466, 263];

const RIGHT_BROW = [70, 63, 105, 66, 107];
const LEFT_BROW = [336, 296, 334, 293, 300];

export default function MakeupCenterPage() {
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

  const [activeZone, setActiveZone] = useState<MakeupZoneKey>("lipstick");
  const [enabledZones, setEnabledZones] = useState<
    Record<MakeupZoneKey, boolean>
  >({
    lipstick: true,
    blush: true,
    eyeliner: true,
    concealer: true,
    brows: true,
  });

  const [selectedShades, setSelectedShades] = useState<
    Record<MakeupZoneKey, MakeupShadeOption>
  >({
    lipstick: MAKEUP_ZONES.lipstick.shades[1],
    blush: MAKEUP_ZONES.blush.shades[0],
    eyeliner: MAKEUP_ZONES.eyeliner.shades[0],
    concealer: MAKEUP_ZONES.concealer.shades[0],
    brows: MAKEUP_ZONES.brows.shades[0],
  });

  const [intensityMap, setIntensityMap] = useState<Record<MakeupZoneKey, number>>(
    {
      lipstick: 60,
      blush: 40,
      eyeliner: 85,
      concealer: 35,
      brows: 50,
    }
  );

  const [beforeAfterMode, setBeforeAfterMode] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const triggerBeautyBurst = useCallback(() => {
    setBurstActive(false);
    const frame = requestAnimationFrame(() => {
      setTimeout(() => {
        setBurstActive(true);
      }, 25);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const cleanup = triggerBeautyBurst();
    return cleanup;
  }, [triggerBeautyBurst]);

  const liveSettingsRef = useRef({
    enabledZones,
    selectedShades,
    intensityMap,
    beforeAfterMode,
    facingMode,
  });

  useEffect(() => {
    liveSettingsRef.current = {
      enabledZones,
      selectedShades,
      intensityMap,
      beforeAfterMode,
      facingMode,
    };
  }, [enabledZones, selectedShades, intensityMap, beforeAfterMode, facingMode]);

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

  const paintMakeupZones = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      landmarks?: { x: number; y: number }[]
    ) => {
      const {
        enabledZones: zones,
        selectedShades: shades,
        intensityMap: intensities,
        beforeAfterMode: isBefore,
      } = liveSettingsRef.current;

      if (isBefore || !landmarks || landmarks.length < 468) return;

      const pt = (idx: number) => ({
        x: landmarks[idx].x * width,
        y: landmarks[idx].y * height,
      });

      // 1. Concealer under-eye brightening
      if (zones.concealer) {
        ctx.save();
        ctx.globalAlpha = (intensities.concealer / 100) * 0.45;
        ctx.fillStyle = shades.concealer.hex;
        ctx.filter = "blur(10px)";

        const rEyeSpan = Math.max(
          14,
          Math.hypot(pt(133).x - pt(33).x, pt(133).y - pt(33).y) * 0.42
        );
        const rUnder = pt(111);
        const lUnder = pt(340);

        ctx.beginPath();
        ctx.ellipse(rUnder.x, rUnder.y + 6, rEyeSpan, rEyeSpan * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(lUnder.x, lUnder.y + 6, rEyeSpan, rEyeSpan * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Brows soft tint
      if (zones.brows) {
        ctx.save();
        ctx.globalAlpha = (intensities.brows / 100) * 0.55;
        ctx.strokeStyle = shades.brows.hex;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = Math.max(3, width * 0.0085);
        ctx.filter = "blur(1.5px)";

        ctx.beginPath();
        RIGHT_BROW.forEach((idx, i) => {
          const p = pt(idx);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        ctx.beginPath();
        LEFT_BROW.forEach((idx, i) => {
          const p = pt(idx);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.restore();
      }

      // 3. Blush on cheeks
      if (zones.blush) {
        ctx.save();
        ctx.globalAlpha = (intensities.blush / 100) * 0.52;
        ctx.fillStyle = shades.blush.hex;
        ctx.filter = "blur(16px)";

        const cheekR = Math.max(
          18,
          Math.hypot(pt(234).x - pt(127).x, pt(234).y - pt(127).y) * 0.52
        );
        const rCheek = pt(205);
        const lCheek = pt(425);

        ctx.beginPath();
        ctx.arc(rCheek.x, rCheek.y, cheekR, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(lCheek.x, lCheek.y, cheekR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Eyeliner upper lash & wing
      if (zones.eyeliner) {
        ctx.save();
        ctx.globalAlpha = intensities.eyeliner / 100;
        ctx.strokeStyle = shades.eyeliner.hex;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = Math.max(2, width * 0.0042);

        ctx.beginPath();
        RIGHT_EYE_UPPER.forEach((idx, i) => {
          const p = pt(idx);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        const rOuter = pt(33);
        ctx.lineTo(rOuter.x - width * 0.014, rOuter.y - height * 0.012);
        ctx.stroke();

        ctx.beginPath();
        LEFT_EYE_UPPER.forEach((idx, i) => {
          const p = pt(idx);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        const lOuter = pt(263);
        ctx.lineTo(lOuter.x + width * 0.014, lOuter.y - height * 0.012);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Lipstick contour
      if (zones.lipstick) {
        ctx.save();
        ctx.globalAlpha = (intensities.lipstick / 100) * 0.72;
        ctx.fillStyle = shades.lipstick.hex;
        ctx.filter = "blur(1.5px)";

        ctx.beginPath();
        UPPER_LIP_OUTER.forEach((idx, i) => {
          const p = pt(idx);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        LOWER_LIP_OUTER.slice(1).forEach((idx) => {
          const p = pt(idx);
          ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();

        ctx.moveTo(pt(UPPER_LIP_INNER[0]).x, pt(UPPER_LIP_INNER[0]).y);
        UPPER_LIP_INNER.forEach((idx) => {
          const p = pt(idx);
          ctx.lineTo(p.x, p.y);
        });
        LOWER_LIP_INNER.slice(1).forEach((idx) => {
          const p = pt(idx);
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
            paintMakeupZones(ctx, w, h, lm);
          } else {
            setFaceDetected(false);
          }
        }
        ctx.restore();
      }
    }

    rafIdRef.current = requestAnimationFrame(loopCameraRender);
  }, [paintMakeupZones]);

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
    a.download = "orvelia-makeup-center.png";
    a.click();
    notify(
      isArabic
        ? "تم الإبقاء على الصورة وتحميلها على جهازك!"
        : "Kept and downloaded your makeup look photo!"
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
          paintMakeupZones(ctx, img.width, img.height, res.faceLandmarks[0]);
        }
        detector.close();
      } catch {
        // Ignore offline fallback
      }

      setCapturedPhotoUrl(canvas.toDataURL("image/png"));
      setPhotoDecisionDone(null);
      notify(
        isArabic
          ? "تم تطبيق مكياج مركز أورفيليا على الصورة المرفوعة!"
          : "Applied Orvelia makeup look to your uploaded photo!"
      );
    };
    img.src = URL.createObjectURL(file);
  };

  const applyPresetLook = (preset: MakeupPresetLook) => {
    setSelectedShades(preset.shades);
    setEnabledZones({
      lipstick: true,
      blush: true,
      eyeliner: true,
      concealer: true,
      brows: true,
    });
    notify(
      isArabic
        ? `تم تطبيق "${preset.nameAr}" على الإطلالة!`
        : `Applied "${preset.nameEn}" preset!`
    );
  };

  const totalMakeupPrice = useMemo(() => {
    return (Object.keys(enabledZones) as MakeupZoneKey[]).reduce(
      (acc, k) => (enabledZones[k] ? acc + selectedShades[k].priceEgp : acc),
      0
    );
  }, [enabledZones, selectedShades]);

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
      {/* Sudden Beauty Items Burst on Entry that Stay in Place */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      >
        {BEAUTY_BURST_ITEMS.map((item) => (
          <span
            key={item.id}
            style={{
              left: burstActive ? item.endX : item.startX,
              top: burstActive ? item.endY : item.startY,
              transform: burstActive
                ? `translate(-50%, -50%) rotate(${item.rotateDeg}deg) scale(1)`
                : "translate(-50%, -50%) rotate(0deg) scale(0.25)",
              opacity: burstActive ? 0.85 : 0,
              transitionProperty: "left, top, transform, opacity",
              transitionDuration: "520ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${item.delayMs}ms`,
            }}
            className={`fixed select-none drop-shadow-[0_6px_16px_rgba(251,191,36,0.3)] ${item.sizeClass}`}
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
              <span className="text-cyan-400">
                /virtual-try-on/makeup
              </span>
            </div>

            <h1 className="mt-1.5 text-2xl font-black sm:text-3xl">
              {isArabic
                ? "مركز المكياج الافتراضي — Orvelia Makeup Center"
                : "Orvelia Virtual Makeup Center"}
            </h1>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              {isArabic
                ? "جرّبي أحمر الشفاه، البلاشر، الآيلاينر، الكونسيلر، والحواجب مباشرة بالكاميرا أو على صورتك."
                : "Try lipstick, blush, eyeliner, concealer, and brows live on camera or on a photo."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={triggerBeautyBurst}
              className={`rounded-2xl border px-3.5 py-2.5 text-xs font-extrabold sm:text-sm ${
                isDark
                  ? "border-amber-400/35 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20"
                  : "border-amber-300 bg-amber-50 text-amber-900"
              }`}
            >
              💄 {isArabic ? "إطلاق أدوات التجميل" : "Launch Beauty Icons"}
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

      {/* Quick Presets Bar */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className={`rounded-2xl border p-4 ${cardSurface}`}>
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <span className="text-xs font-extrabold text-amber-300 sm:text-sm">
              ✨{" "}
              {isArabic
                ? "إطلالات جاهزة بنقرة واحدة:"
                : "One-Click Makeup Presets:"}
            </span>

            <div className="flex flex-wrap gap-2">
              {QUICK_LOOK_PRESETS.map((preset) => (
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

      {/* Main Makeup Center Grid */}
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
                        ? "تم رصد الوجه — مركز المكياج نشط"
                        : "Face Tracked — Makeup Live"
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
                        const next = facingMode === "user" ? "environment" : "user";
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
                  alt="Snapped Look"
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

        {/* Makeup Zones & Shade Picker Panel (5 Cols) */}
        <aside className="space-y-4 lg:col-span-5">
          <div className={`rounded-3xl border p-5 sm:p-6 ${cardSurface}`}>
            <h2 className="text-lg font-extrabold">
              {isArabic ? "أقسام ودرجات مركز المكياج" : "Makeup Center Zones & Shades"}
            </h2>
            <p className={`mt-1 text-xs ${muted}`}>
              {isArabic
                ? "اختاري القسم والدرجة وفعّلي أو أوقفي أي طبقة على الكاميرا."
                : "Select a zone, pick your shade, and toggle layers live."}
            </p>

            {/* Zone Tabs */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {(Object.keys(MAKEUP_ZONES) as MakeupZoneKey[]).map((zoneKey) => {
                const z = MAKEUP_ZONES[zoneKey];
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
              })}
            </div>

            {/* Active Zone Shades & Intensity */}
            <div className={`mt-5 rounded-2xl border p-4 ${subSurface}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-amber-300">
                    {isArabic
                      ? MAKEUP_ZONES[activeZone].titleAr
                      : MAKEUP_ZONES[activeZone].titleEn}
                  </span>
                  <p className={`text-[11px] ${muted}`}>
                    {isArabic
                      ? MAKEUP_ZONES[activeZone].descAr
                      : MAKEUP_ZONES[activeZone].descEn}
                  </p>
                </div>
                <span className="text-xs font-extrabold text-emerald-400">
                  {selectedShades[activeZone].priceEgp}{" "}
                  {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {MAKEUP_ZONES[activeZone].shades.map((sh) => {
                  const isChosen = selectedShades[activeZone].code === sh.code;
                  return (
                    <button
                      key={sh.code}
                      type="button"
                      onClick={() => {
                        setSelectedShades((prev) => ({
                          ...prev,
                          [activeZone]: sh,
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

              <div className="mt-4 border-t border-white/10 pt-3">
                <div className="mb-1 flex justify-between text-xs font-bold">
                  <span>{isArabic ? "كثافة الدرجة:" : "Shade Intensity:"}</span>
                  <span className="text-cyan-400">
                    {intensityMap[activeZone]}%
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={100}
                  value={intensityMap[activeZone]}
                  onChange={(e) =>
                    setIntensityMap((prev) => ({
                      ...prev,
                      [activeZone]: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-amber-400"
                />
              </div>
            </div>

            {/* Add Selected Look to Bag */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center justify-between text-sm font-extrabold">
                <span>
                  {isArabic ? "إجمالي الدرجات المفعّلة:" : "Active Zones Total:"}
                </span>
                <span className="text-lg text-emerald-400">
                  {totalMakeupPrice.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  notify(
                    isArabic
                      ? "تمت إضافة درجات مركز المكياج المختارة إلى حقيبة الجمال!"
                      : "Added selected makeup center shades to your bag!"
                  )
                }
                className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 py-3 text-xs font-extrabold text-slate-950 sm:text-sm"
              >
                🛍️{" "}
                {isArabic
                  ? "أضيفي الدرجات لحقيبة الجمال"
                  : "Add Shades to Beauty Bag"}
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
                  ? "اكتشفي درجات المكياج، العناية بالبشرة، والتجربة المباشرة بالكاميرا بدقة فورية لتختاري الإطلالة الأنسب لكِ بثقة."
                  : "Explore curated makeup shades, skincare essentials, and real-time camera try-on to find your signature look."}
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
              ORVELIA MAKEUP STUDIO
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}