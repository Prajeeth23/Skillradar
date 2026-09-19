import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const DiscoverPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      {/* Hero & Ambient Background */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[980px] h-[520px] rounded-full bg-gradient-to-b from-[#e3dfff]/40 via-[#eaddff]/20 to-transparent blur-3xl"></div>
          <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-[#d2bbff]/30 blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-20 flex flex-col items-center">
          {/* Engine Status Pill */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5f3f7] text-[#464554] mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#712ae2] animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-[12px] tracking-wide text-[#1b1b1f]">
              SYNTHESIS ENGINE v4.2 LIVE
            </span>
            <span className="text-[#777586] font-['JetBrains_Mono'] text-[12px]">•</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#2a14b4] font-semibold">
              Zero Self-Reporting Bias
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl text-center space-y-4">
            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-[56px] text-[#1b1b1f] font-semibold tracking-tight leading-[1.08]">
              Your title is only <span className="text-[#2a14b4] italic font-serif">the beginning.</span>
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#464554] max-w-2xl mx-auto leading-relaxed">
              SkillRadar discovers the skills hidden inside the work you already do. We map the unmeasured architecture of your everyday output.
            </p>
          </div>

          {/* Telemetry Trace Showcase Card */}
          <div className="w-full mt-10 lg:mt-16">
            <div className="relative rounded-2xl p-4 sm:p-6 lg:p-8 bg-white shadow-[0_1px_2px_rgba(18,19,22,0.04),0_12px_36px_rgba(18,19,22,0.03)] border border-[#e3e2e6]/80">
              {/* Telemetry Trace Bar */}
              <div className="flex flex-wrap items-center justify-between pb-4 mb-6 bg-[#f5f3f7]/60 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 px-4 sm:px-6 py-3 rounded-t-2xl text-[#464554] border-b border-[#e3e2e6]/60 gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2a14b4] text-[20px]">hub</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[12px] uppercase tracking-wider text-[#1b1b1f] font-semibold">
                    Telemetry Trace: Arjun Kumar
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] px-1.5 py-0.5 rounded bg-[#e9e7ec] text-[#777586]">
                    HASH_98E2A
                  </span>
                </div>
                <div className="flex items-center gap-4 font-['JetBrains_Mono'] text-[12px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#005f29]"></span> 1,429 Commits
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span> 312 PR Reviews
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2a14b4]"></span> 18 RFCs
                  </span>
                </div>
              </div>

              {/* 3-Column Architecture Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch relative">
                {/* Column 1: Current Title */}
                <div className="lg:col-span-3 flex flex-col justify-between p-5 rounded-xl bg-[#f5f3f7] relative group hover:bg-[#efedf1] transition-colors duration-300">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#777586]"></span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#777586] font-semibold">
                        Current Title
                      </span>
                    </div>
                    <h2 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#1b1b1f] font-semibold tracking-tight">
                      Backend Developer
                    </h2>
                    <div className="mt-2 space-y-1">
                      <p className="font-['JetBrains_Mono'] text-[12px] text-[#464554]">Formal HRIS Cadence</p>
                      <p className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">IC-5 Platform Core • Enterprise Eng</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-3 bg-[#e9e7ec]/60 rounded-lg p-3">
                    <div className="flex items-center justify-between text-[#464554] font-['JetBrains_Mono'] text-[12px]">
                      <span>HR Visibility Scope</span>
                      <span className="font-semibold text-[#ba1a1a]">22%</span>
                    </div>
                    <div className="w-full bg-[#e3e2e6] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#ba1a1a] h-full w-[22%] rounded-full"></div>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#777586] mt-2">
                      Static job spec overlooks 78% of executed responsibilities.
                    </p>
                  </div>
                </div>

                {/* SVG Connectors 1 */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative">
                  <svg className="w-full h-72 text-[#c7c4d7]" fill="none" preserveAspectRatio="none" viewBox="0 0 100 240">
                    <path d="M 0,120 C 40,120 60,30 100,30" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
                    <path d="M 0,120 C 40,120 60,75 100,75" stroke="currentColor" strokeWidth="1.5"></path>
                    <path className="text-[#2a14b4]" d="M 0,120 C 40,120 60,120 100,120" stroke="currentColor" strokeWidth="2"></path>
                    <path d="M 0,120 C 40,120 60,165 100,165" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M 0,120 C 40,120 60,210 100,210" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
                    <circle className="fill-[#2a14b4]" cx="0" cy="120" r="3"></circle>
                    <circle className="fill-[#2a14b4]" cx="100" cy="120" r="3"></circle>
                  </svg>
                </div>

                {/* Column 2: Actual Work (Last 90 Days) */}
                <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-xl bg-[#f5f3f7]/80">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#2a14b4]"></span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#1b1b1f] font-semibold">
                          Actual Work
                        </span>
                      </div>
                      <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">Last 90 Days</span>
                    </div>

                    <ul className="space-y-2.5 font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f]">
                      <li className="p-3 rounded-lg bg-white shadow-xs hover:bg-[#faf9fd] transition-all flex flex-col gap-1 border border-[#e3e2e6]/50">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-[#1b1b1f]">Build high-throughput APIs</span>
                          <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">18 PRs</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">Kafka</span>
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">Python</span>
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">gRPC</span>
                        </div>
                      </li>

                      <li className="p-3 rounded-lg bg-white shadow-xs hover:bg-[#faf9fd] transition-all flex flex-col gap-1 border border-[#e3e2e6]/50">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-[#1b1b1f]">Analyze telemetry & production failures</span>
                          <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">6 Postmortems</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">Datadog</span>
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">Root Cause</span>
                        </div>
                      </li>

                      <li className="p-3 rounded-lg bg-white shadow-xs hover:bg-[#faf9fd] transition-all flex flex-col gap-1 border border-[#e3e2e6]/50">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-[#1b1b1f]">Mentor junior engineers & architecture reviews</span>
                          <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">44 Threads</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">Mentorship</span>
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">System RFCs</span>
                        </div>
                      </li>

                      <li className="p-3 rounded-lg bg-white shadow-xs hover:bg-[#faf9fd] transition-all flex flex-col gap-1 border border-[#e3e2e6]/50">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-[#1b1b1f]">Coordinate cross-functional system decisions with UX</span>
                          <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">Weekly Synced</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">Design Systems</span>
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">Latency Budgets</span>
                        </div>
                      </li>

                      <li className="p-3 rounded-lg bg-white shadow-xs hover:bg-[#faf9fd] transition-all flex flex-col gap-1 border border-[#e3e2e6]/50">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-[#1b1b1f]">Prototype vector search & pipeline scripts</span>
                          <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">R&D Spike</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">pgvector</span>
                          <span className="font-['JetBrains_Mono'] text-[10px] px-1.5 py-0.5 rounded bg-[#efedf1] text-[#464554]">Embeddings</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-4 text-right font-['JetBrains_Mono'] text-[11px] text-[#777586]">
                    Continuous ingestion via GitHub, Linear & Slack
                  </div>
                </div>

                {/* SVG Connectors 2 */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative">
                  <svg className="w-full h-72 text-[#c7c4d7]" fill="none" preserveAspectRatio="none" viewBox="0 0 100 240">
                    <path d="M 0,30 C 40,30 60,30 100,30" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M 0,75 C 40,75 60,75 100,75" stroke="currentColor" strokeWidth="1.5"></path>
                    <path className="text-[#712ae2]" d="M 0,120 C 40,120 60,120 100,120" stroke="currentColor" strokeWidth="2"></path>
                    <path d="M 0,165 C 40,165 60,165 100,165" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M 0,210 C 40,210 60,210 100,210" stroke="currentColor" strokeWidth="1.5"></path>
                    <circle className="fill-[#712ae2]" cx="100" cy="30" r="3"></circle>
                    <circle className="fill-[#712ae2]" cx="100" cy="75" r="3"></circle>
                    <circle className="fill-[#712ae2]" cx="100" cy="120" r="3"></circle>
                    <circle className="fill-[#712ae2]" cx="100" cy="165" r="3"></circle>
                    <circle className="fill-[#712ae2]" cx="100" cy="210" r="3"></circle>
                  </svg>
                </div>

                {/* Column 3: Discovered Capabilities */}
                <div className="lg:col-span-3 flex flex-col justify-between p-5 rounded-xl bg-[#e9e7ec]/60 border border-purple-200/40">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#712ae2] animate-ping"></span>
                        <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#712ae2] font-bold">
                          Discovered Capabilities
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[#712ae2] text-[18px]">auto_awesome</span>
                    </div>

                    <div className="space-y-2.5 font-['Plus_Jakarta_Sans'] text-[13px]">
                      <div className="p-3 rounded-lg bg-white shadow-xs hover:translate-x-1 transition-transform border border-[#e3e2e6]/50">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#1b1b1f]">Technical Leadership</span>
                          <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-semibold">87%</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-semibold">AI Discovered</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white shadow-xs hover:translate-x-1 transition-transform border border-[#e3e2e6]/50">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#1b1b1f]">Data Analysis & Pipeline Design</span>
                          <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-semibold">84%</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-semibold">AI Discovered</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white shadow-xs hover:translate-x-1 transition-transform border border-[#e3e2e6]/50">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#1b1b1f]">Engineering Mentorship</span>
                          <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-semibold">91%</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-semibold">AI Discovered</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white shadow-xs hover:translate-x-1 transition-transform border border-[#e3e2e6]/50">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#1b1b1f]">UX Systems Collaboration</span>
                          <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-semibold">81%</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-semibold">AI Discovered</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white shadow-xs hover:translate-x-1 transition-transform border border-[#e3e2e6]/50">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#1b1b1f]">Distributed Problem Solving</span>
                          <span className="font-['JetBrains_Mono'] text-[12px] text-[#712ae2] font-semibold">95%</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
                          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#712ae2] uppercase tracking-wider font-semibold">AI Discovered</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 flex items-center justify-between font-['Plus_Jakarta_Sans'] text-[11px] text-[#777586] uppercase tracking-wider border-t border-[#e3e2e6]/40">
                    <span>Confidence Index</span>
                    <span className="font-['JetBrains_Mono'] text-[#1b1b1f] font-semibold">p &lt; 0.001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <Link
              to="/my-skills"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-[#2a14b4] text-white font-['Plus_Jakarta_Sans'] text-[16px] font-semibold hover:bg-[#4338ca] active:scale-[0.99] transition-all shadow-md shadow-indigo-900/10"
            >
              <span>See what SkillRadar discovered</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[#464554] font-['Plus_Jakarta_Sans'] text-[13px]">
              <span className="flex items-center gap-1 text-[#005f29] font-semibold">
                <span className="material-symbols-outlined text-[16px]">verified</span> Verified Telemetry
              </span>
              <span className="hidden sm:inline text-[#777586]">•</span>
              <span>Analyzing real-world commits, PR reviews, RFCs, and collaborative threads.</span>
              <span className="hidden sm:inline text-[#777586]">•</span>
              <span className="font-semibold text-[#1b1b1f]">Zero self-reporting bias.</span>
            </div>
          </div>

          {/* 3 Architecture Pillar Cards */}
          <div className="w-full mt-16 pt-8 bg-[#f5f3f7]/40 rounded-2xl p-6 border border-[#e3e2e6]/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col p-4 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/60">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 rounded-lg bg-[#e3dfff] text-[#2a14b4] material-symbols-outlined text-[22px]">
                    biotech
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-semibold text-[#1b1b1f]">
                    Passive Ingestion
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554] leading-relaxed">
                  No manual resumes, no skill endorsements, and no quizzes. Your actual code repos, ticket resolutions, and document authoring define your footprint.
                </p>
              </div>

              <div className="flex flex-col p-4 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/60">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 rounded-lg bg-[#eaddff] text-[#712ae2] material-symbols-outlined text-[22px]">
                    query_stats
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-semibold text-[#1b1b1f]">
                    Latent Synthesis
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554] leading-relaxed">
                  High-dimensional vector embeddings map implicit capabilities like system resilience, technical diplomacy, and cross-domain synthesis.
                </p>
              </div>

              <div className="flex flex-col p-4 rounded-xl bg-white shadow-xs border border-[#e3e2e6]/60">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 rounded-lg bg-[#95f8a7]/50 text-[#00451c] material-symbols-outlined text-[22px]">
                    handshake
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[16px] font-semibold text-[#1b1b1f]">
                    Executive Matching
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554] leading-relaxed">
                  Founders and VP-level leaders search for what you actually do, matching high-leverage roles to proven output rather than pedigree.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white mt-auto border-t border-[#e3e2e6]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[#464554] font-['Plus_Jakarta_Sans'] text-[13px]">
          <div className="flex items-center gap-2">
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#1b1b1f] font-semibold">
              SKILLRADAR
            </span>
            <span className="text-[#777586]">—</span>
            <span>AI Talent Graph & Deep Skill Synthesis Engine</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/divergence" className="hover:text-[#1b1b1f] transition-colors">Divergence Engine</Link>
            <Link to="/why-arjun" className="hover:text-[#1b1b1f] transition-colors">Match Dossier</Link>
            <Link to="/assessment/token-liam-tanaka-test-gamified" className="hover:text-purple-700 font-semibold transition-colors">Psychometric Lab</Link>
            <span className="text-[#777586] font-['JetBrains_Mono'] text-[12px]">© 2025 SkillRadar</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
