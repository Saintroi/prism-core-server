import express from 'express';
import bypassCache from '../../middleware/bypass-cache';

const router = express.Router();

/**
 * /
 * root router
 */
router.post('/', bypassCache, function(req, res){
  res.send('../../index.html')
});

export default router;