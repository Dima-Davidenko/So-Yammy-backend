const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const updateLikeById = async (req, res) => {
  const { id: recipeId } = req.params;
  const { id } = req.user;

  const isAdd = await Recipe.find({ _id: recipeId, likes: id });
  if (isAdd.length !== 0) {
    throw HttpError(400, `Recipe with id ${recipeId} already added to liked`);
  }

  const result = await Recipe.findByIdAndUpdate(recipeId, {
    $push: { likes: id },
    $inc: { popularity: 1 },
  });
  if (!result) {
    throw HttpError(404, `Not found recipe with id ${recipeId}`);
  }

  res.status(200).json({ message: "Successfully added to your liked recipes" });
};

module.exports = updateLikeById;
