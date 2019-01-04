import path from 'path';
import express from 'express';
import bypassCache from '../../middleware/bypass-cache';

const router = express.Router();

/**
 * /
 * root router
 */
router.get('/', bypassCache, function(req, res){
  res.sendFile(path.join(require.main.filename, '../index.html'))
});

export default router;