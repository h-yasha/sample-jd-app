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
				href: "/",
			},
			{
				name: "category0.item1",
				label: "Item 1",
				icon: FaSolidCircleNotch,
				href: "/",
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
						href: "/",
						icon: FaSolidUserNurse,
					},
					{
						name: "category1.subCategory0.subitem1",
						label: "Item 2",
						href: "/",
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
						href: "/",
						icon: FaSolidUserNurse,
					},
					{
						name: "category1.subCategory0.subitem1",
						label: "Item 2",
						href: "/",
						icon: FaSolidUserInjured,
					},
				],
			},
		],
	},
];

export const [isOpen, setIsOpen] = createSignal(false);
export const sidebarWidthREM = () => (isOpen() ? "16rem" : "9rem");

function Sidebar() {
	return (
		<div
			class="z-1 fixed flex max-h-screen min-h-screen w-36 flex-col justify-between bg-base-300 duration-200 ease-in-out "
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
				<ul class="menu p-1">
					<For each={sidebarLinksItems}>
						{(link) => <SidebarLink link={link} isOpen={isOpen()} />}
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

function SidebarLink(props: { link: SidebarLinkItem; isOpen: boolean }) {
	const location = useLocation();
	const navigate = useNavigate();
	const isActive = (name: SidebarLinkItem["name"]) => {
		const sidebarLink = sidebarLinksItems.find((link) => link.name === name);
		return (
			!!sidebarLink &&
			"href" in sidebarLink &&
			location.pathname === sidebarLink.href
		);
	};

	return (
		<>
			<Show when={"href" in props.link && props.link.href} keyed>
				{(href) => (
					// rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<li onClick={() => void navigate(href)}>
						<div class="flex" classList={{ active: isActive(props.link.name) }}>
							{props.link.icon ? <props.link.icon /> : <div class="w-2" />}
							<div classList={{ "text-xs": !props.isOpen }}>
								{props.link.label}
							</div>
						</div>
					</li>
				)}
			</Show>
			<Show when={"children" in props.link && props.link.children} keyed>
				{(children) => (
					<>
						<li class="menu-title">
							<div class="flex">
								{props.link.icon ? <props.link.icon /> : <div class="w-2" />}
								<div classList={{ "text-xs": !props.isOpen }}>
									{props.link.label}
								</div>
							</div>
						</li>
						<For each={children}>
							{(child) => <SidebarLink link={child} isOpen={props.isOpen} />}
						</For>
					</>
				)}
			</Show>
		</>
	);
}

export default Sidebar;
