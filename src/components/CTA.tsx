import React from "react";
import { Link } from "react-router-dom";

type CTAProps = {
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
};

const sizeClasses: Record<NonNullable<CTAProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-20 py-4 text-lg",
};

const CTA: React.FC<CTAProps> = ({
  size = "lg",
  children = "Build your board",
  className = "",
}) => {
  const classes =
    `uppercase ${sizeClasses[size]} bg-primary text-text-label rounded-md ${className}`.trim();

  return (
    <Link to="/configurator" className={classes}>
      {children}
    </Link>
  );
};

export default CTA;
