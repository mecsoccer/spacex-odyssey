import express from 'express';
import { fundWallet, spendFromWallet, getWalletBalance } from '../controller';
import { validateFunding, validateJourney } from '../middlewares/validation';

const router = express.Router();

router.post('/funds', validateFunding, fundWallet);
router.post('/transportation', validateJourney, spendFromWallet);
router.get('/funds/:id', getWalletBalance);

export default router;
