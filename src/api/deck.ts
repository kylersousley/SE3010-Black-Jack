const BASE_URL = "https://deckofcardsapi.com/api/deck";

export type Card = {
  code: string;
  image: string;
  value: string;
  suit: string;
};

type NewDeckResponse = {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
};

type DrawResponse = {
  success: boolean;
  deck_id: string;
  cards: Card[];
  remaining: number;
};

export async function createDeck(): Promise<string> {
  const response = await fetch(`${BASE_URL}/new/shuffle/?deck_count=1`);
  if (!response.ok) {
    throw new Error(`Failed to create deck: ${response.status}`);
  }
  const data: NewDeckResponse = await response.json();
  return data.deck_id;
}

export async function drawCards(deckId: string, count: number): Promise<Card[]> {
  const response = await fetch(`${BASE_URL}/${deckId}/draw/?count=${count}`)
  if (!response.ok) {
    throw new Error(`Failed to draw cards: ${response.status}`)
  }
  const data: DrawResponse = await response.json()
  return data.cards;
}

export async function reshuffleDeck(deckId: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${deckId}/shuffle/`)
  if (!response.ok) {
    throw new Error(`Failed to shuffle cards: ${response.status}`)
  }
}
