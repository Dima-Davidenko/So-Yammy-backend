const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");
const { User } = require("../../models/user");

const updateLikeById = async (req, res) => {
  const { id } = req.params;
  const { likeId } = req.body;
  const user = await User.findById(id);
  if (!user) {
    throw HttpError(404, `User with id ${id} was not found`);
  }

  const result = await Recipe.findByIdAndUpdate(likeId, {
    $push: { likes: id },
    $inc: { popularity: 1 },
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "Successfully added to your liked recipes" });
};

module.exports = updateLikeById;
