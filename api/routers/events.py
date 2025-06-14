from fastapi import APIRouter

router = APIRouter(
    prefix="/events",
    tags=["events"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_events():
    # TODO: Implement get all events
    return {"message": "Get all events"}


@router.post("/")
def create_event():
    # TODO: Implement create event
    return {"message": "Create event"}


@router.get("/{event_id}")
def get_event(event_id: int):
    # TODO: Implement get event by ID
    return {"message": f"Get event {event_id}"}


@router.put("/{event_id}")
def update_event(event_id: int):
    # TODO: Implement update event
    return {"message": f"Update event {event_id}"}


@router.delete("/{event_id}")
def delete_event(event_id: int):
    # TODO: Implement delete event
    return {"message": f"Delete event {event_id}"}
