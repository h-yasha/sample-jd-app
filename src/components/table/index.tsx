import type { ColumnDef } from "@tanstack/solid-table";
import { getSortedRowModel } from "@tanstack/solid-table";
import {
	createSolidTable,
	flexRender,
	getCoreRowModel,
} from "@tanstack/solid-table";
import { For } from "solid-js";

export interface TableProps<T> {
	data: T[];
	columns: ColumnDef<T, unknown>[];

	fullWidth?: true;
	compact?: true;
}

function Table<T>(props: TableProps<T>) {
	const table = createSolidTable({
		get data() {
			return props.data;
		},
		get columns() {
			return props.columns;
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
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
				</tfoot>
			</table>
		</div>
	);
}

export default Table;
