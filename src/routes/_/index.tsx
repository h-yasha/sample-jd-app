import ThemeSelect from "~/components/ThemeSelect";

function PlaygroundPage() {
	return (
		<div class="flex flex-col bg-base-300 min-h-screen space-y-4 p-4">
			<h1 class="font-bold">Playground</h1>

			<ThemeSelect />

			<ul class="menu bg-base-100 w-56 p-2 rounded-box">
				<li>
					<a href="">Page 1</a>
				</li>
				<li class="disabled">
					<a href="">Page 2</a>
				</li>
				<li class="disabled">
					<a href="">Page 3</a>
				</li>
			</ul>
		</div>
	);
}

export default PlaygroundPage;
