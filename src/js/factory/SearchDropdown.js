export default class SearchDropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.dropdownMenu = this.dropdown.querySelector('.dropdown-menu');
    this.buttonLabelWrapper = this.dropdown.querySelector('.dd-btn-label-wrapper');
    this.buttonLabel = this.dropdown.querySelector('.button-label');
    this.form = this.dropdown.querySelector('form');
    this.input = this.form.querySelector('input');
  }

  // Set equal width between button and menu
  handleShow() {
    this.dropdown.style.width = `${this.dropdownMenu.offsetWidth}px`;
    this.buttonLabelWrapper.classList.add('open');
    this.buttonLabel.classList.add('d-none');
    this.form.classList.remove('d-none');
    this.input.focus();
    this.input.addEventListener('click', (e) => e.stopPropagation()); // TODO: fix dropdown closing on click
  }

  // Reset button width
  handleHide() {
    this.form.classList.add('d-none');
    this.buttonLabel.classList.remove('d-none');
    this.buttonLabelWrapper.classList.remove('open');
    this.dropdown.style.width = '';
  }
}
