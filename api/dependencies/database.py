from collections.abc import Generator

from repositories.client_sqllite import ClientSqlLite


def get_db() -> Generator:
    db = ClientSqlLite().client()
    try:
        yield db
    finally:
        ...
        # db.close()
