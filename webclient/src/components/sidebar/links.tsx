"use client";
import React, { useState } from "react";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import NavLink from "../navlink/navlink";
import DashIcon from "../dashicon/dashicon";
import { FaChevronDown } from "react-icons/fa"; // Importing dropdown arrow icon
import { RoutesType } from "@/types/navigation";
// chakra imports
import routes from "./routes";

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const pathname = usePathname();

  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const activeRoute = useCallback(
    (routePath: string) => {
      if (routePath === "/admin/") {
        return pathname === "/admin" || pathname === "/admin/";
      }
      return pathname === routePath;
    },
    [pathname]
  );

  // Toggle dropdown for the clicked route, and close others
  const toggleDropdown = (routeName: string) => {
    if (openDropdown === routeName) {
      setOpenDropdown(null); // Close if the dropdown is already open
    } else {
      setOpenDropdown(routeName); // Open the clicked dropdown, close others
    }
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      const fullPath = `${route.layout}/${route.path}`;
      const routePath = fullPath === "/admin/" ? "/admin" : fullPath;
  
      // If the route has children, render it as a dropdown
      if (route.children) {
        return (
          <div key={index}>
            <div
              className="relative mb-3 flex items-center justify-between px-8 hover:cursor-pointer"
              onClick={() => toggleDropdown(route.name)} // Toggle dropdown on click
            >
              <li className="my-[3px] flex cursor-pointer items-center">
                <span
                  className={`${
                    openDropdown === route.name
                      ? "font-bold text-[#9ceb1c] dark:text-white"
                      : "font-medium text-white"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    openDropdown === route.name
                      ? "font-bold text-[#9ceb1c] dark:text-white"
                      : "font-medium text-white"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {/* Dropdown Arrow Icon - changes color when active */}
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  openDropdown === route.name
                    ? "rotate-180 text-[#9ceb1c]"
                    : "text-white"
                }`}
              />
            </div>
  
            {/* Render child routes if the dropdown is open */}
            {openDropdown === route.name &&
              route.children.map((child, childIndex) => (
                <NavLink key={childIndex} href={`${child.layout}/${child.path}`}>
                  <div
                    className="relative ml-6 mb-3 flex hover:cursor-pointer"
                    // onClick={() => setOpenDropdown(null)} // Close dropdown on child click
                  >
                    <li className="my-[3px] flex cursor-pointer items-center px-8">
                      <span
                        className={`${
                          activeRoute(`${child.layout}/${child.path}`)
                            ? "font-bold text-[#9ceb1c] dark:text-white"
                            : "font-medium text-white"
                        }`}
                      >
                        {child.icon ? child.icon : <DashIcon />}
                      </span>
                      <p
                        className={`leading-1 ml-4 flex ${
                          activeRoute(`${child.layout}/${child.path}`)
                            ? "font-bold text-[#9ceb1c] dark:text-white"
                            : "font-medium text-white"
                        }`}
                      >
                        {child.name}
                      </p>
                    </li>
                    {activeRoute(`${child.layout}/${child.path}`) ? (
                      <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-[#9ceb1c]" />
                    ) : null}
                  </div>
                </NavLink>
              ))}
          </div>
        );
      }
  
      // Render normal links (non-dropdowns)
      if (route.layout === "/admin") {
        return (
          <NavLink key={index} href={routePath}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li className="my-[3px] flex cursor-pointer items-center px-8">
                <span
                  className={`${
                    activeRoute(routePath)
                      ? "font-bold text-[#9ceb1c] dark:text-white"
                      : "font-medium text-white"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(routePath)
                      ? "font-bold text-[#9ceb1c] dark:text-white"
                      : "font-medium text-white"
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(routePath) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-[#9ceb1c]" />
              ) : null}
            </div>
          </NavLink>
        );
      }
      return null; // Skip non-admin routes
    });
  };
  
  return <>{createLinks(props.routes)}</>;
};

export default SidebarLinks;
