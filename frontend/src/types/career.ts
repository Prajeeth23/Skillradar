export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggested_actions?: string[];
}

export interface LearningRecommendation {
  id: string;
  employee_id: string;
  skill_gap_id?: string | null;
  title: string;
  description: string;
  resource_type: string;
  priority: string;
}
