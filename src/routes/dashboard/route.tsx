import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: async ({ context, location }) => {
		if (!context.auth) {
			throw redirect({
				to: "/auth/sign-in",
				search: { redirect: location.href },
			});
		}
	},
	component: DashboardLayout,
});

function DashboardLayout() {
	return (
		<div>
			<Outlet />
		</div>
	);
}
