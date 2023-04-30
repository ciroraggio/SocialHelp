export const getUniqueObjects = (arrOfObjects) =>
  [...new Set(arrOfObjects.map(JSON.stringify))].map(JSON.parse);
