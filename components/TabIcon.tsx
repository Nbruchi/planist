import { Colors } from "@/constants/Colors";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface TabIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
}

export default function TabIcon({ focused, icon }: TabIconProps) {
    return (
        <View style={styles.iconContainer}>
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={focused ? Colors.primary : Colors.dark}
                style={styles.icon}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: "center",
        flexDirection: "column",
        marginTop: 12,
        gap: 4,
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 12,
    },
});
