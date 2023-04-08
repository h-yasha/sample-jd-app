import ThemeSelect from "~/components/ThemeSelect";

function PlaygroundPage() {
	return (
		<div class="flex min-h-screen flex-col space-y-4 bg-base-300 p-4">
			<h1 class="font-bold">Playground</h1>

			<ThemeSelect />

			<ul class="menu rounded-box w-56 bg-base-100 p-2">
				<li>
					<a href="/_/table">Table</a>
				</li>
				<li>
					<a href="/_/pagination">Pagination</a>
				</li>
				<li class="disabled">
					<a href="">Page 3</a>
				</li>
			</ul>
		</div>
	);
}

export default PlaygroundPage;
