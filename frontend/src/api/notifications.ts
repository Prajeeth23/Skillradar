import { apiClient } from './client';
import { Notification } from '../types/notification';
import { MOCK_NOTIFICATIONS } from '../mock/notifications';

export async function getNotificationsApi(unreadOnly: boolean = false): Promise<Notification[]> {
  try {
    const response = await apiClient.get<Notification[]>('/notifications', {
      params: { unread_only: unreadOnly },
    });
    return response.data;
  } catch (err) {
    if (unreadOnly) return MOCK_NOTIFICATIONS.filter((n) => !n.is_read);
    return MOCK_NOTIFICATIONS;
  }
}

export async function markNotificationReadApi(id: string): Promise<void> {
  try {
    await apiClient.patch(`/notifications/${id}/read`);
  } catch (err) {
    const target = MOCK_NOTIFICATIONS.find((n) => n.id === id);
    if (target) target.is_read = true;
  }
}

export async function markAllNotificationsReadApi(): Promise<void> {
  try {
    await apiClient.post('/notifications/mark-all-read');
  } catch (err) {
    MOCK_NOTIFICATIONS.forEach((n) => (n.is_read = true));
  }
}
