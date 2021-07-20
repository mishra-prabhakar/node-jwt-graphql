import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => res.send('Welcome'));

export default router;
