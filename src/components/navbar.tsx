import Link from "next/link";
import React from "react";
import Logo from "./logo";

const Navbar = () => {
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100 px-0 sm:px-1 flex items-center">
        <div className="flex-1">
          <Link href="/" passHref>
            <Logo />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal flex items-center gap-2 sm:gap-4">
            {/* {env.darkModeEnabled && (
            <li>
              <button
                className="bg-none p-0 rounded-lg flex items-center justify-center"
                onClick={toggleTheme}
              >
                <selectedTheme.icon className="w-5 h-5" />
              </button>
            </li>
          )} */}
            <li>
              <Link
                href="/auth/signup"
                className="btn bg-secondary btn-md py-3 px-2 sm:px-4"
              >
                Become A Vendor
              </Link>
            </li>
            <li>
              <Link
                href="/auth/signup"
                className="btn btn-secondary bg-secondary py-3 px-2 sm:px-4 btn-md"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;