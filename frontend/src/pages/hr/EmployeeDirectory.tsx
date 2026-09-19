import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Sparkles, ChevronRight, UserCheck, ArrowUpDown } from 'lucide-react';
import { Employee } from '../../types/employee';
import { getEmployeesApi } from '../../api/employees';
import { Badge } from '../../components/common/Badge';

export const EmployeeDirectory: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const data = await getEmployeesApi();
        setEmployees(data);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const departments = ['All', 'Engineering', 'Quality Assurance', 'Marketing', 'Customer Operations', 'Product', 'Operations'];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.current_job_title.toLowerCase().includes(search.toLowerCase()) ||
      emp.skills?.some((s) => s.skill_name.toLowerCase().includes(search.toLowerCase()));

    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  const getPotentialRole = (title: string) => {
    if (title.includes('Backend')) return 'Product Engineer (Fintech)';
    if (title.includes('QA')) return 'Platform / DevOps Engineer';
    if (title.includes('Marketing')) return 'Growth & Product Analyst';
    if (title.includes('Support')) return 'Technical Support L3';
    return 'Senior Engineer';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">Workforce Talent Directory</h2>
          <p className="text-xs text-[#6B6B76] mt-1">
            Search employee skills, experience dossiers, and discovered transferable capabilities.
          </p>
        </div>
        <div className="text-xs text-[#6B6B76] font-medium font-mono">
          Showing <span className="text-[#1A1A1E] font-bold">{filteredEmployees.length}</span> talent profiles
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#FFFFFF] border border-[#E5E5EA] p-3 rounded-2xl shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B9BA5]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by employee name, job title, or skill (e.g. Python, UX, CI/CD)..."
            className="w-full pl-10 pr-4 py-2 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] placeholder-[#9B9BA5] focus:outline-none focus:border-[#5B4FE8]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-[#9B9BA5] shrink-0 ml-1" />
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedDept === dept
                  ? 'bg-[#5B4FE8] text-white shadow-xs'
                  : 'bg-[#F1F1F4] text-[#6B6B76] hover:text-[#1A1A1E] border border-[#E5E5EA]'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F1F1F4] text-[#9B9BA5] border-b border-[#E5E5EA] uppercase font-semibold text-[10px] tracking-wider font-mono">
              <tr>
                <th className="py-3.5 px-5">Employee</th>
                <th className="py-3.5 px-4">Current Role</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Top Demonstrated Skills</th>
                <th className="py-3.5 px-4">Skill Strength</th>
                <th className="py-3.5 px-4">Potential Roles</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5EA]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#9B9BA5]">
                    Loading employee talent records...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-[#9B9BA5]">
                    No employees match your search filter.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => {
                  const strength = 75 + ((emp.total_skills_count * 3) % 20);
                  const potentialRole = getPotentialRole(emp.current_job_title);

                  return (
                    <tr
                      key={emp.id}
                      onClick={() => navigate(`/hr/employees/${emp.id}`)}
                      className="hover:bg-[#F1F1F4]/70 cursor-pointer transition-colors group"
                    >
                      {/* Name & Code */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#5B4FE8]/10 text-[#5B4FE8] border border-[#5B4FE8]/20 flex items-center justify-center font-bold text-xs">
                            {emp.name[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-[#1A1A1E] group-hover:text-[#5B4FE8] transition-colors font-['Plus_Jakarta_Sans']">
                              {emp.name}
                            </div>
                            <div className="text-[11px] text-[#9B9BA5] font-mono">{emp.employee_code}</div>
                          </div>
                        </div>
                      </td>

                      {/* Current Role */}
                      <td className="py-4 px-4 font-medium text-[#1A1A1E]">
                        {emp.current_job_title}
                      </td>

                      {/* Department */}
                      <td className="py-4 px-4 text-[#6B6B76]">
                        {emp.department}
                      </td>

                      {/* Top Skills with AI Discovered Badges */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {emp.skills?.slice(0, 3).map((s) => (
                            <span
                              key={s.id}
                              className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                                s.is_hidden
                                  ? 'bg-[#5B4FE8]/10 text-[#5B4FE8] border-[#5B4FE8]/20 font-mono'
                                  : 'bg-[#F1F1F4] text-[#4B4B55] border-[#E5E5EA]'
                              }`}
                            >
                              {s.is_hidden && '✨ '}
                              {s.skill_name}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Skill Strength % */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1A1A1E] font-mono tabular-nums">{strength}%</span>
                          <div className="w-16 h-1.5 bg-[#ECECF0] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#5B4FE8] rounded-full"
                              style={{ width: `${strength}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Potential Roles */}
                      <td className="py-4 px-4">
                        <span className="text-[#5B4FE8] font-semibold">
                          {potentialRole}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        <Badge variant="success" size="sm">
                          Active
                        </Badge>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <span className="text-[#9B9BA5] group-hover:text-[#5B4FE8] p-1 rounded transition-colors inline-block">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
