import React from "react";
import CTA from "./CTA";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="container mx-auto px-4 border-b-3 border-gray-900">
      <nav className="flex flex-col items-center lg:flex-row lg:justify-between py-5">
        <Link to="/" className="flex items-center gap-4">
          <img
            src="/images/skateboard.png"
            alt="Logo Skateboard"
            className="h-12 w-12 lg:h-16 lg:w-16"
          />
          <p className="text-3xl lg:text-5xl font-extrabold">FLIP.</p>
        </Link>
        <div className="hidden lg:block">
          <CTA size="sm" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
