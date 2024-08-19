import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Colors from '../Colors.js';
import { 
  useTab,
  TabContextType,
  Tabs
} from '../context/TabContext.tsx';

// Icons
import HomeIcon from '../Assets/svg/home.svg';
import ListIcon from '../Assets/svg/list.svg';
import CalendarIcon from '../Assets/svg/calendar.svg';
import HistoryIcon from '../Assets/svg/history.svg';
import SettingsIcon from '../Assets/svg/settings.svg';
import { SvgProps } from 'react-native-svg';

type TabProps = {
  tab: Tabs;
}

const Tab : React.FC<TabProps> = ({tab}) => {
  const {activeTab, setActiveTab} : TabContextType = useTab();

  const isActive = activeTab === tab;

  const Icon : React.FC<SvgProps> = () => {

    const iconProps = {
      height: styles.inactiveIcon.height,
      width: styles.inactiveIcon.width,
      color: isActive ? styles.activeIcon.color : styles.inactiveIcon.color
    };

    switch(tab) {
      case Tabs.Home:
        return <HomeIcon {...iconProps} />;
      case Tabs.List:
        return <ListIcon {...iconProps} />;
      case Tabs.Calendar:
        return <CalendarIcon {...iconProps} />;
      case Tabs.History:
        return <HistoryIcon {...iconProps} />;
      case Tabs.Settings:
        return <SettingsIcon {...iconProps} />;
    }
  };

  const pressHandler = () => {
    // if (isActive)  return;
    setActiveTab(tab);
  };

  return(
    <Pressable 
      style={styles.tabContainer}
      onPressIn={pressHandler}
    >
      <Icon />
      <Text style={styles.iconText}>{tab}</Text>
    </Pressable>
  );
}

const TabsFooter : React.FC = () => {
  const tabs : Tabs[] = [
    Tabs.Home,
    Tabs.List,
    Tabs.Calendar,
    Tabs.History,
    Tabs.Settings,
  ];

  return(
    <View style={styles.tabsFooterContainer}>
      {tabs.map((value, index) => 
        <Tab key={index} tab={value} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsFooterContainer: {
    // zIndex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "9%",
    backgroundColor: Colors.background.primary,
    elevation: 10,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: "#9B9"
    // color: "red",
  },
  inactiveIcon: {
    height: 30,
    width: 30,
    color: Colors.inactiveTab
  },
  activeIcon: {
    color: Colors.primary
  },
  iconText: {
    fontSize: 10,
    fontWeight: '600',
    color: "#777",
  }
});

export default TabsFooter;