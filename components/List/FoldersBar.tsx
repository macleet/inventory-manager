import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import Colors from '../../Colors.js';

interface FoldersBarProps {
  adding: boolean,
}

function Folder() : React.JSX.Element {
  return (
    <View style={styles.folderContainer} >
      <Text style={styles.folder} >Category</Text>
    </View>
  );
}

const FoldersBar : React.FC<FoldersBarProps> = ({adding}) => {
  return(
    <ScrollView scrollEnabled={!adding} showsHorizontalScrollIndicator={false} style={styles.barContainer} horizontal={true} contentContainerStyle={styles.barContentContainer} >
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  barContainer: {
    zIndex: 1,
    minHeight: 80,
    flexDirection: "row",
    display: "flex",
  },
  barContentContainer: {
    paddingHorizontal: 7,
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#EEF',
  },
  folderContainer: {
    maxHeight: "82%",
    backgroundColor: Colors.primary,
    width:"auto",
    borderRadius: 30,
    marginHorizontal: 10,
    padding: 5,
  },
  folder: {
    marginHorizontal: 6,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: "whitesmoke"
  }
});

export default FoldersBar;