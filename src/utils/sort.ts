export const sortQuantity = (
  data: { label: string; value: number; quantity: number }[],
) => {
  return data.sort((a, b) => {
    if (a.quantity > b.quantity) {
      return -1;
    } else {
      return 1;
    }
  });
};
