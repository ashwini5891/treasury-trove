class DBOperationError(Exception):
    """Base class for database operation exceptions."""

    pass


class OrganisationNotFoundError(DBOperationError):
    """Exception raised when an organisation is not found in the database."""

    def __init__(self, organisation_id: str):
        self.organisation_id = organisation_id
        super().__init__(f"Organisation with ID {organisation_id} not found.")


class OrganisationAccessDeniedError(DBOperationError):
    """Exception raised when access to an organisation is denied."""

    def __init__(self, organisation_id: str, user_id: str):
        self.organisation_id = organisation_id
        self.user_id = user_id
        super().__init__(
            f"User {user_id} does not have access to organisation {organisation_id}."
        )
