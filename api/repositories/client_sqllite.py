from sqlalchemy import Engine
from sqlmodel import create_engine

from repositories.database import Database


class ClientSqlLite(Database):
    def __init__(self, sqlite_file_name: str = "trove.db"):
        sqlite_url = f"sqlite:///{sqlite_file_name}"
        connect_args = {"check_same_thread": False}
        self.engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)

    def client(self) -> Engine:
        return self.engine


def create_database(engine: Engine) -> None:
    from sqlmodel import SQLModel

    SQLModel.metadata.create_all(engine)


def create_dummy_data(engine: Engine) -> None:
    from datetime import datetime, timedelta

    from sqlmodel import Session

    from api.models.schemas import (
        EventSchema,
        OrganizationSchema,
        TransactionSchema,
    )

    with Session(engine) as session:
        # Create organizations
        tech_org = OrganizationSchema(
            name="TechCon Events", description="Technology conference organizer"
        )
        charity_org = OrganizationSchema(
            name="Charity Foundation",
            description="Non-profit organization for social causes",
        )
        session.add(tech_org)
        session.add(charity_org)
        session.commit()

        # Create events
        tech_conference = EventSchema(
            name="Annual Tech Summit 2025",
            date=datetime.now().isoformat(),
            location="San Francisco Convention Center",
            description="Annual technology conference featuring latest innovations",
            organization_id=tech_org.id,
        )
        fundraiser = EventSchema(
            name="Charity Gala 2025",
            date=(datetime.now() + timedelta(days=30)).isoformat(),
            location="Grand Hotel",
            description="Annual fundraising gala for social causes",
            organization_id=charity_org.id,
        )
        session.add(tech_conference)
        session.add(fundraiser)
        session.commit()

        # Create transactions
        transactions = [
            TransactionSchema(
                amount=1500.00,
                currency="USD",
                date=datetime.now().isoformat(),
                description="Conference registration fee",
                event_id=tech_conference.id,
            ),
            TransactionSchema(
                amount=2000.00,
                currency="USD",
                date=datetime.now().isoformat(),
                description="Catering service payment",
                event_id=tech_conference.id,
            ),
            TransactionSchema(
                amount=5000.00,
                currency="USD",
                date=datetime.now().isoformat(),
                description="Major donation",
                event_id=fundraiser.id,
            ),
            TransactionSchema(
                amount=1000.00,
                currency="USD",
                date=datetime.now().isoformat(),
                description="Event space rental",
                event_id=fundraiser.id,
            ),
        ]
        for transaction in transactions:
            session.add(transaction)
        session.commit()


if __name__ == "__main__":
    engine = ClientSqlLite().client()
    create_database(engine)
    # create_dummy_data(engine)
