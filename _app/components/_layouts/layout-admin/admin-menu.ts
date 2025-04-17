import { Routes } from "@/config/routes";
import {
  Home,
  Package,
  ShoppingBag,
  Ticket,
  User,
  Building2,
} from "lucide-react";

export const menuSidebar = [
  {
    name: "dashboard",
    icon: Home,
    link: Routes.BO_DASHBOARD,
  },
  {
    name: "company",
    icon: Building2,
    link: Routes.BO_COMPANY,
  },
  {
    name: "customer",
    icon: User,
    link: Routes.BO_CUSTOMER,
  },
  {
    name: "customer_b2c",
    icon: User,
    link: Routes.BO_CUSTOMER_B2C,
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
