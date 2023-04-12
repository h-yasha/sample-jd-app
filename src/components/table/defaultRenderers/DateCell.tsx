import type { CellContext } from "@tanstack/solid-table";
import { DateTime } from "luxon";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function DateCell<T extends CellContext<any, unknown>>(props: T) {
	const dateTime = () => {
		const value = props.getValue();
		return value instanceof DateTime
			? value
			: value instanceof Date
			? DateTime.fromJSDate(value)
			: typeof value === "string"
			? DateTime.fromISO(value)
			: DateTime.invalid("Invalid Date");
	};

	return <>{dateTime().toFormat("ff")}</>;
}

export default DateCell;
