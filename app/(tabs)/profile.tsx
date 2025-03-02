import { View, StyleSheet } from 'react-native';
import Auth from '@/components/Profile/Auth';
import { useAuth } from '@/context/AuthContext';
import Profile from '@/components/Profile/Profile';

export default function ProfileTab(): React.ReactElement {
    const { loggedIn } = useAuth();
    return (
        <View style={styles.profileContainer} >
            {loggedIn ? <Profile /> : <Auth />}
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#ebecff"
    }
});