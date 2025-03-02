import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface ItemContextType {
  itemAdded: boolean;
  setItemAdded: (value: boolean) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [itemAdded, setItemAdded] = useState<boolean>(false);

  return (
    <ItemContext.Provider value={{ itemAdded, setItemAdded }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }
  return context;
};
