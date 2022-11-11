export default class SearchTag {
  constructor(label, style) {
    this.label = label;
    this.style = style;
    this.wrapper = document.querySelector('.secondary-filters .tags');
  }

  create() {
    const tagDOM = document.createElement('div');
    tagDOM.classList.add('tag', `tag-${this.style}`, 'me-3');

    const labelDOM = document.createElement('span');
    labelDOM.classList.add('label');
    labelDOM.innerText = this.label;

    const buttonDOM = document.createElement('button');
    buttonDOM.classList.add('delete');
    buttonDOM.setAttribute('aria-label', 'Supprimer le tag');
    buttonDOM.addEventListener('click', this.handleDelete);

    tagDOM.append(labelDOM);
    tagDOM.append(buttonDOM);
    this.wrapper.append(tagDOM);
  }

  handleDelete(e) {
    e.target.parentNode.remove();
  }
}
