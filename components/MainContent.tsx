import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { 
  useTab, 
  TabContextType,
  Tabs,
} from '../context/TabContext.tsx';

import Home from './Home/Home.tsx';
import InventoryList from './List/InventoryList.tsx';
import Calendar from './Calendar/Calendar.tsx';
import History from './History/History.tsx';
import Settings from './Settings/Settings.tsx';

function MainContent() : React.JSX.Element | null {
  const {activeTab} : TabContextType = useTab();

  return(
    <View style={styles.container}>
      <Home           open={activeTab === Tabs.Home} />
      <InventoryList  open={activeTab === Tabs.List} />
      <Calendar       open={activeTab === Tabs.Calendar} />
      <History        open={activeTab === Tabs.History} />
      <Settings       open={activeTab === Tabs.Settings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "83%", 
    width: "100%"
  }
});

export default MainContent;