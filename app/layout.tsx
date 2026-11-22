import { LanguageProvider } from "./context/LanguageContext";
import ClientLayoutWrapper from "./(website)/home/ClientLayoutWrapper";
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
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}