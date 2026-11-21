import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./sction/navbar/navbar";
import Footer from "./sction/footer/footer";
import ClientLayoutWrapper from "./(website)/home/ClientLayoutWrapper"; // استدعاء الملف الوسيط
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <ClientLayoutWrapper>
            <Navbar />
            <main>{children}</main>

  
            <Footer />
          </ClientLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}




