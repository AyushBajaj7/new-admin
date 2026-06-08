"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Mic2,
  Calendar, CalendarCheck, Settings, X,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users",     href: "/users",     icon: Users },
  { name: "Artists",   href: "/artists",   icon: Mic2 },
  { name: "Events",    href: "/events",    icon: Calendar },
  { name: "Bookings",  href: "/bookings",  icon: CalendarCheck },
  { name: "Settings",  href: "/settings",  icon: Settings },
];

function SidebarPanel({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "180px",
      backgroundColor: "#ffffff",
      borderRight: "1px solid #e5e7eb",
    }}>
      {/* Logo */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        height: "64px",
        padding: "0 20px",
        borderBottom: "1px solid #e5e7eb",
        flexShrink: 0,
      }}>
        {/* NEO logo mark */}
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <polygon points="14,2 25,8 25,20 14,26 3,20 3,8"
            fill="rgba(124,58,237,0.12)" stroke="#7c3aed" strokeWidth="1.8" />
          <text x="14" y="18" textAnchor="middle"
            fill="#7c3aed" fontSize="7" fontWeight="bold" fontFamily="Inter,sans-serif">
            NEO
          </text>
        </svg>
        <span style={{ fontWeight: 700, fontSize: "15px", color: "#111827", letterSpacing: "-0.01em" }}>
          NEO Admin
        </span>
        {onClose && (
          <button onClick={onClose} style={{
            marginLeft: "auto", background: "none", border: "none",
            cursor: "pointer", color: "#9ca3af", display: "flex", alignItems: "center",
          }}>
            <X style={{ width: "16px", height: "16px" }} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "16px 12px", display: "flex", flexDirection: "column", gap: "2px" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/dashboard");
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "8px",
                padding: "9px 12px",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
                color: isActive ? "#7c3aed" : "#6b7280",
                backgroundColor: isActive ? "#f5f3ff" : "transparent",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon style={{
                  width: "16px", height: "16px", flexShrink: 0,
                  color: isActive ? "#7c3aed" : "#9ca3af",
                }} />
                {item.name}
              </div>
              {isActive && (
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  backgroundColor: "#7c3aed", flexShrink: 0,
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid #e5e7eb",
        flexShrink: 0,
      }}>
        <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
          NEO Entertainment
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { open, setOpen } = useSidebar();

  return (
    <>
      {/* Desktop — always visible lg+ */}
      <div className="hidden lg:block" style={{ width: "180px", flexShrink: 0, height: "100vh" }}>
        <SidebarPanel />
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden" style={{
          position: "fixed", inset: 0, zIndex: 50, display: "flex",
        }}>
          <div
            style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: "relative", zIndex: 10, height: "100%", width: "180px",
            boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
          }}>
            <SidebarPanel onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
