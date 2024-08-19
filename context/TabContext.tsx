import React, { 
  createContext, 
  useState, 
  useContext, 
  PropsWithChildren
} from 'react';

export enum Tabs {
  Home = 'Home',
  List = 'List',
  Calendar = 'Calendar',
  History = 'History',
  Settings = 'Settings',
};

export interface TabContextType {
  activeTab: Tabs;
  setActiveTab: React.Dispatch<React.SetStateAction<Tabs>>;
}

const TabContext = createContext<TabContextType | null>(null);

export function TabProvider({children} : PropsWithChildren) : React.JSX.Element {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Home);
  return(
    <TabContext.Provider value={{activeTab, setActiveTab}}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() : TabContextType {
  const context : TabContextType | null = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider.');
  }
  return context;
};