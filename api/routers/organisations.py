from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from dependencies.auth import get_current_user
from dependencies.database import get_db
from domain.exceptions import (
    OrganisationAccessDeniedError,
    OrganisationNotFoundError,
)
from domain.organisation import OrganisationService
from models.base import Organisation
from models.public import OrganisationCreate, OrganisationResponse

# Define dependencies at module level
db_dependency = Depends(get_db)
current_user_dependency = Annotated[dict, Depends(get_current_user)]

router = APIRouter(
    prefix="/organisations",
    tags=["organisations"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=OrganisationResponse)
def create_organisation(
    current_user: current_user_dependency,
    organisation: OrganisationCreate,
    db: Session = db_dependency,
) -> OrganisationResponse:
    service = OrganisationService(db)
    # Add the current user's ID as the owner
    organisation_data = Organisation.model_validate(organisation)
    owner_id = current_user["id"]

    new_organisation = service.create_organisation(owner_id, organisation_data)

    return new_organisation


@router.get("/{organisation_id}", response_model=OrganisationResponse)
def get_organisation(
    current_user: current_user_dependency,
    organisation_id: str,
    db: Session = db_dependency,
) -> OrganisationResponse:
    service = OrganisationService(db)
    owner_id = current_user["id"]
    try:
        organisation = service.get_organisation(owner_id, organisation_id)
    except OrganisationNotFoundError as _e:
        raise HTTPException(status_code=404, detail="Organisation not found") from _e
    except OrganisationAccessDeniedError as _e:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to access this organisation",
        ) from _e

    return organisation


@router.put("/{organisation_id}", response_model=OrganisationResponse)
def update_organisation(
    current_user: current_user_dependency,
    organisation_id: str,
    organisation: OrganisationCreate,
    db: Session = db_dependency,
) -> OrganisationResponse:
    service = OrganisationService(db)
    owner_id = current_user["id"]
    # Update the organisation
    organisation_data = Organisation.model_validate(organisation)
    try:
        updated_organisation = service.update_organisation(
            owner_id, organisation_id, organisation_data
        )
    except OrganisationNotFoundError as _e:
        raise HTTPException(status_code=404, detail="Organisation not found") from _e
    except OrganisationAccessDeniedError as _e:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to update this organisation",
        ) from _e

    return updated_organisation


@router.delete("/{organisation_id}")
def delete_organisation(
    current_user: current_user_dependency,
    organisation_id: str,
    db: Session = db_dependency,
) -> dict[str, str]:
    service = OrganisationService(db)
    owner_id = current_user["id"]

    try:
        if not service.delete_organisation(owner_id, organisation_id):
            raise HTTPException(status_code=500, detail="Failed to delete organisation")
    except OrganisationNotFoundError as _e:
        raise HTTPException(status_code=404, detail="Organisation not found") from _e
    except OrganisationAccessDeniedError as _e:
        raise HTTPException(
            status_code=403,
            detail="You don't have permission to delete this organisation",
        ) from _e

    return {"message": "Organisation deleted successfully"}
