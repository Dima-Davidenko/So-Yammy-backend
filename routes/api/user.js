const express = require('express');

const { validateBody, authenticate, upload, timeSecureRequest } = require('../../middlewares/');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/user');

const router = express.Router();

router.get('/shopping-list', authenticate, ctrl.getShoppingList);
router.post(
  '/subscribe-list',
  authenticate,
  timeSecureRequest(200),
  validateBody(schemas.emailSchema),
  ctrl.addEmailToSubscribeList
);
router.post(
  '/shopping-list',
  authenticate,
  timeSecureRequest(200),
  validateBody(schemas.product),
  ctrl.addProductToShoppingList
);
router.patch(
  '/shopping-list',
  authenticate,
  timeSecureRequest(200),
  validateBody(schemas.product),
  ctrl.removeProductTFromShoppingList
);
router.post(
  '/set-user-info',
  authenticate,
  timeSecureRequest(),
  upload.single('avatar'),
  validateBody(schemas.userNameSchema),
  ctrl.setUserData
);

module.exports = router;
