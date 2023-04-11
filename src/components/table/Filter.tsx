import type {
	Column,
	FiltersColumn,
	RowData,
	Table,
} from "@tanstack/solid-table";
import { For, Match, Switch } from "solid-js";

interface RangeFilterInputProps<T extends unknown[]> {
	columnFilterValue: T;
	facetedMinMaxValues: T | undefined;
	setFilterValue: FiltersColumn<T>["setFilterValue"];
}

function NumberInput<T extends [number, number]>(
	props: RangeFilterInputProps<T>,
) {
	const min = () => Number(props.facetedMinMaxValues?.[0] ?? "");
	const max = () => Number(props.facetedMinMaxValues?.[1] ?? "");

	return (
		<div class="flex space-x-2">
			<input
				type="number"
				min={min()}
				max={props.columnFilterValue?.[1] ?? max()}
				value={props.columnFilterValue?.[0] ?? ""}
				onChange={(event) =>
					props.setFilterValue((old: T | undefined) => [
						event.currentTarget.value ?? undefined,
						old?.[1],
					])
				}
				placeholder={`Min${typeof min !== "undefined" ? ` (${min()})` : ""}`}
				class="w-24 rounded border shadow"
			/>
			<input
				type="number"
				min={props.columnFilterValue?.[0] ?? min()}
				max={max()}
				value={props.columnFilterValue?.[1] ?? ""}
				onChange={(event) =>
					props.setFilterValue((old: T | undefined) => [
						old?.[0],
						event.currentTarget.value ?? undefined,
					])
				}
				placeholder={`Max${typeof max !== "undefined" ? ` (${max()})` : ""}`}
				class="w-24 rounded border shadow"
			/>
		</div>
	);
}

interface TextInputProps {
	columnId: string;
	columnFilterValue: string | undefined;
	columnSize: number;
	setFilterValue: FiltersColumn<string>["setFilterValue"];
	sortedUniqueValues: string[];
}

function TextInput(props: TextInputProps) {
	const dataListId = () => `${props.columnId}list`;

	return (
		<>
			<datalist id={dataListId()}>
				<For each={props.sortedUniqueValues.slice(0, 5000)}>
					{(value) => <option value={value} />}
				</For>
			</datalist>
			<input
				type="text"
				value={props.columnFilterValue ?? ""}
				onChange={(event) => props.setFilterValue(event.currentTarget.value)}
				placeholder={`Search... (${props.columnSize})`}
				class="w-36 rounded border shadow"
				list={dataListId()}
			/>
		</>
	);
}

interface FilterProps<T extends RowData> {
	column: Column<T>;
	table: Table<T>;
}

type TFieldTypes = "number" | "string" | "boolean" | "bigint";

const getFieldType = (value: unknown): TFieldTypes => {
	if (["undefined", "object", "function", "symbol"].includes(typeof value)) {
		console.warn("Unsupported type", value);
		return "string";
	} else {
		return typeof value as TFieldTypes;
	}
};

export function Filter<T extends RowData>(props: FilterProps<T>) {
	const firstValue = () =>
		props.table.getPreFilteredRowModel().flatRows[0]?.getValue(props.column.id);

	const sortedUniqueValues = () =>
		typeof firstValue() === "number"
			? []
			: Array.from(props.column.getFacetedUniqueValues().keys()).sort();

	return (
		<>
			<Switch
				fallback={<div class="lowercase italic">no filter supported</div>}
			>
				<Match when={getFieldType(firstValue()) === "number"}>
					<NumberInput
						columnFilterValue={
							props.column.getFilterValue() as [number, number]
						}
						facetedMinMaxValues={props.column.getFacetedMinMaxValues()}
						setFilterValue={props.column.setFilterValue}
					/>
				</Match>
				<Match when={getFieldType(firstValue()) === "string"}>
					<TextInput
						columnId={props.column.id}
						columnFilterValue={props.column.getFilterValue() as string}
						columnSize={sortedUniqueValues().length}
						setFilterValue={props.column.setFilterValue}
						sortedUniqueValues={sortedUniqueValues()}
					/>
				</Match>
			</Switch>
		</>
	);
}

export default Filter;
