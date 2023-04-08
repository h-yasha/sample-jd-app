import { createSignal } from "solid-js";
import Pagination from "~/components/Pagination";

function PaginationPage() {
	const [page, setPage] = createSignal(0);
	const [pagesCount, setPagesCount] = createSignal(20);

	return (
		<div class="flex h-screen flex-col items-center justify-center gap-4">
			<div>Current Page: {page()}</div>

			<input
				pattern="[0-9]"
				inputMode="numeric"
				value={pagesCount()}
				onInput={(event) => setPagesCount(parseInt(event.currentTarget.value))}
			/>

			<Pagination
				onChange={(event, value) => setPage(value)}
				page={page()}
				count={pagesCount()}
				debug
				showFirstButton
				showLastButton
			/>
		</div>
	);
}

export default PaginationPage;
