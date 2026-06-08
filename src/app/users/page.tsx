"use client";

import { useState } from "react";
import { Search, Edit2, Trash2, Plus, X, Filter } from "lucide-react";

/* ── Types ──────────────────────────────────────────────── */
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Client" | "Artist" | "Admin";
  status: "Active" | "Inactive";
  joinDate: string;
}

/* ── Seed data ──────────────────────────────────────────── */
const initialUsers: User[] = [
  { id: "USR-1001", name: "Sarah Johnson",  email: "sarah.j@email.com",   phone: "+44 7700 900001", role: "Client", status: "Active",   joinDate: "2025-11-15" },
  { id: "USR-1002", name: "Michael Chen",   email: "michael.c@email.com", phone: "+44 7700 900002", role: "Artist", status: "Active",   joinDate: "2025-10-22" },
  { id: "USR-1003", name: "Emma Wilson",    email: "emma.w@email.com",    phone: "+44 7700 900003", role: "Client", status: "Active",   joinDate: "2025-12-01" },
  { id: "USR-1004", name: "James Brown",    email: "james.b@email.com",   phone: "+44 7700 900004", role: "Admin",  status: "Active",   joinDate: "2025-09-10" },
  { id: "USR-1005", name: "Lisa Anderson",  email: "lisa.a@email.com",    phone: "+44 7700 900005", role: "Client", status: "Inactive", joinDate: "2025-08-05" },
  { id: "USR-1006", name: "David Miller",   email: "david.m@email.com",   phone: "+44 7700 900006", role: "Artist", status: "Active",   joinDate: "2025-11-30" },
  { id: "USR-1007", name: "Sophie Taylor",  email: "sophie.t@email.com",  phone: "+44 7700 900007", role: "Client", status: "Active",   joinDate: "2025-12-12" },
  { id: "USR-1008", name: "Robert Davis",   email: "robert.d@email.com",  phone: "+44 7700 900008", role: "Artist", status: "Inactive", joinDate: "2025-07-20" },
];

