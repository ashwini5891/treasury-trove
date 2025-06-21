from typing import Annotated

from fastapi import APIRouter, Depends

from dependencies.auth import get_current_user

router = APIRouter(
    prefix="/events",
    tags=["events"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_events(current_user: Annotated[dict, Depends(get_current_user)]) -> dict:
    # TODO: Implement get all events
    return {"message": "Get all events", "user": current_user}


@router.post("/")
def create_event(current_user: Annotated[dict, Depends(get_current_user)]) -> dict:
    # TODO: Implement create event
    return {"message": "Create event", "user": current_user}


@router.get("/{event_id}")
def get_event(
    event_id: int, current_user: Annotated[dict, Depends(get_current_user)]
) -> dict:
    # TODO: Implement get event by ID
    return {"message": f"Get event {event_id}", "user": current_user}


@router.put("/{event_id}")
def update_event(
    event_id: int, current_user: Annotated[dict, Depends(get_current_user)]
) -> dict:
    # TODO: Implement update event
    return {"message": f"Update event {event_id}", "user": current_user}


@router.delete("/{event_id}")
def delete_event(
    event_id: int, current_user: Annotated[dict, Depends(get_current_user)]
) -> dict:
    # TODO: Implement delete event
    return {"message": f"Delete event {event_id}", "user": current_user}
