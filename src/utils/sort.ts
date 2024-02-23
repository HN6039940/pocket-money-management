// 日付を比較し降順にする関数
// export const compareDate = (data:[]) => {
//   const sortedData =  data.sort((a,b)=>{
//     if(a.date > b.date){
//       return -1
//     }else{
//       return 1
//     }
//   })
// }

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
