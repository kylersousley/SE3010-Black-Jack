import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { COLORS } from "@/constants/theme";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import PlayerTable from "@/components/PlayerTable";
import ResultMessage from "@/components/ResultMessage";
import CustomButton from "@/components/CustomButton";
import { useBlackJack } from "@/hooks/use-blackjack";


export default function GameScreen() {
  const { playerHand, dealerHand, phase, outcome, error, busy, hit, stand, dealAgain } = useBlackJack()

  const background = [COLORS.feltLight, COLORS.feltDark] as const;

  if (error) {
    return (
      <ErrorState message="Something went wrong" error={error} />
    );
  }

  if (phase === "loading") {
    return (
      <LoadingState message="Shuffling..." indicator_size="large" />
    );
  }

  return (
    <LinearGradient
      colors={background}
      style={styles.container}
    >
      {/* Dealer */}
      <PlayerTable player="DEALER" hand={dealerHand} phase={phase}/>

      {/* Result message */}
      <ResultMessage outcome={outcome} />

      {/* Player */}
      <PlayerTable player="YOU" hand={playerHand} phase={phase} />

      {/* Controls */}
      <View style={styles.controls}>
        {phase === "playing" ? (
          <>
          <CustomButton title="Hit" onPress={hit} disabled={busy} />
          <CustomButton title="Stand" onPress={stand} variant="outlined" disabled={busy} />
          </>
        ) : (
          <CustomButton title="Deal Again" onPress={dealAgain} wide disabled={busy} />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});
