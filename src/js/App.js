import * as bootstrap from 'bootstrap';
import SearchDropdown from './factory/SearchDropdown';
import SearchTag from './factory/Tag';
import { recipes } from '../../data/recipes';
import Recipe from './models/Recipe';
import RecipeCard from './templates/RecipeCard';
import Data from './models/Data';

class App {
  constructor(data) {
    this.recipes = [];
    this.recipesWrapper = document.querySelector('.recipes-listing');
    this.recipesData = new Data(data);

    // console.log(this.recipesData.byName);
    // console.log(this.recipesData.byIngredient);
    // console.log(this.recipesData.byAppliance);
    // console.log(this.recipesData.byUstensil);
    // console.log(this.recipesData.byDescription);
  }

  initSearchDropdown() {
    const dropdownElements = document.querySelectorAll('.dropdown');

    dropdownElements.forEach((dropdown) => {
      const searchDropdown = new SearchDropdown(dropdown);
      const identifier = dropdown.getAttribute('data-identifier');

      switch (identifier) {
        case 'ingredients':
          searchDropdown.updateList(this.recipesData.byIngredient);
          break;
        case 'appliance':
          searchDropdown.updateList(this.recipesData.byAppliance);
          break;
        case 'ustensils':
          searchDropdown.updateList(this.recipesData.byUstensil);
          break;
        default:
          break;
      }

      dropdown.addEventListener('shown.bs.dropdown', () => {
        searchDropdown.handleShow();
      });

      dropdown.addEventListener('hide.bs.dropdown', () => {
        searchDropdown.handleHide();
      });
    });
  }

  fetchRecipes() {
    this.recipesData.byName.forEach((recipe) => {
      const keyLabel = Object.keys(recipe)[0];
      const recipeElement = new Recipe(recipe[keyLabel]);

      this.recipes = [...this.recipes, recipeElement];
    });
  }

  initTags() {
    const tags = document.querySelectorAll('.tags .tag');

    tags.forEach((tag) => {
      const tagElement = new SearchTag(tag);
    });
  }

  main() {
    this.initSearchDropdown();
    this.initTags();
    this.fetchRecipes();

    this.recipes.forEach((recipe) => {
      const Template = new RecipeCard(recipe);
      this.recipesWrapper.appendChild(Template.createRecipeCard());
    });
  }
}

const recipesApp = new App(recipes);
recipesApp.main();
