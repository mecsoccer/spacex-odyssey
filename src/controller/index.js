/* eslint-disable camelcase */
const wallet = {
  1: { balance: 0 },
  2: { balance: 0 },
  3: { balance: 0 },
  4: { balance: 0 },
};

const spaceStations = {
  abuja: { name: 'abuja', type: 'natural', orbit: 'earth' },
  moon: { name: 'moon', type: 'natural', orbit: 'earth' },
  spock: { name: 'spock', type: 'natural', orbit: 'mars' },
  iss: { name: 'iss', type: 'manmade', orbit: 'earth' },
};

const priceTable = {
  'inter-orbit': { 'falcon 1': 250, 'falcon 9': 500 },
  'intra-orbit': { 'falcon 1': 50, 'falcon 9': 100 },
  royalty: { 'falcon 1': 200, 'falcon 9': 200 },
};

export const fundWallet = (req, res) => {
  const { customer_id, amount } = req.body;

  if (wallet[customer_id]) {
    wallet[customer_id].balance += amount;
  } else {
    wallet[customer_id] = { balance: amount };
  }

  res.status(200).json({ status: 'success', balance: wallet[customer_id].balance });
};

export const spendFromWallet = (req, res) => {
  const {
    customer_id, from, to, rocket,
  } = req.body;

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
  const { balance } = wallet[id];
  res.status(200).json({ balance, status: 'success' });
};
