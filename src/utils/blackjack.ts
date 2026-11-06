// Pure game logic. There's no React or API code here, so it's easy to test.
import type { Card } from "@/api/deck";

const BLACK_JACK_VALUES: Record<string, number> = {
  "JACK": 10,
  "QUEEN": 10,
  "KING": 10,
  "ACE": 11
}

export function cardValue(card: Card): number {
  if (Object.hasOwn(BLACK_JACK_VALUES, card.value)) {
    return BLACK_JACK_VALUES[card.value]
  } else {
    return Number(card.value)
  }
}

export function handTotal(hand: Card[]): number {
  let total = 0
  for (let i=0; i < hand.length; i++) {
    total += cardValue(hand[i])
  }
  return total;
}

export type Outcome = "player-bust" | "dealer-bust" | "player-win" | "dealer-win" | "push";

export function getOutcome(playerHand: Card[], dealerHand: Card[]): Outcome {
  if (handTotal(playerHand) > 21) {
    return "player-bust"
  } else if (handTotal(dealerHand) > 21) {
    return "dealer-bust"
  } else if (handTotal(playerHand) > handTotal(dealerHand)) {
    return "player-win"
  } else if (handTotal(playerHand) < handTotal(dealerHand)) {
    return "dealer-win"
  } else {
    return "push"
  }
}
