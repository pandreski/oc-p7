/**
 * Uppercase the first letter of all elements from the list given as parameter.
 *
 * @param {Array} list  Array of string elements
 * @returns {Array}     Array of string elements
 */
export function upperCaseList(list) {
  const data = [];

  for (const elem of list) {
    data.push(elem.charAt(0).toUpperCase() + elem.slice(1));
  }

  return data;
}

/**
 * Lowercase all elements from the list given as parameter.
 *
 * @param {Array} list  Array of string elements
 * @returns {Array}     Array of string elements
 */
export function lowerCaseList(list) {
  const data = [];

  for (const elem of list) {
    data.push(elem.toLowerCase());
  }

  return data;
}

/**
* Delete duplicated elements from the list.
* Uppercase the first letter of each element.
*
* @param {Array} list   Array of objects with value as key
* @returns {Array}      Array of single key elements
*/
export function getUniqueElements(list) {
  let uniqueData = [];

  for (const elem of list) {
    uniqueData.push(Object.keys(elem)[0]);
  }

  uniqueData = [...new Set(uniqueData)];
  uniqueData = upperCaseList(uniqueData);
  return uniqueData;
}

/**
 * Custom function to search an element into an array.
 * Returns true if `searchElement` as been found in `data`, false either.
 *
 * @param {Array} data          An array to search in
 * @param {Any} searchElement   The element to search for
 * @returns {Boolean}
 */
export function myInArray(data, searchElement) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === searchElement) {
      return true;
    }
  }

  return false;
}

/**
 * Custom function to search an element into a string.
 * Returns true if `searchElement` as been found in `data`, false either.
 *
 * @param {String} data           A string to search in
 * @param {String} searchElement  The element to search for
 * @returns {Boolean}
 */
export function myIncludes(data, searchElement) {
  let match = 0;

  for (let j = 0; j < data.length; j++) {
    if (data[j] === searchElement[0]) {
      for (let k = 0; k < searchElement.length; k++) {
        if (searchElement[k] === data[j + k]) {
          match += 1;
        }
      }

      if (match === searchElement.length) {
        return true;
      }

      match = 0;
    }
  }
  return false;
}
