import { apiClient } from './client';
import { LearningRecommendation } from '../types/career';

export interface CareerChatApiResponse {
  response: string;
  suggested_actions: string[];
}

export async function chatCareerAssistantApi(message: string): Promise<CareerChatApiResponse> {
  try {
    const response = await apiClient.post<CareerChatApiResponse>('/career/chat', { message });
    return response.data;
  } catch (err) {
    console.warn('Backend unavailable, generating intelligent mock career assistant reply');
    const msgLower = message.toLowerCase();

    if (msgLower.includes('hidden') || msgLower.includes('discover')) {
      return {
        response:
          'SkillRadar’s Divergence Engine has uncovered high-confidence hidden capabilities in **UX Collaboration** (88%), **Technical Mentorship** (89%), and **Production Incident Triage** (91%) from your payment gateway and checkout redesign work.\n\nThese transferable strengths position you far beyond a conventional Backend Developer!',
        suggested_actions: [
          'View Product Engineer (Fintech) match breakdown',
          'Explore Engineering Leadership path',
          'Export evidence dossier',
        ],
      };
    }

    if (msgLower.includes('role') || msgLower.includes('fit') || msgLower.includes('opportunity')) {
      return {
        response:
          'Based on your verified skills, your highest alignment is with **Product Engineer (Fintech)** (86.5% match). Your demonstrated UX empathy on the checkout project fills the gap typically seen with backend applicants.',
        suggested_actions: [
          'Run Skill Gap Analysis for Product Engineer',
          'View open opportunities',
        ],
      };
    }

    if (msgLower.includes('gap') || msgLower.includes('learn') || msgLower.includes('missing')) {
      return {
        response:
          'For the **Product Engineer (Fintech)** position, your main growth opportunity is **React Component Architecture** (level 1 → 4). Bridging this with a hands-on project will elevate your match score to >95%.',
        suggested_actions: [
          'Enroll in Recommended React Workshop',
          'Schedule pair programming session',
        ],
      };
    }

    return {
      response:
        'Hello Marcus! As a Backend Developer with proven hidden talents in UX Collaboration and Team Mentorship, I can help you evaluate internal mobility, diagnose skill gaps, or map a transition toward Product Engineering.',
      suggested_actions: [
        'What roles fit my skills?',
        'What hidden skills were discovered?',
        'What should I learn next?',
      ],
    };
  }
}

export async function getLearningRecommendationsApi(): Promise<LearningRecommendation[]> {
  try {
    const response = await apiClient.get<LearningRecommendation[]>('/career/recommendations');
    return response.data;
  } catch (err) {
    return [
      {
        id: 'rec-1',
        employee_id: 'emp-1001',
        title: 'Modern React Component Systems & Design Tokens',
        description: 'Hands-on internal curriculum focused on accessible frontend component states.',
        resource_type: 'COURSE',
        priority: 'HIGH',
      },
      {
        id: 'rec-2',
        employee_id: 'emp-1001',
        title: 'Checkout Webhook UI Pair Programming',
        description: 'Pair with senior frontend engineer on live client-side checkout state.',
        resource_type: 'PROJECT',
        priority: 'HIGH',
      },
    ];
  }
}
