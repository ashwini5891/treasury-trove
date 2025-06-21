import os

from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from repositories.database import Database


class ClientPostgres(Database):
    def __init__(self):
        postgres_url = os.getenv(
            "POSTGRES_URL",
            "postgresql+asyncpg://user:password@localhost:5432/trove",
        )
        self.async_engine = create_async_engine(
            postgres_url,
            echo=True,
        )

    def client(self) -> async_sessionmaker[AsyncSession]:
        async_session = async_sessionmaker(
            self.async_engine, class_=AsyncSession, expire_on_commit=False
        )
        return async_session


async def create_database(engine: AsyncEngine) -> None:
    from sqlmodel import SQLModel

    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


if __name__ == "__main__":
    import asyncio

    engine = ClientPostgres().async_engine
    asyncio.run(create_database(engine))
    print("PostgreSQL database initialized successfully.")
