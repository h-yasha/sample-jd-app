import { getSession } from "@auth/solid-start";
import { signIn, signOut } from "@auth/solid-start/client";
import { Suspense, type VoidComponent } from "solid-js";
import { A } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { authConfig } from "~/server/auth";
import { trpc } from "~/utils/trpc";

const Home: VoidComponent = () => {
	const hello = trpc.example.hello.useQuery(() => ({ name: "from tRPC" }));
	return (
		<main>
			<div class="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<h1 class="text-5xl font-extrabold tracking-tight text-primary sm:text-[5rem]">
					Create <span class="text-primary-focus">JD</span> App
				</h1>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
					<A
						class="flex max-w-xs flex-col gap-4 rounded-xl bg-base-200 p-4 	hover:bg-base-300"
						href="https://start.solidjs.com"
						target="_blank"
					>
						<h3 class="text-2xl font-bold">Solid Start →</h3>
						<div class="text-lg">
							Learn more about Solid Start and the basics.
						</div>
					</A>
					<A
						class="flex max-w-xs flex-col gap-4 rounded-xl bg-base-200 p-4 	hover:bg-base-300"
						href="https://github.com/orjdev/create-jd-app"
						target="_blank"
					>
						<h3 class="text-2xl font-bold">JD End →</h3>
						<div class="text-lg">
							Learn more about Create JD App, the libraries it uses, and how to
							deploy it
						</div>
					</A>
				</div>
				<div class="flex flex-col items-center gap-2">
					<p class="text-2xl">{hello.data ?? "Loading tRPC query"}</p>
					<Suspense>
						<AuthShowcase />
					</Suspense>
				</div>
			</div>
		</main>
	);
};

export default Home;

const AuthShowcase: VoidComponent = () => {
	const sessionData = createSession();
	return (
		<div class="flex flex-col items-center justify-center gap-4">
			<p class="text-center text-2xl ">
				{sessionData() && <span>Logged in as {sessionData()?.user?.name}</span>}
			</p>
			<button
				type="button"
				class="rounded-full px-10 py-3 font-semibold  no-underline transition btn"
				onClick={
					sessionData() ? () => void signOut() : () => void signIn("discord")
				}
			>
				{sessionData() ? "Sign out" : "Sign in"}
			</button>
		</div>
	);
};

const createSession = () => {
	return createServerData$(async (_, event) => {
		return await getSession(event.request, authConfig);
	});
};