/* ── Reusable field components ──────────────────────────── */
function FormField({
  label, children,
}: {
  label: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 transition bg-white placeholder:text-gray-300";

/* ── Modal wrapper ──────────────────────────────────────── */
function Modal({
  children, onClose, narrow = false,
}: {
  children: React.ReactNode; onClose: () => void; narrow?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={[
          "relative z-10 bg-white shadow-2xl w-full",
          // Mobile: bottom sheet with rounded top; Desktop: centered card
          "rounded-t-2xl sm:rounded-2xl",
          // Width cap on desktop
          narrow ? "sm:max-w-sm" : "sm:max-w-md",
          // Max height + scroll
          "max-h-[90vh] overflow-y-auto",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Add User Modal ─────────────────────────────────────── */
function AddUserModal({
  onClose, onAdd,
}: {
  onClose: () => void;
  onAdd: (u: Omit<User, "id" | "joinDate" | "status">) => void;
}) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", role: "Client" as User["role"],
  });

  const s = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-5 sm:p-6">
        {/* Pull-bar on mobile */}
        <div className="flex justify-center mb-4 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="flex items-start justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Add New User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-0.5 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Full Name">
            <input required className={inputCls} placeholder="Enter full name"
              value={form.name} onChange={(e) => s({ name: e.target.value })} />
          </FormField>
          <FormField label="Email">
            <input required type="email" className={inputCls} placeholder="Enter email address"
              value={form.email} onChange={(e) => s({ email: e.target.value })} />
          </FormField>
          <FormField label="Phone">
            <input required className={inputCls} placeholder="e.g. +44 7700 900000"
              value={form.phone} onChange={(e) => s({ phone: e.target.value })} />
          </FormField>
          <FormField label="Role">
            <select className={inputCls} value={form.role}
              onChange={(e) => s({ role: e.target.value as User["role"] })}>
              <option value="">Select role</option>
              <option value="Client">Client</option>
              <option value="Artist">Artist</option>
              <option value="Admin">Admin</option>
            </select>
          </FormField>

          <div className="pt-2">
            <button type="submit"
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)" }}>
              Create User
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

/* ── Edit User Modal ────────────────────────────────────── */
function EditUserModal({
  user, onClose, onSave,
}: {
  user: User; onClose: () => void; onSave: (u: User) => void;
}) {
  const [form, setForm] = useState({
    name: user.name, email: user.email,
    phone: user.phone, role: user.role, status: user.status,
  });
  const s = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...user, ...form });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-5 sm:p-6">
        <div className="flex justify-center mb-4 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Edit User</h2>
            <p className="text-xs text-gray-400 mt-0.5">Update the user details below.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-0.5 transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <FormField label="Full Name">
            <input required className={inputCls} value={form.name}
              onChange={(e) => s({ name: e.target.value })} />
          </FormField>
          <FormField label="Email">
            <input required type="email" className={inputCls} value={form.email}
              onChange={(e) => s({ email: e.target.value })} />
          </FormField>
          <FormField label="Phone">
            <input required className={inputCls} value={form.phone}
              onChange={(e) => s({ phone: e.target.value })} />
          </FormField>
          <FormField label="Role">
            <select className={inputCls} value={form.role}
              onChange={(e) => s({ role: e.target.value as User["role"] })}>
              <option value="Client">Client</option>
              <option value="Artist">Artist</option>
              <option value="Admin">Admin</option>
            </select>
          </FormField>
          <FormField label="Status">
            <select className={inputCls} value={form.status}
              onChange={(e) => s({ status: e.target.value as User["status"] })}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </FormField>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)" }}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

/* ── Delete Dialog ──────────────────────────────────────── */
function DeleteDialog({
  onClose, onConfirm,
}: {
  onClose: () => void; onConfirm: () => void;
}) {
  return (
    <Modal onClose={onClose} narrow>
      <div className="p-6 sm:p-8">
        <div className="flex justify-center mb-4 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>
        <div className="text-center">
          {/* Warning icon */}
          <div className="flex h-14 w-14 mx-auto mb-4 items-center justify-center rounded-full bg-red-50">
            <Trash2 className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Are you absolutely sure?
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            This action cannot be undone. This will permanently delete the
            user from the platform.
          </p>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-3">
            <button onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button onClick={() => { onConfirm(); onClose(); }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#7c3aed] hover:bg-[#6d28d9] transition active:scale-[0.98]">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}



/* ── Status badge ───────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
      status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
    }`}>
      {status}
    </span>
  );
}

/* ── Mobile user card ───────────────────────────────────── */
function UserCard({
  user,
  onEdit,
  onDelete,
}: {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>
        <StatusBadge status={user.status} />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-600">{user.role}</span>
        <span className="text-xs text-gray-400">{user.id}</span>
        <span className="text-xs text-gray-400 ml-auto">{user.joinDate}</span>
      </div>
      <p className="text-xs text-gray-500">{user.phone}</p>
      <div className="flex items-center justify-end gap-2 pt-1 border-t border-gray-50">
        <button onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#7c3aed] bg-[#7c3aed]/10 hover:bg-[#7c3aed]/20 transition">
          <Edit2 className="h-3 w-3" /> Edit
        </button>
        <button onClick={onDelete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 transition">
          <Trash2 className="h-3 w-3" /> Delete
        </button>
      </div>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────── */
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [showAdd, setShowAdd]       = useState(false);
  const [editUser, setEditUser]     = useState<User | null>(null);
  const [deleteId, setDeleteId]     = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
      (roleFilter === "All Roles"   || u.role   === roleFilter) &&
      (statusFilter === "All Status" || u.status === statusFilter)
    );
  });

  const handleAdd = (data: Omit<User, "id" | "joinDate" | "status">) =>
    setUsers((prev) => [
      { ...data, id: `USR-${1000 + prev.length + 1}`, joinDate: new Date().toISOString().split("T")[0], status: "Active" },
      ...prev,
    ]);

  const handleSave = (updated: User) =>
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));

  const handleDelete = (id: string) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <>
      <div className="space-y-4 min-w-0">

        {/* ── Page header ── */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Users Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage all platform users, roles, and access.
            </p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] whitespace-nowrap flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)" }}
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>

        {/* ── Filter bar ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          {/* Search row — always visible */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/15 transition"
              />
            </div>
            {/* Filter toggle on small screens */}
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className={`sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition flex-shrink-0 ${
                filtersOpen || roleFilter !== "All Roles" || statusFilter !== "All Status"
                  ? "border-[#7c3aed] text-[#7c3aed] bg-[#7c3aed]/5"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              <Filter className="h-4 w-4" />
            </button>
            {/* Inline selects on sm+ */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#7c3aed] bg-white cursor-pointer min-w-[120px] transition"
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Artist</option>
                <option>Client</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none focus:border-[#7c3aed] bg-white cursor-pointer min-w-[120px] transition"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Mobile filter expandable row */}
          {filtersOpen && (
            <div className="sm:hidden flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white"
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Artist</option>
                <option>Client</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none bg-white"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          )}
        </div>

        {/* ── Table card (md+) ── */}
        <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
              All Users <span className="text-gray-400 font-normal">({filtered.length})</span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  {["User ID","Name","Email","Phone","Role","Status","Join Date","Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-400 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-400">
                      No users found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <tr key={user.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-[#7c3aed]/[0.02] transition-colors">
                      <td className="px-5 py-3 text-gray-400 text-xs font-mono">{user.id}</td>
                      <td className="px-5 py-3 font-semibold text-gray-900 whitespace-nowrap">{user.name}</td>
                      <td className="px-5 py-3 text-gray-500">{user.email}</td>
                      <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{user.phone}</td>
                      <td className="px-5 py-3 text-gray-600">{user.role}</td>
                      <td className="px-5 py-3"><StatusBadge status={user.status} /></td>
                      <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{user.joinDate}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditUser(user)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-[#7c3aed] hover:bg-[#7c3aed]/10 transition"
                            title="Edit user">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => setDeleteId(user.id)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                            title="Delete user">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Mobile card list (< md) ── */}
        <div className="md:hidden space-y-3">
          <p className="text-xs text-gray-500 px-1">
            All Users ({filtered.length})
          </p>
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-sm text-gray-400">
              No users found matching your filters.
            </div>
          ) : (
            filtered.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => setEditUser(user)}
                onDelete={() => setDeleteId(user.id)}
              />
            ))
          )}
        </div>

      </div>

      {/* ── Modals ── */}
      {showAdd  && <AddUserModal  onClose={() => setShowAdd(false)}  onAdd={handleAdd} />}
      {editUser && <EditUserModal user={editUser} onClose={() => setEditUser(null)}  onSave={handleSave} />}
      {deleteId && <DeleteDialog  onClose={() => setDeleteId(null)}  onConfirm={() => handleDelete(deleteId)} />}
    </>
  );
}
