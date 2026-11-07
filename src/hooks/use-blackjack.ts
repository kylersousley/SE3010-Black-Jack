import * as Haptics from "expo-haptics";
import { useState, useEffect } from "react";
import { type Card, createDeck, drawCards, reshuffleDeck } from "@/api/deck";
import { getOutcome, handTotal, type Outcome, type Phase } from "@/utils/blackjack";

export function useBlackJack() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [phase, setPhase] = useState<Phase>("loading");
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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

  return {
    playerHand,
    dealerHand,
    phase,
    outcome,
    error,
    busy,
    hit,
    stand,
    dealAgain,
  };
}
