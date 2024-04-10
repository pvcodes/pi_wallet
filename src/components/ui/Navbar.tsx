"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import Button from "./Button";

// <>
// 	<div className="mt-10 flex px-2 justify-between">
// 		{/* <Button onClick={() => signIn()}>SignIn</Button> */}
// 		<Button onClick={() => signOut()}>Logout</Button>
// 	</div>
// </>
const Navbar = () => {
	const session = useSession();

	return (
		<nav className="w-full border-b border-gray-200 bg-gray-50 ">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<a href="/" className="flex items-center space-x-3">
					<span className="self-center text-2xl font-semibold whitespace-nowrap ">
						PiWallet
					</span>
				</a>
				<div className="flex md:order-2 space-x-3 md:space-x-0">
					{session.status === "authenticated" ? (
						<Button
							type="button"
							onClick={() => {
								signOut({ callbackUrl: "/" });
							}}
						>
							Logout
						</Button>
					) : (
						<Button
							type="button"
							onClick={() => {
								signIn();
							}}
						>
							Login
						</Button>
					)}
					<button
						data-collapse-toggle="navbar-sticky"
						type="button"
						className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-sticky"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
					</button>
				</div>
				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-sticky"
				>
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
						{
							<>
								{" "}
								<li>
									<a
										href="#"
										className="block py-2 px-3 rounded hover:text-gray-600"
										aria-current="page"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 px-3  rounded hover:text-gray-600"
									>
										About
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 px-3  rounded hover:text-gray-600"
									>
										Services
									</a>
								</li>
								<li>
									<a
										href="#"
										className="block py-2 px-3  rounded hover:text-gray-600"
									>
										Contact
									</a>
								</li>
							</>
						}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
