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

export const Route = createFileRoute("/(auth)/auth/sign-up")({
	component: SignUp,
	beforeLoad: ({ context }) => {
		console.log(context.auth);
	},
});

const signUpSchema = z
	.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z.email("Please enter a valid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
		agreedToTerms: z
			.boolean()
			.refine(
				(val) => val === true,
				"You must agree to the terms and conditions",
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

function SignUp() {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			agreedToTerms: false,
		},
		validators: {
			onBlur: signUpSchema,
		},
		onSubmitInvalid(props) {
			console.log(props);
		},
		onSubmit: async ({ value }) => {
			// Sign up using auth client
			authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					name: value.name,
				},
				{
					onSuccess: () => {
						toast.success("Sign up successful");
						navigate({ to: "/", replace: true });
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
					<CardTitle className="text-2xl font-bold">
						Create an account
					</CardTitle>
					<CardDescription>
						Enter your information to create your account
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
						<form.Field name="name">
							{(field) => (
								<Field data-invalid={!field.state.meta.isValid}>
									<FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
									<FieldContent>
										<Input
											id={field.name}
											name={field.name}
											type="text"
											placeholder="John Doe"
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

						<form.Field name="confirmPassword">
							{(field) => (
								<Field data-invalid={!field.state.meta.isValid}>
									<FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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
								</Field>
							)}
						</form.Field>

						<form.Field name="agreedToTerms">
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
										<FieldLabel htmlFor={field.name}>
											I agree to the terms and conditions
										</FieldLabel>
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
							{form.state.isSubmitting
								? "Creating account..."
								: "Create account"}
						</Button>
						<p className="text-center text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link
								to="/auth/sign-in"
								className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
							>
								Sign in
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
