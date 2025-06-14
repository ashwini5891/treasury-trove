from sqlalchemy import Engine
from sqlmodel import Session

from domain.db_utils import handle_db_operation
from domain.exceptions import (
    OrganisationAccessDeniedError,
    OrganisationNotFoundError,
)
from models.base import Organisation
from models.schemas import OrganisationSchema


class OrganisationService:
    def __init__(self, client: Engine):
        self.client = client

    @handle_db_operation
    def create_organisation(
        self, owner_id: str, organistaion: Organisation
    ) -> OrganisationSchema:
        with Session(self.client) as session:
            # Check if organization with same name exists for this owneer
            print(organistaion)
            to_create = organistaion.model_dump()
            to_create.update({"owner_id": owner_id})
            organisation_schema = OrganisationSchema.model_validate(to_create)
            session.add(organisation_schema)
            session.commit()
            session.refresh(organisation_schema)
            return organisation_schema

    @handle_db_operation
    def get_organisation(
        self, owner_id: str, organisation_id: str
    ) -> OrganisationSchema:
        with Session(self.client) as session:
            organisation = session.get(OrganisationSchema, organisation_id)
            if not organisation:
                raise OrganisationNotFoundError(organisation_id)
            if organisation.owner_id != owner_id:
                raise OrganisationAccessDeniedError(organisation_id, owner_id)
            return organisation

    @handle_db_operation
    def update_organisation(
        self, owner_id: str, organisation_id: str, organisation_data: Organisation
    ) -> OrganisationSchema:
        with Session(self.client) as session:
            organisation = session.get(OrganisationSchema, organisation_id)
            if not organisation:
                raise OrganisationNotFoundError(organisation_id)
            if organisation.owner_id != owner_id:
                raise OrganisationAccessDeniedError(organisation_id, owner_id)
            for key, value in organisation_data.model_dump().items():
                setattr(organisation, key, value)
            session.add(organisation)
            session.commit()
            session.refresh(organisation)
            return organisation

    @handle_db_operation
    def delete_organisation(self, owner_id: str, organisation_id: str) -> bool:
        with Session(self.client) as session:
            organisation = session.get(OrganisationSchema, organisation_id)
            if not organisation:
                raise OrganisationNotFoundError(organisation_id)
            if organisation.owner_id != owner_id:
                raise OrganisationAccessDeniedError(organisation_id, owner_id)
            session.delete(organisation)
            session.commit()
            return True
