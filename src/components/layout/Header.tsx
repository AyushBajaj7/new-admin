"use client";

import { useState } from "react";
import { Search, Bell, User, Settings, LogOut, Menu, X } from "lucide-react";
import { useSidebar } from "./SidebarContext";

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggle } = useSidebar();

  return (
    <>
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        flexShrink: 0,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 24px",
        position: "relative",
        zIndex: 20,
      }}>

        {/* Left: hamburger + search */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0, flex: 1 }}>
          {/* Hamburger */}
          <button onClick={toggle} aria-label="Toggle sidebar" style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "4px", display: "flex", alignItems: "center",
            color: "#6b7280", borderRadius: "6px", flexShrink: 0,
          }}>
            <Menu style={{ width: "20px", height: "20px" }} />
          </button>

          {/* Search bar — visible sm+ */}
          <div className="hidden sm:flex" style={{
            alignItems: "center", gap: "8px",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "6px 12px",
            flex: 1, maxWidth: "360px",
          }}>
            <Search style={{ width: "15px", height: "15px", color: "#9ca3af", flexShrink: 0 }} />
            <input type="text" placeholder="Search..." style={{
              background: "transparent", border: "none", outline: "none",
              fontSize: "14px", color: "#374151", width: "100%",
            }} />
          </div>

          {/* Mobile search icon */}
          <button className="sm:hidden" onClick={() => setSearchOpen(v => !v)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "4px", display: "flex", alignItems: "center", color: "#6b7280",
          }}>
            {searchOpen ? <X style={{ width: "18px", height: "18px" }} /> : <Search style={{ width: "18px", height: "18px" }} />}
          </button>
        </div>

        {/* Right: bell + avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
          {/* Bell */}
          <div style={{ position: "relative", cursor: "pointer" }}>
            <Bell style={{ width: "20px", height: "20px", color: "#6b7280" }} />
            <span style={{
              position: "absolute", top: "-4px", right: "-4px",
              width: "16px", height: "16px", borderRadius: "50%",
              backgroundColor: "#ef4444", color: "#fff",
              fontSize: "9px", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>3</span>
          </div>

          {/* Avatar + name */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setDropdownOpen(v => !v)} style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "none", border: "none", cursor: "pointer", padding: 0,
            }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                backgroundColor: "#7c3aed",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: "12px", fontWeight: 700, flexShrink: 0,
              }}>AD</div>
              <div className="hidden sm:flex" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827", lineHeight: 1.3 }}>Alex D.</span>
                <span style={{ fontSize: "11px", color: "#6b7280", lineHeight: 1.3 }}>admin@neoent.com</span>
              </div>
            </button>

            {dropdownOpen && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setDropdownOpen(false)} />
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 20,
                  width: "176px", backgroundColor: "#fff",
                  border: "1px solid #e5e7eb", borderRadius: "12px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)", overflow: "hidden",
                }}>
                  <div style={{ padding: "10px 16px", borderBottom: "1px solid #f3f4f6" }}>
                    <p style={{ margin: 0, fontSize: "12px", fontWeight: 600, color: "#374151" }}>Alex D.</p>
                    <p style={{ margin: 0, fontSize: "11px", color: "#9ca3af" }}>admin@neoent.com</p>
                  </div>
                  {([["Profile", User], ["Settings", Settings]] as const).map(([label, Icon]) => (
                    <button key={label} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      width: "100%", padding: "10px 16px",
                      background: "none", border: "none",
                      fontSize: "14px", color: "#374151", cursor: "pointer", textAlign: "left",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <Icon style={{ width: "15px", height: "15px", color: "#9ca3af" }} />
                      {label}
                    </button>
                  ))}
                  <div style={{ borderTop: "1px solid #f3f4f6" }} />
                  <button style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    width: "100%", padding: "10px 16px",
                    background: "none", border: "none",
                    fontSize: "14px", color: "#ef4444", cursor: "pointer", textAlign: "left",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#fef2f2")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <LogOut style={{ width: "15px", height: "15px" }} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile search drop-down */}
      {searchOpen && (
        <div className="sm:hidden" style={{
          backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb",
          display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", zIndex: 19,
        }}>
          <Search style={{ width: "15px", height: "15px", color: "#9ca3af", flexShrink: 0 }} />
          <input autoFocus type="text" placeholder="Search..." style={{
            flex: 1, background: "transparent", border: "none",
            outline: "none", fontSize: "14px", color: "#374151",
          }} />
        </div>
      )}
    </>
  );
}
