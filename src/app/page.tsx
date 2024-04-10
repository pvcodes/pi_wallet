import { getServerSession } from "next-auth";
import Image from "next/image";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await getServerSession(options);
	if(session) redirect('/dashboard');
	return (
			<div>homepage</div>
	);
}
