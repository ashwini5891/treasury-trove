from uuid import uuid4

from sqlmodel import Field, Relationship

from models.base import Event, Organisation, Transaction


class OrganisationSchema(Organisation, table=True):
    __tablename__ = "organizations"

    id: str = Field(
        default_factory=lambda: str(uuid4()),
        primary_key=True,
        description="Unique identifier for the organization",
    )

    # Relationship
    events: list["EventSchema"] = Relationship(back_populates="organization")


class EventSchema(Event, table=True):
    __tablename__ = "events"

    id: str = Field(
        default_factory=lambda: str(uuid4()),
        primary_key=True,
        description="Unique identifier for the event",
    )

    # Foreign key
    organization_id: str = Field(foreign_key="organizations.id")
    # Relationships
    organization: OrganisationSchema | None = Relationship(back_populates="events")
    transactions: list["TransactionSchema"] = Relationship(back_populates="event")


class TransactionSchema(Transaction, table=True):
    __tablename__ = "transactions"
    id: str = Field(
        default_factory=lambda: str(uuid4()),
        primary_key=True,
        description="Unique identifier for the transaction",
    )

    # Foreign key
    event_id: str = Field(foreign_key="events.id")
    # Relationship
    event: EventSchema | None = Relationship(back_populates="transactions")
