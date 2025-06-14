from sqlmodel import Field, SQLModel


class Organisation(SQLModel):
    name: str = Field(..., description="Name of the organization")
    description: str = Field(..., description="Description of the organization")


class Event(SQLModel):
    name: str = Field(..., description="Name of the event")
    date: str = Field(..., description="Date of the event in ISO format")
    location: str = Field(..., description="Location of the event")
    description: str = Field(..., description="Description of the event")


class Transaction(SQLModel):
    amount: float = Field(..., description="Amount of the transaction")
    currency: str = Field(..., description="Currency of the transaction")
    date: str = Field(..., description="Date of the transaction in ISO format")
    description: str = Field(..., description="Description of the transaction")
