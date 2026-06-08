"use client";

import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Music, Calendar, CalendarCheck, PoundSterling } from "lucide-react";

/* ── Data ──────────────────────────────────────────────── */
const monthlyRevenue = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 13800 },
  { month: "Apr", revenue: 25000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 30000 },
];

const eventBookings = [
  { month: "Jan", bookings: 45 },
  { month: "Feb", bookings: 48 },
  { month: "Mar", bookings: 46 },
  { month: "Apr", bookings: 60 },
  { month: "May", bookings: 55 },
  { month: "Jun", bookings: 68 },
];

const recentBookings = [
  { id: "BK-1001", client: "Sarah Johnson",  artist: "The Neotones",    status: "Completed" },
  { id: "BK-1002", client: "Michael Chen",   artist: "Forever Diamonds",status: "Pending"   },
  { id: "BK-1003", client: "Emma Wilson",    artist: "Jazz Quartet",    status: "Completed" },
  { id: "BK-1004", client: "James Brown",    artist: "Rock Band",       status: "Pending"   },
];

const newArtists = [
  { name: "The Electric Dreams", category: "Rock Band", status: "Pending"  },
  { name: "Classical Strings",   category: "Classical", status: "Pending"  },
  { name: "DJ Soundwave",        category: "DJ",        status: "Approved" },
];

const statCards = [
  { label: "Users",          value: "2,847", change: "↑ 12.5% vs last month",  icon: Users,         iconBg: "#e0e7ff", iconColor: "#4f46e5" },
  { label: "Active Artists", value: "342",   change: "↑ 8.2% vs last month",   icon: Music,         iconBg: "#ede9fe", iconColor: "#7c3aed" },
  { label: "Events",         value: "1,205", change: "↑ 15.3% vs last month",  icon: Calendar,      iconBg: "#e0e7ff", iconColor: "#4f46e5" },
  { label: "Bookings",       value: "892",   change: "↑ 5.7% vs last month",   icon: CalendarCheck, iconBg: "#ede9fe", iconColor: "#7c3aed" },
  { label: "Revenue",        value: "£123K", change: "↑ 23.1% vs last month",  icon: PoundSterling, iconBg: "#ede9fe", iconColor: "#7c3aed" },
];

/* ── Custom Tooltip ────────────────────────────────────── */
function CustomTooltip({
  active, payload, label, prefix = "",
}: {
  active?: boolean; payload?: { value: number }[]; label?: string; prefix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-lg px-3 py-2 text-xs">
      <p className="font-semibold text-gray-700">{label}</p>
      <p className="text-[#7c3aed]">{prefix}{payload[0].value.toLocaleString()}</p>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className="space-y-5 min-w-0">

      {/* Page title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          June 2026 — numbers are looking decent.
        </p>
      </div>

      {/* ── Stat cards: 2 cols → 3 cols → 5 cols ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0 pr-2">
                  <p className="text-xs text-gray-500 mb-1 truncate">{card.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div
                  className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ background: card.iconBg }}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: card.iconColor }} />
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 leading-tight">
                {card.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Charts: 1 col → 2 cols ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Revenue (Jan–Jun)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyRevenue} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip prefix="Revenue : £" />} />
              <Line
                type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={2}
                dot={{ fill: "#818cf8", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#818cf8" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Bookings per month</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={eventBookings} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip prefix="Bookings : " />} />
              <Bar dataKey="bookings" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom tables: 1 col → 2 cols ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm overflow-hidden">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Recent bookings</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-xs min-w-[360px] sm:min-w-0">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 px-4 sm:px-0 text-left font-medium text-gray-400">ID</th>
                  <th className="pb-2 px-4 sm:px-0 text-left font-medium text-gray-400">Client</th>
                  <th className="pb-2 px-4 sm:px-0 text-left font-medium text-gray-400">Artist</th>
                  <th className="pb-2 px-4 sm:px-0 text-left font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 px-4 sm:px-0 text-gray-500 font-mono">{b.id}</td>
                    <td className="py-2.5 px-4 sm:px-0 text-gray-800 font-medium whitespace-nowrap">{b.client}</td>
                    <td className="py-2.5 px-4 sm:px-0 text-gray-500 whitespace-nowrap">{b.artist}</td>
                    <td className="py-2.5 px-4 sm:px-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                        b.status === "Completed" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Artist Applications */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm overflow-hidden">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Pending artist applications</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-xs min-w-[300px] sm:min-w-0">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 px-4 sm:px-0 text-left font-medium text-gray-400">Name</th>
                  <th className="pb-2 px-4 sm:px-0 text-left font-medium text-gray-400">Category</th>
                  <th className="pb-2 px-4 sm:px-0 text-left font-medium text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {newArtists.map((a) => (
                  <tr key={a.name} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 px-4 sm:px-0 text-gray-800 font-medium whitespace-nowrap">{a.name}</td>
                    <td className="py-2.5 px-4 sm:px-0 text-gray-500">{a.category}</td>
                    <td className="py-2.5 px-4 sm:px-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        a.status === "Approved" ? "bg-emerald-100 text-emerald-600" : "bg-yellow-100 text-yellow-600"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
