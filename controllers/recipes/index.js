const { ctrlWrapper } = require("../../helpers");
const getAll = require("./getAll");
const getRecipeById = require("./getRecipeById");
const getAllCategories = require("./getAllCategories");
const getRecipesByCategory = require("./getRecipesByCategory");
const updateFavoriteById = require("./updateFavoriteById");
const updateLikeById = require("./updateLikeById");
const deleteFavoriteById = require("./deleteFavoriteById");
const deleteLikeById = require("./deleteLikeById");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getRecipeById),
  getAllCategories: ctrlWrapper(getAllCategories),
  getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  updateLikeById: ctrlWrapper(updateLikeById),
  deleteFavoriteById: ctrlWrapper(deleteFavoriteById),
  deleteLikeById: ctrlWrapper(deleteLikeById),
};
