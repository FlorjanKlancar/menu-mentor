import { UserButton, useUser } from "@clerk/nextjs";
import { useScrollPosition } from "hooks/useScrollPosition";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  HomeIcon,
  ArchiveBoxIcon,
  ChatBubbleLeftRightIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

function Navbar() {
  const navigationBackground = useScrollPosition();
  const { isSignedIn } = useUser();

  return (
    <nav
      className={`navbar sticky top-0 z-50 px-6 py-3 transition-colors duration-300 ${
        navigationBackground ? "bg-white/70 shadow-sm backdrop-blur " : ""
      }`}
    >
      {isSignedIn && (
        <div className="navbar-start lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <Bars3BottomLeftIcon className="h-6 w-6" />
            </label>
            <ul
              className="dropdown-content  menu rounded-box  menu-compact mt-3 w-48 bg-base-100 p-2 shadow"
              tabIndex={0}
            >
              <RenderMenuList />
            </ul>
          </div>
        </div>
      )}

      <div className="hidden space-x-2 lg:navbar-start lg:flex ">
        <div className="relative h-12 w-12">
          <Image src={"/logo.png"} fill alt="Logo img" />
        </div>
        <Link
          href="/"
          className="btn-ghost btn text-base normal-case text-primary lg:text-xl"
        >
          Menu Mentor
        </Link>
      </div>

      <div className="navbar-center lg:hidden">
        <div className="relative h-12 w-12">
          <Image src={"/logo.png"} fill alt="Logo img" />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-3 px-1">
          {isSignedIn && <RenderMenuList />}
        </ul>
      </div>

      <div className="navbar-end">
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

function RenderMenuList() {
  const router = useRouter();

  const menu = [
    {
      title: "Home",
      icon: <HomeIcon className="h-6 w-6" />,
      path: "/",
    },
    {
      title: "Receipts",
      icon: <ArchiveBoxIcon className="h-6 w-6" />,
      path: "/receipts",
    },
    {
      title: "Chat history",
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
      path: "/chat-history",
    },
  ];

  const checkIfActivePath = (path: string) =>
    path === router.asPath ? true : false;

  return (
    <>
      {menu.map((item) => (
        <Link key={item.title} href={item.path}>
          <button
            className={`btn-ghost btn w-full items-center justify-start gap-2 active:bg-primary active:text-slate-800 lg:justify-center ${
              checkIfActivePath(item.path) ? "text-primary" : "text-slate-600"
            }`}
          >
            {item.icon}
            {item.title}
          </button>
        </Link>
      ))}
    </>
  );
}
