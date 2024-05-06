// "use client"
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);
  const [productModal, setProductModal] = useState({});

  const [carts, setCarts] = useState([]);

  return (
    <DataContext.Provider value={{ favorite, setFavorite, productModal, setProductModal, carts, setCarts }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  return useContext(DataContext);
};

export { DataProvider, useData };