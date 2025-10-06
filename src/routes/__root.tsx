import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { NotFoundComponent } from "@/components/not-found";
import { Toaster } from "@/components/ui/sonner";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import type { TRPCRouter } from "@/integrations/trpc/router";
import { auth } from "@/server/auth";
import appCss from "@/styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
	trpc: TRPCOptionsProxy<TRPCRouter>;
	auth: Awaited<ReturnType<typeof fetchAuth>>;
}

const fetchAuth = createServerFn({ method: "GET" }).handler(async () => {
	const req = getRequest();

	const authResponse = await auth.api.getSession({
		headers: req.headers,
	});

	return authResponse;
});

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		const auth = await fetchAuth();

		return {
			auth,
		};
	},

	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
	notFoundComponent: NotFoundComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Toaster />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
						FormDevtoolsPlugin(),
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
