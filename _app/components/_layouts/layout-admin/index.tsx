/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Sidebar from "@/layout/layout-admin/sidebar";
import Navbar from "@/layout/layout-admin/navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "../../ui/toaster";

const Layout: React.FC<any> = async ({ children }) => {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <div
        suppressHydrationWarning
        className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
      >
        <Sidebar />
        <div className="flex flex-col">
          <Navbar />
          {children}
          <Toaster />
        </div>
      </div>
    </NextIntlClientProvider>
  );
};

export default Layout;
