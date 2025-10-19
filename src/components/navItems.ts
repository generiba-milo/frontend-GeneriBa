import React from "react";

export const navItems: {
  name: string;
  link: string;
  icon?: React.ReactNode;
  requireAuth?: boolean;
}[] = [
  { name: "DAO", link: "/dao", requireAuth: true },
  { name: "Need Job", link: "/need-job", requireAuth: false },
  { name: "Create Job", link: "/create-job", requireAuth: true },
  { name: "Get Loan", link: "/get-loan", requireAuth: true },
  { name: "Dashboard", link: "/dashboard", requireAuth: true },
];

export default navItems;
