import express from 'express';

const router = express.Router();

/**
 * /
 * root router
 */
router.get('/', function(req, res){
  res.render('root', { title: 'Prism-Core' });
});

export default router;