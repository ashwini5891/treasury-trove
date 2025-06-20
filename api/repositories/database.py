from abc import ABC, abstractmethod

from sqlalchemy import Engine


class Database(ABC):
    @abstractmethod
    def client(self) -> Engine:
        """Returns the database client."""
        pass
