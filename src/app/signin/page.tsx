"use client";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
// import { useRouter } from "next/navigation";

interface FormData {
	username: string;
	password: string;
}
export default function Signup() {
	const [formData, setFormData] = useState<FormData>({
		username: "",
		password: "",
	});
	// const router = useRouter();
	const onFormDataChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		key: string
	) => {
		e.preventDefault();
		setFormData({ ...formData, [key]: e.target.value });
	};
	return (
		<div className="container mx-auto p-8 flex justify-center items-center w-2/3">
			<div className="w-1/2 mx-auto">
				<h1 className="text-4xl text-center mb-12 font-thin">Login</h1>
				<div className="bg-white rounded-lg overflow-hidden shadow-2xl">
					<div className="flex mt-2 justify-center">
						<Button
							onClick={() =>
								signIn("github", { callbackUrl: "/dashboard" })
							}
							className="p-1 m-2 bg-slate-400"
						>
							Login with github
						</Button>
						<Button
							onClick={() =>
								signIn("google", { callbackUrl: "/dashboard" })
							}
							className="p-1 m-2 bg-slate-400 "
						>
							Login with Google
						</Button>
					</div>
					<div className="p-8">
						<form
							method="POST"
							className=""
							onSubmit={async (e) => {
								try {
									e.preventDefault();
									await signIn("credentials", {
										...formData,
										callbackUrl: "/dashboard",
									});
								} catch (error) {
									console.log(error);
								}
							}}
						>
							<div className="mb-5">
								<label className="block mb-2 text-sm font-medium text-gray-600">
									Email
								</label>

								<input
									type="text"
									name="username"
									className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
									onChange={async (e) => {
										console.log(formData.username);
										await onFormDataChange(e, "username");
									}}
								/>
							</div>

							<div className="mb-5">
								<label className="block mb-2 text-sm font-medium text-gray-600">
									Password
								</label>

								<input
									type="text"
									name="password"
									className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
									onChange={async (e) =>
										await onFormDataChange(e, "password")
									}
								/>
							</div>

							<Button
								className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
								type="submit"
							>
								Login
							</Button>
						</form>
					</div>
					<div className="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100">
						<Link
							href="/signup"
							className="font-medium text-indigo-500"
						>
							Create account
						</Link>

						<a href="#" className="text-gray-600">
							Forgot password?
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
