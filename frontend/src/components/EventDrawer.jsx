const EventDrawer = ({responses, children, passKey}) => {
    console.log(responses)
  return (
    <div className="drawer">
      <input id={`my-drawer-${passKey}`} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">

        {children}


        <label htmlFor={`my-drawer-${passKey}`} className="link link-primary">
          <div className="flex">
            <div className="pr-1">Full results</div>
            <div>
              <svg
                height={"20"}
                width={"20"}
                className="cursor-pointer fill-primary hover:fill-blue-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z" />
              </svg>
            </div>
          </div>
        </label>
      </div>

      <div className="drawer-side ">
        <label
          htmlFor={`my-drawer-${passKey}`}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {children}
      </div>
    </div>
  );
};

export default EventDrawer;
