function pageSizeGenerator(itemCount: number) {
	const items = new Set<number>();

	const places = itemCount.toString().length;

	for (let i = 1; i < places; i++) {
		const zeros = "0".repeat(i);

		items.add(parseInt(`${1}${zeros}`));
		items.add(parseInt(`${2}${zeros}`));
		items.add(parseInt(`${3}${zeros}`));
		items.add(parseInt(`${4}${zeros}`));
		items.add(parseInt(`${5}${zeros}`));
	}

	items.add(itemCount);

	return items;
}

console.log(pageSizeGenerator(452));
