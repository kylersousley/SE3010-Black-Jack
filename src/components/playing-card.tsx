import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import type { Card } from "@/api/deck";

type Props = {
  card: Card;
  hidden?: boolean;
};

const CARD_BACK = "https://deckofcardsapi.com/static/img/back.png";

export function PlayingCard({ card, hidden = false }: Props) {
  return (
    <View style={styles.wrapper}>
      <Image
        source={{ uri: hidden ? CARD_BACK : card.image }}
        style={styles.image}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 4,
    borderRadius: 6,
  },
  image: {
    width: 76,
    height: 106,
    borderRadius: 6,
  },
});
