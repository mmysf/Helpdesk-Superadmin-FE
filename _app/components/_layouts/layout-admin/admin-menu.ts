import { Routes } from "@/config/routes";
import { Home, Package, ShoppingBag, Ticket, User } from "lucide-react";

export const menuSidebar = [
  {
    name: "dashboard",
    icon: Home,
    link: Routes.BO_DASHBOARD,
  },
  {
    name: "company",
    icon: User,
    link: Routes.BO_COMPANY,
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
    name: "product",
    icon: Package,
    link: Routes.BO_PRODUCT,
  },
  {
    name: "order",
    icon: ShoppingBag,
    link: Routes.BO_ORDER,
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
