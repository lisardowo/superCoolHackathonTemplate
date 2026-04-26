from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter
from pydantic import BaseModel

class GenericReportRequest(BaseModel):
	user_id: str
	category: str
	description: str
	lat: float
	lng: float


class ValidateReportRequest(BaseModel):
	report_id: str
	validator_user_id: str
	is_valid: bool

def create_generic_report(payload: GenericReportRequest) -> dict:
	return {
		"report_id": f"rep-{uuid4().hex[:8]}",
		"status": "created",
		"user_id": payload.user_id,
		"category": payload.category,
		"location": {"lat": payload.lat, "lng": payload.lng},
		"created_at": datetime.now(timezone.utc).isoformat(),
	}

def validate_report(payload: ValidateReportRequest) -> dict:
	return {
		"report_id": payload.report_id,
		"validated_by": payload.validator_user_id,
		"is_valid": payload.is_valid,
		"xp_delta": 5 if payload.is_valid else 0,
	}
