import React, { useState } from 'react';
import { Users, Plus, Shield, CheckCircle2, XCircle, Search } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'PLATFORM_ADMIN' | 'HR' | 'EMPLOYEE';
  organization: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([
    {
      id: '1',
      name: 'Platform Administrator',
      email: 'admin@acme.com',
      role: 'PLATFORM_ADMIN',
      organization: 'Acme Technologies Inc.',
      status: 'ACTIVE',
      createdAt: '2026-01-10',
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      email: 'hr.sarah@acme.com',
      role: 'HR',
      organization: 'Acme Technologies Inc.',
      status: 'ACTIVE',
      createdAt: '2026-01-12',
    },
    {
      id: '3',
      name: 'David Kim',
      email: 'hr.david@acme.com',
      role: 'HR',
      organization: 'Acme Technologies Inc.',
      status: 'ACTIVE',
      createdAt: '2026-01-15',
    },
    {
      id: '4',
      name: 'Marcus Vance',
      email: 'marcus.vance@acme.com',
      role: 'EMPLOYEE',
      organization: 'Acme Technologies Inc.',
      status: 'ACTIVE',
      createdAt: '2026-01-20',
    },
    {
      id: '5',
      name: 'Elena Rostova',
      email: 'elena.rostova@acme.com',
      role: 'EMPLOYEE',
      organization: 'Acme Technologies Inc.',
      status: 'ACTIVE',
      createdAt: '2026-01-22',
    },
  ]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'HR' | 'EMPLOYEE'>('EMPLOYEE');

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : u
      )
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserRecord = {
      id: String(Date.now()),
      name: newName,
      email: newEmail,
      role: newRole,
      organization: 'Acme Technologies Inc.',
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers([...users, newUser]);
    setShowModal(false);
    setNewName('');
    setNewEmail('');
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">User Account Governance</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage administrative access, HR credentials, and employee platform accounts.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New User</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter users by name or email..."
          className="w-full pl-10 pr-4 py-2 bg-[#111827] border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Users Table */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Organization</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Created</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-white">{u.name}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        u.role === 'PLATFORM_ADMIN'
                          ? 'purple'
                          : u.role === 'HR'
                          ? 'amber'
                          : 'secondary'
                      }
                    >
                      {u.role}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{u.organization}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={u.status === 'ACTIVE' ? 'success' : 'danger'}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{u.createdAt}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                        u.status === 'ACTIVE'
                          ? 'text-rose-400 hover:bg-rose-500/10'
                          : 'text-emerald-400 hover:bg-emerald-500/10'
                      }`}
                    >
                      {u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Provision Platform Account</h3>
            <p className="text-xs text-slate-400 mb-4">Create a new HR or Employee profile.</p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Liam Smith"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. liam.smith@acme.com"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">RBAC Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="EMPLOYEE">EMPLOYEE</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
