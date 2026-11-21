
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const isArabic = language === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // Login with Laravel API
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError(
        isArabic
          ? "من فضلك أدخلي البريد الإلكتروني وكلمة المرور"
          : "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.token || data.user?.role !== "admin") {
        throw new Error("Unauthorized account");
      }

      // Save Laravel token for this browser session
      sessionStorage.setItem("orvelia_token", data.token);
      sessionStorage.setItem("orvelia_user", JSON.stringify(data.user));

      setSuccess(
        isArabic
          ? "تم تسجيل الدخول بنجاح"
          : "Login successful."
      );

      router.replace("/dashboard");
      router.refresh();

    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "";

      if (
        message.includes("Failed to fetch") ||
        message.includes("NetworkError")
      ) {
        setError(
          isArabic
            ? "تعذر الاتصال بالسيرفر. تأكدي أن Laravel يعمل."
            : "Could not connect to the server. Make sure Laravel is running."
        );
      } else if (
        message.includes("غير صحيحة") ||
        message.includes("Unauthorized")
      ) {
        setError(
          isArabic
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            : "Invalid email or password."
        );
      } else if (message.includes("غير مسموح")) {
        setError(
          isArabic
            ? "غير مسموح لهذا الحساب بالدخول"
            : "This account is not authorized."
        );
      } else {
        setError(
          message ||
            (isArabic
              ? "حدث خطأ أثناء تسجيل الدخول"
              : "Something went wrong during login.")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  // Password reset is not connected yet because Laravel reset-password
  // endpoint has not been configured.
  const handleForgotPassword = () => {
    setError(
      isArabic
        ? "إعادة تعيين كلمة المرور غير مفعّلة حاليًا على Laravel."
        : "Password reset is not configured on Laravel yet."
    );
    setSuccess("");
  };

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="flex min-h-screen items-center justify-center bg-[#07110F] px-4 py-12"
    >
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#0B1714] shadow-2xl shadow-black/40 md:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden min-h-[600px] flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-950 via-[#073B31] to-[#061D19] p-12 md:flex">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-400/10 text-2xl font-black text-emerald-300">
                O
              </div>

              <span className="text-2xl font-black tracking-wider text-white">
                ORVELIA
              </span>
            </div>
          </div>

          <div className="relative z-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">
              Welcome Back
            </p>

            <h2 className="mb-6 text-4xl font-black leading-tight text-white">
              {isArabic ? "مرحبًا بعودتك" : "Welcome Back"}
            </h2>

            <p className="max-w-sm text-base leading-8 text-emerald-100/70">
              {isArabic
                ? "سجلي الدخول إلى حسابك للوصول إلى لوحة التحكم وإدارة أعمالك بسهولة."
                : "Sign in to your account to access your dashboard and manage your business."}
            </p>
          </div>

          <div className="relative z-10 border-t border-emerald-300/20 pt-6">
            <p className="text-xs tracking-wider text-emerald-100/50">
              © {new Date().getFullYear()} ORVELIA. All rights reserved.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-12">
          <div className="w-full max-w-md">

            <div className="mb-10 text-center md:text-start">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
                {isArabic ? "تسجيل الدخول" : "LOGIN"}
              </p>

              <h1 className="mb-3 text-3xl font-black text-white">
                {isArabic
                  ? "الدخول إلى حسابك"
                  : "Sign In To Your Account"}
              </h1>

              <p className="text-sm leading-7 text-gray-400">
                {isArabic
                  ? "أدخلي بيانات حسابك للمتابعة إلى لوحة التحكم."
                  : "Enter your account details to continue to your dashboard."}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">
                  {isArabic ? "البريد الإلكتروني" : "Email Address"}
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    isArabic
                      ? "أدخلي بريدك الإلكتروني"
                      : "Enter your email"
                  }
                  autoComplete="email"
                  required
                  className="h-14 w-full rounded-xl border border-white/10 bg-[#10221D] px-4 text-white outline-none transition placeholder:text-gray-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-200">
                    {isArabic ? "كلمة المرور" : "Password"}
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-semibold text-emerald-400 transition hover:text-emerald-300"
                  >
                    {isArabic ? "نسيت كلمة المرور؟" : "Forgot Password?"}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      isArabic
                        ? "أدخلي كلمة المرور"
                        : "Enter your password"
                    }
                    autoComplete="current-password"
                    required
                    className="h-14 w-full rounded-xl border border-white/10 bg-[#10221D] px-4 pe-16 text-white outline-none transition placeholder:text-gray-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 end-4 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    {showPassword
                      ? isArabic
                        ? "إخفاء"
                        : "Hide"
                      : isArabic
                        ? "إظهار"
                        : "Show"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div
                  role="status"
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
                >
                  {success}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition duration-300 hover:from-emerald-400 hover:to-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? isArabic
                    ? "جاري تسجيل الدخول..."
                    : "Signing In..."
                  : isArabic
                    ? "تسجيل الدخول"
                    : "Sign In"}
              </button>

            </form>

            <p className="mt-10 text-center text-xs text-gray-500">
              {isArabic
                ? "تسجيل دخول آمن باستخدام Laravel Sanctum"
                : "Secure authentication powered by Laravel Sanctum"}
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
