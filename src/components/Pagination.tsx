import type { JSX } from "solid-js";
import { For, Show, mergeProps } from "solid-js";
import { preventNonNumericInputs } from "~/utils/preventNonNumericInputs";
import { range } from "~/utils/range";

export interface PaginationProps {
	/**
	 * Number of always visible pages at the beginning and end.
	 * @default 1
	 */
	boundaryCount?: number;
	/**
	 * The total number of pages.
	 * @default 1
	 */
	count: number;
	/**
	 * If `true`, the component is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * If `true`, hide the next-page button.
	 * @default false
	 */
	hideNextButton?: boolean;
	/**
	 * If `true`, hide the previous-page button.
	 * @default false
	 */
	hidePrevButton?: boolean;
	/**
	 * Callback fired when the page is changed.
	 * @param {MouseEvent & {currentTarget: HTMLInputElement; target: Element; }} event The event source of the callback.
	 * @param {number} page The page selected.
	 */
	onChange: (
		event: Event & {
			currentTarget: HTMLElement;
			target: Element;
		},
		page: number,
	) => void;
	/**
	 * The current page.
	 */
	page: number;
	/**
	 * If `true`, show the first-page button.
	 * @default false
	 */
	showFirstButton?: boolean;
	/**
	 * If `true`, show the last-page button.
	 * @default false
	 */
	showLastButton?: boolean;
	/**
	 * Number of always visible pages before and after the current page.
	 * @default 1
	 */
	siblingCount?: number;

	debug?: true;
}

export type PaginationItem = {
	onClick: JSX.CustomEventHandlersCamelCase<HTMLElement>["onClick"];
	disabled: boolean;
} & (
	| {
			type: "start-ellipsis" | "end-ellipsis";
	  }
	| {
			type: "first" | "last" | "next" | "previous";
	  }
	| {
			type: "page";
			selected: boolean;
			page: number;
	  }
);

export function Pagination(baseProps: PaginationProps) {
	const props = mergeProps(
		{
			page: 0,
			count: 1,
			boundaryCount: 2,
			siblingCount: 2,
			disabled: false,
			hideNextButton: false,
			hidePrevButton: false,
			showFirstButton: false,
			showLastButton: false,
			onChange() {
				return;
			},
		},
		baseProps,
	);

	const startPages = () => range(0, props.boundaryCount);
	const endPages = () =>
		range(
			Math.max(props.count - props.boundaryCount, props.boundaryCount),
			props.count,
		);

	const siblingsStart = () => {
		return Math.max(
			Math.min(
				// Natural start
				props.page - props.siblingCount,
				// Lower boundary when page is high
				props.count - props.siblingCount * 2,
			),
			props.boundaryCount,
		);
	};

	const siblingsEnd = () =>
		Math.min(
			Math.max(
				// Natural end
				props.page + props.siblingCount + 1,
				// Upper boundary when page is low
				props.boundaryCount + props.siblingCount,
			),
			// Less than endPages
			endPages().length > 0 ? endPages()[0] : props.count - 1,
		);

	return (
		<>
			<Show when={props.debug}>
				<div>startPages: {startPages().toString()}</div>
				<div>endPages: {endPages().toString()}</div>
				<div>siblingsStart: {siblingsStart().toString()}</div>
				<div>siblingsEnd: {siblingsEnd().toString()}</div>
			</Show>

			<div class="flex w-full px-1">
				<div class="flex gap-2">
					<Show when={props.showFirstButton}>
						<button
							class="btn-sm btn font-black"
							disabled={props.disabled || props.page <= 0}
							onClick={(event) => props.onChange(event, 0)}
						>
							First
						</button>
					</Show>
					<Show when={!props.hidePrevButton}>
						<button
							class="btn-sm btn font-black"
							disabled={props.disabled || props.page <= 0}
							onClick={(event) => props.onChange(event, props.page - 1)}
						>
							←
						</button>
					</Show>
				</div>

				<div class="mx-auto" />

				<div class="flex gap-2">
					<For each={startPages()}>
						{(item) => <PageItem item={item} {...props} />}
					</For>

					<Show when={siblingsStart() > props.boundaryCount}>
						<div class="select-none text-center w-8 h-8">...</div>
					</Show>

					<For each={range(siblingsStart(), siblingsEnd())}>
						{(item) => <PageItem item={item} {...props} />}
					</For>

					<Show when={siblingsEnd() < props.count - props.boundaryCount}>
						<div class="select-none text-center w-8 h-8">...</div>
					</Show>
					<For each={endPages()}>
						{(item) => <PageItem item={item} {...props} />}
					</For>
				</div>

				<div class="mx-auto" />

				<div class="flex gap-2">
					<Show when={!props.hideNextButton}>
						<button
							class="btn-sm btn font-black"
							onClick={(event) => props.onChange(event, props.page + 1)}
							disabled={props.disabled || props.page === props.count - 1}
						>
							→
						</button>
					</Show>
					<Show when={props.showLastButton}>
						<button
							class="btn-sm btn font-black"
							onClick={(event) => props.onChange(event, props.count - 1)}
							disabled={props.disabled || props.page === props.count - 1}
						>
							Last
						</button>
					</Show>
				</div>
			</div>
		</>
	);
}

function PageItem(props: PaginationProps & { item: number }) {
	return (
		<Show
			when={props.item === props.page}
			fallback={
				<button
					type="button"
					class="btn-sm btn-circle btn font-black"
					onClick={(event) => props.onChange(event, props.item)}
					disabled={props.disabled}
				>
					{props.item + 1}
				</button>
			}
		>
			<input
				class="input-bordered input-primary input input-sm w-12 text-center"
				type="text"
				inputMode="numeric"
				value={props.item + 1}
				onChange={(event) => {
					const value = +event.currentTarget.value - 1;
					props.onChange(event, Math.max(0, Math.min(props.count, value)));
				}}
				onInput={(event) => {
					const { value, range } = preventNonNumericInputs(event, {
						min: 1,
						max: props.count,
						maxDecimal: 0,
					});
					if (value !== event.currentTarget.value) {
						event.currentTarget.value = value;
						if (range) {
							event.currentTarget.setSelectionRange(...range);
						}
					}
				}}
			/>
		</Show>
	);
}

export default Pagination;
