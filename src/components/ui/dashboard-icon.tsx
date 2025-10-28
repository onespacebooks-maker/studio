"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface DashboardIconProps extends HTMLMotionProps<"div"> {
	size?: number;
	duration?: number;
}

const DashboardIcon = ({
	className,
	size = 28,
	duration = 1,
	...props
}: DashboardIconProps) => {
	const iconVariants: Variants = {
		initial: { scale: 1, rotate: 0 },
		hover: {
			scale: [1, 1.05, 0.95, 1],
			rotate: [0, -2, 2, 0],
			transition: { duration: 1.3 * duration, ease: "easeInOut", repeat: 0 },
		},
	};

	const tileVariants: Variants = {
		initial: { opacity: 1, scale: 1, y: 0 },
		hover: (i: number) => ({
			opacity: [0.5, 1, 0.8, 1],
			scale: [0.9, 1.1, 1],
			y: [2, -2, 0],
			transition: {
				duration: 1.2 * duration,
				ease: "easeInOut",
				repeat: 0,
				delay: i * 0.2,
			},
		}),
	};

	return (
		<motion.div
			className={cn("inline-flex items-center justify-center", className)}
			initial="initial"
			whileHover="hover"
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={iconVariants}
			>
				<motion.rect
					width="7"
					height="9"
					x="3"
					y="3"
					rx="1"
					variants={tileVariants}
					custom={0}
				/>
				<motion.rect
					width="7"
					height="5"
					x="14"
					y="3"
					rx="1"
					variants={tileVariants}
					custom={1}
				/>
				<motion.rect
					width="7"
					height="9"
					x="14"
					y="12"
					rx="1"
					variants={tileVariants}
					custom={2}
				/>
				<motion.rect
					width="7"
					height="5"
					x="3"
					y="16"
					rx="1"
					variants={tileVariants}
					custom={3}
				/>
			</motion.svg>
		</motion.div>
	);
};

DashboardIcon.displayName = "DashboardIcon";
export { DashboardIcon };
