"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Button from "@/components/ui/Button";

interface Credential {
	id: number;
	key: string;
	value: string;
	user_id: number;
	last_updated: EpochTimeStamp;
}

export default function Dashboard() {
	const { data: session } = useSession();
	const [allCreds, setAllCreds] = useState<Credential[]>([]);
	const [newCred, setNewCred] = useState<Partial<Credential>>({});
	const [updateCred, setUpdateCred] = useState<Partial<Credential>>({});

	useEffect(() => {
		const fetchData = async () => {
			if (session?.user?.id) {
				try {
					const response = await axios.get("/api/creds");
					setAllCreds(response.data.data);
				} catch (error) {
					console.error("Failed to fetch credentials:", error);
				}
			}
		};

		fetchData();
	}, [session?.user?.id]);

	const handleCredChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		key: string,
		callback: Function,
		state: Object
	) => {
		callback({ ...state, [key]: e.target.value });
	};

	const handleAddCred = async () => {
		try {
			const response = await axios.post("/api/creds", newCred);
			if (response.data) {
				console.log(123, response.data);
				setAllCreds([...allCreds, response.data.data]);
			}
		} catch (error) {
			console.error("Failed to add credential:", error);
		}
		setNewCred({ key: "", value: "" });
	};

	const handleUpdateCred = async (id: number) => {
		try {
			const response = await axios.put("/api/creds", {
				...updateCred,
				id,
			});
			if (response.data) {
				console.log(123, response.data);
				const index = allCreds.findIndex((cred) => cred.id === id);
				if (index !== -1) {
					const updatedCreds = allCreds.map((cred, i) =>
						i === index ? response.data.data : cred
					);
					setAllCreds(updatedCreds);
				}
			}
		} catch (error) {
			console.error("Failed to update credential:", error);
		}
	};
	const handleDeleteCred = async (id: number) => {
		try {
			const response = await axios.delete(`/api/creds/`, {
				params: { id },
			});
			if (response.data) {
				console.log(123, response.data);
				// Filter out the deleted credential
				const updatedCreds = allCreds.filter((cred) => cred.id !== id);
				// Update the state with the new array
				setAllCreds(updatedCreds);
			}
		} catch (error) {
			console.error("Failed to delete credential:", error);
		}
	};

	return (
		<>
			<ul>
				{allCreds.map(({ id, key, value }) => (
					<li key={id} className="flex p-2 m-2">
						<p>
							ID: {key} | VALUE: {value}
						</p>
						<input
							type="text"
							placeholder="KEY"
							onChange={(e) =>
								handleCredChange(
									e,
									"key",
									setUpdateCred,
									updateCred
								)
							}
						/>
						<input
							type="text"
							placeholder="VALUE"
							onChange={(e) =>
								handleCredChange(
									e,
									"value",
									setUpdateCred,
									updateCred
								)
							}
						/>
						<Button
							onClick={async () => await handleUpdateCred(id)}
						>
							update cred
						</Button>
						<Button
							onClick={async () => await handleDeleteCred(id)}
						>
							delete
						</Button>
					</li>
				))}
				<input
					type="text"
					placeholder="KEY"
					value={newCred.key}
					onChange={(e) =>
						handleCredChange(e, "key", setNewCred, newCred)
					}
				/>
				<input
					type="text"
					placeholder="VALUE"
					value={newCred.value}
					onChange={(e) =>
						handleCredChange(e, "value", setNewCred, newCred)
					}
				/>
				<Button onClick={handleAddCred}>add cred</Button>
			</ul>
		</>
	);
}
