export function removeAllExceptFirst(value: string, character: string) {
	const index = value.indexOf(character);
	if (index === -1) {
		return value;
	}

	return (
		value.slice(0, index + 1) + value.slice(index).replaceAll(character, "")
	);
}
