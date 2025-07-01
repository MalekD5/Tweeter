export default function Separator({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="before:contents-[''] before:flex-1 before:p-[0.5px] before:bg-zinc-800 before:m-2 flex items-center before:rounded-full
            after:contents-[''] after:flex-1 after:p-[0.5px] after:bg-zinc-800 after:m-2 after:rounded-full"
		>
			{children}
		</div>
	);
}
