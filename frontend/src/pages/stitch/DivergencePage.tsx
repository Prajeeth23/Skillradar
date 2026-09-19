import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DivergencePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full overflow-hidden bg-[#faf9fd] py-10 md:py-16">
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_20%,#e3dfff_0%,transparent_50%),radial-gradient(circle_at_80%_80%,#eaddff_0%,transparent_45%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          {/* Header Banner */}
          <div className="flex flex-col max-w-4xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e9e7ec] w-fit mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#2a14b4] animate-pulse"></span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-widest text-[#464554] font-semibold">
                Divergence Engine Telemetry
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">v4.2</span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-[56px] text-[#1b1b1f] font-semibold tracking-tight text-left leading-[1.1]">
              Where your title ends,<br />
              <span className="text-[#2a14b4] italic font-normal">your potential begins.</span>
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#464554] mt-4 max-w-2xl leading-relaxed">
              The Divergence Engine measures the structural distance between your contractual job description and your real-world contribution.
            </p>
          </div>

          {/* Flow Architecture Matrix (3 Stages) */}
          <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-6">
            {/* SVG Connecting Vectors (Desktop Only) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full text-[#c7c4d7]/70" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 600">
                <path d="M 330 180 C 400 180, 410 140, 480 140" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
                <path d="M 330 200 C 400 200, 410 230, 480 230" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
                <path d="M 330 220 C 400 220, 410 320, 480 320" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
                <path d="M 330 240 C 400 240, 410 410, 480 410" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
                <path d="M 330 260 C 400 260, 410 500, 480 500" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>

                <path d="M 760 140 C 820 140, 830 150, 890 150" stroke="#4338ca" strokeOpacity="0.5" strokeWidth="2"></path>
                <path d="M 760 230 C 820 230, 830 230, 890 230" stroke="#4338ca" strokeOpacity="0.5" strokeWidth="2"></path>
                <path d="M 760 320 C 820 320, 830 310, 890 310" stroke="#4338ca" strokeOpacity="0.5" strokeWidth="2"></path>
                <path d="M 760 410 C 820 410, 830 390, 890 390" stroke="#4338ca" strokeOpacity="0.5" strokeWidth="2"></path>
                <path d="M 760 500 C 820 500, 830 470, 890 470" stroke="#4338ca" strokeOpacity="0.5" strokeWidth="2"></path>
              </svg>
            </div>

            {/* STAGE 1: Contractual Title */}
            <div className="lg:col-span-3 flex flex-col z-10 group">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586] uppercase tracking-wider font-semibold">
                  Stage 01
                </span>
                <span className="h-px flex-1 bg-[#e3e2e6]"></span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#e3e2e6] hover:shadow-sm transition-shadow">
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-widest text-[#777586] block mb-1">
                  Contractual Title
                </span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#1b1b1f] font-semibold mb-4">
                  Backend Developer
                </h2>

                <div className="bg-[#f5f3f7] p-4 rounded-xl mb-4 border border-[#e3e2e6]/50">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586] block mb-1">
                    PERIMETER ID: JD-88219
                  </span>
                  <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554] leading-relaxed">
                    What company HR systems record: Python, APIs, SQL, Database schemas, maintenance tickets.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="px-2 py-1 rounded bg-[#efedf1] text-[#464554] font-['JetBrains_Mono'] text-[11px]">Python 3.11</span>
                  <span className="px-2 py-1 rounded bg-[#efedf1] text-[#464554] font-['JetBrains_Mono'] text-[11px]">FastAPI</span>
                  <span className="px-2 py-1 rounded bg-[#efedf1] text-[#464554] font-['JetBrains_Mono'] text-[11px]">PostgreSQL</span>
                  <span className="px-2 py-1 rounded bg-[#efedf1] text-[#464554] font-['JetBrains_Mono'] text-[11px]">REST</span>
                </div>

                <div className="mt-6 pt-3 bg-[#f5f3f7]/60 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between border-t border-[#e3e2e6]/60">
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#777586] font-semibold">ROLE BOUNDARY</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#ba1a1a] font-medium">RIGID SPEC</span>
                </div>
              </div>
            </div>

            {/* STAGE 2: Real-World Telemetry */}
            <div className="lg:col-span-5 flex flex-col z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#2a14b4] uppercase tracking-wider font-semibold">
                  Stage 02
                </span>
                <span className="h-px flex-1 bg-[#2a14b4]/20"></span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#2a14b4] font-semibold">Active Signals</span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#e3e2e6] space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-widest text-[#2a14b4] font-semibold">
                    Real-World Telemetry
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">Source: VCS, CI/CD & Org Graph</span>
                </div>

                <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554]">
                  Observed engineering runtime traces and cross-silo impact captured across the last 180 days:
                </p>

                <div className="space-y-2.5">
                  <div className="p-3 bg-[#f5f3f7] rounded-xl hover:bg-[#efedf1] transition-colors flex items-start gap-3 group border border-[#e3e2e6]/40">
                    <span className="text-[#2a14b4] font-bold mt-0.5">→</span>
                    <div className="flex-1">
                      <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-medium">
                        Builds payment resilience orchestrators
                      </div>
                      <div className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">
                        Self-healing circuit breaker pattern deployed to prod
                      </div>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#777586] group-hover:text-[#2a14b4] font-semibold">
                      PROD_RUN
                    </span>
                  </div>

                  <div className="p-3 bg-[#f5f3f7] rounded-xl hover:bg-[#efedf1] transition-colors flex items-start gap-3 group border border-[#e3e2e6]/40">
                    <span className="text-[#2a14b4] font-bold mt-0.5">→</span>
                    <div className="flex-1">
                      <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-medium">
                        Analyzes distributed database latency anomalies
                      </div>
                      <div className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">
                        Pinpointed p99 degradations under concurrent batch locks
                      </div>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#777586] group-hover:text-[#2a14b4] font-semibold">
                      TRACE_LOG
                    </span>
                  </div>

                  <div className="p-3 bg-[#f5f3f7] rounded-xl hover:bg-[#efedf1] transition-colors flex items-start gap-3 group border border-[#e3e2e6]/40">
                    <span className="text-[#2a14b4] font-bold mt-0.5">→</span>
                    <div className="flex-1">
                      <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-medium">
                        Mentors 3 junior engineers through onboarding & code reviews
                      </div>
                      <div className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">
                        Avg review depth 4.8 comments • time-to-first-commit down 40%
                      </div>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#777586] group-hover:text-[#2a14b4] font-semibold">
                      PEER_SYNC
                    </span>
                  </div>

                  <div className="p-3 bg-[#f5f3f7] rounded-xl hover:bg-[#efedf1] transition-colors flex items-start gap-3 group border border-[#e3e2e6]/40">
                    <span className="text-[#2a14b4] font-bold mt-0.5">→</span>
                    <div className="flex-1">
                      <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-medium">
                        Collaborates with design systems team to co-author checkout specs
                      </div>
                      <div className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">
                        Bridged micro-frontend states directly into design tokens
                      </div>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#777586] group-hover:text-[#2a14b4] font-semibold">
                      CROSS_SPEC
                    </span>
                  </div>

                  <div className="p-3 bg-[#f5f3f7] rounded-xl hover:bg-[#efedf1] transition-colors flex items-start gap-3 group border border-[#e3e2e6]/40">
                    <span className="text-[#2a14b4] font-bold mt-0.5">→</span>
                    <div className="flex-1">
                      <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#1b1b1f] font-medium">
                        Coordinates cross-silo architecture decisions across 4 squads
                      </div>
                      <div className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">
                        Unifies event envelope semantics across Payments & Fulfillment
                      </div>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#777586] group-hover:text-[#2a14b4] font-semibold">
                      RFC_LEAD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STAGE 3: What SkillRadar Sees */}
            <div className="lg:col-span-4 flex flex-col z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#712ae2] uppercase tracking-wider font-semibold">
                  Stage 03
                </span>
                <span className="h-px flex-1 bg-[#712ae2]/30"></span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#712ae2] font-semibold">Unlocked Vector</span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#e3e2e6] space-y-4">
                <div>
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-widest text-[#712ae2] font-semibold block mb-1">
                    Synthesized Capabilities
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-2xl text-[#1b1b1f] font-semibold">
                    Latent Horizons
                  </h3>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 bg-[#f5f3f7]/70 rounded-xl hover:bg-[#eaddff]/30 transition-all border border-[#e3e2e6]/40">
                    <div className="flex items-center gap-2">
                      <span className="text-[#712ae2] text-[16px]">✦</span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#1b1b1f] font-semibold">
                        Technical Leadership
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 pl-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-['JetBrains_Mono'] text-[10px] font-semibold">
                        87% CONFIDENCE
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#464554]">14 RFC citations</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#f5f3f7]/70 rounded-xl hover:bg-[#eaddff]/30 transition-all border border-[#e3e2e6]/40">
                    <div className="flex items-center gap-2">
                      <span className="text-[#712ae2] text-[16px]">✦</span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#1b1b1f] font-semibold">
                        Data Analysis & Ingestion
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 pl-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-['JetBrains_Mono'] text-[10px] font-semibold">
                        84% CONFIDENCE
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#464554]">1.2M events/sec pipeline</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#f5f3f7]/70 rounded-xl hover:bg-[#eaddff]/30 transition-all border border-[#e3e2e6]/40">
                    <div className="flex items-center gap-2">
                      <span className="text-[#712ae2] text-[16px]">✦</span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#1b1b1f] font-semibold">
                        Engineering Mentorship
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 pl-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-['JetBrains_Mono'] text-[10px] font-semibold">
                        89% CONFIDENCE
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#464554]">42 reviewed PRs</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#f5f3f7]/70 rounded-xl hover:bg-[#eaddff]/30 transition-all border border-[#e3e2e6]/40">
                    <div className="flex items-center gap-2">
                      <span className="text-[#712ae2] text-[16px]">✦</span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#1b1b1f] font-semibold">
                        Cross-Functional UX Alignment
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 pl-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-['JetBrains_Mono'] text-[10px] font-semibold">
                        81% CONFIDENCE
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#464554]">Design tokens bridge</span>
                    </div>
                  </div>

                  <div className="p-3 bg-[#f5f3f7]/70 rounded-xl hover:bg-[#eaddff]/30 transition-all border border-[#e3e2e6]/40">
                    <div className="flex items-center gap-2">
                      <span className="text-[#712ae2] text-[16px]">✦</span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#1b1b1f] font-semibold">
                        Autonomous Problem Solving
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 pl-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] font-['JetBrains_Mono'] text-[10px] font-semibold">
                        93% CONFIDENCE
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#464554]">P0 root-cause analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Synthesis Highlight Ledger */}
          <div className="mt-8 p-6 rounded-2xl bg-white shadow-xs border border-[#e3e2e6] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col max-w-2xl">
              <div className="flex items-center gap-3 mb-1">
                <span className="material-symbols-outlined text-[#2a14b4] text-[24px]">verified_user</span>
                <h4 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl text-[#1b1b1f] font-semibold tracking-tight">
                  5 capabilities discovered beyond your official role.
                </h4>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#464554] mt-1">
                <span className="text-[#2a14b4] font-semibold">Divergence Factor: +1.48x</span> • Unlocks 3 High-Impact Internal Roles{' '}
                <span className="text-[#1b1b1f] font-medium">(AI Engineer, Staff Tech Lead, Systems Architect)</span>.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => navigate('/my-skills')}
                className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-[#f5f3f7] hover:bg-[#e9e7ec] text-[#1b1b1f] font-['Plus_Jakarta_Sans'] text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                type="button"
              >
                <span>Capability Constellation</span>
                <span className="material-symbols-outlined text-[16px]">balance</span>
              </button>
              <button
                onClick={() => navigate('/why-arjun')}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-[#2a14b4] hover:bg-[#4338ca] text-white font-['Plus_Jakarta_Sans'] text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                type="button"
              >
                <span>Explore Evidence Dossier</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Supporting Visual Context Anchor */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#f5f3f7] flex items-center gap-4 border border-[#e3e2e6]/50">
              <div className="w-10 h-10 rounded-full bg-[#e3dfff] flex items-center justify-center text-[#2a14b4]">
                <span className="material-symbols-outlined text-[20px]">insights</span>
              </div>
              <div>
                <div className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#777586] uppercase font-semibold">Signal Density</div>
                <div className="font-['Plus_Jakarta_Sans'] text-lg text-[#1b1b1f] font-semibold">342 Telemetry Points</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f3f7] flex items-center gap-4 border border-[#e3e2e6]/50">
              <div className="w-10 h-10 rounded-full bg-[#eaddff] flex items-center justify-center text-[#712ae2]">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </div>
              <div>
                <div className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#777586] uppercase font-semibold">Graph Cross-Reach</div>
                <div className="font-['Plus_Jakarta_Sans'] text-lg text-[#1b1b1f] font-semibold">4 Core Disciplines</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f3f7] flex items-center gap-4 border border-[#e3e2e6]/50">
              <div className="w-10 h-10 rounded-full bg-[#e3e2e6] flex items-center justify-center text-[#464554]">
                <span className="material-symbols-outlined text-[20px]">lock_open</span>
              </div>
              <div>
                <div className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#777586] uppercase font-semibold">Next Career Leap</div>
                <div className="font-['Plus_Jakarta_Sans'] text-lg text-[#1b1b1f] font-semibold">Staff / Lead Horizon</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
