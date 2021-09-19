import { Router } from 'express';

import { getAllCustomer, addCustomer } from '@/repository/customer';

export default (router: Router): void => {
  router.get('/customers', async (_, res) => {
    res.json(await getAllCustomer());
  });
  router.post('/customers', async (req, res) => {
    await addCustomer(req.body.name);
    res.status(204).send();
  });
};
