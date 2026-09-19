import React from 'react';
import { Shield, Users, Building2, UserCheck, Activity } from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const activityData = [
    { day: 'Mon', logins: 45, scans: 24 },
    { day: 'Tue', logins: 52, scans: 35 },
    { day: 'Wed', logins: 68, scans: 58 },
    { day: 'Thu', logins: 61, scans: 44 },
    { day: 'Fri', logins: 74, scans: 65 },
    { day: 'Sat', logins: 28, scans: 12 },
    { day: 'Sun', logins: 19, scans: 9 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
          <Shield className="w-4 h-4 text-purple-400" />
          <span>Platform Administration</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Platform Overview</h2>
        <p className="text-xs text-slate-400 mt-1">
          Multi-tenant administration, user accounts, and AI divergence pipeline telemetry.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Employees"
          value="128"
          icon={Users}
          change="+12% MoM"
          color="indigo"
          description="Enrolled in talent discovery"
        />
        <StatCard
          label="Total HR Users"
          value="8"
          icon={UserCheck}
          change="3 Organizations"
          color="amber"
          description="Active recruiters & ops"
        />
        <StatCard
          label="Active Users"
          value="134"
          icon={Activity}
          change="98.5% uptime"
          color="emerald"
          description="JWT authenticated"
        />
        <StatCard
          label="Organizations"
          value="3"
          icon={Building2}
          change="Acme Technologies Inc."
          color="purple"
          description="Multi-tenant partitions"
        />
      </div>

      {/* User Activity & AI Scans Chart */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Platform Activity & AI Scans</h3>
            <p className="text-xs text-slate-400">Weekly user sessions vs Divergence Engine scans</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <span className="w-2.5 h-2.5 rounded bg-indigo-500" /> User Logins
            </span>
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-2.5 h-2.5 rounded bg-purple-500" /> Divergence Scans
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityData}>
              <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#1E293B',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="logins" fill="#6366F1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="scans" fill="#A855F7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
