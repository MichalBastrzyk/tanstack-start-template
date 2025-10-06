import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/auth")({
	component: AuthLayout,
});

// TODO: Make this a standardized auth layout for the remaining auth routes
// This is because all the auth routes will have the same layout
// TBD: We might want to turn this into a pathless layout in the future
function AuthLayout() {
	return <Outlet />;
}
