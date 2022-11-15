/**
 * Uppercase the first letter of all elements from the list given as parameter.
 *
 * @param {Array} list  Array of string elements
 * @returns {Array}     Array of string elements
 */
export function upperCaseList(list) {
  return list.map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1));
}

/**
 * Lowercase all elements from the list given as parameter.
 *
 * @param {Array} list  Array of string elements
 * @returns {Array}     Array of string elements
 */
export function lowerCaseList(list) {
  return list.map((elem) => elem.toLowerCase());
}

/**
* Delete duplicated elements from the list.
* Uppercase the first letter of each element.
*
* @param {Array} list   Array of objects with value as key
* @returns {Array}      Array of single key elements
*/
export function getUniqueElements(list) {
  let uniqueData = list.map((elem) => Object.keys(elem)[0]);
  uniqueData = [...new Set(uniqueData)];
  uniqueData = upperCaseList(uniqueData);
  return uniqueData;
}
