const { Schema, model } = require('mongoose');

const Joi = require('joi');

const { mongooseHandleError } = require('../helpers');

const recipeSchema = new Schema(
  {
    originalId: String,
    title: {
      type: String,
      required: [true, 'Set name for recipe'],
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    time: {
      type: String,
      default: '',
    },
    popularity: {
      type: Number,
      default: 0,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    youtube: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    ingridients: {
      _id: false,
      type: [
        {
          title: {
            type: String,
            default: '',
          },
          measure: {
            type: String,
            default: '',
          },
        },
      ],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post('save', mongooseHandleError);

const addSchema = Joi.object({});

const schemas = {
  addSchema,
};

const Recipe = model('recipe', recipeSchema);

module.exports = { Recipe, schemas };
