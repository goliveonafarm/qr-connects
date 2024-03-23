import { useState, useRef, useEffect } from "react";
import useGetUserEvents from "../../hooks/useGetUserEvents";
import useClickOutside from "../../hooks/useClickOutside";
import useDeleteUserEvent from "../../hooks/useDeleteUserEvent";
import EventModal from "../../components/forms/EventModal";
import UserEventCardBody from "../../components/event-card-bodies/UserEventCardBody";

const UserEvents = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  //kinda left off here, when we run getusereevents was thinking about setting the userEvents below to some loading state and then setting it to the actual userEvents after the fetch request is done
  const { loadingUserEvents, userEvents, getUserEvents } = useGetUserEvents();

  const { isDeletingEvent, deleteUserEvent } = useDeleteUserEvent();

  const formModalRef = useRef(null);
  useClickOutside(formModalRef, () => setShowEventModal(false));

  const handleDeleteEvent = async (eventId) => {
    await deleteUserEvent(eventId);
    await getUserEvents();
  };


  return (
    <div style={{ textShadow: "1px 1px 2px black" }}>
      <h1 className="text-4xl pb-5 pt-5">Your Connects</h1>
      <div className="pb-5">
        {/** Revisit later - change button logic if user reached max number of connects */}
        {true && (
          <button
            className="btn btn-outline btn-info btn-lg btn-wide"
            onClick={() => setShowEventModal(true)}
          >
            Add a Connect
          </button>
        )}
      </div>
      {showEventModal === true && (
        <div ref={formModalRef} className="absolute top-10 z-30">
          <EventModal setShowEventModal={setShowEventModal}
          getUserEvents={getUserEvents} />
        </div>
      )}
      <div className="z-0">
        {userEvents.map((userEvent) => {
          console.log("userEvent", userEvent)
          return (
            <UserEventCardBody
              key={`user-event-card-${userEvent._id}`}
              userEvent={userEvent}
              deleteUserEvent={handleDeleteEvent}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserEvents;
