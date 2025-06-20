from contextlib import asynccontextmanager

from fastapi import FastAPI

from dependencies.auth import get_current_user
from repositories.client_sqllite import ClientSqlLite
from routers import events, organisations, transactions

print("Starting Treasury Trove API...")


@asynccontextmanager
async def lifespan(app: FastAPI):  # noqa: ANN201
    # Startup: Initialize database connection
    app.state.db = ClientSqlLite().client()
    yield
    # Shutdown: Close database connection
    if hasattr(app.state, "db"):
        ...
        # app.state.db.close()


app = FastAPI(
    title="Treasury Trove API",
    description="API for managing treasury events and transactions",
    version="1.0.0",
    lifespan=lifespan,
)

# Add authentication dependency to all routes
app.dependency_overrides[get_current_user] = get_current_user


# Include routers
app.include_router(organisations.router)
app.include_router(events.router)
app.include_router(transactions.router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {
        "message": "Welcome to the Treasury Trove API!",
        "docs_url": "/docs",
        "redoc_url": "/redoc",
    }
