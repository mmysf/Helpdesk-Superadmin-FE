import { Routes } from "@/config/routes";
import { Home, Package, ShoppingBag, Ticket, User } from "lucide-react";

export const menuSidebar = [
  {
    name: "dashboard",
    icon: Home,
    link: Routes.BO_DASHBOARD,
  },
  {
    name: "product",
    icon: Package,
    link: Routes.BO_PRODUCT,
    children: [
      { name: "duration", link: "/product/duration" },
      { name: "subscription", link: "/product/subscription" },
    ],
  },
  {
    name: "order",
    icon: ShoppingBag,
    link: Routes.BO_ORDER,
  },
  {
    name: "customer",
    icon: User,
    link: Routes.BO_CUSTOMER,
  },
  {
    name: "ticket",
    icon: Ticket,
    link: Routes.BO_TICKET,
  },
  {
    name: "agent",
    icon: User,
    link: Routes.BO_AGENT,
  },
];

export const menuAccount = [
  {
    separator: true,
  },
  {
    name: "logout",
  },
];
