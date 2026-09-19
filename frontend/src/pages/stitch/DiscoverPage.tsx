import React from 'react';
import { Link } from 'react-router-dom';

interface WorkItem {
  title: string;
  metrics: string;
  tags: string[];
}

interface CapabilityItem {
  name: string;
  score: string;
}

const WORK_ITEMS: WorkItem[] = [
  {
    title: 'Build high-throughput APIs',
    metrics: '18 PRs',
    tags: ['Kafka', 'Python', 'gRPC'],
  },
  {
    title: 'Analyze telemetry & production failures',
    metrics: '6 Postmortens',
    tags: ['Datadog', 'Root Cause'],
  },
  {
    title: 'Mentor junior engineers & architecture reviews',
    metrics: '44 Threads',
    tags: ['Mentorship', 'System RFCs'],
  },
  {
    title: 'Coordinate cross-functional system decisions with UX',
    metrics: 'Weekly Synced',
    tags: ['Design Systems', 'Latency Budgets'],
  },
  {
    title: 'Prototype vector search & pipeline scripts',
    metrics: 'R&D Spike',
    tags: ['pgvector', 'Embeddings'],
  },
];

const CAPABILITIES: CapabilityItem[] = [
  { name: 'Technical Leadership', score: '87%' },
  { name: 'Data Analysis & Pipeline Design', score: '84%' },
  { name: 'Engineering Mentorship', score: '91%' },
  { name: 'UX Systems Collaboration', score: '81%' },
  { name: 'Distributed Problem Solving', score: '95%' },
];

