import path from 'path';
import express from 'express';
import bypassCache from '../../middleware/bypass-cache';

const router = express.Router();

/**
 * /
 * root router
 */
router.get('/', bypassCache, function(req, res){
  res.send('Hello World');
});

export default router;