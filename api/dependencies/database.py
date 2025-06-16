from collections.abc import AsyncGenerator, Generator

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

from repositories.client_sqllite import ClientSqlLite


def get_db() -> Generator[Session, None, None]:
    """Synchronous database session for SQLite"""
    db = ClientSqlLite().client()
    try:
        yield db
    finally:
        # db.close() - SQLite doesn't require explicit closing
        pass


async def get_async_db() -> AsyncGenerator[AsyncSession, None]:
    """Asynchronous database session for PostgreSQL"""
    # This will be implemented when switching to PostgreSQL
    # For now it raises an error if someone tries to use it with SQLite
    raise NotImplementedError("Async database operations are not supported with SQLite")
    # Example implementation for PostgreSQL:
    # async with async_session_maker() as session:
    #     yield session
