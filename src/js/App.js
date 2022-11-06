import * as bootstrap from 'bootstrap';
import SearchDropdown from './factory/SearchDropdown';
import SearchTag from './factory/Tag';
import { recipes } from '../../data/recipes';
import RecipeDataAdapter from './adapters/RecipeDataAdapter';
import Recipe from './models/Recipe';
import RecipeCard from './templates/RecipeCard';
import DropdownList from './factory/DropdownList';

class App {
  constructor(data) {
    this.recipes = [];
    this.recipesWrapper = document.querySelector('.recipes-listing');
    this.recipesAdapter = new RecipeDataAdapter(data);
    this.recipesData = this.recipesAdapter.formattedData;
  }

  initSearchDropdown() {
    const dropdownElements = document.querySelectorAll('.dropdown');
    const dropdownList = new DropdownList(this.recipesData);

    dropdownElements.forEach((dropdown) => {
      const searchDropdown = new SearchDropdown(dropdown);

      // Get initial list of options for the current dropdown
      const options = dropdownList.getList(dropdown.getAttribute('data-identifier'));

      // Insert options in the dropdown
      searchDropdown.updateList(options);

      dropdown.addEventListener('shown.bs.dropdown', () => {
        searchDropdown.handleShow();
      });

      dropdown.addEventListener('hide.bs.dropdown', () => {
        searchDropdown.handleHide();
      });
    });
  }

  fetchRecipes() {
    this.recipesData.forEach((recipe) => {
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
