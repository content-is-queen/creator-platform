"use client";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { auth } from "@/firebase.config";
import { useUser } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";
import { Menu } from "@headlessui/react";

import ProfileIcon from "@/components/ProfileIcon";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Notifications from "./Notifications";

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const { user, setUser, loading } = useUser();
  const { subscribed } = useAuth();

  const pathname = usePathname();

  const handleToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      auth.signOut();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    if (
      !loading &&
      !user &&
      (pathname !== "/signup" || pathname !== "/login")
    ) {
      router.push("/login");
    }
  }, [loading]);

  const LINKS = {
    creator: [
      {
        href: "/",
        label: "Dashboard",
      },
      { href: "/opportunities", label: "Opportunities" },
      { href: "/conversations", label: "Conversations" },
    ],
    brand: [
      {
        href: "/",
        label: "Projects",
      },
      { href: "/conversations", label: "Conversations" },
    ],
    admin: [
      {
        href: "/",
        label: "Dashboard",
      },
      {
        href: "/admin/opportunities",
        label: "Opportunities",
      },
      {
        href: "/admin/users",
        label: "Users",
      },
      { href: "/conversations", label: "Conversations" },
    ],
    super_admin: [
      {
        href: "/",
        label: "Dashboard",
      },
      {
        href: "/admin/opportunities",
        label: "Opportunities",
      },
      {
        href: "/admin/users",
        label: "Users",
      },
      { href: "/conversations", label: "Conversations" },
    ],
  };

  return (
    <nav
      className={clsx(
        "bg-queen-blue text-queen-yellow py-4",
        isMenuOpen && "fixed w-full h-screen z-10"
      )}
    >
      <Container className="flex flex-wrap items-center justify-between text-sm w-full">
        <Link
          href="/"
          className="flex items-center gap-x-3 rtl:space-x-reverse"
        >
          <img
            src="/images/CiQ_Logo_Horizontal.svg"
            className="h-12 hidden md:block"
            alt="Content is queen"
          />
          <img
            src="/images/CiQ_Logo_Stacked.svg"
            width={100}
            className="md:hidden"
            alt="Content is queen"
          />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-auto rtl:space-x-reverse">
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul
              className={clsx(
                "flex flex-col items-center py-2 leading-none uppercase md:space-x-6 rtl:space-x-reverse md:flex-row md:border-0",
                isMenuOpen &&
                  "fixed w-full left-0 top-20 z-10 space-y-6 bg-queen-blue pt-16 pb-20"
              )}
            >
              {LINKS[user?.role]?.map(({ href, label }) => (
                <li
                  key={href}
                  className={clsx(
                    twMerge(
                      pathname !== href && "opacity-100",
                      "relative md:after:absolute md:after:h-[1px] md:after:w-0 md:after:bg-queen-yellow md:after:left-0 md:after:-bottom-1 md:hover:after:w-full transition-all",
                      pathname === href && "after:w-full"
                    )
                  )}
                >
                  <Link href={href}>{label}</Link>
                </li>
              ))}
              {user && !subscribed && (
                <li>
                  <Button variant="yellow" href="/plus">
                    Upgrade to {user.role} +
                  </Button>
                </li>
              )}

              <li>
                <Notifications />
              </li>
            </ul>
          </div>
          <div className="order-2 flex items-center gap-x-2 flex-row-reverse md:flex-row md:mr-2">
            <Menu as="div" className="relative">
              <Menu.Button className="align-middle">
                <ProfileIcon
                  className="shrink-0 md:me-0 focus:ring-4 focus:ring-gray-300 h-8 w-8 order-1"
                  profilePhoto={user?.profilePhoto}
                >
                  <span className="sr-only">User menu</span>
                </ProfileIcon>
              </Menu.Button>
              <Menu.Items className="absolute z-50 right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                <Menu.Item as="div" className="text-queen-black/60">
                  <div className="px-4 py-2 text-sm">{user?.email}</div>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-queen-yellow rounded-lg md:hidden hover:bg-queen-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={handleToggle}
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="#E5FC52"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default MainNav;
