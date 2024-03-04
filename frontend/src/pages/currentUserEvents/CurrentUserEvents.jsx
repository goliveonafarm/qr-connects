import { useState, useRef, useEffect } from "react";
import useGetUserEvents from "../../hooks/useGetUserEvents";
import useDeleteUserEvent from "../../hooks/useDeleteUserEvent";
import FormModal from "../../components/forms/FormModal";
import useClickOutside from "../../hooks/useClickOutside";

const UserEvents = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const { userEvents, getUserEvents } = useGetUserEvents();
  const { loading, deleteUserEvent } = useDeleteUserEvent();

  const formModalRef = useRef(null);
  useClickOutside(formModalRef, () => setShowFormModal(false));

  useEffect(() => {
    getUserEvents();
  }, []);

  return (
    <div>
      <div>Connects</div>
      <button className="btn btn-outline" onClick={async () => {

        await getUserEvents();


      }}>TEST</button>
      <div>
        {true && (
          <button
            className="btn btn-outline btn-info btn-lg btn-wide"
            onClick={() => setShowFormModal(true)}
          >
            Add a Connect
          </button>
        )}
      </div>
      {showFormModal === true && (
        <div ref={formModalRef} className="absolute top-10">
          <FormModal getUserEvents={getUserEvents} setShowFormModal={setShowFormModal} />
        </div>
      )}
      {userEvents.map((event) => {
        return (
          <div key={event._id} className="bg-base-200 p-2 my-2">
            <div>{event.formType}</div>
            <div>{event.shareResults ? "Shareable" : "Not Shareable"}</div>
            <div>{event.privateResults ? "Private" : "Public"}</div>
            <div>{event.shareable ? "Shareable" : "Not Shareable"}</div>
            <button
              className="btn btn-outline btn-danger"
              onClick={async () => {
                await deleteUserEvent(event._id);
                await getUserEvents();
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UserEvents;
