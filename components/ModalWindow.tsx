import { PropsWithChildren } from "react";
import { 
    View, 
    StyleSheet,
} from "react-native";

interface ModalWindowProps {
    toggle: boolean,
}

export const ModalWindow : React.FC<ModalWindowProps & PropsWithChildren> = ({children, toggle}) => {
    return(
        <>
            {toggle && <View style={styles.window}>
                {children}
            </View>}
        </>
    );
};

const styles = StyleSheet.create({
    window: {
        display: "flex",
        elevation: 1,
        width: "85%",
        height: "80%",
        position: "absolute", 
        bottom: 105,
        backgroundColor: "#cdd1e4",
        zIndex: 1,
        borderRadius: 15,
        paddingVertical: 18,
    },
});