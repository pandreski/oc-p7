export default class Data {
  constructor(data) {
    this.data = data;
  }

  get byName() {
    const list = [];

    for (const recipe of this.data) {
      list.push({ [recipe.name.toLowerCase()]: recipe });
    }

    return list;
  }

  get byIngredient() {
    const list = [];

    for (const recipe of this.data) {
      for (const ingredient of recipe.ingredients) {
        list.push({ [ingredient.ingredient.toLowerCase()]: recipe });
      }
    }

    return list;
  }

  get byAppliance() {
    const list = [];

    for (const recipe of this.data) {
      list.push({ [recipe.appliance.toLowerCase()]: recipe });
    }

    return list;
  }

  get byUstensil() {
    const list = [];

    for (const recipe of this.data) {
      for (const ustensil of recipe.ustensils) {
        list.push({ [ustensil.toLowerCase()]: recipe });
      }
    }

    return list;
  }

  get byDescription() {
    const list = [];

    for (const recipe of this.data) {
      list.push({ [recipe.description.toLowerCase()]: recipe });
    }

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
