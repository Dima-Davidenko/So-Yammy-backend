const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const deleteLikeById = async (req, res) => {
  const { id: recipeId } = req.params;
  const { id } = req.user;

  const isDeleted = await Recipe.find({ _id: recipeId, likes: id });
  if (isDeleted.length === 0) {
    throw HttpError(
      400,
      `Recipe with id ${recipeId} already delete from your liked list`
    );
  }

  const result = await Recipe.findByIdAndUpdate(recipeId, {
    $pull: { likes: id },
    $inc: { popularity: -1 },
  });
  console.log(result);
  if (!result) {
    throw HttpError(404, `Not found recipe with id ${recipeId}`);
  }

  res
    .status(200)
    .json({ message: "Successfully delete from your liked recipes" });
};

module.exports = deleteLikeById;
