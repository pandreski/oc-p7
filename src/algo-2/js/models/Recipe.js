export default class Recipe {
  constructor(data) {
    this.recipe_id = data.id;
    this.recipe_name = data.name;
    this.recipe_servings = data.servings;
    this.recipe_ingredients = data.ingredients;
    this.recipe_time = data.time;
    this.recipe_description = data.description;
    this.recipe_appliance = data.appliance;
    this.recipe_ustensils = data.ustensils;
  }

  get id() {
    return this.recipe_id;
  }

  get name() {
    return this.recipe_name;
  }

  get servings() {
    return this.recipe_servings;
  }

  get ingredients() {
    return this.recipe_ingredients;
  }

  get time() {
    return this.recipe_time;
  }

  get description() {
    let previewDesc = this.recipe_description.substring(0, 169);
    previewDesc += '...';
    return previewDesc;
  }

  get appliance() {
    return this.recipe_appliance;
  }

  get ustensils() {
    return this.recipe_ustensils;
  }

  get ingredientsName() {
    const names = [];
    for (const element of this.recipe_ingredients) {
      names.push(element.ingredient);
    }
    return names;
  }
}
