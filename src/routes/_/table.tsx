import type { ColumnDef } from "@tanstack/solid-table";
import { createSignal } from "solid-js";
import Table from "~/components/table";
import DateCell from "~/components/table/defaultRenderers/DateCell";

type Person = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
	date: Date;
};

const defaultData: Person[] = [
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
		date: new Date(),
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
		date: new Date("2023-04-01T00:00:00"),
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
		date: new Date("2023-04-10T00:00:00"),
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
		date: new Date(),
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
		date: new Date("2023-04-01T00:00:00"),
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
		date: new Date("2023-04-10T00:00:00"),
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
		date: new Date(),
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
		date: new Date("2023-04-01T00:00:00"),
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
		date: new Date("2023-04-10T00:00:00"),
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
		date: new Date(),
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
		date: new Date("2023-04-01T00:00:00"),
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
		date: new Date("2023-04-10T00:00:00"),
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
		date: new Date(),
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
		date: new Date("2023-04-01T00:00:00"),
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
		date: new Date("2023-04-10T00:00:00"),
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
		date: new Date(),
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
		date: new Date("2023-04-01T00:00:00"),
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
		date: new Date("2023-04-10T00:00:00"),
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
		date: new Date(),
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
		date: new Date("2023-04-01T00:00:00"),
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
		date: new Date("2023-04-10T00:00:00"),
	},
];

const defaultColumns: ColumnDef<Person>[] = [
	{
		accessorKey: "firstName",
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id,
	},
	{
		accessorFn: (row) => row.lastName,
		id: "lastName",
		cell: (info) => <i>{info.getValue<string>()}</i>,
		header: () => <span>Last Name</span>,
		footer: (info) => info.column.id,
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: DateCell,
	},
	{
		accessorKey: "age",
		header: () => "Age",
		footer: (info) => info.column.id,
	},
	{
		accessorKey: "visits",
		header: () => <span>Visits</span>,
		footer: (info) => info.column.id,
	},
	{
		accessorKey: "status",
		header: "Status",
		footer: (info) => info.column.id,
	},
	{
		accessorKey: "progress",
		header: "Profile Progress",
		footer: (info) => info.column.id,
	},
];

function TablePage() {
	const [data, setData] = createSignal(defaultData);
	const rerender = () => setData(defaultData);

	return (
		<>
			<Table
				data={data()}
				columns={defaultColumns}
				fullWidth
				compact
				searchAll
			/>
			<div class="h-4" />
			<button onClick={() => rerender()} class="border p-2">
				Rerender
			</button>
		</>
	);
}

export default TablePage;
