"use client";

/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import Link from "next/link";
import Show from "@/atoms/show";
import { trUc } from "@/helpers/trans";
import { menuSidebar } from "@/layout/layout-admin/admin-menu";
import { Button } from "@/ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const t = useTranslations();
  const [dropdown, setDropdown] = React.useState<string | null>(null);

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

              return (
                <div key={`menu-sidebar-${index}`}>
                  {/* Menu utama */}
                  <Link
                    href={item.children ? "#" : item.link}
                    onClick={(e) => {
                      if (item.children) e.preventDefault();
                      setDropdown(dropdown === item.name ? null : item.name); // Toggle dropdown
                    }}
                    className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                      dropdown === item.name ? "bg-muted/80 text-primary" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4" />
                      {trUc({ t, key: item.name })}
                    </div>
                    {item.children && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          dropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Sub-menu */}
                  {item.children && dropdown === item.name && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={`submenu-${index}-${childIndex}`}
                          href={child.link}
                          className="block rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          {trUc({ t, key: child.name })}
                        </Link>
                      ))}
                    </div>
                  )}
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
