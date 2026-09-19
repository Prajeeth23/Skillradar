import React, { useState } from 'react';
import { Users, Plus, Shield, CheckCircle2, XCircle, Search, Trash2 } from 'lucide-react';
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
    {
      id: '6',
      name: 'Arjun Kumar',
      email: 'arjun.mehta@acme.com',
      role: 'EMPLOYEE',
      organization: 'Acme Technologies Inc.',
      status: 'ACTIVE',
      createdAt: '2026-01-18',
    },
    {
      id: '7',
      name: 'Priya Patel',
      email: 'priya.patel@acme.com',
      role: 'EMPLOYEE',
      organization: 'Acme Technologies Inc.',
      status: 'ACTIVE',
      createdAt: '2026-01-25',
    },
    {
      id: '8',
      name: 'Sophia Chen',
      email: 'sophia.chen@acme.com',
      role: 'EMPLOYEE',
      organization: 'Acme Technologies Inc.',
      status: 'ACTIVE',
      createdAt: '2026-01-28',
    },
  ]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirm(null);
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
          <h2 className="text-2xl font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">User Account Governance</h2>
          <p className="text-xs text-[#6B6B76] mt-1">
            Manage administrative access, HR credentials, and employee platform accounts.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#5B4FE8] hover:bg-[#4A3FD1] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New User</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B9BA5]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter users by name or email..."
          className="w-full pl-10 pr-4 py-2 bg-[#FFFFFF] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] placeholder-[#9B9BA5] focus:outline-none focus:border-[#5B4FE8] shadow-xs"
        />
      </div>

      {/* Users Table */}
      <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F1F1F4] text-[#9B9BA5] border-b border-[#E5E5EA] uppercase font-semibold text-[10px] tracking-wider font-mono">
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
            <tbody className="divide-y divide-[#E5E5EA]">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#F1F1F4]/70 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">{u.name}</td>
                  <td className="py-3.5 px-4 text-[#6B6B76] font-mono text-[11px]">{u.email}</td>
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
                  <td className="py-3.5 px-4 text-[#6B6B76]">{u.organization}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={u.status === 'ACTIVE' ? 'success' : 'danger'}>
                      {u.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-[#9B9BA5] font-mono">{u.createdAt}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                        u.status === 'ACTIVE'
                          ? 'text-rose-600 hover:bg-rose-50'
                          : 'text-[#16a34a] hover:bg-emerald-50'
                      }`}
                    >
                      {u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </button>
                    {u.role !== 'PLATFORM_ADMIN' && (
                      <button
                        onClick={() => setDeleteConfirm(u.id)}
                        className="px-2.5 py-1 rounded text-[11px] font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline-block" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1A1A1E] mb-1 font-['Plus_Jakarta_Sans']">Provision Platform Account</h3>
            <p className="text-xs text-[#6B6B76] mb-4">Create a new HR or Employee profile.</p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Liam Smith"
                  className="w-full px-3 py-2 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] focus:outline-none focus:border-[#5B4FE8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. liam.smith@acme.com"
                  className="w-full px-3 py-2 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] focus:outline-none focus:border-[#5B4FE8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">RBAC Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] focus:outline-none focus:border-[#5B4FE8]"
                >
                  <option value="EMPLOYEE">EMPLOYEE</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#6B6B76] hover:text-[#1A1A1E] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#5B4FE8] hover:bg-[#4A3FD1] rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1A1A1E] mb-1 font-['Plus_Jakarta_Sans']">Confirm User Deletion</h3>
            <p className="text-xs text-[#6B6B76] mb-4">
              This will permanently remove the user account and all associated data. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-xs font-medium text-[#6B6B76] hover:text-[#1A1A1E] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirm)}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
