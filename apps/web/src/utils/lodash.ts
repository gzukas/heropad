export * from 'lodash-es';
export { isEqual as _isEqual } from 'lodash-es';

// Reduce unzipped bundle size (-12kB) by using more compact `isEqual` needed for react-sigma.
export { default as isEqual } from 'fast-deep-equal';
