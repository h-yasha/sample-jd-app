import { Outlet } from "solid-start";

const DefaultLayout = () => {
	return (
		<div class="flex min-h-screen flex-col items-center justify-center">
			<Outlet />
		</div>
	);
};

export default DefaultLayout;
