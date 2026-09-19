import React from 'react';
import { Link } from 'react-router-dom';

export const DiscoverPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* Hero & Ambient Glow */}
      <div className="relative w-full overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full bg-gradient-to-b from-[#e8e4fb]/60 via-[#f1edfd]/30 to-transparent blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center">
          {/* Engine Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f3f7] border border-[#e3e2e6]/60 text-[#464554] mb-7 shadow-xs">
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
            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-[56px] text-[#1b1b1f] font-bold tracking-tight leading-[1.1]">
              Your title is only <span className="text-[#2a14b4] italic font-serif font-normal">the beginning.</span>
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-[17px] text-[#525160] max-w-2xl mx-auto leading-relaxed">
              SkillRadar discovers the skills hidden inside the work you already do. We map the unmeasured architecture of your everyday output.
            </p>
          </div>

          {/* Telemetry Trace Showcase Section */}
          <div className="w-full mt-12 max-w-6xl">
            {/* Top Telemetry Trace Subheader */}
            <div className="flex flex-wrap items-center justify-between pb-3.5 mb-3 text-[#525160] border-b border-[#e3e2e6]/80 px-1 gap-3">
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

            {/* 3-Column Architecture Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-3 items-stretch relative">
              {/* Column 1: Current Title */}
              <div className="lg:col-span-3 flex flex-col justify-between p-6 rounded-2xl bg-[#f4f3f7] relative">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#777586]"></span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#777586] font-semibold">
                      Current Title
                    </span>
                  </div>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-2xl lg:text-[26px] text-[#1b1b1f] font-bold tracking-tight">
                    Backend Developer
                  </h2>
                  <div className="mt-3 space-y-1">
                    <p className="font-['JetBrains_Mono'] text-[12px] text-[#525160]">Formal HRIS Cadence</p>
                    <p className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">IC-5 Platform Core • Enterprise Eng</p>
                  </div>
                </div>

                <div className="mt-12 bg-transparent">
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

              {/* SVG Connectors 1: Converging/Diverging lines */}
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative py-6">
                <svg className="w-full h-[400px]" viewBox="0 0 80 400" fill="none">
                  {/* Central Node and Horizontal Trunk */}
                  <line x1="0" y1="200" x2="25" y2="200" stroke="#2a14b4" strokeWidth="2" />
                  <circle cx="25" cy="200" r="3" fill="#2a14b4" />

                  {/* 5 Bezier Lines spreading out to Column 2 items */}
                  <path d="M 25,200 C 50,200 55,42 80,42" stroke="#c7c4d7" strokeWidth="1.2" strokeDasharray="3 3" />
                  <path d="M 25,200 C 50,200 55,122 80,122" stroke="#c7c4d7" strokeWidth="1.2" />
                  <path d="M 25,200 C 50,200 55,200 80,200" stroke="#2a14b4" strokeWidth="1.8" />
                  <path d="M 25,200 C 50,200 55,278 80,278" stroke="#c7c4d7" strokeWidth="1.2" />
                  <path d="M 25,200 C 50,200 55,356 80,356" stroke="#c7c4d7" strokeWidth="1.2" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Column 2: Actual Work (Last 90 Days) */}
              <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl bg-[#f8f7fa] border border-[#e3e2e6]/50">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2a14b4]"></span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#1b1b1f] font-bold">
                        Actual Work
                      </span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">Last 90 Days</span>
                  </div>

                  <div className="space-y-2.5 font-['Plus_Jakarta_Sans'] text-[13px]">
                    {/* Item 1 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70 hover:border-[#c7c4d7] transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">Build high-throughput APIs</span>
                        <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586] shrink-0">18 PRs</span>
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">Kafka</span>
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">Python</span>
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">gRPC</span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70 hover:border-[#c7c4d7] transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">Analyze telemetry & production failures</span>
                        <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586] shrink-0">6 Postmortens</span>
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">Datadog</span>
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">Root Cause</span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70 hover:border-[#c7c4d7] transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">Mentor junior engineers & architecture reviews</span>
                        <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586] shrink-0">44 Threads</span>
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">Mentorship</span>
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">System RFCs</span>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70 hover:border-[#c7c4d7] transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">Coordinate cross-functional system decisions with UX</span>
                        <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586] shrink-0">Weekly Synced</span>
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">Design Systems</span>
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">Latency Budgets</span>
                      </div>
                    </div>

                    {/* Item 5 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70 hover:border-[#c7c4d7] transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">Prototype vector search & pipeline scripts</span>
                        <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586] shrink-0">R&D Spike</span>
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">pgvector</span>
                        <span className="font-['JetBrains_Mono'] text-[10px] px-2 py-0.5 rounded bg-[#f0eff4] text-[#525160]">Embeddings</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-right font-['JetBrains_Mono'] text-[11px] text-[#777586]">
                  Continuous ingestion via GitHub, Linear & Slack
                </div>
              </div>

              {/* SVG Connectors 2: Horizontal purple arrow lines */}
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative py-6">
                <svg className="w-full h-[400px]" viewBox="0 0 80 400" fill="none">
                  {/* Line 1 */}
                  <line x1="0" y1="42" x2="72" y2="42" stroke="#c7c4d7" strokeWidth="1.2" />
                  <polygon points="78,42 71,39 71,45" fill="#c7c4d7" />

                  {/* Line 2 */}
                  <line x1="0" y1="122" x2="72" y2="122" stroke="#c7c4d7" strokeWidth="1.2" />
                  <polygon points="78,122 71,119 71,125" fill="#c7c4d7" />

                  {/* Line 3 (Solid Purple Highlight) */}
                  <line x1="0" y1="200" x2="72" y2="200" stroke="#712ae2" strokeWidth="2" />
                  <polygon points="78,200 70,196 70,204" fill="#712ae2" />

                  {/* Line 4 */}
                  <line x1="0" y1="278" x2="72" y2="278" stroke="#c7c4d7" strokeWidth="1.2" />
                  <polygon points="78,278 71,275 71,281" fill="#c7c4d7" />

                  {/* Line 5 */}
                  <line x1="0" y1="356" x2="72" y2="356" stroke="#c7c4d7" strokeWidth="1.2" />
                  <polygon points="78,356 71,353 71,359" fill="#c7c4d7" />
                </svg>
              </div>

              {/* Column 3: Discovered Capabilities */}
              <div className="lg:col-span-3 flex flex-col justify-between p-5 rounded-2xl bg-[#f8f7fa] border border-[#e3e2e6]/50">
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#712ae2]"></span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#712ae2] font-bold">
                        DISCOVERED CAPABILITIES
                      </span>
                    </div>
                    <span className="text-[#712ae2] text-[16px]">✦</span>
                  </div>

                  <div className="space-y-2.5 font-['Plus_Jakarta_Sans'] text-[13px]">
                    {/* Capability 1 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">Technical Leadership</span>
                        <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-bold">87%</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-bold">
                          AI DISCOVERED
                        </span>
                      </div>
                    </div>

                    {/* Capability 2 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">Data Analysis & Pipeline Design</span>
                        <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-bold">84%</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-bold">
                          AI DISCOVERED
                        </span>
                      </div>
                    </div>

                    {/* Capability 3 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">Engineering Mentorship</span>
                        <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-bold">91%</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-bold">
                          AI DISCOVERED
                        </span>
                      </div>
                    </div>

                    {/* Capability 4 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">UX Systems Collaboration</span>
                        <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-bold">81%</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-bold">
                          AI DISCOVERED
                        </span>
                      </div>
                    </div>

                    {/* Capability 5 */}
                    <div className="p-3 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/70">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1b1b1f] text-[13px]">Distributed Problem Solving</span>
                        <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-bold">95%</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-bold">
                          AI DISCOVERED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center justify-between font-['JetBrains_Mono'] text-[11px] text-[#777586] uppercase tracking-wider">
                  <span>CONFIDENCE INDEX</span>
                  <span className="text-[#1b1b1f] font-semibold">P &lt; 0.001</span>
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
