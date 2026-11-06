import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { type Card, createDeck, drawCards, reshuffleDeck } from "@/api/deck";
import { COLORS } from "@/constants/theme";
import { getOutcome, handTotal, type Outcome, type Phase } from "@/utils/blackjack";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import PlayerTable from "@/components/PlayerTable";
import ResultMessage from "@/components/ResultMessage";
import CustomButton from "@/components/CustomButton";


export default function GameScreen() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [phase, setPhase] = useState<Phase>("loading");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const background = [COLORS.feltLight, COLORS.feltDark] as const;

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

  async function startRound() {
    if (deckId && !busy) {
      setBusy(true);
      try {
        await reshuffleDeck(deckId)
        const cards = await drawCards(deckId, 4);

        setPlayerHand([cards[0], cards[2]]);
        setDealerHand([cards[1], cards[3]]);

        setOutcome(null);
        setPhase("playing");

        
      } catch (e) {
        setError(String(e));
      } finally {
        setBusy(false);
      }
    } else {
      return;
    }
  }

  function dealAgain() {
    Haptics.selectionAsync();
    startRound();
  }

  async function hit() {
    if (deckId && !busy) {
      setBusy(true);
      try {
        Haptics.selectionAsync();
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
      } finally {
        setBusy(false);
      }
    }
  }

  async function stand() {
    if (deckId && !busy) {
      setBusy(true);
      try {
        Haptics.selectionAsync();
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
      } finally {
        setBusy(false);
      }
    }
  }

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
