"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";

interface FormData {
	username: string;
	name?: string;
	email: string;
	password: string;
	confirmPswrd?: string;
}

const Signup = () => {
	const [formData, setFormData] = useState<FormData>({
		username: "",
		name: "",
		email: "",
		password: "",
		confirmPswrd: "",
	});

	const handleOnSubmit = async (e) => {
		try {
			e.preventDefault();
			const dataToSend = formData;
			delete dataToSend.confirmPswrd;
			const response = await axios.post("/api/user/", dataToSend);
			const { username, password } = response?.data;
			signIn();
		} catch (error) {
			console.log(23, error);
			alert("Something went wrong");
		}
	};
	const onFormDataChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		key: string
	) => {
		e.preventDefault();
		setFormData({ ...formData, [key]: e.target.value });
	};

	return (
		<div className="container mx-auto p-8 flex">
			<div className="max-w-md w-full mx-auto">
				<h1 className="text-4xl text-center mb-12 font-thin">Signup</h1>

				<div className="bg-white rounded-lg overflow-hidden shadow-2xl">
					<div className="flex mt-2 justify-center">
						<Button
							onClick={() =>
								signIn("github", { callbackUrl: "/dashboard" })
							}
							className="p-1 m-2 bg-slate-400"
						>
							Signup with github
						</Button>
						<Button
							onClick={() =>
								signIn("google", { callbackUrl: "/dashboard" })
							}
							className="p-1 m-2 bg-slate-400 "
						>
							Signup with Google
						</Button>
					</div>
					<div className="p-8">
						<form
							method="POST"
							className=""
							onSubmit={handleOnSubmit}
						>
							<div className="mb-5">
								<label className="block mb-2 text-sm font-medium text-gray-600">
									Full Name
								</label>

								<input
									type="text"
									name="name"
									className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
									onChange={(e) =>
										onFormDataChange(e, "name")
									}
								/>
							</div>

							<div className="mb-5">
								<label className="block mb-2 text-sm font-medium text-gray-600">
									Username
								</label>

								<input
									type="text"
									name="username"
									className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
									onChange={async (e) =>
										await onFormDataChange(e, "username")
									}
								/>
							</div>

							<div className="mb-5">
								<label className="block mb-2 text-sm font-medium text-gray-600">
									Email
								</label>

								<input
									type="email"
									name="email"
									className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
									onChange={async (e) => {
										console.log(formData.username);
										await onFormDataChange(e, "email");
									}}
								/>
							</div>

							<div className="mb-5">
								<label className="block mb-2 text-sm font-medium text-gray-600">
									Password
								</label>

								<input
									type="password"
									name="password"
									className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
									onChange={async (e) =>
										await onFormDataChange(e, "password")
									}
								/>
							</div>

							<div className="mb-5">
								<label className="block mb-2 text-sm font-medium text-gray-600">
									Confirm Password
								</label>

								<input
									type="password"
									name="password"
									className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
									onChange={async (e) =>
										await onFormDataChange(
											e,
											"confirmPswrd"
										)
									}
								/>
							</div>

							<Button
								className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
								type="submit"
							>
								Sign Up
							</Button>
						</form>
					</div>
					<div className="flex justify-center p-8 text-sm border-t border-gray-300 bg-gray-100">
						<a href="#" className="text-gray-600">
							Forgot password?
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
