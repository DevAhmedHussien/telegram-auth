import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Import from the new file
import { prisma } from "@/lib/prisma";

export default async function Home() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<div className="flex justify-center mt-10">
				Not logged in to see this
			</div>
		);
	}

	const user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
	});

	if (!user) {
		return (
			<div className="flex justify-center mt-10">
				User not found
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center mt-10">
			<h1>{user.name}</h1>
			<h1 className="truncate max-w-[300px]">{user.image}</h1>
			<h1>{user.id}</h1>
			<h1>{user.createdAt.toLocaleString()}</h1>
		</div>
	);
}