import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { 
  TabProvider, 
} from './context/TabContext.tsx';

import Button from './components/Button.tsx';
import TabsFooter from './components/TabsFooter.tsx';
import MainContent from './components/MainContent.tsx';
import Colors from './Colors.js';

function Header() : React.JSX.Element {
  const props = {
    icon: "search",
  }

  // const renderHeaderText = () : ReactNode => {
  //   return null;
  // }

  return(
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.titleText}>Inventory List</Text>
      </View>
      <Button {...props} />
    </View>
  );
}

function App(): React.JSX.Element {
  // const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Home);
  return (
    <SafeAreaView style={{backgroundColor: Colors.background.secondary}}>
        <StatusBar
          backgroundColor={Colors.background.primary}
          barStyle={'dark-content'}
          />
        <View style={styles.appContainer} >
          <TabProvider>
            <Header/>
            <MainContent/>
            <TabsFooter />
          </TabProvider>
        </View>
      </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  appContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headerContainer: {
    height: "8%",
    width: "100%",
    backgroundColor: Colors.background.primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    shadowColor: '#0',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default App;
