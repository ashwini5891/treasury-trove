from collections.abc import Callable
from functools import wraps
from typing import TypeVar

from sqlalchemy.exc import SQLAlchemyError

from domain.exceptions import DBOperationError

T = TypeVar("T")
P = TypeVar("P")


def handle_db_operation(func: Callable[..., T]) -> Callable[..., T]:
    """
    A decorator to handle database operations and wrap SQLAlchemy errors
    into our custom DBOperationError. Supports both sync and async functions.

    Usage:
        @handle_db_operation
        def some_db_operation(self, ...):
            with Session(self.client) as session:
                # Your database operations here
                pass

        @handle_db_operation
        async def some_async_db_operation(self, ...):
            async with AsyncSession(self.client) as session:
                # Your async database operations here
                pass
    """

    @wraps(func)
    async def async_wrapper(*args: P, **kwargs: P) -> T:
        try:
            return await func(*args, **kwargs)
        except SQLAlchemyError as e:
            raise DBOperationError(f"Database operation failed: {e!s}") from e

    @wraps(func)
    def sync_wrapper(*args: P, **kwargs: P) -> T:
        try:
            return func(*args, **kwargs)  # type: ignore
        except SQLAlchemyError as e:
            raise DBOperationError(f"Database operation failed: {e!s}") from e

    # Check if the decorated function is a coroutine
    if hasattr(func, "__await__"):
        return async_wrapper
    return sync_wrapper
