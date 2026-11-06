import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "@/constants/theme";
import CustomButton from "@/components/CustomButton";

export default function HomeScreen() {
  const router = useRouter();

  const startGame = () => {
    Haptics.selectionAsync();
    router.push("/game");
  };

  return (
    <LinearGradient
      colors={[COLORS.feltLight, COLORS.feltDark]}
      style={styles.container}
    >
      <View style={styles.hero}>
        <Text style={styles.suits}>♠ ♥ ♣ ♦</Text>
        <Text style={styles.title}>BLACKJACK</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>Get as close to 21 as you can without going over.</Text>
      </View>
      <CustomButton title="Play" onPress={startGame} wide />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  hero: {
    alignItems: "center",
    marginBottom: 48,
  },
  suits: {
    fontSize: 28,
    color: COLORS.gold,
    letterSpacing: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 44,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: 4,
  },
  divider: {
    width: 64,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.gold,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.textMuted,
    textAlign: "center",
    maxWidth: 280,
  },
});
