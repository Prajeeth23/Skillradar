import { Notification } from '../types/notification';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-01',
    user_id: 'usr-hr-01',
    type: 'HIDDEN_SKILL',
    title: 'New Hidden Skill: Marcus Vance',
    message: 'Divergence Engine detected high-confidence capabilities in UX Collaboration and Technical Mentorship beyond official Backend Developer title.',
    is_read: false,
    created_at: '2026-02-18T14:35:00Z',
  },
  {
    id: 'notif-02',
    user_id: 'usr-hr-01',
    type: 'TALENT_ALERT',
    title: 'Strong Match for Product Engineer',
    message: 'Marcus Vance matched 86.5% for Product Engineer (Fintech), bridging API systems with UX empathy.',
    is_read: false,
    created_at: '2026-02-18T14:36:00Z',
  },
  {
    id: 'notif-03',
    user_id: 'usr-emp-01',
    type: 'ROLE_MATCH',
    title: 'New Opportunity Match: Product Engineer',
    message: 'Your project achievements align 86.5% with the open Product Engineer (Fintech) position.',
    is_read: false,
    created_at: '2026-02-18T14:36:00Z',
  },
  {
    id: 'notif-04',
    user_id: 'usr-emp-01',
    type: 'SKILL_GAP',
    title: 'Target Role Priority Growth Area',
    message: 'To strengthen your fit for Fintech Product Engineer, consider frontend component state workshops.',
    is_read: true,
    created_at: '2026-02-17T09:00:00Z',
  },
];
