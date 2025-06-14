from typing import Annotated

from fastapi import APIRouter, Depends

from dependencies.auth import get_current_user

router = APIRouter(
    prefix="/transactions",
    tags=["transactions"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_transactions(current_user: Annotated[dict, Depends(get_current_user)]) -> dict:
    # TODO: Implement get all transactions
    return {"message": "Get all transactions", "user": current_user}


@router.post("/")
def create_transaction(
    current_user: Annotated[dict, Depends(get_current_user)],
) -> dict:
    # TODO: Implement create transaction
    return {"message": "Create transaction", "user": current_user}


@router.get("/{transaction_id}")
def get_transaction(
    transaction_id: int, current_user: Annotated[dict, Depends(get_current_user)]
) -> dict:
    # TODO: Implement get transaction by ID
    return {"message": f"Get transaction {transaction_id}", "user": current_user}


@router.put("/{transaction_id}")
def update_transaction(
    transaction_id: int, current_user: Annotated[dict, Depends(get_current_user)]
) -> dict:
    # TODO: Implement update transaction
    return {"message": f"Update transaction {transaction_id}", "user": current_user}


@router.delete("/{transaction_id}")
def delete_transaction(
    transaction_id: int, current_user: Annotated[dict, Depends(get_current_user)]
) -> dict:
    # TODO: Implement delete transaction
    return {"message": f"Delete transaction {transaction_id}", "user": current_user}
