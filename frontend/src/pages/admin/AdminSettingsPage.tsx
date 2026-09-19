import React, { useState, useEffect } from 'react';
import { Settings, Shield, RefreshCw, Clock, Database, Globe, Save, CheckCircle2, Sparkles } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { apiClient } from '../../api/client';

interface PlatformSettings {
  organization_name: string;
  ai_engine_version: string;
  divergence_threshold: number;
  confidence_threshold: number;
  telemetry_sync_frequency: string;
  github_sync_enabled: boolean;
  jira_sync_enabled: boolean;
  slack_sync_enabled: boolean;
  pagerduty_sync_enabled: boolean;
  session_timeout_minutes: number;
  enforce_mfa: boolean;
  allow_employee_self_assessment: boolean;
  retention_days: number;
}

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<PlatformSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiClient.get('/admin/settings');
        setSettings(res.data);
      } catch {
        // Fallback demo data
        setSettings({
          organization_name: 'Acme Technologies Inc.',
          ai_engine_version: 'v4.2-divergence-synthesis',
          divergence_threshold: 0.80,
          confidence_threshold: 0.75,
          telemetry_sync_frequency: 'Every 15 minutes',
          github_sync_enabled: true,
          jira_sync_enabled: true,
          slack_sync_enabled: true,
          pagerduty_sync_enabled: true,
          session_timeout_minutes: 60,
          enforce_mfa: true,
          allow_employee_self_assessment: true,
          retention_days: 365,
        });
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await apiClient.patch('/admin/settings', settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof PlatformSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
  };

  if (loading || !settings) {
    return <div className="py-16 text-center text-[#9B9BA5] text-xs">Loading platform settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">Platform Settings</h2>
          <p className="text-xs text-[#6B6B76] mt-1">Configure AI synthesis engine, integrations, and security policies.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#5B4FE8] hover:bg-[#4A3FD1] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved' : saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* AI Engine Configuration */}
      <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-4 h-4 text-[#5B4FE8]" />
          <h3 className="text-base font-bold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">AI Synthesis Engine</h3>
          <Badge variant="primary">{settings.ai_engine_version}</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">Divergence Confidence Threshold</label>
            <p className="text-[11px] text-[#9B9BA5] mb-2">Minimum confidence for AI-inferred skill vectors.</p>
            <input
              type="number"
              step="0.05"
              min="0.50"
              max="1.0"
              value={settings.divergence_threshold}
              onChange={(e) => updateSetting('divergence_threshold', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] font-mono focus:outline-none focus:border-[#5B4FE8]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">Skill Match Threshold</label>
            <p className="text-[11px] text-[#9B9BA5] mb-2">Minimum score for role matching recommendations.</p>
            <input
              type="number"
              step="0.05"
              min="0.50"
              max="1.0"
              value={settings.confidence_threshold}
              onChange={(e) => updateSetting('confidence_threshold', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] font-mono focus:outline-none focus:border-[#5B4FE8]"
            />
          </div>
        </div>
      </div>

      {/* Telemetry Integrations */}
      <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-5">
          <RefreshCw className="w-4 h-4 text-[#5B4FE8]" />
          <h3 className="text-base font-bold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">Telemetry Integrations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { key: 'github_sync_enabled' as const, label: 'GitHub (Commits, PRs, Reviews)', icon: '🐙' },
            { key: 'jira_sync_enabled' as const, label: 'Jira (Epics, Stories, Tickets)', icon: '📋' },
            { key: 'slack_sync_enabled' as const, label: 'Slack (Channel Activity, Threads)', icon: '💬' },
            { key: 'pagerduty_sync_enabled' as const, label: 'PagerDuty (Incidents, Triage)', icon: '🚨' },
          ].map((integration) => (
            <div key={integration.key} className="flex items-center justify-between px-4 py-3 bg-[#F1F1F4] rounded-xl border border-[#E5E5EA]">
              <div className="flex items-center gap-3">
                <span className="text-base">{integration.icon}</span>
                <span className="text-xs font-medium text-[#1A1A1E]">{integration.label}</span>
              </div>
              <button
                onClick={() => updateSetting(integration.key, !settings[integration.key])}
                className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                  settings[integration.key] ? 'bg-[#5B4FE8]' : 'bg-[#E5E5EA]'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  settings[integration.key] ? 'translate-x-5' : ''
                }`} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">Sync Frequency</label>
          <select
            value={settings.telemetry_sync_frequency}
            onChange={(e) => updateSetting('telemetry_sync_frequency', e.target.value)}
            className="w-full max-w-xs px-3 py-2 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] focus:outline-none focus:border-[#5B4FE8]"
          >
            <option>Every 5 minutes</option>
            <option>Every 15 minutes</option>
            <option>Every 30 minutes</option>
            <option>Every hour</option>
          </select>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-5">
          <Shield className="w-4 h-4 text-[#5B4FE8]" />
          <h3 className="text-base font-bold text-[#1A1A1E] font-['Plus_Jakarta_Sans']">Security & Compliance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex items-center justify-between px-4 py-3 bg-[#F1F1F4] rounded-xl border border-[#E5E5EA]">
            <div>
              <span className="text-xs font-medium text-[#1A1A1E]">Enforce Multi-Factor Authentication</span>
              <p className="text-[11px] text-[#9B9BA5]">Require MFA for all user logins.</p>
            </div>
            <button
              onClick={() => updateSetting('enforce_mfa', !settings.enforce_mfa)}
              className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                settings.enforce_mfa ? 'bg-[#5B4FE8]' : 'bg-[#E5E5EA]'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                settings.enforce_mfa ? 'translate-x-5' : ''
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-[#F1F1F4] rounded-xl border border-[#E5E5EA]">
            <div>
              <span className="text-xs font-medium text-[#1A1A1E]">Employee Self-Assessment</span>
              <p className="text-[11px] text-[#9B9BA5]">Allow employees to take psychometric assessments.</p>
            </div>
            <button
              onClick={() => updateSetting('allow_employee_self_assessment', !settings.allow_employee_self_assessment)}
              className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                settings.allow_employee_self_assessment ? 'bg-[#5B4FE8]' : 'bg-[#E5E5EA]'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                settings.allow_employee_self_assessment ? 'translate-x-5' : ''
              }`} />
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">Session Timeout (minutes)</label>
            <input
              type="number"
              min="15"
              max="480"
              value={settings.session_timeout_minutes}
              onChange={(e) => updateSetting('session_timeout_minutes', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] font-mono focus:outline-none focus:border-[#5B4FE8]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1E] mb-1">Data Retention (days)</label>
            <input
              type="number"
              min="30"
              max="1825"
              value={settings.retention_days}
              onChange={(e) => updateSetting('retention_days', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl text-xs text-[#1A1A1E] font-mono focus:outline-none focus:border-[#5B4FE8]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
