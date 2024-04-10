// Button.tsx
"use client";
import React from "react";
import clsx from "clsx";
interface ButtonProps {
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	children,
	className,
	...props
}) => {
	const buttonClasses = clsx(
		"btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
		className
	);

	return (
		<button className={buttonClasses} onClick={onClick} {...props}>
			{children}
		</button>
	);
};

export default Button;
