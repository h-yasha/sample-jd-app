import { removeAllExceptFirst } from "./removeAllExceptFirst";

export function preventNonNumericInputs(
	event: Event & { currentTarget: HTMLInputElement; target: Element },
	options?: {
		min?: number;
		max?: number;
		// minDecimal?: number;
		maxDecimal?: number;
	},
) {
	if (event) {
		event.preventDefault();

		let value = event.currentTarget.value;
		// remove all non digits or decimal point
		value = value.replace(/[^\d\.]/g, "");

		// remove decimal separator after first one. https://stackoverflow.com/a/58306460
		value = removeAllExceptFirst(value, ".");

		// resolve options.maxDecimal
		const decimalSeparatorIndex = value.indexOf(".");
		if (
			decimalSeparatorIndex !== -1 &&
			typeof options?.maxDecimal !== "undefined"
		) {
			if (options.maxDecimal === 0) {
				value = value.substring(0, decimalSeparatorIndex);
			} else {
				value = value.substring(
					0,
					decimalSeparatorIndex + options.maxDecimal + 1,
				);
			}
		}

		const numericValue = +value;

		if (typeof options?.min === "number" && numericValue < options.min) {
			value = options.min.toString();
		}

		if (typeof options?.max === "number" && numericValue > options.max) {
			console.log(numericValue > options.max);
			value = options.max.toString();
		}

		let range: [number, number] | undefined = undefined;
		// add leading 0 (or when empty)
		if (value.startsWith(".") || value.length === 0) {
			value = `0${value}`;
			range = [1, 1];
		}
		// clear leading 0
		else if (
			value.startsWith("0") &&
			!value.startsWith("0.") &&
			value.length > 1
		) {
			range = [1, 1];
			value = value.substring(1);
		}

		return { value, range };
	}

	return { value: options?.min?.toString() ?? "0" };
}
