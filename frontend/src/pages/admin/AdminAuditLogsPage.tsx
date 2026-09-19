import React, { useState, useEffect } from 'react';
import { FileCheck2, Search, Filter, ChevronDown, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { apiClient } from '../../api/client';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actor_name: string;
  action: string;
  target: string;
  status: string;
  ip_address: string;
  details: string;
}

const ACTION_COLORS: Record<string, string> = {
  POLICY_UPDATE: 'bg-amber-50 text-amber-700 border-amber-200',
  INVITE_ASSESSMENT: 'bg-blue-50 text-blue-700 border-blue-200',
  SKILL_INFERRED: 'bg-[#5B4FE8]/10 text-[#5B4FE8] border-[#5B4FE8]/20',
  USER_PROVISIONED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  AUTH_LOGIN: 'bg-slate-50 text-slate-600 border-slate-200',
  USER_DELETED: 'bg-rose-50 text-rose-700 border-rose-200',
};

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await apiClient.get('/admin/audit-logs');
        setLogs(res.data);
      } catch {
        // Fallback demo data
        setLogs([
          {
            id: 'aud-109',
            timestamp: new Date().toISOString(),
            actor: 'admin@acme.com',
            actor_name: 'Platform Administrator',
            action: 'POLICY_UPDATE',
            target: 'Synthesis Engine v4.2 Vector Weights',
            status: 'SUCCESS',
            ip_address: '192.168.1.104',
            details: 'Updated divergence confidence threshold from 0.75 to 0.80.',
          },
          {
            id: 'aud-108',
            timestamp: new Date().toISOString(),
            actor: 'hr.sarah@acme.com',
            actor_name: 'Sarah Jenkins',
            action: 'INVITE_ASSESSMENT',
            target: 'emp-arjun-01 (Arjun Kumar)',
            status: 'SUCCESS',
            ip_address: '192.168.1.112',
            details: 'Dispatched Big 5 Psychometric calibration link via token.',
          },
          {
            id: 'aud-107',
            timestamp: new Date().toISOString(),
            actor: 'synthesis-daemon',
            actor_name: 'AI Synthesis Worker',
            action: 'SKILL_INFERRED',
            target: 'EMP-1001 (UX Systems Collaboration)',
            status: 'SUCCESS',
            ip_address: '127.0.0.1',
            details: 'Confidence score 0.81 validated against 3 PR commits.',
          },
          {
            id: 'aud-106',
            timestamp: new Date().toISOString(),
            actor: 'admin@acme.com',
            actor_name: 'Platform Administrator',
            action: 'USER_PROVISIONED',
            target: 'elena.rostova@acme.com',
            status: 'SUCCESS',
            ip_address: '192.168.1.104',
            details: 'Created new Employee profile with role EMPLOYEE.',
          },
          {
            id: 'aud-105',
            timestamp: new Date().toISOString(),
            actor: 'arjun.mehta@acme.com',
            actor_name: 'Arjun Kumar',
            action: 'AUTH_LOGIN',
            target: 'OAuth2 Token Issued',
            status: 'SUCCESS',
            ip_address: '10.0.4.22',
            details: 'Scoped JWT generated with tenant claim org-acme-01.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const uniqueActions = Array.from(new Set(logs.map((l) => l.action)));

  const filteredLogs = logs.filter((l) => {
    const matchSearch =
      !search ||
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.actor_name.toLowerCase().includes(search.toLowerCase()) ||
      l.target.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase());
    const matchAction = !actionFilter || l.action === actionFilter;
    return matchSearch && matchAction;
  });

  if (loading) {
    return <div className="py-16 text-center text-[#9B9BA5] text-xs">Loading audit trail...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">Security Audit Trail</h2>
        <p className="text-xs text-[#6B6B76] mt-1">
          Immutable governance log of all platform actions, user provisioning, and AI synthesis events.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B9BA5]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by actor, target, or details..."
            className="w-full pl-10 pr-4 py-2 bg-[#FFFFFF] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] placeholder-[#9B9BA5] focus:outline-none focus:border-[#5B4FE8] shadow-xs"
          />
        </div>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="px-3 py-2 bg-[#FFFFFF] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] focus:outline-none focus:border-[#5B4FE8] shadow-xs"
        >
          <option value="">All Actions</option>
          {uniqueActions.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Log Table */}
      <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F1F1F4] text-[#9B9BA5] border-b border-[#E5E5EA] uppercase font-semibold text-[10px] tracking-wider font-mono">
              <tr>
                <th className="py-3.5 px-5">Timestamp</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">IP</th>
                <th className="py-3.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5EA]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F1F1F4]/70 transition-colors">
                  <td className="py-3.5 px-5 text-[#9B9BA5] font-mono text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">{log.actor_name}</div>
                    <div className="text-[11px] text-[#9B9BA5] font-mono">{log.actor}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${
                        ACTION_COLORS[log.action] || 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#6B6B76] max-w-[200px] truncate">{log.target}</td>
                  <td className="py-3.5 px-4">
                    {log.status === 'SUCCESS' ? (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">OK</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-500">
                        <XCircle className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">FAIL</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[#9B9BA5] font-mono text-[11px]">{log.ip_address}</td>
                  <td className="py-3.5 px-4 text-[#6B6B76] max-w-[250px] truncate">{log.details}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#9B9BA5] text-xs">
                    No audit log entries match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
