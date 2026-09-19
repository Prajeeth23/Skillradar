from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class NotificationRead(BaseModel):
    id: str
    user_id: str
    type: str  # TALENT_ALERT, HIDDEN_SKILL, ROLE_MATCH, SKILL_GAP
    title: str
    message: str
    is_read: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class NotificationStatusUpdate(BaseModel):
    is_read: bool = True


class NotificationSummary(BaseModel):
    unread_count: int
