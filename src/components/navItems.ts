import React from "react";

export const navItems: {
  name: string;
  link: string;
  icon?: React.ReactNode;
  requireAuth?: boolean;
}[] = [
  { name: "Need Job", link: "/", requireAuth: false },
  { name: "Create Job", link: "/create-job", requireAuth: true },
  { name: "Get Loan", link: "/get-loan", requireAuth: true },
];

export default navItems;
