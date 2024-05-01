import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  const updateDrawerContent = (content) => {
    setDrawerContent(content);
  };

  return (
    <DrawerContext.Provider
      value={{ isDrawerOpen, toggleDrawer, drawerContent, updateDrawerContent }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
