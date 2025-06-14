from models.base import Organisation


class OrganisationCreate(Organisation):
    pass


class OrganisationResponse(Organisation):
    id: str
