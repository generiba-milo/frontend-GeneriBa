import React from "react";

export const navItems: {
  name: string;
  link: string;
  icon?: React.ReactNode;
}[] = [
  { name: "Marketplace", link: "/marketplace" },
  { name: "DAO", link: "/dao" },
  { name: "Teams", link: "/teams" },
  { name: "Dashboard", link: "/dashboard" },
];

export default navItems;
