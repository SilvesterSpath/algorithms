const SUITS = '♣ ♦ ♥ ♠'.split(' ');
console.log(SUITS);
const RANKS = '2 3 4 5 6 7 8 9 10 J Q K A'.split(' ');
console.log(RANKS);

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  toString() {
    return `${this.rank}${this.suit}`;
  }
}

class Deck {
  constructor() {
    this.cards = SUITS.flatMap((suit) =>
      RANKS.map((rank) => new Card(rank, suit))
    );
  }

  size() {
    return this.cards.length;
  }

  draw() {
    return this.cards.shift();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  toString() {
    return this.cards.join(' ');
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }

  sortHand() {
    this.hand.sort((a, b) => {
      const aRankIndex = RANKS.indexOf(a.rank);
      const bRankIndex = RANKS.indexOf(b.rank);
      return aRankIndex - bRankIndex;
    });

    const grouped = {};
    this.hand.forEach((item) => {
      const suit = item.suit;
      if (!grouped[suit]) {
        grouped[suit] = [];
      }
      grouped[suit].push(item);
    });

    this.hand = Object.values(grouped).flat();
  }

  draw(deck) {
    this.hand.push(deck.draw());
  }

  toString() {
    return this.name;
  }
}

function main() {
  const players = [
    new Player('Player 1'),
    new Player('Player 2'),
    new Player('Player 3'),
    new Player('Player 4'),
  ];
  const deck = new Deck();
  deck.shuffle();

  console.log("Here's the shuffled deck:");
  console.log(deck.toString());

  // Part 1:
  // Have each player draw from the deck according to the rules above
  // Sort each player's hand and print it out
  while (deck.size() > 0) {
    for (const player of players) {
      player.draw(deck);
    }
  }
  console.log(players[0].hand.toString());
  players[0].sortHand();
  console.log(players[0].hand.toString());
  console.log(players[1].hand.toString());
  console.log(players[2].hand.toString());
  console.log(players[3].hand.toString());
}

main();

const tree = [
  {
    key: 'a1',
    value: 'a1',
    children: [
      { key: 'a21', value: 'a21', children: [] },
      { key: 'a22', value: 'a22', children: [] },
    ],
  },
  {
    key: 'b1',
    value: 'b1',
    children: [
      { key: 'b21', value: 'b21', children: [] },
      {
        key: 'b22',
        value: 'b22',
        children: [
          {
            key: 'b31',
            value: 'b31',
            children: [
              { key: 'b41', value: 'b41', children: [] },
              { key: 'b42', value: 'the-answer', children: [] },
            ],
          },
        ],
      },
    ],
  },
  { key: 'c3', value: 'c3', children: [] },
];

/// value = the-answer, path = 1-1-0-1

function getAnswer2(tree, nodes = [], path = '') {
  for (let i = 0; i < nodes.length; i++) {
    const item = nodes[i];
    const newPath = path ? `${path}-${i}` : `${i}`;

    if (item.value === 'the-answer') {
      return `value = ${item.value}, path = ${newPath}`;
    }

    const answer = getAnswer2(tree, item.children, newPath);

    if (answer !== null) {
      return answer;
    }
  }
  return null;
}

function getAnswer3(tree) {
  const stack = [];
  stack.push({ nodes: tree, path: '' });

  /* console.log(JSON.stringify(stack, null, 2)); */
  while (stack.length > 0) {
    const { nodes, path } = stack.pop();

    for (let i = nodes.length - 1; i >= 0; i--) {
      const item = nodes[i];
      const newPath = path ? `${path}-${i}` : `${i}`;

      if (item.value === 'the-answer') {
        return `value = ${item.value}, path = ${newPath}`;
      }

      if (item.children && item.children.length > 0) {
        stack.push({ nodes: item.children, path: newPath });
      }
    }
  }
  return null;
}

console.log(getAnswer2(tree, tree));
console.log(getAnswer3(tree));
