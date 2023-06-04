import { Outlet } from "solid-start";
import Sidebar, { sidebarWidthREM } from "~/components/Sidebar";

const DefaultLayout = () => {
	return (
		<>
			<Sidebar />
			<div
				class="flex min-h-screen duration-200 ease-in-out"
				style={{ "margin-left": sidebarWidthREM() }}
			>
				<Outlet />
			</div>
		</>
	);
};

export default DefaultLayout;
