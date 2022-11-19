const { data } = require('../../../data/recipes');
let globalDataList;

module.exports = {
  Algo2,
};

function byName() {
  const list = [];

    for (const recipe of data) {
      list.push({ [recipe.name.toLowerCase()]: recipe });
    }

    return list;
}

function byIngredient() {
  const list = [];

  for (const recipe of data) {
    for (const ingredient of recipe.ingredients) {
      list.push({ [ingredient.ingredient.toLowerCase()]: recipe });
    }
  }

  return list;
}

function byDescription() {
  const list = [];

  for (const recipe of data) {
    list.push({ [recipe.description.toLowerCase()]: recipe });
  }

  return list;
}

function myIncludes(data, searchElement) {
  let match = 0;

  for (let j = 0; j < data.length; j++) {
    if (data[j] === searchElement[0]) {
      for (let k = 0; k < searchElement.length; k++) {
        if (searchElement[k] === data[j + k]) {
          match += 1;
        }
      }

      if (match === searchElement.length) {
        return true;
      }

      match = 0;
    }
  }
  return false;
}

function filterRecipes(query) {
  let res = [];

  for (const recipe of globalDataList) {
    if (myIncludes(Object.keys(recipe)[0], query.toLowerCase())) {
      res = [...res, recipe];
    }
  }

  return res;
}

function Algo2(query) {
  globalDataList = [
    ...byName(),
    ...byIngredient(),
    ...byDescription()
  ];
  
  const results = filterRecipes(query);
}
