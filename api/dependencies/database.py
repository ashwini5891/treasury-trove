from collections.abc import AsyncGenerator, Generator

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session

from repositories.client_postgres import ClientPostgres
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
    db = ClientPostgres()
    async_session_maker = db.client()
    async with async_session_maker() as session:
        yield session
