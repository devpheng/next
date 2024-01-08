// "use client"
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);

  return (
    <DataContext.Provider value={{ favorite, setFavorite }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  return useContext(DataContext);
};

export { DataProvider, useData };