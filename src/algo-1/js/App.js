const { data } = require('../../../data/recipes');
let globalDataList;

module.exports = {
  Algo1,
};

function byName() {
  const list = [];

  data.forEach((recipe) => {
    list.push({ [recipe.name.toLowerCase()]: recipe });
  });

  return list;
}

function byIngredient() {
  const list = [];

  data.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      list.push({ [ingredient.ingredient.toLowerCase()]: recipe });
    });
  });

  return list;
}

function byDescription() {
  const list = [];

  data.forEach((recipe) => {
    list.push({ [recipe.description.toLowerCase()]: recipe });
  });

  return list;
}

function filterRecipes(query) {
  let res = [];

  globalDataList.forEach((recipe) => {
    if (Object.keys(recipe)[0].includes(query.toLowerCase())) {
      res = [...res, recipe];
    }
  });

  return res;
}

function Algo1(query) {
  globalDataList = [
    ...byName(),
    ...byIngredient(),
    ...byDescription()
  ];
  
  const results = filterRecipes(query);
}
