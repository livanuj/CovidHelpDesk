export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const camelCase = (string) => {
  if (!string) { return string }

  return String(string).replace(/(_\w)/g, (m) => {
    return m[1].toUpperCase();
  });
}

export const snakeCase = (string) => {
  if (!string) { return string }

  return String(string).replace(/[\w]([A-Z])/g, (m) => {
    return m[0] + "_" + m[1];
  }).toLowerCase();
}

export const convertKeysToCamelCase = (object) => {
  if (!object) { return object }

  if (object.constructor === Array) {
    return convertArrayKeysToCamelCase(object)
  } else if (object.constructor === Object) {
    return convertObjectKeysToCamelCase(object)
  } else {
    return object
  }
}

export const convertKeysToSnakeCase = (object) => {
  if (!object) { return object }

  if (object.constructor === Array) {
    return convertArrayKeysToSnakeCase(object)
  } else if (object.constructor === Object) {
    return convertObjectKeysToSnakeCase(object)
  } else {
    return object
  }
}

const convertObjectKeysToCamelCase = (object) => {
  return Object.keys(object).reduce((accumulator, key) => {
    const camelCaseKey = camelCase(String(key))
    let value = object[key]
    if (value) {
      if (value.constructor === Array) {
        value = convertArrayKeysToCamelCase(value)
      } else if (value.constructor === Object) {
        value = convertObjectKeysToCamelCase(value)
      } 
    }
    accumulator[camelCaseKey] = value
    return accumulator
  }, {})
}

const convertArrayKeysToCamelCase = (array) => {
  return array.map(elem => {
    if (elem) {
      if (elem.constructor === Array) {
        return convertArrayKeysToCamelCase(elem)
      } else if (elem.constructor === Object) {
        return convertObjectKeysToCamelCase(elem)
      }
    }
    return elem
  })
}

const convertObjectKeysToSnakeCase = (object) => {
  return Object.keys(object).reduce((accumulator, key) => {
    const snakeCaseKey = snakeCase(String(key))
    let value = object[key]
    if (value) {
      if (value.constructor === Array) {
        value = convertArrayKeysToSnakeCase(value)
      } else if (value.constructor === Object) {
        value = convertObjectKeysToSnakeCase(value)
      }
    }
    accumulator[snakeCaseKey] = value
    return accumulator
  }, {})
}

const convertArrayKeysToSnakeCase = (array) => {
  return array.map(elem => {
    if (elem) {
      if (elem.constructor === Array) {
        return convertArrayKeysToSnakeCase(elem)
      } else if (elem.constructor === Object) {
        return convertObjectKeysToSnakeCase(elem)
      }
    }
    return elem
  })
}
