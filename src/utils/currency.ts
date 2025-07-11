/**
 * Formats a number as Indian Rupees
 * @param amount The amount to format
 * @returns Formatted currency string with ₹ symbol
 */
export const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
};