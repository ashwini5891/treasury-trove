from sqlalchemy import Engine
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession
from sqlmodel import Session

from domain.db_utils import handle_db_operation
from domain.exceptions import (
    OrganisationAccessDeniedError,
    OrganisationNotFoundError,
)
from models.base import Organisation
from models.schemas import OrganisationSchema


class OrganisationService:
    def __init__(self, client: Engine | AsyncEngine | Session | AsyncSession):
        self.client = client
        self.is_async = isinstance(client, AsyncEngine | AsyncSession)

    @handle_db_operation
    async def create_organisation(
        self, owner_id: str, organisation: Organisation
    ) -> OrganisationSchema:
        if self.is_async:
            async with AsyncSession(self.client) as session:
                to_create = organisation.model_dump()
                to_create.update({"owner_id": owner_id})
                organisation_schema = OrganisationSchema.model_validate(to_create)
                session.add(organisation_schema)
                await session.commit()
                await session.refresh(organisation_schema)
                return organisation_schema
        else:
            with Session(self.client) as session:
                to_create = organisation.model_dump()
                to_create.update({"owner_id": owner_id})
                organisation_schema = OrganisationSchema.model_validate(to_create)
                session.add(organisation_schema)
                session.commit()
                session.refresh(organisation_schema)
                return organisation_schema

    @handle_db_operation
    async def get_organisation(
        self, owner_id: str, organisation_id: str
    ) -> OrganisationSchema:
        if self.is_async:
            async with AsyncSession(self.client) as session:
                organisation = await session.get(OrganisationSchema, organisation_id)
                if not organisation:
                    raise OrganisationNotFoundError(organisation_id)
                if organisation.owner_id != owner_id:
                    raise OrganisationAccessDeniedError(organisation_id, owner_id)
                return organisation
        else:
            with Session(self.client) as session:
                organisation = session.get(OrganisationSchema, organisation_id)
                if not organisation:
                    raise OrganisationNotFoundError(organisation_id)
                if organisation.owner_id != owner_id:
                    raise OrganisationAccessDeniedError(organisation_id, owner_id)
                return organisation

    @handle_db_operation
    async def update_organisation(
        self, owner_id: str, organisation_id: str, organisation_data: Organisation
    ) -> OrganisationSchema:
        if self.is_async:
            async with AsyncSession(self.client) as session:
                organisation = await session.get(OrganisationSchema, organisation_id)
                if not organisation:
                    raise OrganisationNotFoundError(organisation_id)
                if organisation.owner_id != owner_id:
                    raise OrganisationAccessDeniedError(organisation_id, owner_id)
                for key, value in organisation_data.model_dump().items():
                    setattr(organisation, key, value)
                session.add(organisation)
                await session.commit()
                await session.refresh(organisation)
                return organisation
        else:
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
    async def delete_organisation(self, owner_id: str, organisation_id: str) -> bool:
        if self.is_async:
            async with AsyncSession(self.client) as session:
                organisation = await session.get(OrganisationSchema, organisation_id)
                if not organisation:
                    raise OrganisationNotFoundError(organisation_id)
                if organisation.owner_id != owner_id:
                    raise OrganisationAccessDeniedError(organisation_id, owner_id)
                await session.delete(organisation)
                await session.commit()
                return True
        else:
            with Session(self.client) as session:
                organisation = session.get(OrganisationSchema, organisation_id)
                if not organisation:
                    raise OrganisationNotFoundError(organisation_id)
                if organisation.owner_id != owner_id:
                    raise OrganisationAccessDeniedError(organisation_id, owner_id)
                session.delete(organisation)
                session.commit()
                return True
