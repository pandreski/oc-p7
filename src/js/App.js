import * as bootstrap from 'bootstrap';
import SearchDropdown from './factory/SearchDropdown';
import SearchTag from './factory/Tag';
import { recipes } from '../../data/recipes';
import Recipe from './models/Recipe';
import RecipeCard from './templates/RecipeCard';
import Data from './models/Data';
import SearchForm from './search/SearchForm';

class App {
  constructor(data) {
    this.recipes = [];
    this.recipesWrapper = document.querySelector('.recipes-listing');
    this.recipesData = new Data(data);
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

  initTags() {
    const tags = document.querySelectorAll('.tags .tag');

    tags.forEach((tag) => {
      const tagElement = new SearchTag(tag);
    });
  }

  main() {
    this.initSearchDropdown();
    this.initTags();

    // List of data including name, ingredients and description for main search form
    const globalDataList = [
      ...this.recipesData.byName,
      ...this.recipesData.byIngredient,
      ...this.recipesData.byDescription];

    const Search = new SearchForm(globalDataList);
    Search.render();

    // Populate default listing before any sorting
    this.recipesData.byName.forEach((recipe) => {
      const Template = new RecipeCard(recipe);
      this.recipesWrapper.appendChild(Template.createRecipeCard());
    });
  }
}

const recipesApp = new App(recipes);
recipesApp.main();
