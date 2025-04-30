/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable react/no-array-index-key */

"use client";

import Show from "@/atoms/show";
import { trUc } from "@/helpers/trans";
import { menuSidebar } from "@/layout/layout-admin/admin-menu";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@nextui-org/react";

const Sidebar: React.FC = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Header */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              width={150}
              height={100}
              alt="swo logo"
              src="/assets/solutionlabs-logo.png"
            />
          </Link>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuSidebar.map((item, index) => {
              const IconComponent = item.icon;
              const link = item.link.toString().replace(/\/$/, ""); // remove trailing slash
              const regex = new RegExp(`^${link}(/|$)`);
              const isActive = regex.test(pathname);

              return (
                <div
                  key={`menu-sidebar-${index}`}
                  className={cn(
                    "rounded-lg",
                    isActive
                      ? "bg-primary text-white"
                      : "text-muted-foreground",
                  )}
                >
                  <Link
                    href={item.link}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      !isActive && " hover:text-primary",
                    )}
                  >
                    <IconComponent className="h-4 w-4" />
                    {trUc({ t, key: item.name })}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="mt-auto p-4">
          <Show when={false}>
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
