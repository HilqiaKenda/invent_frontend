"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";

import { SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{ inputWrapper: "bg-default-100", input: "text-sm" }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          G
        </Kbd>
      }
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const handleAuthAction = (action: string) => {
    if (action === "signin") router.push("/signin");
    if (action === "signup") router.push("/signup");
    if (action === "logout") {
      setIsLoggedIn(false);
      router.push("/");
    }
  };

  return (
    <HeroUINavbar
      className={`${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border-b shadow-lg`}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink href="/">
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                GrootHub
              </span>
            </motion.div>
          </NextLink>
        </NavbarBrand>

        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.id}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "hover:text-pink-500 transition-colors flex items-center gap-1",
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                as="button"
                className="cursor-pointer"
                name="User"
                size="sm"
                src={isLoggedIn ? "/avatar.png" : undefined}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu" variant="flat">
              {!isLoggedIn ? (
                <>
                  <DropdownItem
                    key={""}
                    onClick={() => handleAuthAction("signin")}
                  >
                    Sign In
                  </DropdownItem>
                  <DropdownItem
                    key={""}
                    onClick={() => handleAuthAction("signup")}
                  >
                    Sign Up
                  </DropdownItem>
                </>
              ) : (
                <DropdownItem
                  key={""}
                  color="danger"
                  onClick={() => handleAuthAction("logout")}
                >
                  Logout
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <button
          className="p-2"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? "🌞" : "🌙"}
        </button>
        <NavbarMenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              animate={{ height: "auto", opacity: 1 }}
              className="mx-4 mt-2 flex flex-col gap-2"
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
            >
              {siteConfig.navItems.map((item) => (
                <NavbarMenuItem key={item.id}>
                  <NextLink
                    className={`w-full px-4 py-2 flex items-center gap-2 rounded-lg ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-pink-50"}`}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NextLink>
                </NavbarMenuItem>
              ))}

              {!isLoggedIn ? (
                <>
                  <NavbarMenuItem>
                    <Link href="/signin">Sign In</Link>
                  </NavbarMenuItem>
                  <NavbarMenuItem>
                    <Link href="/signup">Sign Up</Link>
                  </NavbarMenuItem>
                </>
              ) : (
                <NavbarMenuItem>
                  <button
                    className="text-danger w-full text-left"
                    onClick={() => {
                      handleAuthAction("logout");
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </NavbarMenuItem>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
