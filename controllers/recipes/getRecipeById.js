const { HttpError } = require('../../helpers');
const { Recipe } = require('../../models/recipe');
const { Ingredient } = require('../../models/ingredient');

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id, null, { lean: true }).populate({
    path: 'ingredients.id',
    model: Ingredient,
  });
  if (!result) {
    throw HttpError(404, `Recipe with ${id} was not found`);
  }
  result.ingredients.forEach(ingr => {
    ingr.title = ingr.id.ttl;
    ingr.desc = ingr.id.desc;
    ingr.thumb = ingr.id.thb;
    ingr._id = ingr.id._id;
    delete ingr.id;
  });
  const {
    _id,
    title,
    category,
    description,
    area,
    instructions,
    thumb,
    time,
    popularity,
    youtube,
    tags,
    ingredients,
    favorites,
    likes,
    preview,
  } = result;
  const like = likes.some(item => {
    return String(item._id) === String(req.user._id);
  });
  const favorite = favorites.some(item => {
    return String(item._id) === String(req.user._id);
  });
  res.json({
    _id,
    title,
    category,
    description,
    instructions,
    ingredients,
    time,
    popularity,
    favorite,
    like,
    previewImg: preview,
    fullImage: thumb,
    area,
    tags,
    youtube,
  });
};

module.exports = getRecipeById;
