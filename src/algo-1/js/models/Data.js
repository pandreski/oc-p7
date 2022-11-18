export default class Data {
  constructor(data) {
    this.data = data;
  }

  get byName() {
    const list = [];

    this.data.forEach((recipe) => {
      list.push({ [recipe.name.toLowerCase()]: recipe });
    });

    return list;
  }

  get byIngredient() {
    const list = [];

    this.data.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        list.push({ [ingredient.ingredient.toLowerCase()]: recipe });
      });
    });

    return list;
  }

  get byAppliance() {
    const list = [];

    this.data.forEach((recipe) => {
      list.push({ [recipe.appliance.toLowerCase()]: recipe });
    });

    return list;
  }

  get byUstensil() {
    const list = [];

    this.data.forEach((recipe) => {
      recipe.ustensils.forEach(((ustensil) => {
        list.push({ [ustensil.toLowerCase()]: recipe });
      }));
    });

    return list;
  }

  get byDescription() {
    const list = [];

    this.data.forEach((recipe) => {
      list.push({ [recipe.description.toLowerCase()]: recipe });
    });

    return list;
  }

  get full() {
    let list = [];

    list = [
      ...this.byName,
      ...this.byIngredient,
      ...this.byAppliance,
      ...this.byUstensil,
      ...this.byDescription];

    return list;
  }
}
