export const sortArrayTitleAsc = (x, y) => {
  return x.title.localeCompare(y.title);
};
export const sortArrayTitleDesc = (x, y) => {
  return -x.title.localeCompare(y.title, "es", { ignorePuntuation: true });
};
export const sortArrayPriceAsc = (x, y) => {
  if (x.price < y.price) return -1;
  else return 1;
};
export const sortArrayPriceDesc = (x, y) => {
  if (x.price > y.price) return -1;
  else return 1;
};
export const sortArrayDefault = (x, y) => {
  return x.id - y.id
};
