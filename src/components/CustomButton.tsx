import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from "@/constants/theme";

type Props = {
    title: string;
    onPress: () => void;
    wide?: boolean;
    variant?: "filled" | "outlined"
    disabled?: boolean;
};

export default function CustomButton({ title, onPress, wide = false, variant = "filled", disabled = false }: Props) {
    const outlined = variant === "outlined";

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                outlined ? styles.buttonOutline : styles.button,
                wide && styles.wide,
                pressed && (outlined ? styles.outlinePressed : styles.buttonPressed),
                disabled && styles.disabled,
            ]}
        >
            <Text style={outlined ? styles.outlineText : styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.gold,
        paddingVertical: 16,
        width: 140,
        alignItems: "center",
        borderRadius: 30,
        elevation: 5,
    },
    buttonPressed: {
        backgroundColor: COLORS.goldPressed,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.dark,
    },
    buttonOutline: {
        borderColor: COLORS.gold,
        borderWidth: 2,
        paddingVertical: 12,
        width: 140,
        alignItems: "center",
        borderRadius: 30,
    },
    outlinePressed: {
        backgroundColor: "rgba(232, 197, 71, 0.15)",
    },
    outlineText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.gold,
    },
    wide: {
        width: 220,
    },
    disabled: {
        opacity: 0.5,
    },
})