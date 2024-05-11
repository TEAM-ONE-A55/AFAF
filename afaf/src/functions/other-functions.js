export const avoidPropagation = (event, func = () => {}) => {
  event.stopPropagation();
  func();
};
