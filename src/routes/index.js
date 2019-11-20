import express from 'express';
import { fundWallet, spendFromWallet, getWalletBalance } from '../controller';

const router = express.Router();

router.post('/funds', fundWallet);
router.post('/transportation', spendFromWallet);
router.get('/funds/:id', getWalletBalance);

export default router;
