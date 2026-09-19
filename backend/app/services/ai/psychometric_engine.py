"""Psychometric Assessment Engine.

Provides deterministic scoring and AI-generated trait summarization across 4 core
behavioral dimensions: Leadership, Adaptability, Analytical Thinking, Collaboration.
"""

import logging
from typing import List, Dict, Any, Optional
from app.models.psychometric_assessment import TraitType
from app.schemas.psychometric import AssessmentQuestionOut, AssessmentQuestionOption
from app.services.ai.groq_service import groq_service

logger = logging.getLogger("skillradar.psychometrics")

# Fixed 6-question gamified situational mission assessment mapping to 4 core traits
HARDCODED_QUESTIONS: List[Dict[str, Any]] = [
    {
        "id": 1,
        "title": "Mission 1: Ambiguous High-Stakes Deadline",
        "domain": "Domain 1 • Execution & Problem Solving",
        "xp_reward": 120,
        "question": "When facing a high-stakes project deadline with ambiguous requirements, what is your immediate first step?",
        "options": [
            {
                "id": "q1_lead",
                "text": "Step up to establish project priorities, clarify core objectives, and assign clear ownership.",
                "subtext": "Strategic Prioritization, Direction, Accountability",
                "tag": "Leadership",
                "trait": TraitType.LEADERSHIP.value,
            },
            {
                "id": "q1_adapt",
                "text": "Pivot quickly, experiment with agile iterations, and embrace changing constraints as they arise.",
                "subtext": "Cognitive Agility, Agile Iteration, Rapid Learning",
                "tag": "Adaptability",
                "trait": TraitType.ADAPTABILITY.value,
            },
            {
                "id": "q1_analyt",
                "text": "Break down the core problem into structured sub-tasks and analyze historical telemetry to find bottlenecks.",
                "subtext": "Root-Cause Analysis, Metrics, Systematic Deconstruction",
                "tag": "Analytical",
                "trait": TraitType.ANALYTICAL_THINKING.value,
            },
            {
                "id": "q1_collab",
                "text": "Organize an alignment session with cross-functional peers to gather perspectives and decide collectively.",
                "subtext": "Consensus Building, Cross-Functional Empathy, Team Synergy",
                "tag": "Collaboration",
                "trait": TraitType.COLLABORATION.value,
            },
        ],
    },
    {
        "id": 2,
        "title": "Mission 2: Cross-Functional Strategy Conflict",
        "domain": "Domain 2 • Teamwork & Conflict Resolution",
        "xp_reward": 110,
        "question": "In a team meeting where two senior colleagues strongly disagree on technical strategy, how do you respond?",
        "options": [
            {
                "id": "q2_collab",
                "text": "Facilitate common ground, listen actively to both viewpoints, and foster genuine team consensus.",
                "subtext": "Active Listening, Bridge-Building, Mutual Trust",
                "tag": "Collaboration",
                "trait": TraitType.COLLABORATION.value,
            },
            {
                "id": "q2_analyt",
                "text": "Construct an objective comparison matrix evaluating trade-offs, performance benchmarks, and risk vectors.",
                "subtext": "Decision Matrix, Benchmark Comparison, Objective Logic",
                "tag": "Analytical",
                "trait": TraitType.ANALYTICAL_THINKING.value,
            },
            {
                "id": "q2_lead",
                "text": "Take accountability to propose a decisive path forward and guide the team decisively toward execution.",
                "subtext": "Decisive Guidance, Ownership, Execution Driver",
                "tag": "Leadership",
                "trait": TraitType.LEADERSHIP.value,
            },
            {
                "id": "q2_adapt",
                "text": "Suggest testing dual lightweight prototypes to adjust course based on early empirical results.",
                "subtext": "Empirical Prototyping, Hypothesis Testing, Flexibility",
                "tag": "Adaptability",
                "trait": TraitType.ADAPTABILITY.value,
            },
        ],
    },
    {
        "id": 3,
        "title": "Mission 3: Sudden Strategic Reorganization",
        "domain": "Domain 3 • Resilience & Change Management",
        "xp_reward": 130,
        "question": "A major unexpected shift in company priorities requires discarding weeks of work. What is your reaction?",
        "options": [
            {
                "id": "q3_adapt",
                "text": "Re-energize swiftly, discard obsolete assumptions, and welcome the opportunity to tackle new domain needs.",
                "subtext": "Resilience, Unlearning Obsolete Paradigms, Positive Reframe",
                "tag": "Adaptability",
                "trait": TraitType.ADAPTABILITY.value,
            },
            {
                "id": "q3_lead",
                "text": "Rally team morale, articulate the strategic business context, and steer focus toward the new goal.",
                "subtext": "Inspirational Alignment, Communication, Vision Stewardship",
                "tag": "Leadership",
                "trait": TraitType.LEADERSHIP.value,
            },
            {
                "id": "q3_collab",
                "text": "Check in on teammates, balance shared workloads, and ensure everyone feels supported through the pivot.",
                "subtext": "Peer Empathy, Shared Workload, Team Solidarity",
                "tag": "Collaboration",
                "trait": TraitType.COLLABORATION.value,
            },
            {
                "id": "q3_analyt",
                "text": "Analyze which components of the discarded work can be salvaged, refactored, or modularized for future utility.",
                "subtext": "Asset Optimization, Code Modularization, Efficiency Audit",
                "tag": "Analytical",
                "trait": TraitType.ANALYTICAL_THINKING.value,
            },
        ],
    },
    {
        "id": 4,
        "title": "Mission 4: System Performance Turnaround",
        "domain": "Domain 4 • Architecture & Optimization",
        "xp_reward": 120,
        "question": "When tasked with optimizing an underperforming system or process, how do you begin?",
        "options": [
            {
                "id": "q4_analyt",
                "text": "Deep-dive into telemetry, logs, and benchmark distributions to identify the statistical root cause.",
                "subtext": "Data Telemetry, Statistical Modeling, Empirical Investigation",
                "tag": "Analytical",
                "trait": TraitType.ANALYTICAL_THINKING.value,
            },
            {
                "id": "q4_lead",
                "text": "Define a high-performance vision, set turnaround milestones, and inspire stakeholder commitment.",
                "subtext": "Performance Vision, Milestone Governance, Stakeholder Trust",
                "tag": "Leadership",
                "trait": TraitType.LEADERSHIP.value,
            },
            {
                "id": "q4_collab",
                "text": "Interview operators and stakeholders who interact with the system daily to understand human bottlenecks.",
                "subtext": "Qualitative Inquiry, User-Centric Feedback, Human Workflows",
                "tag": "Collaboration",
                "trait": TraitType.COLLABORATION.value,
            },
            {
                "id": "q4_adapt",
                "text": "Implement rapid, iterative micro-experiments to gauge immediate responsiveness and adjust on the fly.",
                "subtext": "Chaos Testing, Rapid Prototyping, Live Experimentation",
                "tag": "Adaptability",
                "trait": TraitType.ADAPTABILITY.value,
            },
        ],
    },
    {
        "id": 5,
        "title": "Mission 5: Hackathon Innovation Sprint",
        "domain": "Domain 5 • Initiative & Entrepreneurial Drive",
        "xp_reward": 150,
        "question": "What role do you naturally gravitate toward in an unguided cross-functional hackathon or initiative?",
        "options": [
            {
                "id": "q5_lead",
                "text": "The driver who frames the vision, coordinates the roadmap, and keeps the team aligned on delivery.",
                "subtext": "Product Champion, Roadmap Coordination, Delivery Velocity",
                "tag": "Leadership",
                "trait": TraitType.LEADERSHIP.value,
            },
            {
                "id": "q5_collab",
                "text": "The bridge-builder who connects diverse teammates, ensures smooth communication, and fosters synergy.",
                "subtext": "Synergy Weaver, Cross-Disciplinary Harmony, Team Cohesion",
                "tag": "Collaboration",
                "trait": TraitType.COLLABORATION.value,
            },
            {
                "id": "q5_adapt",
                "text": "The versatile generalist who plugs emerging skill gaps and adapts smoothly to unexpected hurdles.",
                "subtext": "Generalist Swiss-Army Knife, Gap Filler, High Agility",
                "tag": "Adaptability",
                "trait": TraitType.ADAPTABILITY.value,
            },
            {
                "id": "q5_analyt",
                "text": "The architect who ensures logical consistency, algorithmic rigor, and robust data integrity.",
                "subtext": "System Architecture, Algorithmic Rigor, Data Integrity",
                "tag": "Analytical",
                "trait": TraitType.ANALYTICAL_THINKING.value,
            },
        ],
    },
    {
        "id": 6,
        "title": "Mission 6: Defining Engineering & Product Success",
        "domain": "Domain 6 • Value Alignment & Impact",
        "xp_reward": 140,
        "question": "How do you evaluate whether a completed project was a true success?",
        "options": [
            {
                "id": "q6_collab",
                "text": "By team cohesion, shared pride in ownership, and positive cross-department stakeholder feedback.",
                "subtext": "Shared Pride, Stakeholder Happiness, Organizational Goodwill",
                "tag": "Collaboration",
                "trait": TraitType.COLLABORATION.value,
            },
            {
                "id": "q6_analyt",
                "text": "By quantitative KPIs, reduced defect rates, and measurable operational efficiency metrics.",
                "subtext": "Quantitative KPIs, SLO/SLA Reliability, Defect Deprecation",
                "tag": "Analytical",
                "trait": TraitType.ANALYTICAL_THINKING.value,
            },
            {
                "id": "q6_lead",
                "text": "By organizational strategic impact, milestone attainment, and team member professional growth.",
                "subtext": "Strategic Impact, Mentorship Milestones, Enterprise ROI",
                "tag": "Leadership",
                "trait": TraitType.LEADERSHIP.value,
            },
            {
                "id": "q6_adapt",
                "text": "By how resiliently the solution adapts to future unpredictable changes and evolving user demands.",
                "subtext": "Future-Proof Architecture, Evolutionary Resilience, Extensibility",
                "tag": "Adaptability",
                "trait": TraitType.ADAPTABILITY.value,
            },
        ],
    },
]

