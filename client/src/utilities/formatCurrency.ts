
export const formatCurrency = (number: number) => {
  return number?.toLocaleString('he-IL', {currency: 'ILS', style: 'currency'});
}