/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "@/root/src/app/providers";
import { Toaster } from "sonner";
import ImageMeta from "@/root/src/app/favicon-96x96.png";

const fonts = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Layout: React.FC<any> = async ({ children }) => {
  const locale = await getLocale();
  const messages = await getMessages();
  const DEFAULT_APP_NAME = "Super Admin";
  return (
    <html lang={locale}>
      <head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME ?? DEFAULT_APP_NAME}</title>
        <link rel="icon" type="image/png" href={ImageMeta.src} />
        
        <meta property="og:image" content={ImageMeta.src} />
        <meta
          property="og:title"
          content={process.env.NEXT_PUBLIC_APP_NAME ?? DEFAULT_APP_NAME}
        />
        <meta
          property="og:description"
          content="Super Admin Desk Ticketing"
        />
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_APP_NAME ?? DEFAULT_APP_NAME}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="110" />
      </head>
      <body suppressHydrationWarning className={fonts.className}>
        <Providers>
          <Toaster position="top-center" richColors closeButton/>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
