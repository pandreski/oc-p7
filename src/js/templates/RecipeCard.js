import image from '../../assets/images/recipe.png';
import Recipe from '../models/Recipe';

export default class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  get recipeElement() {
    return this.recipe;
  }

  ingredientFormatter(ingredients) {
    let DOMIngredients = '';

    for (const ingredient of ingredients) {
      DOMIngredients += `
        <li>
          <strong>${ingredient.ingredient}</strong> 
          ${ingredient.hasOwnProperty('quantity') ? ` : ${ingredient.quantity}` : ''} ${ingredient.hasOwnProperty('unit') ? ingredient.unit : ''}
        </li>`;
    }

    return DOMIngredients;
  }

  createRecipeCard() {
    const keyLabel = Object.keys(this.recipe)[0];
    const recipe = new Recipe(this.recipe[keyLabel]);
    const cardWrapper = document.createElement('article');
    cardWrapper.classList.add('card');
    const recipeCard = `
      <picture>
        <img src="${image}" class="card-img-top" alt="${recipe.name}">
      </picture>
      <div class="card-body">
        <header class="row">
          <h2 class="card-title">${recipe.name}</h2>
          <div class="card-time">${recipe.time} min</div>
        </header>
        <div class="row mt-3">
          <div class="col-6">
            <ul class="card-ingredients">
              ${this.ingredientFormatter(recipe.ingredients)}
            </ul>
          </div>
          <div class="col-6">
            <p class="card-text">${recipe.description}</p>
          </div>
        </div>
      </div>
    `;

    cardWrapper.innerHTML = recipeCard;
    return cardWrapper;
  }
}
