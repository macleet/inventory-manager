import React from 'react';
import {    
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

import { TabProvider } from './context/TabContext.tsx';
import TabsFooter from './components/TabsFooter.tsx';
import MainContent from './components/MainContent.tsx';
import Colors from './Colors.js';
import Header from './components/Header.tsx';

// Main application component
export default () => {
    return (
        // SafeAreaView ensures that content is rendered within the safe area boundaries of a device
        <SafeAreaView style={{ backgroundColor: Colors.background.tertiary }}>
            {/* StatusBar component to customize the status bar appearance */}
            <StatusBar
                backgroundColor={Colors.background.primary}
                barStyle={'dark-content'}
            />
            {/* Main application container */}
            <View style={styles.appContainer}>
                {/* TabProvider provides context for managing tabs within the application */}
                <TabProvider>
                    <Header />      {/* Renders the header component */}
                    <MainContent /> {/* Main content area of the application */}
                    <TabsFooter />  {/* Footer with tabs navigation */}
                </TabProvider>
            </View>
        </SafeAreaView>
    );
};

// Styles for the main application container
const styles = StyleSheet.create({
    appContainer: {
        minHeight: "100%",                // Ensures the container takes up full height of the screen
        display: "flex",
        flexDirection: "column",          // Lays out children in a column
        justifyContent: "space-between",  // Ensures space is distributed between the header, content, and footer
    },
});
