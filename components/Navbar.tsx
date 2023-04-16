import { UserButton } from "@clerk/nextjs";
import { useScrollPosition } from "hooks/useScrollPosition";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navbar() {
  const navigationBackground = useScrollPosition();

  return (
    <nav
      className={`navbar sticky top-0 z-50 px-6 py-3 transition-colors duration-300 ${
        navigationBackground ? "bg-white/70 shadow-sm backdrop-blur " : ""
      }`}
    >
      <div className="flex-1 space-x-1">
        <div className="relative h-12 w-12">
          <Image src={"/logo.png"} fill alt="Logo img" />
        </div>
        <Link
          href="/"
          className="btn-ghost btn text-xl normal-case text-primary"
        >
          Menu Mentor
        </Link>
      </div>
      <div className="flex-none ">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "h-12 w-12",
              userButtonPopoverFooter: "hidden",
              userButtonPopoverCard: "pt-3 pb-0",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
