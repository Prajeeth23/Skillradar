import React, { useState } from 'react';

export const WhyArjunPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [planSimulated, setPlanSimulated] = useState(false);
  const [discussionInitiated, setDiscussionInitiated] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline mb-10 pb-6 border-b border-[#e3e2e6]/50">
          <div className="lg:col-span-7 flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#712ae2]"></span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#712ae2] uppercase tracking-widest font-semibold">
                Synthesized Candidate Dossier
              </span>
              <span className="text-[#777586] font-['JetBrains_Mono'] text-[11px]">/ ID: ARJ-9042</span>
            </div>

            <h1 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl lg:text-6xl text-[#1b1b1f] font-bold tracking-tight leading-none">
              Why Arjun?
            </h1>

            <p className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl text-[#464554] font-normal leading-snug max-w-xl">
              Not because he is a Backend Developer.<br />
              <span className="text-[#2a14b4] font-semibold">Because of the work he has already done.</span>
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end justify-end self-end">
            <div className="flex items-baseline gap-1">
              <span className="font-['Plus_Jakarta_Sans'] text-[76px] leading-none font-bold tracking-tighter text-[#2a14b4]">
                82
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-4xl text-[#712ae2] font-semibold leading-none">%</span>
            </div>
            <div className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#1b1b1f] font-semibold tracking-widest uppercase mt-1">
              Match For AI Engineer
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[#464554] font-['JetBrains_Mono'] text-[12px]">
              <span className="material-symbols-outlined text-[16px] text-[#005f29]">check_circle</span>
              <span>Verified from 14 PRs & 3 architecture briefs</span>
            </div>
          </div>
        </div>

        {/* Dossier Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Left Column: Candidate Profile Card */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="p-6 rounded-2xl bg-[#f5f3f7] flex flex-col space-y-4 border border-[#e3e2e6]">
              {/* Photo */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xs">
                <img
                  className="w-full h-full object-cover"
                  alt="Arjun Kumar profile portrait"
                  src="/assets/stitch/arjun_portrait.jpg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnfC7Zaar5dXZRuAo0he4O3ctijinK-ZrDH2PcOFIxnfNQsVupXTrdQwxqXxFAB349OxdxcRHzG7xgVRcCksWtFYe_Mf9hQK1V9XGdVtleiMYeQzRdHRBXVZ3mMfGMBkoC1gclwLfrojN2sDuaxoy1yQjxQ5j2oDYVJ0rSncJTjD_FtLqXmiF4kRwxPFY96HgGC7KpdqnJE8QfbibNaP4OzpxMaE-Ir7vXneyD2YPcPE1LOiODCINf';
                  }}
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-lg font-['JetBrains_Mono'] text-[11px] text-[#1b1b1f] font-semibold shadow-xs">
                  Current: Staff Backend Eng
                </div>
              </div>

              {/* Tenure & Velocity */}
              <div className="flex flex-col space-y-1">
                <div className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#777586] font-semibold">
                  Tenure & Velocity
                </div>
                <div className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#1b1b1f] font-semibold">
                  3.8 Years in Platform Core
                </div>
                <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554]">
                  Top 4% code throughput across Distributed Systems Org
                </div>
              </div>

              {/* Readiness Convergence Bar */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-1 font-['JetBrains_Mono'] text-[12px]">
                  <span className="text-[#1b1b1f]">Readiness Convergence</span>
                  <span className="font-semibold text-[#2a14b4]">82%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e3e2e6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2a14b4] rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>

              {/* Inference Model Box */}
              <div className="p-4 rounded-xl bg-white border border-[#e3e2e6]/70 shadow-xs">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#712ae2] text-[20px] mt-0.5">psychology</span>
                  <div className="flex flex-col">
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#712ae2] font-semibold">
                      Inference Model
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554] leading-relaxed mt-1">
                      Candidate demonstrates exceptional feature engineering foundations hidden under standard transactional backend classifications.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Role Card */}
            <div className="p-6 rounded-2xl bg-[#f5f3f7] flex flex-col space-y-2 border border-[#e3e2e6]">
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#777586] font-semibold">
                Target Role Alignment
              </span>
              <div className="font-['Plus_Jakarta_Sans'] text-[17px] text-[#1b1b1f] font-semibold">
                AI Systems & Inference Engineer
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554]">
                Team: Applied Machine Learning (Group 04)
              </p>
              <div className="flex items-center gap-1.5 text-[#005f29] pt-1 font-['Plus_Jakarta_Sans'] text-[13px] font-semibold">
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                <span>Immediate internal transfer viability</span>
              </div>
            </div>
          </div>

          {/* Right Column: Empirical Evidence Path */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-widest text-[#777586] font-semibold">
                Empirical Evidence Path
              </span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl text-[#1b1b1f] font-semibold mt-1">
                From Backend Scale to Machine Learning Foundations
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#464554] mt-1">
                Deep telemetry extracted from real internal deliverables, cross-referenced with target competency vectors.
              </p>
            </div>

            {/* Timeline Milestones */}
            <div className="relative flex flex-col space-y-6">
              <div className="absolute left-6 top-8 bottom-8 w-px bg-[#e3e2e6] hidden sm:block"></div>

              {/* Milestone 01 */}
              <div className="relative flex flex-col sm:flex-row items-start gap-4 group">
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xs z-10 shrink-0 font-['JetBrains_Mono'] text-[13px] font-semibold text-[#2a14b4] border border-[#e3e2e6]">
                  01
                </div>
                <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-xs border border-[#e3e2e6] hover:shadow-sm transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#2a14b4] font-semibold">
                      Project Signal
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">Q2 2024 — Infrastructure</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#1b1b1f] font-semibold">
                    Payment Intelligence Platform
                  </h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#464554] mt-1">
                    Built high-throughput data-processing and Kafka streaming pipelines handling 1.2M events/sec.
                  </p>

                  <div className="mt-4 pt-3 bg-[#f5f3f7] p-4 rounded-xl flex flex-col space-y-1 border border-[#e3e2e6]/50">
                    <div className="flex items-center gap-1.5 text-[#2a14b4] font-['JetBrains_Mono'] text-[11px]">
                      <span className="material-symbols-outlined text-[16px]">radar</span>
                      <span className="font-semibold uppercase tracking-wide">SkillRadar Detected:</span>
                    </div>
                    <div className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#1b1b1f] font-semibold">
                      DATA ANALYSIS & FEATURE PIPELINES
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#464554]">
                      Directly transfers to training data ingestion and feature-store generation for large-scale AI/ML inference workflows.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['JetBrains_Mono'] text-[10px]">Kafka Architecture</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['JetBrains_Mono'] text-[10px]">Low-Latency I/O</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['JetBrains_Mono'] text-[10px]">Stream Partitioning</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone 02 */}
              <div className="relative flex flex-col sm:flex-row items-start gap-4 group">
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xs z-10 shrink-0 font-['JetBrains_Mono'] text-[13px] font-semibold text-[#712ae2] border border-[#e3e2e6]">
                  02
                </div>
                <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-xs border border-[#e3e2e6] hover:shadow-sm transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#712ae2] font-semibold">
                      Project Signal
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">Q4 2024 — Observability</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#1b1b1f] font-semibold">
                    Internal Telemetry & Metric Stream
                  </h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#464554] mt-1">
                    Created analytical SQL pipelines, anomaly detection scripts, and performance aggregation queries.
                  </p>

                  <div className="mt-4 pt-3 bg-[#f5f3f7] p-4 rounded-xl flex flex-col space-y-1 border border-[#e3e2e6]/50">
                    <div className="flex items-center gap-1.5 text-[#712ae2] font-['JetBrains_Mono'] text-[11px]">
                      <span className="material-symbols-outlined text-[16px]">analytics</span>
                      <span className="font-semibold uppercase tracking-wide">SkillRadar Detected:</span>
                    </div>
                    <div className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#1b1b1f] font-semibold">
                      QUANTITATIVE DATA HEURISTICS
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#464554]">
                      Essential foundation for continuous model evaluation, drift monitoring, and automated loss function tracking.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['JetBrains_Mono'] text-[10px]">Statistical Aggregation</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['JetBrains_Mono'] text-[10px]">Window Queries</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['JetBrains_Mono'] text-[10px]">Outlier Scoring</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Milestone 03 */}
              <div className="relative flex flex-col sm:flex-row items-start gap-4 group">
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-xs z-10 shrink-0 font-['JetBrains_Mono'] text-[13px] font-semibold text-[#005f29] border border-[#e3e2e6]">
                  03
                </div>
                <div className="flex-1 w-full bg-white p-6 rounded-2xl shadow-xs border border-[#e3e2e6] hover:shadow-sm transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#005f29] font-semibold">
                      Operational Signal
                    </span>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">Ongoing — Engineering Culture</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#1b1b1f] font-semibold">
                    Engineering Team Leadership
                  </h3>
                  <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#464554] mt-1">
                    Mentored three junior developers through platform onboarding; authored org-wide microservice guidelines.
                  </p>

                  <div className="mt-4 pt-3 bg-[#f5f3f7] p-4 rounded-xl flex flex-col space-y-1 border border-[#e3e2e6]/50">
                    <div className="flex items-center gap-1.5 text-[#005f29] font-['JetBrains_Mono'] text-[11px]">
                      <span className="material-symbols-outlined text-[16px]">diversity_3</span>
                      <span className="font-semibold uppercase tracking-wide">SkillRadar Detected:</span>
                    </div>
                    <div className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#1b1b1f] font-semibold">
                      TECHNICAL LEADERSHIP & MENTORSHIP
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#464554]">
                      Critical capability for guiding engineering through internal AI adoption, architecture governance, and tooling standards.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['JetBrains_Mono'] text-[10px]">Technical RFCs</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['JetBrains_Mono'] text-[10px]">Onboarding Cohorts</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#e9e7ec] text-[#1b1b1f] font-['JetBrains_Mono'] text-[10px]">Cross-Team Standards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signals Matrix: Backend Baseline vs. AI Target */}
        <div className="w-full bg-[#f5f3f7] rounded-2xl p-6 mb-8 border border-[#e3e2e6]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-6">
            <div>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-widest text-[#777586] font-semibold">
                Comparative Synthesis
              </span>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl text-[#1b1b1f] font-semibold mt-0.5">
                Signals Matrix: Backend Baseline vs. AI Target
              </h3>
            </div>
            <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-[11px] px-3 py-1 rounded bg-white text-[#464554] shadow-xs border border-[#e3e2e6]/50">
              <span className="w-2 h-2 rounded-full bg-[#2a14b4]"></span>
              <span>Automated Vector Divergence Map</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Matching Signals */}
            <div className="flex flex-col p-4 rounded-xl bg-white shadow-xs space-y-3 border border-[#e3e2e6]/60">
              <div className="flex items-center justify-between pb-1 border-b border-[#e3e2e6]/50">
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#005f29] font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Matching Signals
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#005f29]">5 Confirmed</span>
              </div>
              <div className="flex flex-col space-y-1.5 font-['Plus_Jakarta_Sans'] text-[13px]">
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>Python Core & Typing</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">98% Fit</span>
                </div>
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>Distributed APIs (gRPC/REST)</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">95% Fit</span>
                </div>
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>SQL & Columnar Storage</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">92% Fit</span>
                </div>
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>Data Pipelines (Kafka/Flink)</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">90% Fit</span>
                </div>
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>Algorithmic Problem Solving</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">88% Fit</span>
                </div>
              </div>
            </div>

            {/* Transferable Signals */}
            <div className="flex flex-col p-4 rounded-xl bg-white shadow-xs space-y-3 border border-[#e3e2e6]/60">
              <div className="flex items-center justify-between pb-1 border-b border-[#e3e2e6]/50">
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#2a14b4] font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                  Transferable Signals
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#2a14b4]">3 Mapped</span>
              </div>
              <div className="flex flex-col space-y-1.5 font-['Plus_Jakarta_Sans'] text-[13px]">
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>Technical Leadership</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">High Velocity</span>
                </div>
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>UX Systems Alignment</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">Cross-Team</span>
                </div>
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>Developer Mentoring</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#777586]">High Value</span>
                </div>
              </div>
              <div className="mt-auto pt-2 text-[#464554] font-['Plus_Jakarta_Sans'] text-[12px]">
                Transfer efficiency rate evaluated at 1.4x standard ramp based on historical platform mobility cohorts.
              </div>
            </div>

            {/* Identified Delta Gaps */}
            <div className="flex flex-col p-4 rounded-xl bg-white shadow-xs space-y-3 border border-[#e3e2e6]/60">
              <div className="flex items-center justify-between pb-1 border-b border-[#e3e2e6]/50">
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#712ae2] font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">trip_origin</span>
                  Identified Delta Gaps
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#712ae2]">2 Modules</span>
              </div>
              <div className="flex flex-col space-y-1.5 font-['Plus_Jakarta_Sans'] text-[13px]">
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>Deep Learning (PyTorch/Transformers)</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#712ae2] font-medium">3 Wks Ramp</span>
                </div>
                <div className="p-2 rounded bg-[#f5f3f7] text-[#1b1b1f] flex items-center justify-between">
                  <span>Model Serving (Triton/vLLM)</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#712ae2] font-medium">3 Wks Ramp</span>
                </div>
              </div>
              <div className="mt-auto p-2 rounded-lg bg-[#e9e7ec] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#2a14b4]">schedule</span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#1b1b1f] font-medium">
                  Total Delta Estimated: 6 Weeks Full Proficiency
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Shelf & Transition CTA */}
        <div className="w-full bg-white rounded-2xl p-6 shadow-xs border border-[#e3e2e6] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2a14b4]/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#2a14b4] text-[24px]">move_up</span>
            </div>
            <div className="flex flex-col">
              <div className="font-['Plus_Jakarta_Sans'] text-lg text-[#1b1b1f] font-semibold">Ready for Guided Transition</div>
              <div className="font-['Plus_Jakarta_Sans'] text-[13px] text-[#464554]">
                Arjun’s internal mobility profile has been calibrated against open Q2 engineering reqs.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white text-[#1b1b1f] hover:bg-[#f5f3f7] font-['Plus_Jakarta_Sans'] text-[13px] font-semibold transition-colors shadow-xs border border-[#e3e2e6] cursor-pointer"
              type="button"
            >
              {planSimulated ? 'Blueprint Exported ✓' : 'Simulate 6-Week Upskill Plan'}
            </button>
            <button
              onClick={() => setDiscussionInitiated(true)}
              className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-[13px] font-['Plus_Jakarta_Sans'] font-semibold transition-all shadow-xs cursor-pointer ${
                discussionInitiated
                  ? 'bg-[#005f29] text-white'
                  : 'bg-[#4338ca] text-white hover:bg-[#2a14b4]'
              }`}
              type="button"
            >
              {discussionInitiated ? 'Discussion Initiated ✓' : 'Initiate Internal Mobility Discussion'}
            </button>
          </div>
        </div>

        {/* Simulation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-[#2f3034]/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white max-w-xl w-full rounded-2xl p-6 shadow-2xl border border-[#e3e2e6] flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2a14b4]">model_training</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-lg text-[#1b1b1f] font-semibold">
                    6-Week Upskill Plan
                  </span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#777586] hover:text-[#1b1b1f] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <p className="font-['Plus_Jakarta_Sans'] text-[14px] text-[#464554]">
                Simulated progression path for Arjun Kumar transitioning from Backend Staff to Applied AI Engineer.
              </p>

              <div className="flex flex-col space-y-2 font-['Plus_Jakarta_Sans'] text-[13px]">
                <div className="p-3 rounded-xl bg-[#f5f3f7] flex justify-between items-center border border-[#e3e2e6]/50">
                  <span>Weeks 1–2: Tensor Operations & PyTorch Foundations</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#005f29] font-semibold">Mapped (High)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f5f3f7] flex justify-between items-center border border-[#e3e2e6]/50">
                  <span>Weeks 3–4: Transformer Implementations & Fine-tuning</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#005f29] font-semibold">Assisted</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f5f3f7] flex justify-between items-center border border-[#e3e2e6]/50">
                  <span>Weeks 5–6: High-throughput Inference with vLLM & Triton</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#005f29] font-semibold">Native Match</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setPlanSimulated(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#2a14b4] text-white font-['Plus_Jakarta_Sans'] text-[13px] font-semibold hover:bg-[#4338ca] transition-colors cursor-pointer"
                  type="button"
                >
                  Export Upskill Blueprint
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
