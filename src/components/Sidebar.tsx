import ThemeSelector from "./ThemeSelect";
import { IconTypes } from "solid-icons";
import {
	FaSolidBandage,
	FaSolidBook,
	FaSolidCircleNotch,
	FaSolidHouseMedical,
	FaSolidUserDoctor,
	FaSolidUserGroup,
	FaSolidUserInjured,
	FaSolidUserNurse,
} from "solid-icons/fa";
import { For, Show, createSignal } from "solid-js";
import { useLocation, useNavigate } from "solid-start";

type SidebarLinkItem = {
	name: string;
	label: string;
	icon?: IconTypes;
} & ({ href: string } | { children: SidebarLinkItem[] });

const sidebarLinksItems: SidebarLinkItem[] = [
	{
		name: "home",
		label: "Home",
		href: "/",
		icon: FaSolidHouseMedical,
	},
	{
		name: "category0",
		label: "Category 1",
		icon: FaSolidBook,
		children: [
			{
				name: "category0.item0",
				label: "Item 0",
				icon: FaSolidBandage,
				href: "/category0/item0",
			},
			{
				name: "category0.item1",
				label: "Item 1",
				icon: FaSolidCircleNotch,
				href: "/category0/item1",
			},
		],
	},
	{
		name: "category1",
		label: "Category 2",
		icon: FaSolidUserGroup,
		children: [
			{
				name: "category1.subCategory0",
				label: "Sub Category 1",
				icon: FaSolidUserDoctor,
				children: [
					{
						name: "category1.subCategory0.subitem0",
						label: "Item 1",
						href: "/category1/subCategory0/subitem0",
						icon: FaSolidUserNurse,
					},
					{
						name: "category1.subCategory0.subitem1",
						label: "Item 2",
						href: "/category1/subCategory0/subitem1",
						icon: FaSolidUserInjured,
					},
				],
			},
		],
	},
	{
		name: "category1",
		label: "Category 2",
		icon: FaSolidUserGroup,
		children: [
			{
				name: "category1.subCategory0",
				label: "Sub Category 1",
				icon: FaSolidUserDoctor,
				children: [
					{
						name: "category1.subCategory0.subitem0",
						label: "Item 1",
						href: "/category1/subCategory0/subitem0",
						icon: FaSolidUserNurse,
					},
					{
						name: "category1.subCategory0.subitem1",
						label: "Item 2",
						href: "/category1/subCategory0/subitem1",
						icon: FaSolidUserInjured,
					},
				],
			},
		],
	},
];

export const [isOpen, setIsOpen] = createSignal(false);
export function sidebarWidthREM() {
	if (isOpen()) {
		return "16rem";
	}

	return "9rem";
}

function Sidebar() {
	return (
		<div
			class="z-1 fixed flex max-h-screen min-h-screen flex-col justify-between bg-base-200 duration-200 ease-in-out"
			style={{ width: sidebarWidthREM() }}
		>
			<div class="relative flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-thumb-rounded-full hover:scrollbar-thumb-secondary active:scrollbar-thumb-primary-focus">
				{/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					onClick={() => setIsOpen((value) => !value)}
					class="flex w-full cursor-pointer select-none items-center justify-between border-b-2 p-4"
				>
					<p class="font-black text-primary">JD App</p>
					{isOpen() && "<-"}
				</div>
				<ul class="menu p-1 gap-1" classList={{ "text-xs": !isOpen() }}>
					<For each={sidebarLinksItems}>
						{(link) => <SidebarLink link={link} />}
					</For>
				</ul>
			</div>
			<div class="relative flex flex-col items-center">
				<div class="absolute -z-10 h-[100%] w-full translate-y-full scale-x-50 bg-primary blur-3xl" />
				<ThemeSelector class="select-bordered select-sm mx-auto mb-1 mt-0" />
				<p class="text-center text-xs font-thin italic">v0.0.0</p>
			</div>
		</div>
	);
}

function SidebarLink(props: { link: SidebarLinkItem }) {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<>
			<Show when={"href" in props.link && props.link.href} keyed>
				{(href) => (
					// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<li onClick={() => void navigate(href)}>
						<div
							class="flex items-center gap-2"
							classList={{ active: href === location.pathname }}
						>
							{props.link.icon ? (
								<props.link.icon fill="currentColor" />
							) : (
								<div class="w-2" />
							)}
							<div>{props.link.label}</div>
						</div>
					</li>
				)}
			</Show>
			<Show when={"children" in props.link && props.link.children} keyed>
				{(children) => (
					<li>
						<details open={isActive(props.link, location.pathname)}>
							<summary class="flex items-center gap-2">
								{props.link.icon ? (
									<props.link.icon fill="currentColor" />
								) : (
									<div class="w-2" />
								)}
								{props.link.label}
							</summary>
							<ul>
								<For each={children}>
									{(child) => <SidebarLink link={child} />}
								</For>
							</ul>
						</details>
					</li>
				)}
			</Show>
		</>
	);
}

function isActive(linkItem: SidebarLinkItem, pathname: string): boolean {
	if ("href" in linkItem && linkItem.href === pathname) {
		return true;
	}

	if ("children" in linkItem) {
		return linkItem.children.some((child) => isActive(child, pathname));
	}

	return false;
}

export default Sidebar;
