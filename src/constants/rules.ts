// Content for the How to Play screen. Keep this in sync with the game logic in utils/blackjack.ts.
export type RuleSection = {
  title: string;
  points: string[];
};

export const RULES: RuleSection[] = [
  {
    title: "Goal",
    points: [
      "Finish with a hand closer to 21 than the dealer's.",
      "Go over 21 and you bust, which means you lose the round.",
    ],
  },
  {
    title: "Card values",
    points: [
      "Number cards (2–10) are worth their number.",
      "Jack, Queen, and King are worth 10.",
      "Aces are worth 11.",
    ],
  },
  {
    title: "Your turn",
    points: [
      "You and the dealer each get two cards. One of the dealer's cards stays face down.",
      "Tap Hit to draw another card.",
      "Tap Stand to keep your hand and end your turn.",
    ],
  },
  {
    title: "Dealer's turn",
    points: [
      "The dealer reveals their hidden card.",
      "The dealer keeps drawing until their total is 17 or higher.",
    ],
  },
  {
    title: "Winning",
    points: [
      "If you bust, you lose, even if the dealer would have busted too.",
      "If the dealer busts, you win.",
      "Otherwise, the higher total wins. Equal totals are a tie (a \"push\").",
    ],
  },
];
