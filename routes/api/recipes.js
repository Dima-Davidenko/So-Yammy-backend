const express = require("express");

const ctrl = require("../../controllers/recipes");

const { authenticate, isValidId, validateBody } = require("../../middlewares");
// const { schemas } = require("../../models/recipe");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);
router.get("/category/list", authenticate, ctrl.getAllCategories);
router.get("/category/:category", authenticate, ctrl.getRecipesByCategory);

router.get("/:id", authenticate, isValidId, ctrl.getById);

// router.post('/private', authenticate, createIngrDB);

// router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

// router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

router.patch("/:id/favorite", authenticate, isValidId, ctrl.updateFavoriteById);
router.patch("/:id/like", authenticate, isValidId, ctrl.updateLikeById);
router.delete("/:id/like", authenticate, isValidId, ctrl.deleteLikeById);
router.delete(
  "/:id/favorite",
  authenticate,
  isValidId,
  ctrl.deleteFavoriteById
);

module.exports = router;
