import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from "@/constants/theme";
import { type Outcome } from "@/utils/blackjack";

const OUTCOMES: Record<Outcome, string> = {
    "player-win": "You won!",
    "dealer-bust": "Dealer busted, you win!",
    "dealer-win": "Dealer wins",
    "player-bust": "You busted!",
    "push": "You tied",
}

const OUTCOME_COLORS: Record<Outcome, string> = {
    "player-win": COLORS.win,
    "dealer-bust": COLORS.win,
    "dealer-win": COLORS.lose,
    "player-bust": COLORS.lose,
    "push": COLORS.push,
}

type Props = {
    outcome: Outcome | null;
};

export default function ResultMessage({ outcome }: Props) {

    return (
        <View style={styles.resultArea}>
            {outcome ? (
                <View style={[styles.banner, { backgroundColor: OUTCOME_COLORS[outcome] }]}>
                    <Text style={styles.bannerText}>{OUTCOMES[outcome]}</Text>
                </View>
            ) : (
                null
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    resultArea: {
        minHeight: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    banner: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 24,
    },
    bannerText: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: "bold",
    },
})
