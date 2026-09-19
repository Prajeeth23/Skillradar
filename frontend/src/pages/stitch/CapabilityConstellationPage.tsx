import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NodeDetail {
  id: string;
  title: string;
  confidence: string;
  confidenceNum: number;
  bullets: string[];
  sources: string[];
  category: string;
}

const NODE_DETAILS: Record<string, NodeDetail> = {
  leadership: {
    id: 'leadership',
    title: 'TECHNICAL LEADERSHIP',
    confidence: '87%',
    confidenceNum: 87,
    category: 'AI DISCOVERED VECTOR',
    bullets: [
      'Led the architectural migration of core payment gateway across 4 microservices.',
      'Coordinated technical consensus and RFC approval across 12 senior engineers.',
      'Chaired bi-weekly cross-squad architecture triage and critical path dependency mapping.',
    ],
    sources: ['GitHub PR #842', 'Jira Epic CORE-104', '12 Architecture RFCs'],
  },
  data: {
    id: 'data',
    title: 'DATA ANALYSIS & PIPELINES',
    confidence: '84%',
    confidenceNum: 84,
    category: 'AI DISCOVERED VECTOR',
    bullets: [
      'Constructed stream ingestion telemetry reducing processing lag by 310ms.',
      'Synthesized multi-tenant query bottlenecks across snowflake schemas.',
      'Implemented automated pipeline backpressure protocols in Python and Kafka.',
    ],
    sources: ['GitHub Pipeline Repo #129', 'Kafka Cluster Config #44', 'DataOps RFC-88'],
  },
  mentoring: {
    id: 'mentoring',
    title: 'ENGINEERING MENTORING',
    confidence: '91%',
    confidenceNum: 91,
    category: 'AI DISCOVERED VECTOR',
    bullets: [
      'Conducted over 140 comprehensive code reviews with pedagogical inline examples.',
      'Directly onboarded 4 mid-level backend developers to service ownership in 60 days.',
      'Authored the engineering squad backend style guide and testing best practices manual.',
    ],
    sources: ['PR Review Feedback Logs (142)', 'Eng Onboarding Dashboard', 'Wiki Handbook v2'],
  },
  ux: {
    id: 'ux',
    title: 'UX SYSTEMS COLLABORATION',
    confidence: '81%',
    confidenceNum: 81,
    category: 'AI DISCOVERED VECTOR',
    bullets: [
      'Co-authored frontend contract schemas for zero-latency pagination states.',
      'Partnered with design systems team to align backend error codes with user modal cues.',
      'Participated in user friction retrospectives to optimize complex query response shapes.',
    ],
    sources: ['Figma Dev Tokens Sync', 'GraphQL Schema RFC-22', 'Slack #design-eng-triage'],
  },
  problem: {
    id: 'problem',
    title: 'PROBLEM SOLVING & ANOMALY DETECTION',
    confidence: '92%',
    confidenceNum: 92,
    category: 'AI DISCOVERED VECTOR',
    bullets: [
      'Detected and mitigated high-severity memory leak in message consumer within 18 minutes.',
      'Engineered automated anomaly detection rule-engine on Prometheus metric streams.',
      'Zero post-incident recurrence on 6 critical database connection exhaustion events.',
    ],
    sources: ['PagerDuty Post-Mortem #991', 'Datadog Synthetics Setup', 'Grafana Incident Dashboard'],
  },
};

