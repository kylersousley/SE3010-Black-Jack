import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from "@/constants/theme";
import { Card } from '@/api/deck';
import { PlayingCard } from "@/components/playing-card";
import { handTotal, type Phase } from "@/utils/blackjack";

type Props = {
    player: "YOU" | "DEALER";
    hand: Card[];
    phase: Phase

};

export default function PlayerTable({ player, hand, phase }: Props) {
    const hideDealerCard = phase === "playing" && player === "DEALER";
    return (
        <View style={styles.panel}>
            <View style={styles.panelHeader}>
                <Text style={styles.label}>{player}</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {hideDealerCard ? "?" : handTotal(hand)}
                    </Text>
                </View>
            </View>
            <View style={styles.hand}>
                {hand.map((card, i) => (
                    <PlayingCard key={card.code} card={card} hidden={hideDealerCard && i === 1} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    panel: {
        backgroundColor: COLORS.panel,
        borderColor: COLORS.panelBorder,
        borderWidth: 1,
        borderRadius: 16,
        padding: 12,
    },
    panelHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 8,
    },
    label: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 2,
    },
    badge: {
        backgroundColor: COLORS.gold,
        minWidth: 34,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        alignItems: "center",
    },
    badgeText: {
        color: COLORS.dark,
        fontSize: 15,
        fontWeight: "bold",
    },
    hand: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        minHeight: 114,
    },
})
