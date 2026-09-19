import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Plus, Sparkles, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { InternalRole } from '../../types/role';
import { getRolesApi, createRoleApi } from '../../api/roles';
import { Badge } from '../../components/common/Badge';

export const InternalRolesPage: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<InternalRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDepartment, setNewDepartment] = useState('Engineering');
  const [newDescription, setNewDescription] = useState('');
  const [newSkillsStr, setNewSkillsStr] = useState('Python, SQL, REST APIs');

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const data = await getRolesApi();
        setRoles(data);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsList = newSkillsStr.split(',').map((s, idx) => ({
      id: `rs-temp-${idx}`,
      skill_id: `sk-temp-${idx}`,
      skill_name: s.trim(),
      category: 'Technical',
      required_level: 4,
      importance: 'MANDATORY' as const,
    }));

    const created = await createRoleApi({
      title: newTitle,
      department: newDepartment,
      description: newDescription,
      skills: skillsList,
    });

    setRoles([created, ...roles]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Internal Opportunities & Roles</h2>
          <p className="text-xs text-slate-400 mt-1">
            Create internal positions and discover existing employees with matching or transferable capabilities.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Internal Role</span>
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Building2 className="w-3.5 h-3.5" />
                  {role.department}
                </span>
                <Badge variant="success" size="sm">
                  {role.status}
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{role.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{role.description}</p>

              {/* Required Skills */}
              <div className="mb-6">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Target Competencies:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {role.skills?.map((s) => (
                    <span
                      key={s.id}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1"
                    >
                      <span>{s.skill_name}</span>
                      <span className="text-[10px] text-indigo-400 font-semibold">lvl {s.required_level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Created: {new Date(role.created_at).toLocaleDateString()}
              </span>
              <button
                onClick={() => navigate(`/hr/discovery?role=${role.id}`)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Find Internal Talent</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Create Internal Opportunity</h3>
            <p className="text-xs text-slate-400 mb-4">Post an opening to be matched against employee skill dossiers.</p>

            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. AI Product Engineer"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
                <select
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Customer Operations">Customer Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Responsibilities, mission, and required cross-functional scope..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={newSkillsStr}
                  onChange={(e) => setNewSkillsStr(e.target.value)}
                  placeholder="Python, FastAPI, UX Collaboration"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm"
                >
                  Publish Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
