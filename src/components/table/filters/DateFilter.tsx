import { FilterFn } from "@tanstack/solid-table";

// rome-ignore lint/suspicious/noExplicitAny: generic
export const dateFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
	if (!Array.isArray(filterValue)) {
		return true;
	}

	const rowValue = row.getValue<Date>(columnId);

	if (!(rowValue instanceof Date)) {
		return false;
	}

	const [from, to] = filterValue;

	return (
		// lte
		(to instanceof Date ? to >= rowValue : true) &&
		// gte
		(from instanceof Date ? from <= rowValue : true)
	);
};
