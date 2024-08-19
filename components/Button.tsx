import React from 'react';

import {
  Pressable,
  StyleSheet,
} from 'react-native';
import Search from '../Assets/svg/search.svg';
import AddIcon from '../Assets/svg/add.svg';

type Props = {
  icon: string;
};

const Icon : React.FC<Props> = ({icon}) => {
  const iconProps = {
    height: styles.icon.height, 
    width: styles.icon.width, 
    color: styles.icon.color,
  }

  switch (icon) {
    case "add":
      return <AddIcon {...iconProps}/>;
    case "search":
      return <Search {...iconProps}/>;
    default: console.log("Unknown button!");
  }
}

const Button : React.FC<Props> = ({icon}) => {
  const props = {
    icon: icon,
  };

  return(
    <Pressable 
      style={styles.iconContainer}
      onPressIn={() => console.log("pressIn icon")}
    >
      <Icon {...props}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "flex",
    padding: 5,
  },
  icon: {
    width: 28,
    height: 28,
    color: "#000",
  }
});

export default Button;