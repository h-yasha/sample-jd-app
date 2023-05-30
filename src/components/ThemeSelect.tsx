import { cookieStorage } from "@solid-primitives/storage";
import type { JSX } from "solid-js";
import { For } from "solid-js";

export const themes = [
	"",
	"light",
	"dark",
	"cupcake",
	"bumblebee",
	"emerald",
	"corporate",
	"synthwave",
	"retro",
	"cyberpunk",
	"valentine",
	"halloween",
	"garden",
	"forest",
	"aqua",
	"lofi",
	"pastel",
	"fantasy",
	"wireframe",
	"black",
	"luxury",
	"dracula",
	"cmyk",
	"autumn",
	"business",
	"acid",
	"lemonade",
	"night",
	"coffee",
	"winter",
];

function ThemeSelect(props: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
	const selectedTheme = cookieStorage.getItem("theme") ?? "";

	return (
		<select
			{...props}
			data-choose-theme
			class={`select capitalize ${props.class ?? ""}`}
			onChange={(event) => {
				cookieStorage.setItem("theme", event.currentTarget.value);
			}}
		>
			<For each={themes}>
				{(theme) => (
					<option selected={selectedTheme === theme} value={theme}>
						{theme ?? "Default"}
					</option>
				)}
			</For>
		</select>
	);
}

export default ThemeSelect;
