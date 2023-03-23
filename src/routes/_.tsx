import { Show } from "solid-js";
import { Navigate, Outlet } from "solid-start";

function PlaygroundLayout() {
	return (
		<>
			<Show
				when={process.env.NODE_ENV === "development"}
				fallback={<Navigate href="/" />}
			>
				<Outlet />
			</Show>
		</>
	);
}

export default PlaygroundLayout;
