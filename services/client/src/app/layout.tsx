import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarProvider } from "@/components/NavbarProvider/NavbarProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <Suspense>
          <NavbarProvider>{children}</NavbarProvider>
        </Suspense>
        <script>
          {`if (typeof window !== 'undefined') {{
            document.addEventListener('gesturestart', function (e) {{
              e.preventDefault();
            }});

            let lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {{
              const now = (new Date()).getTime();
              if (now - lastTouchEnd <= 300) {{
                event.preventDefault();
              }}
              lastTouchEnd = now;
            }}, false);
          }}`}
        </script>
      </body>
    </html>
  );
}
