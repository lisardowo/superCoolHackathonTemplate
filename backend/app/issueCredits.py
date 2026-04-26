
from pydantic import BaseModel

class CalcCreditsRequest(BaseModel):
	user_id: str
	report_type: str
	severity: int = 1
	validated: bool = False

def calc_credits(payload: CalcCreditsRequest) -> dict:
	base = 5
	severity_bonus = max(payload.severity - 1, 0) * 3
	validation_bonus = 10 if payload.validated else 0
	total = base + severity_bonus + validation_bonus
	return {
		"user_id": payload.user_id,
		"report_type": payload.report_type,
		"credits": total,
		"breakdown": {
			"base": base,
			"severity_bonus": severity_bonus,
			"validation_bonus": validation_bonus,
		},
	}
