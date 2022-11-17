import express from 'express';
// import database from '../config/database';
const router = express.Router();

import userRoute from './user.route';
import NoteRoute from './notes.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/notes',NoteRoute);

  return router;
};

export default routes;
// database();
