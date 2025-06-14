from sqlalchemy import Engine
from sqlmodel import Session

from models.base import Organisation
from models.schemas import OrganisationSchema


class OrganisationService:
    def __init__(self, client: Engine):
        self.client = client

    def create_organisation(self, organistaion: Organisation) -> OrganisationSchema:
        with Session(self.client) as session:
            organisation_schema = OrganisationSchema.model_validate(organistaion)
            session.add(organisation_schema)
            session.commit()
            session.refresh(organisation_schema)
            return organisation_schema

    def get_organisation(self, organisation_id: str) -> OrganisationSchema:
        with Session(self.client) as session:
            organisation = session.get(OrganisationSchema, organisation_id)
            if not organisation:
                return None
            return organisation

    def update_organisation(
        self, organisation_id: str, organisation_data: Organisation
    ) -> OrganisationSchema:
        with Session(self.client) as session:
            organisation = session.get(OrganisationSchema, organisation_id)
            if not organisation:
                return None
            for key, value in organisation_data.model_dump().items():
                setattr(organisation, key, value)
            session.add(organisation)
            session.commit()
            session.refresh(organisation)
            return organisation

    def delete_organisation(self, organisation_id: str) -> bool:
        with Session(self.client) as session:
            organisation = session.get(OrganisationSchema, organisation_id)
            if not organisation:
                return False
            session.delete(organisation)
            session.commit()
            return True
