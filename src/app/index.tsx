import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blackjack</Text>
      <Text style={styles.subtitle}>Get as close to 21 as you can without going over.</Text>

      {/* Link + asChild lets the Pressable act as the navigation trigger */}
      <Link href="/game" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Play</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#0B6623", // felt green
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#E0E0E0",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
});
