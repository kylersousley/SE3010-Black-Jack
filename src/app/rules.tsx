import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { RULES } from "@/constants/rules";
import { COLORS } from "@/constants/theme";

export default function RulesScreen() {
  return (
    <LinearGradient colors={[COLORS.feltLight, COLORS.feltDark]} style={styles.container}>
      <FlatList
        data={RULES}
        keyExtractor={(section) => section.title}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={styles.panel}>
            <Text style={styles.heading}>{item.title}</Text>
            {item.points.map((point) => (
              <View key={point} style={styles.row}>
                <Text style={styles.bullet}>♠</Text>
                <Text style={styles.text}>{point}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 12,
  },
  panel: {
    backgroundColor: COLORS.panel,
    borderColor: COLORS.panelBorder,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  heading: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  bullet: {
    color: COLORS.gold,
    fontSize: 14,
    lineHeight: 22,
  },
  text: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 22,
  },
});
