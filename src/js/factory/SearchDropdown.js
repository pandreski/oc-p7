export default class SearchDropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.dropdownButton = this.dropdown.querySelector('.dropdown-toggle');
    this.dropdownMenu = this.dropdown.querySelector('.dropdown-menu');
    this.buttonLabel = this.dropdownButton.querySelector('.button-label');
    this.identifier = this.dropdown.getAttribute('data-identifier');
    this.form = this.dropdownButton.querySelector('form');
    this.input = this.form.querySelector('input');
  }

  // Set equal width between button and menu
  handleShow() {
    this.dropdownButton.style.width = `${this.dropdownMenu.offsetWidth}px`;
    this.buttonLabel.classList.add('d-none');
    this.form.classList.remove('d-none');
    this.input.focus();
    // this.input.addEventListener('keydown', this.handleInput);
    this.input.addEventListener('click', (e) => e.stopPropagation()); // TODO: fix dropdown closing on click
  }

  // Reset button width
  handleHide() {
    this.form.classList.add('d-none');
    this.buttonLabel.classList.remove('d-none');
    this.dropdownButton.style.width = '';
  }

  // handleInput(e) {
  //   if (e.code === 'Space') {
  //     e.preventDefault();
  //     e.target.value += ' ';
  //   }
  // }
}
