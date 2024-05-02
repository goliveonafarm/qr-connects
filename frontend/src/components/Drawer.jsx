import { useDrawerContext } from "../context/DrawerContext";

const Drawer = ({ children }) => {
  const { isDrawerOpen, toggleDrawer, drawerContent } = useDrawerContext();

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content" >{children}</div>
      <div className="drawer-side" style={{ zIndex: 1000 }} >
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 h-screen w-80 bg-base-200 text-base-content">
          {drawerContent}
         
        </div>
      </div>
    </div>
  );
};

export default Drawer;
