export interface Notification {
  id: string;
  user_id: string;
  type: 'TALENT_ALERT' | 'HIDDEN_SKILL' | 'ROLE_MATCH' | 'SKILL_GAP';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
