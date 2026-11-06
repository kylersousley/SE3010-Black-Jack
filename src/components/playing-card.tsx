import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import type { Card } from "@/api/deck";

type Props = {
  card: Card;
  hidden?: boolean; // used for the dealer's face-down card
};

// The API serves a card-back image at this URL.
const CARD_BACK = "https://deckofcardsapi.com/static/img/back.png";

export function PlayingCard({ card, hidden = false }: Props) {
  return (
    <View style={styles.wrapper}>
      <Image
        source={{ uri: hidden ? CARD_BACK : card.image }}
        style={styles.image}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 4,
  },
  image: {
    width: 70,
    height: 98, // standard card ratio is about 5:7
  },
});
