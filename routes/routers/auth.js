import express from 'express';
import accountkit from '../../middleware/accountkit/accountkit'

const router = express.Router();

router.get('/', accountkit.logIn)

router.post('/success', accountkit.logInSuccess)

export default router;