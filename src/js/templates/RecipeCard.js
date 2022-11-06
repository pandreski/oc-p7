import image from '../../assets/images/recipe.png';

export default class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  get recipeElement() {
    return this.recipe;
  }

  ingredientFormatter(ingredient) {
    return `
      <li>
        <strong>${ingredient.ingredient} :</strong> 
        ${ingredient.hasOwnProperty('quantity') ? ingredient.quantity : ''} ${ingredient.hasOwnProperty('unit') ? ingredient.unit : ''}
      </li>`;
  }

  createRecipeCard() {
    const cardWrapper = document.createElement('article');
    cardWrapper.classList.add('card');
    const recipeCard = `
      <picture>
        <img src="${image}" class="card-img-top" alt="${this.recipe.name}">
      </picture>
      <div class="card-body">
        <header class="row">
          <h2 class="card-title">${this.recipe.name}</h2>
          <div class="card-time">${this.recipe.time} min</div>
        </header>
        <div class="row mt-3">
          <div class="col-6">
            <ul class="card-ingredients">
              ${this.recipe.ingredients.map(this.ingredientFormatter).join('')}
            </ul>
          </div>
          <div class="col-6">
            <p class="card-text">${this.recipe.description}</p>
          </div>
        </div>
      </div>
    `;

    cardWrapper.innerHTML = recipeCard;
    return cardWrapper;
  }
}
