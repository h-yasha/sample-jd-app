import Pagination from "../Pagination";
import Filter from "./Filter";
import type { ColumnDef } from "@tanstack/solid-table";
import {
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getFacetedMinMaxValues,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/solid-table";
import { For, Show, createSignal, onMount } from "solid-js";

function pageSizeGenerator(itemCount: number, numbers = [1, 2, 3, 4, 5]) {
	const items = new Set<number>();

	const places = itemCount.toString().length;

	for (let i = 1; i < places; i++) {
		const zeros = "0".repeat(i);

		for (const n of numbers) {
			const value = parseInt(`${n}${zeros}`);
			if (value <= itemCount) {
				items.add(value);
			}
		}
	}

	return Array.from(items);
}

export interface TableProps<T> {
	data: T[];
	columns: ColumnDef<T, unknown>[];

	fullWidth?: true;
	compact?: true;
	searchAll?: true;
}

function Table<T>(props: TableProps<T>) {
	const [pageIndex, setPageIndex] = createSignal(0);
	const [pageSize, setPageSize] = createSignal(0);

	const [globalFilter, setGlobalFilter] = createSignal("");

	const pageCount = () => Math.ceil(props.data.length / pageSize());

	const pageCountOptions = () => pageSizeGenerator(props.data.length);

	onMount(() => {
		setPageSize(
			pageCountOptions().findLast((size) => size <= 20) ?? props.data.length,
		);
	});

	const table = createSolidTable({
		get data() {
			return props.data;
		},
		get columns() {
			return props.columns;
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		state: {
			get pagination() {
				return {
					pageIndex: pageIndex(),
					pageSize: pageSize(),
				};
			},
			get globalFilter() {
				return globalFilter();
			},
		},
	});

	return (
		<div class="p-2">
			<table
				class="table"
				classList={{
					"w-full": props.fullWidth,
					"table-compact": props.compact,
				}}
			>
				<thead>
					<Show when={props.searchAll}>
						<tr>
							<td class="p-2" colSpan="100%">
								<input
									class="w-full px-2 py-1 input input-sm"
									placeholder="Search all columns..."
									value={globalFilter()}
									onChange={(event) =>
										setGlobalFilter(event.currentTarget.value)
									}
								/>
							</td>
						</tr>
					</Show>
					<For each={table.getHeaderGroups()}>
						{(headerGroup) => (
							<tr>
								<For each={headerGroup.headers}>
									{(header) => (
										<th>
											<div class="flex justify-between">
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
													  )}
												{header.column.getCanSort() && (
													<button
														type="button"
														onClick={header.column.getToggleSortingHandler()}
													>
														{{
															asc: "🔼",
															desc: "🔽",
														}[header.column.getIsSorted() as string] ?? "↕"}
													</button>
												)}
											</div>
										</th>
									)}
								</For>
							</tr>
						)}
					</For>
					<For each={table.getHeaderGroups()}>
						{(headerGroup) => (
							<tr>
								<For each={headerGroup.headers}>
									{(header) => (
										<th>
											{header.isPlaceholder ||
											!header.column.getCanFilter() ? null : (
												<Filter column={header.column} table={table} />
											)}
										</th>
									)}
								</For>
							</tr>
						)}
					</For>
				</thead>
				<tbody>
					<For each={table.getRowModel().rows}>
						{(row) => (
							<tr>
								<For each={row.getVisibleCells()}>
									{(cell) => (
										<td>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									)}
								</For>
							</tr>
						)}
					</For>
				</tbody>
				<tfoot>
					<For each={table.getFooterGroups()}>
						{(footerGroup) => (
							<tr>
								<For each={footerGroup.headers}>
									{(header) => (
										<th>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.footer,
														header.getContext(),
												  )}
										</th>
									)}
								</For>
							</tr>
						)}
					</For>
					<tr>
						<td colspan="100%">
							<div class="flex items-center">
								<Pagination
									count={pageCount()}
									page={pageIndex()}
									onChange={(event, page) => setPageIndex(page)}
								/>
								<div>
									<select
										class="select select-sm"
										onChange={(event) => {
											const value = parseInt(event.currentTarget.value);
											if (!isNaN(value)) {
												setPageSize(value);
											}
										}}
										value={pageSize()}
									>
										<For each={pageCountOptions()}>
											{(size) => <option value={size}>{size}</option>}
										</For>
										<option value={props.data.length}>All</option>
									</select>
								</div>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}

export default Table;
