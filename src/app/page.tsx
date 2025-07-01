import Image from "next/image";
import { Button, Separator } from "@/components/ui";

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
				<h1 className="text-4xl md:text-6xl font-extrabold font-chirp-extended text-foreground">
					Happening now
				</h1>
				<div className="flex flex-col gap-6">
					<p className="font-extrabold font-chirp-extended text-foreground text-3xl">
						Join today.
					</p>
					<div className="flex flex-col gap-2 md:w-6/12">
						<div className="w-full pb-10">
							<Button
								variant="white"
								type="button"
								className="flex items-center justify-center gap-1 w-full"
							>
								<Image
									src="/svg/google.svg"
									alt="google"
									width={20}
									height={20}
								/>
								<p className="text-foreground-muted">Sign In With Google</p>
							</Button>
						</div>
						<Separator>OR</Separator>
						<Button type="button" variant="primary">
							Create account
						</Button>
						<p className="text-xs">
							By signing up, you agree to the Terms of Service and Privacy
							Policy, including Cookie Use.
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-4 md:w-6/12">
					<p className="font-bold text-foreground">Already have an account?</p>
					<Button variant="ghost" className="w-full" type="button">
						Sign In
					</Button>
				</div>
			</div>
		</div>
	);
}
