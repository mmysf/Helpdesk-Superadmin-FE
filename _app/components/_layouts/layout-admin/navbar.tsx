"use client";

/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/sheet";
import { menuAccount, menuSidebar } from "@/layout/layout-admin/admin-menu";
import { CircleUser, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { Routes } from "@/root/_app/config/routes";
import { AUTH_KEY, USER } from "@/root/_app/constants/auth";
import { trUc } from "@/root/_app/helpers/trans";
import { cn } from "@/root/_app/helpers/utils";
import { useTranslations } from "next-intl";

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
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
          {/* <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuAccount.map((item, index) => {
            if (!item) return null; // defensive check

            if ("separator" in item && item.separator) {
              return <DropdownMenuSeparator key={index} />;
            }

            if ("name" in item) {
              if (item.name === "my_account") {
                return (
                  <DropdownMenuLabel key={index}>My Account</DropdownMenuLabel>
                );
              }

              if (item.name === "logout") {
                return (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => {
                      Cookie.remove(AUTH_KEY);
                      Cookie.remove(USER);
                      router.push(Routes.AUTH_SIGNIN);
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                );
              }

              const displayName = item?.name
                ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
                : "";

              return (
                <DropdownMenuItem key={index}>{displayName}</DropdownMenuItem>
              );
            }

            return null;
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Navbar;
