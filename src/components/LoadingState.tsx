import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/theme";



type Props = {
    message: string;
    indicator_size: "small" | "large" | number;
};

export default function LoadingState({ message, indicator_size }: Props) {
    const background = [COLORS.feltLight, COLORS.feltDark] as const;
    return (
        <LinearGradient colors={background} style={styles.center}>
            <ActivityIndicator size={indicator_size} color={COLORS.gold} />
            <Text style={styles.text}>{message}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    text: {
        color: COLORS.textMuted,
        fontSize: 16,
        marginTop: 12,
        textAlign: "center",
    },
})