export const DiscoverPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Hero & Ambient Glow */}
      <div className="relative w-full overflow-hidden pt-10 pb-16">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[400px] rounded-full bg-gradient-to-b from-[#e8e4fb]/70 via-[#f1edfd]/30 to-transparent blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center">
          {/* Engine Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f3f7] border border-[#e3e2e6]/70 text-[#464554] mb-7 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#712ae2]"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-[#1b1b1f] font-medium">
              SYNTHESIS ENGINE v4.2 LIVE
            </span>
            <span className="text-[#777586] text-[11px]">•</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#2a14b4] font-semibold">
              Zero Self-Reporting Bias
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-4xl text-center space-y-4">
            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-[54px] text-[#1b1b1f] font-bold tracking-tight leading-[1.12]">
              Your title is only <span className="text-[#2a14b4] italic font-serif font-normal">the beginning.</span>
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-[17px] text-[#525160] max-w-2xl mx-auto leading-relaxed">
              SkillRadar discovers the skills hidden inside the work you already do. We map the unmeasured architecture of your everyday output.
            </p>
          </div>

          {/* Telemetry Trace Showcase Card */}
          <div className="w-full mt-12 max-w-6xl">
            {/* Top Telemetry Trace Header */}
            <div className="flex flex-wrap items-center justify-between pb-3.5 mb-4 text-[#525160] border-b border-[#e3e2e6]/80 px-1 gap-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#2a14b4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="2.5" fill="#2a14b4" />
                  <circle cx="6" cy="7" r="1.5" fill="#712ae2" />
                  <circle cx="18" cy="7" r="1.5" fill="#712ae2" />
                  <circle cx="5" cy="16" r="1.5" fill="#2a14b4" />
                  <circle cx="19" cy="16" r="1.5" fill="#2a14b4" />
                  <circle cx="12" cy="20" r="1.5" fill="#712ae2" />
                  <path d="M12 12L6 7M12 12L18 7M12 12L5 16M12 12L19 16M12 12L12 20" stroke="#712ae2" strokeWidth="1.2" />
                </svg>
                <span className="font-['Plus_Jakarta_Sans'] text-[12px] uppercase tracking-wider text-[#1b1b1f] font-bold">
                  TELEMETRY TRACE: ARJUN KUMAR
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] px-1.5 py-0.5 rounded bg-[#f0eff4] text-[#777586] font-medium">
                  HASH_98E2A
                </span>
              </div>
              <div className="flex items-center gap-4 font-['JetBrains_Mono'] text-[12px]">
                <span className="flex items-center gap-1.5 text-[#1b1b1f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span> 1,429 Commits
                </span>
                <span className="flex items-center gap-1.5 text-[#1b1b1f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span> 312 PR Reviews
                </span>
                <span className="flex items-center gap-1.5 text-[#1b1b1f]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2a14b4]"></span> 18 RFCs
                </span>
              </div>
            </div>

            {/* Main Architecture Diagram Container */}
            <div className="flex flex-col lg:flex-row items-stretch gap-0 w-full relative">
              {/* Column 1: Current Title Card */}
              <div className="w-full lg:w-[260px] shrink-0 flex flex-col justify-between p-6 rounded-2xl bg-[#f4f3f7] border border-[#e3e2e6]/50 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#777586]"></span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#777586] font-semibold">
                      Current Title
                    </span>
                  </div>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#1b1b1f] font-bold tracking-tight">
                    Backend Developer
                  </h2>
                  <div className="mt-3 space-y-1">
                    <p className="font-['JetBrains_Mono'] text-[12px] text-[#525160]">Formal HRIS Cadence</p>
                    <p className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">IC-5 Platform Core • Enterprise Eng</p>
                  </div>
                </div>

                <div className="mt-14 pt-2">
                  <div className="flex items-center justify-between text-[#525160] font-['JetBrains_Mono'] text-[12px]">
                    <span>HR Visibility Scope</span>
                    <span className="font-bold text-[#dc2626]">22%</span>
                  </div>
                  <div className="w-full bg-[#e3e2e6] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#dc2626] h-full w-[22%] rounded-full"></div>
                  </div>
                  <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#777586] mt-2 leading-snug">
                    Static job spec overlooks 78% of executed responsibilities.
                  </p>
                </div>
              </div>

              {/* Connector 1: Bezier Fan SVG */}
              <div className="hidden lg:flex w-14 shrink-0 items-stretch relative">
                <svg className="w-full h-full" viewBox="0 0 56 100" preserveAspectRatio="none" fill="none">
                  {/* Left Horizontal Stem & Node */}
                  <line x1="0" y1="50" x2="16" y2="50" stroke="#2a14b4" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <circle cx="16" cy="50" r="3" fill="#2a14b4" />

                  {/* 5 Smooth Bezier Curves to right-side items at 10%, 30%, 50%, 70%, 90% */}
                  <path d="M 16,50 C 36,50 36,10 56,10" stroke="#c7c4d7" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                  <path d="M 16,50 C 36,50 36,30 56,30" stroke="#c7c4d7" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                  <path d="M 16,50 C 36,50 36,50 56,50" stroke="#2a14b4" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
                  <path d="M 16,50 C 36,50 36,70 56,70" stroke="#c7c4d7" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                  <path d="M 16,50 C 36,50 36,90 56,90" stroke="#c7c4d7" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>

              {/* Coordinated Columns 2 & 3: 5 Rows with Guaranteed Precision Arrows */}
              <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#f8f7fa] border border-[#e3e2e6]/50">
                {/* Headers */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#e3e2e6]/40">
                  {/* Left Column Header */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2a14b4]"></span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#1b1b1f] font-bold">
                      Actual Work
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586] ml-4">Last 90 Days</span>
                  </div>

                  {/* Right Column Header */}
                  <div className="flex items-center gap-2 pr-2">
                    <span className="w-2 h-2 rounded-full bg-[#712ae2]"></span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#712ae2] font-bold">
                      Discovered Capabilities
                    </span>
                    <span className="text-[#712ae2] text-[14px]">✦</span>
                  </div>
                </div>

                {/* 5 Row Pairs */}
                <div className="space-y-3 font-['Plus_Jakarta_Sans']">
                  {WORK_ITEMS.map((work, idx) => {
                    const cap = CAPABILITIES[idx];
                    const isHighlighted = idx === 2; // Engineering Mentorship highlight

                    return (
                      <div key={work.title} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full">
                        {/* Actual Work Card */}
                        <div className="flex-1 p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70 hover:border-[#c7c4d7] transition-all flex flex-col justify-between min-h-[72px]">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-[#1b1b1f] text-[13px]">{work.title}</span>
                            <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586] shrink-0">{work.metrics}</span>
                          </div>
                          <div className="flex gap-1.5 mt-2 flex-wrap">
                            {work.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Arrow Connector */}
                        <div className="hidden sm:flex w-10 lg:w-14 items-center justify-center shrink-0">
                          {isHighlighted ? (
                            <div className="w-full flex items-center relative">
                              <div className="h-[2px] w-full bg-[#712ae2]"></div>
                              <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-[#712ae2] -ml-1"></div>
                            </div>
                          ) : (
                            <div className="w-full flex items-center relative">
                              <div className="h-[1.2px] w-full bg-[#c7c4d7]"></div>
                              <div className="w-0 h-0 border-y-[3.5px] border-y-transparent border-l-[5px] border-l-[#c7c4d7] -ml-1"></div>
                            </div>
                          )}
                        </div>

                        {/* Discovered Capability Card */}
                        <div className="w-full sm:w-64 lg:w-72 p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70 flex flex-col justify-between shrink-0 min-h-[72px]">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#1b1b1f] text-[13px]">{cap.name}</span>
                            <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-bold">{cap.score}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                            <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-bold">
                              AI DISCOVERED
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sub-footers */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#e3e2e6]/40 text-[11px] font-['JetBrains_Mono'] text-[#777586]">
                  <span>Continuous ingestion via GitHub, Linear & Slack</span>
                  <div className="flex items-center gap-1.5 uppercase tracking-wider">
                    <span>Confidence Index</span>
                    <span className="text-[#1b1b1f] font-semibold">P &lt; 0.001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <Link
              to="/my-skills"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#2a14b4] text-white font-['Plus_Jakarta_Sans'] text-[15px] font-semibold hover:bg-[#3b23c9] active:scale-[0.99] transition-all shadow-md shadow-indigo-950/15"
            >
              <span>See what SkillRadar discovered</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>

            {/* Proof and Trust Line */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[#525160] font-['Plus_Jakarta_Sans'] text-[13px]">
              <span className="flex items-center gap-1 text-[#16a34a] font-semibold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span> Verified Telemetry
              </span>
              <span className="text-[#777586]">•</span>
              <span>Analyzing real-world commits, PR reviews, RFCs, and collaborative threads.</span>
              <span className="text-[#777586]">•</span>
              <span className="font-bold text-[#1b1b1f]">Zero self-reporting bias.</span>
            </div>
          </div>

          {/* 3 Value Proposition Feature Cards */}
          <div className="w-full mt-16 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Passive Ingestion */}
              <div className="flex flex-col p-6 rounded-2xl bg-white border border-[#e3e2e6]/70 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#f1edfd] flex items-center justify-center text-[#712ae2] mb-4">
                  <span className="material-symbols-outlined text-[22px]">inbox</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#1b1b1f] mb-2">
                  Passive Ingestion
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#525160] leading-relaxed">
                  No manual resumes, no skill endorsements, and no quizzes. Your actual code repos, ticket resolutions, and document authoring define your footprint.
                </p>
              </div>

              {/* Card 2: Latent Synthesis */}
              <div className="flex flex-col p-6 rounded-2xl bg-white border border-[#e3e2e6]/70 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#f1edfd] flex items-center justify-center text-[#712ae2] mb-4">
                  <span className="material-symbols-outlined text-[22px]">ssid_chart</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#1b1b1f] mb-2">
                  Latent Synthesis
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#525160] leading-relaxed">
                  High-dimensional vector embeddings map implicit capabilities like system resilience, technical diplomacy, and cross-domain synthesis.
                </p>
              </div>

              {/* Card 3: Executive Matching */}
              <div className="flex flex-col p-6 rounded-2xl bg-white border border-[#e3e2e6]/70 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#16a34a] mb-4">
                  <span className="material-symbols-outlined text-[22px]">diamond</span>
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[16px] font-bold text-[#1b1b1f] mb-2">
                  Executive Matching
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#525160] leading-relaxed">
                  Founders and VP-level leaders search for what you actually do, matching high-leverage roles to proven output rather than pedigree.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer matching reference */}
      <footer className="w-full bg-white mt-auto border-t border-[#e3e2e6]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#525160] font-['Plus_Jakarta_Sans'] text-[12px]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1b1b1f]">SKILLRADAR</span>
            <span className="text-[#777586]">—</span>
            <span>AI Talent Graph & Deep Skill Synthesis Engine</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1b1b1f] cursor-pointer">Telemetry</span>
            <span className="hover:text-[#1b1b1f] cursor-pointer">Privacy Architecture</span>
            <span className="hover:text-[#1b1b1f] cursor-pointer">Security</span>
            <span className="text-[#777586]">© 2025 SkillRadar</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
