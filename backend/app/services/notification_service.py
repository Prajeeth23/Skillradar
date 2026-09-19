from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.notification import Notification
from app.models.user import User, UserRole
from app.models.employee import Employee
from app.models.role import InternalRole


class NotificationService:
    @staticmethod
    def create_notification(
        db: Session,
        user_id: str,
        notif_type: str,
        title: str,
        message: str,
    ) -> Notification:
        notification = Notification(
            user_id=user_id,
            type=notif_type,
            title=title,
            message=message,
            is_read=False,
        )
        db.add(notification)
        db.commit()
        db.refresh(notification)
        return notification

    @staticmethod
    def notify_hr_hidden_skill_discovered(
        db: Session,
        employee: Employee,
        skill_names: List[str],
    ) -> None:
        """Send notifications to all HR users in the organization about discovered hidden skills."""
        hr_users = (
            db.query(User)
            .filter(
                User.organization_id == employee.user.organization_id,
                User.role.in_([UserRole.HR, UserRole.PLATFORM_ADMIN]),
                User.is_active == True,
            )
            .all()
        )
        skill_list_str = ", ".join(skill_names[:3])
        if len(skill_names) > 3:
            skill_list_str += f" (+{len(skill_names) - 3} more)"

        for hr in hr_users:
            NotificationService.create_notification(
                db=db,
                user_id=hr.id,
                notif_type="HIDDEN_SKILL",
                title=f"New Hidden Skills Detected: {employee.user.name}",
                message=f"The Divergence Engine discovered hidden capabilities ({skill_list_str}) beyond their official title '{employee.current_job_title}'.",
            )

    @staticmethod
    def notify_role_match(
        db: Session,
        employee: Employee,
        role: InternalRole,
        match_score: float,
    ) -> None:
        """Notify both the employee and HR when a strong role match (>70%) is identified."""
        # 1. Notify Employee
        NotificationService.create_notification(
            db=db,
            user_id=employee.user_id,
            notif_type="ROLE_MATCH",
            title=f"Opportunity Match: {role.title}",
            message=f"You are a strong {match_score:.1f}% match for the open internal role '{role.title}' ({role.department}).",
        )

        # 2. Notify HR if score is high (>= 80%)
        if match_score >= 80.0:
            hr_users = (
                db.query(User)
                .filter(
                    User.organization_id == role.organization_id,
                    User.role.in_([UserRole.HR]),
                    User.is_active == True,
                )
                .all()
            )
            for hr in hr_users:
                NotificationService.create_notification(
                    db=db,
                    user_id=hr.id,
                    notif_type="TALENT_ALERT",
                    title=f"Talent Alert: Strong Match for {role.title}",
                    message=f"{employee.user.name} ({employee.current_job_title}) matched {match_score:.1f}% for '{role.title}'.",
                )

    @staticmethod
    def get_user_notifications(
        db: Session,
        user_id: str,
        unread_only: bool = False,
        limit: int = 50,
    ) -> List[Notification]:
        query = db.query(Notification).filter(Notification.user_id == user_id)
        if unread_only:
            query = query.filter(Notification.is_read == False)
        return query.order_by(Notification.created_at.desc()).limit(limit).all()

    @staticmethod
    def mark_as_read(db: Session, notification_id: str, user_id: str) -> Optional[Notification]:
        notif = (
            db.query(Notification)
            .filter(Notification.id == notification_id, Notification.user_id == user_id)
            .first()
        )
        if notif:
            notif.is_read = True
            db.commit()
            db.refresh(notif)
        return notif

    @staticmethod
    def mark_all_as_read(db: Session, user_id: str) -> int:
        count = (
            db.query(Notification)
            .filter(Notification.user_id == user_id, Notification.is_read == False)
            .update({Notification.is_read: True})
        )
        db.commit()
        return count


notification_service = NotificationService()
