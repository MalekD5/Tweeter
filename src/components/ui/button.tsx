import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonCV = cva(["rounded-full", "px-6 py-2", "hover:cursor-pointer"], {
	variants: {
		variant: {
			primary: [
				"text-white",
				"bg-twitter-blue hover:bg-twitter-blue/90",
				"font-medium",
			],
			white: ["text-black", "bg-white", "font-medium"],
			ghost: [
				"border border-slate-800",
				"text-twitter-blue hover:bg-twitter-blue/10",
				"font-medium",
				"text-sm",
			],
		},
	},
});

type ButtonCVA = VariantProps<typeof buttonCV>;

type ButtonProps = ButtonCVA & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
	const { className, variant, ...rest } = props;

	return (
		<button className={twMerge(buttonCV({ variant }), className)} {...rest}>
			{props.children}
		</button>
	);
}
