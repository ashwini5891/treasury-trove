from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from dependencies.database import get_db
from domain.organisation import OrganisationService
from models.base import Organisation
from models.public import OrganisationCreate, OrganisationResponse

# Define dependency at module level
db_dependency = Depends(get_db)

router = APIRouter(
    prefix="/organisations",
    tags=["organisations"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=OrganisationResponse)
def create_organisation(
    organisation: OrganisationCreate,
    db: Session = db_dependency,
) -> OrganisationResponse:
    service = OrganisationService(db)
    new_organisation = service.create_organisation(
        Organisation.model_validate(organisation)
    )
    return new_organisation


@router.get("/{organisation_id}", response_model=OrganisationResponse)
def get_organisation(
    organisation_id: str,
    db: Session = db_dependency,
) -> OrganisationResponse:
    service = OrganisationService(db)
    organisation = service.get_organisation(organisation_id)
    if not organisation:
        raise HTTPException(status_code=404, detail="Organisation not found")
    return organisation


@router.put("/{organisation_id}", response_model=OrganisationResponse)
def update_organisation(
    organisation_id: str,
    organisation: OrganisationCreate,
    db: Session = db_dependency,
) -> OrganisationResponse:
    service = OrganisationService(db)
    updated_organisation = service.update_organisation(
        organisation_id, Organisation.model_validate(organisation)
    )
    if not updated_organisation:
        raise HTTPException(status_code=404, detail="Organisation not found")
    return updated_organisation


@router.delete("/{organisation_id}")
def delete_organisation(
    organisation_id: str,
    db: Session = db_dependency,
) -> dict[str, str]:
    service = OrganisationService(db)
    success = service.delete_organisation(organisation_id)
    if not success:
        raise HTTPException(status_code=404, detail="Organisation not found")
    return {"message": "Organisation deleted successfully"}
