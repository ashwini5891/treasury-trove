from fastapi import APIRouter

router = APIRouter(
    prefix="/transactions",
    tags=["transactions"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_transactions():
    # TODO: Implement get all transactions
    return {"message": "Get all transactions"}


@router.post("/")
def create_transaction():
    # TODO: Implement create transaction
    return {"message": "Create transaction"}


@router.get("/{transaction_id}")
def get_transaction(transaction_id: int):
    # TODO: Implement get transaction by ID
    return {"message": f"Get transaction {transaction_id}"}


@router.put("/{transaction_id}")
def update_transaction(transaction_id: int):
    # TODO: Implement update transaction
    return {"message": f"Update transaction {transaction_id}"}


@router.delete("/{transaction_id}")
def delete_transaction(transaction_id: int):
    # TODO: Implement delete transaction
    return {"message": f"Delete transaction {transaction_id}"}
