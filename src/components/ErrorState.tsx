import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/theme";



type Props = {
    message: string;
    error: string | null;
};

export default function ErrorState({ error, message }: Props) {
    const background = [COLORS.feltLight, COLORS.feltDark] as const;
    return (
        <LinearGradient colors={background} style={styles.center}>
            <Text style={styles.errorTitle}>{message}</Text>
            <Text style={styles.text}>{error}</Text>
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
    errorTitle: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "bold",
    },
    text: {
        color: COLORS.textMuted,
        fontSize: 16,
        marginTop: 12,
        textAlign: "center",
    },
})