"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type BracketLinkProps = {
	children: React.ReactNode;
	href: string;
	strikeWhenActive?: boolean;
  className?: string;
};

export default function BracketLink({ children, href, strikeWhenActive, className }: BracketLinkProps) {
	const pathname = usePathname();
	const isActive = strikeWhenActive && pathname?.startsWith(href);

	return (
		<Link href={href} className={`group inline-flex items-center gap-1 select-none ${className ?? ""}`}>
			<span className="transition-transform duration-500 ease-out will-change-transform group-hover:-translate-x-1">[</span>
			<span className={`underline-offset-4 group-hover:underline transition-colors duration-300 ${isActive ? "line-through" : ""}`}>{children}</span>
			<span className="text-black/70 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">↗</span>
			<span className="transition-transform duration-500 ease-out will-change-transform group-hover:translate-x-1">]</span>
		</Link>
	);
}




