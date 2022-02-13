module.exports = (currency) => {
	const currencyWithoutEuro = currency.slice(0, -1);
	const currencyWithoutSpaces = currencyWithoutEuro.replace(/\s/g, '');
	const currencyWithoutComma = currencyWithoutSpaces.replace(',', '.');

	return Number(currencyWithoutComma);
};