# Lookup map from option_id -> trait string
OPTION_TRAIT_MAP: Dict[str, str] = {}
for q in HARDCODED_QUESTIONS:
    for opt in q["options"]:
        OPTION_TRAIT_MAP[opt["id"]] = opt["trait"]


class PsychometricEngine:
    @staticmethod
    def get_public_questions() -> List[AssessmentQuestionOut]:
        """Return the fixed question set stripped of trait metadata for client display."""
        public_questions = []
        for q in HARDCODED_QUESTIONS:
            options = [
                AssessmentQuestionOption(
                    id=opt["id"],
                    text=opt["text"],
                    subtext=opt.get("subtext"),
                    tag=opt.get("tag"),
                )
                for opt in q["options"]
            ]
            public_questions.append(
                AssessmentQuestionOut(
                    id=q["id"],
                    title=q.get("title"),
                    domain=q.get("domain"),
                    xp_reward=q.get("xp_reward", 100),
                    question=q["question"],
                    options=options,
                )
            )
        return public_questions

    @staticmethod
    def score_assessment(answers: List[str]) -> Dict[str, float]:
        """Tally answers per trait and normalize to 0-100 scale."""
        tallies = {
            TraitType.LEADERSHIP.value: 0,
            TraitType.ADAPTABILITY.value: 0,
            TraitType.ANALYTICAL_THINKING.value: 0,
            TraitType.COLLABORATION.value: 0,
        }

        for ans in answers:
            trait = OPTION_TRAIT_MAP.get(ans)
            if trait and trait in tallies:
                tallies[trait] += 1

        total_questions = len(HARDCODED_QUESTIONS)
        scores: Dict[str, float] = {}

        for trait, count in tallies.items():
            if total_questions > 0:
                normalized = round((count / float(total_questions)) * 100.0, 1)
            else:
                normalized = 0.0
            scores[trait] = normalized

        return scores

    @staticmethod
    def generate_trait_summary(scores: Dict[str, float]) -> str:
        """Generate a concise 1-2 sentence executive summary using Groq or heuristic fallback."""
        scores_desc = ", ".join(f"{trait.replace('_', ' ').title()}: {score}%" for trait, score in scores.items())

        # Attempt Groq LLM generation
        if groq_service.is_available():
            system_prompt = (
                "You are an executive talent psychologist for SkillRadar. "
                "Synthesize the employee's 4 psychometric trait scores into a compelling 1-2 sentence behavioral summary. "
                "Highlight their top cognitive strengths and collaboration dynamic. Keep it professional, constructive, and concise."
            )
            user_message = f"Psychometric trait scores:\n{scores_desc}"

            summary = groq_service.execute_chat_completion(
                system_prompt=system_prompt,
                user_message=user_message,
                temperature=0.3,
            )
            if summary and len(summary.strip()) > 15:
                return summary.strip()

        # Deterministic Heuristic Fallback
        sorted_traits = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        top_trait, top_score = sorted_traits[0]
        second_trait, second_score = sorted_traits[1]

        trait_descriptors = {
            TraitType.LEADERSHIP.value: "strong initiative, decisive strategic guidance, and team alignment",
            TraitType.ADAPTABILITY.value: "exceptional cognitive agility and resilience in fast-changing environments",
            TraitType.ANALYTICAL_THINKING.value: "rigorous root-cause analysis, data orientation, and structured problem-solving",
            TraitType.COLLABORATION.value: "empathetic stakeholder bridge-building, cross-functional synergy, and consensus creation",
        }

        desc1 = trait_descriptors.get(top_trait, "solid workplace strengths")
        desc2 = trait_descriptors.get(second_trait, "effective execution capabilities")

        return (
            f"Exhibits {desc1}, strongly reinforced by {desc2}. "
            f"Demonstrates high potential for complex, cross-functional initiatives."
        )


psychometric_engine = PsychometricEngine()
