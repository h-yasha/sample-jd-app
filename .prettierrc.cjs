/**
 * @type {import("prettier").Config}
 * setup to be inline with rome defaults.
 */
const config = {
	tabWidth: 2,
	useTabs: true,
	semi: true,
	printWidth: 80,
	singleQuote: false,
	quoteProps: "as-needed",
	trailingComma: "all",
};

module.exports = config;
