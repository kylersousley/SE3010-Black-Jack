import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { type Card, createDeck, drawCards, reshuffleDeck } from "@/api/deck";
import { PlayingCard } from "@/components/playing-card";
import { getOutcome, handTotal, type Outcome } from "@/utils/blackjack";

// "playing" = player's turn, "dealer" = dealer's turn, "done" = round over
type Phase = "loading" | "playing" | "dealer" | "done";

const OUTCOMES: Record<Outcome, string> = {
  "player-win": "You won!",
  "dealer-bust": "Dealer busted, you win!",
  "dealer-win": "Dealer wins",
  "player-bust": "You busted!",
  "push": "You tied",
}

export default function GameScreen() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [phase, setPhase] = useState<Phase>("loading");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create a deck once when the screen opens.
  useEffect(() => {
    createDeck()
      .then((id) => setDeckId(id))
      .catch((e) => setError(String(e)));
  }, []);
  useEffect(() => {
    if (deckId) {
      startRound()
    }
  }, [deckId])

  // Deals a fresh hand. Used for the first round and for "Deal Again".
  async function startRound() {
    if (deckId) {
      try {
        await reshuffleDeck(deckId)
        const cards = await drawCards(deckId, 4);

        // Deal alternately, like a real table: player, dealer, player, dealer.
        setPlayerHand([cards[0], cards[2]]);
        setDealerHand([cards[1], cards[3]]);

        setOutcome(null); // clear last round's result
        setPhase("playing"); // player's turn: shows Hit/Stand, hides dealer's 2nd card

        // Bonus (once handTotal works): if the player has 21 here, that's blackjack.
      } catch (e) {
        setError(String(e)); // e.g. no internet; shows the error screen
      }
    } else {
      return;
    }
  }

  async function hit() {
    if (deckId) {
      try {
        const card = await drawCards(deckId, 1)
        const newHand = [... playerHand, card[0]]
        setPlayerHand(newHand)
        const newTotal = handTotal(newHand)
        if (newTotal > 21) {
          setPhase("done")
          setOutcome("player-bust")
          } 
        } catch(e) {
          setError(String(e))
      }
    }
  }

  async function stand() {
    if (deckId) {
      try {
        let dealer = [...dealerHand]
        while (handTotal(dealer) < 17) {
          const newCard = await drawCards(deckId, 1)
          dealer = [... dealer, newCard[0]]
        }
        setDealerHand(dealer)
        setOutcome(getOutcome(playerHand, dealer))
        setPhase("done")
      } catch (e) {
        setError(String(e))
      }
    }
  }

  // ---------- Rendering ----------

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Something went wrong: {error}</Text>
      </View>
    );
  }

  if (phase === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.text}>Shuffling...</Text>
      </View>
    );
  }

  const hideDealerCard = phase === "playing";

  return (
    <View style={styles.container}>
      {/* Dealer */}
      <Text style={styles.label}>
        Dealer {hideDealerCard ? "" : `(${handTotal(dealerHand)})`}
      </Text>
      <View style={styles.hand}>
        {dealerHand.map((card, i) => (
          <PlayingCard key={card.code} card={card} hidden={hideDealerCard && i === 1} />
        ))}
      </View>

      {/* Result message */}
      <View style={styles.resultArea}>
        {outcome ? (
          <Text style={styles.text}>{OUTCOMES[outcome]}</Text>
        ) : (
          null
        )}
      </View>

      {/* Player */}
      <Text style={styles.label}>You ({handTotal(playerHand)})</Text>
      <View style={styles.hand}>
        {playerHand.map((card) => (
          <PlayingCard key={card.code} card={card} />
        ))}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {phase === "playing" ? (
          <>
            <Pressable style={styles.button} onPress={hit}>
              <Text style={styles.buttonText}>Hit</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={stand}>
              <Text style={styles.buttonText}>Stand</Text>
            </Pressable>
          </>
        ) : (
          <Pressable style={styles.button} onPress={startRound}>
            <Text style={styles.buttonText}>Deal Again</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0B6623",
    justifyContent: "space-evenly",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B6623",
    padding: 16,
  },
  text: {
    color: "white",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  hand: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    minHeight: 100,
  },
  resultArea: {
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
});