export const CapabilityConstellationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('leadership');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const selectedNode = NODE_DETAILS[selectedNodeId] || NODE_DETAILS.leadership;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.15, 1.4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.15, 0.7));
  const handleRecenter = () => setZoomLevel(1);

  return (
    <div className="flex flex-col w-full">
      {/* Top Banner & Metadata Horizon */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto pt-6 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#712ae2]"></span>
              <span className="font-['JetBrains_Mono'] text-[12px] uppercase tracking-wider text-[#712ae2] font-medium">
                Telemetry Neural Graph v4.2
              </span>
              <span className="text-[#c7c4d7]">•</span>
              <span className="font-['JetBrains_Mono'] text-[12px] text-[#777586]">Cluster Synced 4m ago</span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl text-[#1b1b1f] font-semibold tracking-tight">
              My Capabilities Constellation
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-[#464554] font-['Plus_Jakarta_Sans'] text-[13px] pt-1">
              <span className="font-semibold text-[#1b1b1f]">Arjun Kumar</span>
              <span className="text-[#c7c4d7]">•</span>
              <span>Senior Backend Developer</span>
              <span className="text-[#c7c4d7]">•</span>
              <span className="px-2 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
                Engineering Core
              </span>
            </div>
          </div>

          {/* Live Graph Telemetry Strip */}
          <div className="flex items-center gap-6 bg-[#f5f3f7] p-3 rounded-xl shadow-xs self-start lg:self-auto border border-[#e3e2e6]/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2a14b4]"></span>
              <div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#777586] leading-none">Explicit Core</div>
                <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-semibold">4 Vectors</div>
              </div>
            </div>
            <div className="w-px h-6 bg-[#e3e2e6]"></div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#712ae2]"></span>
              <div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#777586] leading-none">AI Latent Discovered</div>
                <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#712ae2] font-semibold">5 Vectors</div>
              </div>
            </div>
            <div className="w-px h-6 bg-[#e3e2e6]"></div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00451c] text-[18px]">verified</span>
              <div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#777586] leading-none">Weighted Fit</div>
                <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#00451c] font-semibold">94.8%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Constellation Workspace (2-Column Grid Layout) */}
      <section className="w-full px-4 sm:px-8 max-w-7xl mx-auto pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Graph Canvas Container (Column 8) */}
          <div className="xl:col-span-8 bg-white rounded-2xl shadow-xs border border-[#e3e2e6] relative overflow-hidden flex flex-col justify-between" style={{ minHeight: '680px' }}>
            {/* Viewport Controls & Subdued Floating Legend */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-2 bg-[#faf9fd]/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xs border border-[#e3e2e6]/80">
                <span className="material-symbols-outlined text-[#777586] text-[16px]">filter_center_focus</span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#464554] font-medium">
                  Spherical Force Projection
                </span>
              </div>
              <div className="pointer-events-auto flex items-center gap-1 bg-[#faf9fd]/90 backdrop-blur-md p-1 rounded-lg shadow-xs border border-[#e3e2e6]/80">
                <button
                  aria-label="Zoom in"
                  onClick={handleZoomIn}
                  className="w-7 h-7 flex items-center justify-center rounded text-[#464554] hover:bg-[#e9e7ec] hover:text-[#1b1b1f] transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
                <button
                  aria-label="Zoom out"
                  onClick={handleZoomOut}
                  className="w-7 h-7 flex items-center justify-center rounded text-[#464554] hover:bg-[#e9e7ec] hover:text-[#1b1b1f] transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <button
                  aria-label="Reset orientation"
                  onClick={handleRecenter}
                  className="w-7 h-7 flex items-center justify-center rounded text-[#464554] hover:bg-[#e9e7ec] hover:text-[#1b1b1f] transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                </button>
              </div>
            </div>

            {/* Ambient SVG Canvas with Nodes and Ray Connections */}
            <div
              className="relative w-full h-[680px] select-none flex items-center justify-center transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Background Orbit Rings */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 800 680">
                <circle cx="400" cy="340" opacity="0.75" r="130" stroke="#E3E2E6" strokeDasharray="3 4" strokeWidth="1"></circle>
                <circle cx="400" cy="340" opacity="0.6" r="230" stroke="#E3E2E6" strokeDasharray="4 6" strokeWidth="1"></circle>
                <circle cx="400" cy="340" opacity="0.35" r="310" stroke="#E3E2E6" strokeDasharray="2 8" strokeWidth="1"></circle>

                {/* To Core Nodes */}
                <line stroke="#2A14B4" strokeOpacity="0.65" strokeWidth="1.75" x1="400" x2="290" y1="340" y2="210"></line>
                <line stroke="#2A14B4" strokeOpacity="0.65" strokeWidth="1.75" x1="400" x2="520" y1="340" y2="220"></line>
                <line stroke="#2A14B4" strokeOpacity="0.65" strokeWidth="1.75" x1="400" x2="270" y1="340" y2="440"></line>
                <line stroke="#2A14B4" strokeOpacity="0.65" strokeWidth="1.75" x1="400" x2="510" y1="340" y2="460"></line>

                {/* To AI Discovered Nodes */}
                <line opacity={selectedNodeId === 'leadership' ? 1 : 0.6} stroke="#712AE2" strokeDasharray="4 3" strokeWidth={selectedNodeId === 'leadership' ? 2.5 : 1.5} x1="400" x2="620" y1="340" y2="310"></line>
                <line opacity={selectedNodeId === 'data' ? 1 : 0.6} stroke="#8A4CFC" strokeDasharray="3 3" strokeWidth={selectedNodeId === 'data' ? 2.5 : 1.5} x1="400" x2="590" y1="340" y2="150"></line>
                <line opacity={selectedNodeId === 'mentoring' ? 1 : 0.6} stroke="#8A4CFC" strokeDasharray="3 3" strokeWidth={selectedNodeId === 'mentoring' ? 2.5 : 1.5} x1="400" x2="180" y1="340" y2="170"></line>
                <line opacity={selectedNodeId === 'ux' ? 1 : 0.6} stroke="#8A4CFC" strokeDasharray="3 3" strokeWidth={selectedNodeId === 'ux' ? 2.5 : 1.5} x1="400" x2="160" y1="340" y2="350"></line>
                <line opacity={selectedNodeId === 'problem' ? 1 : 0.6} stroke="#8A4CFC" strokeDasharray="3 3" strokeWidth={selectedNodeId === 'problem' ? 2.5 : 1.5} x1="400" x2="410" y1="340" y2="570"></line>

                {/* Inter-node Subtle Resonance Ties */}
                <line opacity="0.3" stroke="#712AE2" strokeDasharray="2 4" strokeWidth="1" x1="620" x2="520" y1="310" y2="220"></line>
                <line opacity="0.3" stroke="#712AE2" strokeDasharray="2 4" strokeWidth="1" x1="620" x2="510" y1="310" y2="460"></line>
                <line opacity="0.3" stroke="#712AE2" strokeDasharray="2 4" strokeWidth="1" x1="180" x2="290" y1="170" y2="210"></line>
                <line opacity="0.3" stroke="#712AE2" strokeDasharray="2 4" strokeWidth="1" x1="410" x2="270" y1="570" y2="440"></line>
              </svg>

              {/* Center Node: Arjun Kumar */}
              <div className="absolute z-20 flex flex-col items-center" style={{ top: 'calc(50% - 44px)', left: 'calc(50% - 44px)' }}>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-2.5 rounded-full bg-[#712ae2]/15 blur-md animate-pulse"></div>
                  <div className="relative w-20 h-20 rounded-full p-1 bg-white shadow-md flex items-center justify-center">
                    <img
                      alt="Arjun Kumar profile avatar"
                      className="w-full h-full rounded-full object-cover"
                      src="/assets/stitch/arjun_avatar.jpg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://lh3.googleusercontent.com/aida/AEtjO1W3xlrX9U-m4YA3HmTsgJ5RCIa7lAhMH8ihGsmYWwaenkUmVUWWgUMBMktnUNSXvmDEn_nqcrtH3N4z0yKrLk9EARfA3RbkMtYYjJqABfUSNm9wiBr0K3BBH0Y2PyiEyZ2eokTyhsqSr0gA9sEbwd2Ef1q62QeNGWuy9_nlkTjuheYtYuNUzriXVnbd2WVrSDGjJyHjQltjWjAD9JeFg1WPAY_nf2wqtf43TQDsGDJHXead3ZVomxb0IPA';
                      }}
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#2a14b4] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-white text-[12px]">hub</span>
                  </span>
                </div>
                <div className="mt-1.5 text-center">
                  <span className="px-2 py-0.5 rounded-full bg-[#efedf1] text-[#1b1b1f] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold tracking-tight shadow-xs">
                    Self Anchor
                  </span>
                </div>
              </div>

              {/* CORE EXPLICIT NODE 1: Python (Core) */}
              <div className="absolute z-10 cursor-pointer transition-transform hover:scale-105" style={{ top: '27%', left: '34%', transform: 'translate(-50%, -50%)' }}>
                <div className="bg-[#2f3034] text-[#f2f0f4] px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold">Python</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#c7c4d7] bg-white/15 px-1 rounded">Core</span>
                </div>
              </div>

              {/* CORE EXPLICIT NODE 2: REST APIs & gRPC */}
              <div className="absolute z-10 cursor-pointer transition-transform hover:scale-105" style={{ top: '29%', left: '67%', transform: 'translate(-50%, -50%)' }}>
                <div className="bg-[#2f3034] text-[#f2f0f4] px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold">REST APIs & gRPC</span>
                </div>
              </div>

              {/* CORE EXPLICIT NODE 3: PostgreSQL & SQL Architecture */}
              <div className="absolute z-10 cursor-pointer transition-transform hover:scale-105" style={{ top: '67%', left: '31%', transform: 'translate(-50%, -50%)' }}>
                <div className="bg-[#2f3034] text-[#f2f0f4] px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold">PostgreSQL & SQL</span>
                </div>
              </div>

              {/* CORE EXPLICIT NODE 4: Distributed Systems */}
              <div className="absolute z-10 cursor-pointer transition-transform hover:scale-105" style={{ top: '70%', left: '66%', transform: 'translate(-50%, -50%)' }}>
                <div className="bg-[#2f3034] text-[#f2f0f4] px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold">Distributed Systems</span>
                </div>
              </div>

              {/* AI DISCOVERED NODE 1: Technical Leadership */}
              <div
                onClick={() => setSelectedNodeId('leadership')}
                className="absolute z-20 cursor-pointer transition-transform hover:scale-105"
                style={{ top: '45%', left: '79%', transform: 'translate(-50%, -50%)' }}
              >
                <div className={`bg-white p-1 rounded-xl shadow-md flex flex-col gap-0.5 border ${
                  selectedNodeId === 'leadership' ? 'ring-2 ring-[#712ae2] border-[#712ae2]' : 'border-[#e3e2e6]'
                }`}>
                  <div className="px-3 py-1.5 bg-[#712ae2]/10 rounded-lg flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#712ae2] text-[16px]">auto_awesome</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#712ae2] font-semibold">
                      Technical Leadership
                    </span>
                  </div>
                  <div className="px-3 py-0.5 flex items-center justify-between font-['JetBrains_Mono'] text-[11px] text-[#464554]">
                    <span className="text-[#712ae2] font-medium">AI Discovered</span>
                    <span className="font-semibold text-[#1b1b1f]">87%</span>
                  </div>
                </div>
              </div>

              {/* AI DISCOVERED NODE 2: Data Analysis & Pipelines */}
              <div
                onClick={() => setSelectedNodeId('data')}
                className="absolute z-10 cursor-pointer transition-transform hover:scale-105"
                style={{ top: '20%', left: '76%', transform: 'translate(-50%, -50%)' }}
              >
                <div className={`bg-white p-1 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-0.5 border ${
                  selectedNodeId === 'data' ? 'ring-2 ring-[#712ae2] border-[#712ae2]' : 'border-[#e3e2e6]'
                }`}>
                  <div className="px-3 py-1.5 bg-[#712ae2]/5 rounded-lg flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#712ae2] text-[16px]">auto_awesome</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-medium">
                      Data Pipelines
                    </span>
                  </div>
                  <div className="px-3 py-0.5 flex items-center justify-between font-['JetBrains_Mono'] text-[11px] text-[#464554]">
                    <span className="text-[#777586]">Inferred</span>
                    <span className="font-semibold text-[#712ae2]">84%</span>
                  </div>
                </div>
              </div>

              {/* AI DISCOVERED NODE 3: Engineering Mentoring */}
              <div
                onClick={() => setSelectedNodeId('mentoring')}
                className="absolute z-10 cursor-pointer transition-transform hover:scale-105"
                style={{ top: '23%', left: '20%', transform: 'translate(-50%, -50%)' }}
              >
                <div className={`bg-white p-1 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-0.5 border ${
                  selectedNodeId === 'mentoring' ? 'ring-2 ring-[#712ae2] border-[#712ae2]' : 'border-[#e3e2e6]'
                }`}>
                  <div className="px-3 py-1.5 bg-[#712ae2]/5 rounded-lg flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#712ae2] text-[16px]">auto_awesome</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-medium">
                      Engineering Mentoring
                    </span>
                  </div>
                  <div className="px-3 py-0.5 flex items-center justify-between font-['JetBrains_Mono'] text-[11px] text-[#464554]">
                    <span className="text-[#777586]">Inferred</span>
                    <span className="font-semibold text-[#712ae2]">91%</span>
                  </div>
                </div>
              </div>

              {/* AI DISCOVERED NODE 4: UX Systems Collaboration */}
              <div
                onClick={() => setSelectedNodeId('ux')}
                className="absolute z-10 cursor-pointer transition-transform hover:scale-105"
                style={{ top: '52%', left: '18%', transform: 'translate(-50%, -50%)' }}
              >
                <div className={`bg-white p-1 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-0.5 border ${
                  selectedNodeId === 'ux' ? 'ring-2 ring-[#712ae2] border-[#712ae2]' : 'border-[#e3e2e6]'
                }`}>
                  <div className="px-3 py-1.5 bg-[#712ae2]/5 rounded-lg flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#712ae2] text-[16px]">auto_awesome</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-medium">
                      UX Systems Collab
                    </span>
                  </div>
                  <div className="px-3 py-0.5 flex items-center justify-between font-['JetBrains_Mono'] text-[11px] text-[#464554]">
                    <span className="text-[#777586]">Inferred</span>
                    <span className="font-semibold text-[#712ae2]">81%</span>
                  </div>
                </div>
              </div>

              {/* AI DISCOVERED NODE 5: Problem Solving & Anomaly Detection */}
              <div
                onClick={() => setSelectedNodeId('problem')}
                className="absolute z-10 cursor-pointer transition-transform hover:scale-105"
                style={{ top: '86%', left: '51%', transform: 'translate(-50%, -50%)' }}
              >
                <div className={`bg-white p-1 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-0.5 border ${
                  selectedNodeId === 'problem' ? 'ring-2 ring-[#712ae2] border-[#712ae2]' : 'border-[#e3e2e6]'
                }`}>
                  <div className="px-3 py-1.5 bg-[#712ae2]/5 rounded-lg flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#712ae2] text-[16px]">auto_awesome</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-medium">
                      Anomaly Detection & Fix
                    </span>
                  </div>
                  <div className="px-3 py-0.5 flex items-center justify-between font-['JetBrains_Mono'] text-[11px] text-[#464554]">
                    <span className="text-[#777586]">Inferred</span>
                    <span className="font-semibold text-[#712ae2]">92%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Graph Sub-Footer: Node Key & Projection */}
            <div className="p-4 bg-[#f5f3f7]/60 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e3e2e6]/60">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-[#2f3034]"></span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554]">Declared Core Skill</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-[#eaddff] text-[#712ae2] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554]">AI Latent Synthesis</span>
                </div>
              </div>
              <div className="font-['JetBrains_Mono'] text-[11px] text-[#777586] flex items-center gap-2">
                <span>Projection: Spectral Embedding</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00451c]"></span>
              </div>
            </div>
          </div>

          {/* Right Context Inspect Panel (Column 4) */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            {/* Node Inspection Dossier Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e3e2e6] flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#712ae2]/10 via-[#2a14b4]/5 to-transparent rounded-bl-full pointer-events-none"></div>

              {/* Inspector Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#712ae2]/10 text-[#712ae2] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                    <span>{selectedNode.category}</span>
                  </div>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-xl text-[#1b1b1f] font-semibold tracking-tight">
                    {selectedNode.title}
                  </h2>
                </div>
                <div className="text-right">
                  <div className="font-['Plus_Jakarta_Sans'] text-xl text-[#712ae2] font-semibold">
                    {selectedNode.confidence}
                  </div>
                  <div className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">verified confidence</div>
                </div>
              </div>

              {/* Confidence Micro-bar */}
              <div className="w-full bg-[#efedf1] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#712ae2] h-full rounded-full transition-all duration-500"
                  style={{ width: `${selectedNode.confidenceNum}%` }}
                ></div>
              </div>

              {/* Discovered from Real Work Body */}
              <div className="space-y-2 pt-1">
                <div className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#777586] font-semibold">
                  Discovered from real work
                </div>
                <div className="space-y-2 text-[#1b1b1f] font-['Plus_Jakarta_Sans'] text-[13px] leading-relaxed">
                  {selectedNode.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-[#f5f3f7] transition-colors">
                      <span className="text-[#712ae2] font-bold select-none">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Sources */}
              <div className="space-y-1.5 pt-1">
                <div className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#777586] font-semibold">
                  Evidence Sources
                </div>
                <div className="p-3 rounded-lg bg-[#f5f3f7] font-['JetBrains_Mono'] text-[12px] text-[#464554] flex flex-wrap items-center gap-2 border border-[#e3e2e6]/50">
                  {selectedNode.sources.map((src, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-[#c7c4d7]">•</span>}
                      <span className="px-2 py-0.5 rounded bg-white text-[#1b1b1f] font-medium shadow-xs">
                        {src}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => navigate('/why-arjun')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2f3034] hover:bg-[#1b1b1f] text-[#f2f0f4] font-['Plus_Jakarta_Sans'] text-[13px] font-semibold transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
                  type="button"
                >
                  <span>View Full Match Explanation</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* Signal Density Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#e3e2e6] space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-['Plus_Jakarta_Sans'] text-[13px] font-semibold text-[#1b1b1f]">
                  Synthesis Signal Density
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#00451c] bg-[#95f8a7]/30 px-2 py-0.5 rounded font-medium">
                  Signal Integrity 99.4%
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[13px] font-['Plus_Jakarta_Sans']">
                  <span className="text-[#464554]">Codebase Commits & Blame</span>
                  <span className="font-['JetBrains_Mono'] text-[12px] text-[#1b1b1f] font-semibold">614 events</span>
                </div>
                <div className="w-full bg-[#efedf1] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#2a14b4] h-full rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[13px] font-['Plus_Jakarta_Sans']">
                  <span className="text-[#464554]">Peer Code Reviews & Comments</span>
                  <span className="font-['JetBrains_Mono'] text-[12px] text-[#1b1b1f] font-semibold">1,289 signals</span>
                </div>
                <div className="w-full bg-[#efedf1] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#712ae2] h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[13px] font-['Plus_Jakarta_Sans']">
                  <span className="text-[#464554]">Architecture RFC Authorship</span>
                  <span className="font-['JetBrains_Mono'] text-[12px] text-[#1b1b1f] font-semibold">18 documents</span>
                </div>
                <div className="w-full bg-[#efedf1] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#712ae2] h-full rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[#777586] font-['Plus_Jakarta_Sans'] text-[12px]">
                <span className="material-symbols-outlined text-[16px] text-[#712ae2]">lock</span>
                <span>Synthesized using privacy-preserving zero-retention embeddings.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
