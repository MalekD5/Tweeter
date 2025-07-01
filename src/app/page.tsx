import Image from "next/image";
import { Separator } from "@/components/ui";

export default async function Home() {
	return (
		<div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-5 place-content-center min-h-screen">
			<Image
				className="self-center mx-auto max-w-xs w-full hidden md:block"
				src="/svg/logo.svg"
				alt="logo"
				width={250}
				height={250}
			/>
			<div className="w-full self-center my-auto flex flex-col p-10 md:pl-20 gap-16">
				<Image
					className="block md:hidden"
					src="/svg/logo.svg"
					alt="logo"
					width={30}
					height={30}
				/>
				<h1 className="text-4xl md:text-6xl font-extrabold font-[ChirpExtended] text-[#e7e9ea]">
					Happening now
				</h1>
				<div className="flex flex-col gap-6">
					<p className="font-extrabold font-[ChirpExtended] text-[#e7e9ea] text-3xl">
						Join today.
					</p>
					<div className="flex flex-col gap-2 md:w-6/12">
						<div className="w-full pb-10">
							<button
								type="button"
								className="rounded-full bg-white px-6 py-2 text-zinc-700 font-medium flex gap-1 justify-center items-center w-full"
							>
								<Image
									src="/svg/google.svg"
									alt="google"
									width={20}
									height={20}
								/>
								<p>Sign In With Google</p>
							</button>
						</div>
						<Separator>OR</Separator>
						<button
							type="button"
							className="rounded-full bg-blue-500 px-6 py-2 text-white font-medium text-center"
						>
							Create account
						</button>
						<p className="text-xs">
							By signing up, you agree to the Terms of Service and Privacy
							Policy, including Cookie Use.
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-4 md:w-6/12">
					<p className="font-bold text-[#e7e9ea]">Already have an account?</p>
					<button
						type="button"
						className="rounded-full px-6 py-2 text-blue-500 font-medium text-center border border-slate-800 font-sm hover:cursor-pointer hover:bg-blue-500/10"
					>
						Sign In
					</button>
				</div>
			</div>
		</div>
	);
}
