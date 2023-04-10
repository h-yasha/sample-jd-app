import type { ColumnDef } from "@tanstack/solid-table";
import { createSignal } from "solid-js";
import Table from "~/components/table";

type Person = {
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
};

const defaultData: Person[] = [
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
	},
	{
		firstName: "tanner",
		lastName: "linsley",
		age: 24,
		visits: 100,
		status: "In Relationship",
		progress: 50,
	},
	{
		firstName: "tandy",
		lastName: "miller",
		age: 40,
		visits: 40,
		status: "Single",
		progress: 80,
	},
	{
		firstName: "joe",
		lastName: "dirte",
		age: 45,
		visits: 20,
		status: "Complicated",
		progress: 10,
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
