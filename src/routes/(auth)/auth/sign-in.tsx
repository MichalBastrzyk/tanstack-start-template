import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldContent,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const searchParams = z.object({
	redirect: z.string().optional(),
});

export const Route = createFileRoute("/(auth)/auth/sign-in")({
	component: SignIn,
	validateSearch: searchParams,
	beforeLoad: async ({ context }) => {
		console.log(context.auth);
	},
});

const signInSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	rememberMe: z.boolean(),
});

function SignIn() {
	const navigate = useNavigate();
	const search = Route.useSearch();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validators: {
			onBlur: signInSchema,
		},
		onSubmitInvalid(props) {
			console.log(props);
		},
		onSubmit: async ({ value }) => {
			authClient.signIn.email(
				{ email: value.email, password: value.password },
				{
					onSuccess: () => {
						toast.success("Signed in successfully");
						if (search.redirect) {
							navigate({ to: search.redirect, replace: true });
						} else {
							navigate({ to: "/", replace: true });
						}
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				},
			);
		},
	});

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Sign in</CardTitle>
					<CardDescription>
						Enter your email and password to access your account
					</CardDescription>
				</CardHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<CardContent className="space-y-4">
						<form.Field name="email">
							{(field) => (
								<Field data-invalid={!field.state.meta.isValid}>
									<FieldLabel htmlFor={field.name}>Email</FieldLabel>
									<FieldContent>
										<Input
											id={field.name}
											name={field.name}
											type="email"
											placeholder="john@example.com"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											disabled={form.state.isSubmitting}
											aria-invalid={!field.state.meta.isValid}
										/>
										<FieldError errors={field.state.meta.errors} />
									</FieldContent>
								</Field>
							)}
						</form.Field>

						<form.Field name="password">
							{(field) => (
								<Field data-invalid={!field.state.meta.isValid}>
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
									<FieldContent>
										<Input
											id={field.name}
											name={field.name}
											type="password"
											placeholder="••••••••"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											disabled={form.state.isSubmitting}
											aria-invalid={!field.state.meta.isValid}
										/>
										<FieldError errors={field.state.meta.errors} />
									</FieldContent>
								</Field>
							)}
						</form.Field>

						<form.Field name="rememberMe">
							{(field) => (
								<Field
									data-invalid={!field.state.meta.isValid}
									orientation="horizontal"
								>
									<Checkbox
										id={field.name}
										name={field.name}
										checked={field.state.value}
										onCheckedChange={(checked) =>
											field.handleChange(checked === true)
										}
										disabled={form.state.isSubmitting}
									/>
									<FieldContent>
										<FieldLabel htmlFor={field.name}>Remember me</FieldLabel>
										<FieldError errors={field.state.meta.errors} />
									</FieldContent>
								</Field>
							)}
						</form.Field>
					</CardContent>

					<CardFooter className="flex flex-col space-y-4 mt-4">
						<Button
							type="submit"
							className="w-full"
							disabled={form.state.isSubmitting}
						>
							{form.state.isSubmitting ? "Signing in..." : "Sign in"}
						</Button>
						<p className="text-center text-sm text-muted-foreground">
							Don't have an account?{" "}
							<Link
								to="/auth/sign-up"
								className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
							>
								Sign up
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
