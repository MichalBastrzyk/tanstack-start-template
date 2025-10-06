import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function NotFoundComponent() {
	return (
		<div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
			<h1 className="text-4xl font-bold tracking-tight">404</h1>
			<p className="mt-2 text-muted-foreground">
				The page you’re looking for doesn’t exist.
			</p>
			<div className="mt-6">
				<Button asChild>
					<Link to="/">Go back home</Link>
				</Button>
			</div>
		</div>
	);
}
