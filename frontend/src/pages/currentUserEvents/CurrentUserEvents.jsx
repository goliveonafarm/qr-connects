import { useState } from "react";
import useGetUserEvents from "../../hooks/useGetUserEvents";
import useDeleteUserEvent from "../../hooks/useDeleteUserEvent";
import EventModal from "../../components/forms/EventModal";
import UserEventCardBody from "../../components/event-card-bodies/UserEventCardBody";

const UserEvents = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  //kinda left off here, when we run getusereevents was thinking about setting the userEvents below to some loading state and then setting it to the actual userEvents after the fetch request is done
  const { loadingUserEvents, userEvents, getUserEvents } = useGetUserEvents();

  const { isDeletingEvent, deleteUserEvent } = useDeleteUserEvent();

  const handleDeleteEvent = async (eventId) => {
    await deleteUserEvent(eventId);
    await getUserEvents();
  };

  return (
    <div style={{ textShadow: "1px 1px 2px black" }}>
      <div className="flex pb-5">
        <h1 className="text-4xl pr-3">Your Connects</h1>
        {/** Revisit later - change button logic if user reached max number of connects */}
        {true && (
          <button
            className="btn btn-outline btn-success"
            onClick={() => setShowEventModal(true)}
          >
            <svg
              height={"30"}
              width={"30"}
              className="fill-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
        )}
      </div>
      {showEventModal === true && (
        <div className="absolute top-10 z-30">
          <EventModal
            setShowEventModal={setShowEventModal}
            getUserEvents={getUserEvents}
          />
        </div>
      )}
      <div className="z-0 flex flex-wrap">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-3 gap-6">
            {userEvents.map((userEvent) => {
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
      </div>
    </div>
  );
};

export default UserEvents;
