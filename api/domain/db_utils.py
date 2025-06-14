from collections.abc import Callable
from functools import wraps
from typing import Any

from sqlalchemy.exc import SQLAlchemyError

from domain.exceptions import DBOperationError


def handle_db_operation(func: Callable[..., Any]) -> Callable[..., Any]:
    """
    A decorator to handle database operations and wrap SQLAlchemy errors
    into our custom DBOperationError.

    Usage:
        @handle_db_operation
        def some_db_operation(self, ...):
            with Session(self.client) as session:
                # Your database operations here
                pass
    """

    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:  # noqa: ANN401
        try:
            return func(*args, **kwargs)
        except SQLAlchemyError as e:
            raise DBOperationError(f"Database operation failed: {e!s}") from e

    return wrapper
