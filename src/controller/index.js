/* eslint-disable camelcase */
const wallet = {
  1: { balance: 0.00 },
  2: { balance: 0.00 },
  3: { balance: 0.00 },
  4: { balance: 0.00 },
};

const spaceStations = {
  abuja: { name: 'abuja', type: 'natural', orbit: 'earth' },
  moon: { name: 'moon', type: 'natural', orbit: 'earth' },
  spock: { name: 'spock', type: 'natural', orbit: 'mars' },
  iss: { name: 'iss', type: 'manmade', orbit: 'earth' },
};

const rockets = ['falcon 1', 'falcon 9'];

const priceTable = {
  'inter-orbit': { 'falcon 1': 250, 'falcon 9': 500 },
  'intra-orbit': { 'falcon 1': 50, 'falcon 9': 100 },
  royalty: { 'falcon 1': 200, 'falcon 9': 200 },
};

export const fundWallet = (req, res) => {
  const { customer_id, amount } = req.body;

  if (wallet[customer_id]) {
    const initialBalance = wallet[customer_id].balance;
    wallet[customer_id].balance = initialBalance + amount;
  } else {
    wallet[customer_id] = { balance: amount };
  }

  res.status(200).json({ status: 'success', balance: wallet[customer_id].balance });
};

export const spendFromWallet = (req, res) => {
  const {
    customer_id, from, to, rocket,
  } = req.body;

  if (!spaceStations[from] || !spaceStations[to]) return res.status(400).json({ status: 'failed', error: 'space station(s) is unavailable' });
  if (!rockets.includes(rocket)) return res.status(400).json({ status: 'failed', error: 'rocket not available' });

  const journey = spaceStations[from].orbit === spaceStations[to].orbit ? 'intra-orbit' : 'inter-orbit';
  const royalty = spaceStations[to].type === 'manmade' ? priceTable.royalty[rocket] : 0;
  const bill = priceTable[journey][rocket] + royalty;

  const initialBalance = wallet[customer_id].balance;
  if (bill > initialBalance) return res.status(400).status({ status: 'failed', message: 'insufficient funds' });

  wallet[customer_id].balance = initialBalance - bill;
  return res.status(200).json({ bill, balance: wallet[customer_id].balance, status: 'success' });
};

export const getWalletBalance = (req, res) => {
  const { id } = req.params;

  if (!wallet[id]) return res.status(404).json({ status: 'failed', error: 'customer id does not exist' });
  const { balance } = wallet[id];

  return res.status(200).json({ balance, status: 'success' });
};
