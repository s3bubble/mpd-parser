import { from } from './list';

const isObject = (obj) => {
  return !!obj && typeof obj === 'object';
};

export const merge = (...objects) => {

  return objects.reduce((result, source) => {

    Object.keys(source).forEach(key => {

      if (Array.isArray(result[key]) && Array.isArray(source[key])) {
        result[key] = result[key].concat(source[key]);
      } else if (isObject(result[key]) && isObject(source[key])) {
        result[key] = merge(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    });
    return result;
  }, {});
};

export const getAttributes = el => {
  if (!(el && el.attributes)) {
    return {};
  }

  return from(el.attributes)
    .reduce((a, e) => {
      a[e.name] = e.value;

      return a;
    }, {});
};
