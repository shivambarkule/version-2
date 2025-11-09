import BracketLink from "@/components/BracketLink";

interface SidebarProps {
	transparent?: boolean;
}

export default function Sidebar({ transparent = false }: SidebarProps) {
	return (
		<aside 
			className={`p-3 md:p-6 flex flex-col h-full w-[280px] md:w-80 ${transparent ? 'border-r-0' : 'border-r border-black/10'} ${transparent ? 'bg-transparent' : 'bg-white'}`}
		>
			<div>
				<a href="/" className="block hover:opacity-80 transition-opacity">
					<h1 className="text-[32px] md:text-[48px] font-light leading-[1.05] tracking-[-0.02em] font-variant-small-caps">
						Shivam
						<br />
						<span className="block">Barkule</span>
					</h1>
				</a>
				<div className="mt-3 md:mt-4 space-y-1 text-[12px] md:text-[16px] tracking-[0.01em]">
					<p className="text-black/70">/ Web Developer</p>
					<p className="text-black/70">/ Content Creator</p>
				</div>
			</div>

			<div className="mt-6 md:mt-8 text-[10px] md:text-[11px] tracking-[0.12em] text-black/50 uppercase">
				<p>Sai Nagar, Kondhwa-Budruk</p>
				<p>Pune-411048, India</p>
			</div>

			<nav aria-label="Navigation" className="mt-12 md:mt-16">
				<h2 className="uppercase tracking-wide text-[10px] md:text-xs text-black/50 mb-3 md:mb-4">Navigation</h2>
				<ul className="space-y-2 md:space-y-3 text-[12px] md:text-[14px]">
					<li>
						<BracketLink href="/work" strikeWhenActive>Work</BracketLink>
					</li>
					<li>
						<BracketLink href="/excursions" strikeWhenActive>Excursions</BracketLink>
					</li>
					<li>
						<BracketLink href="/about" strikeWhenActive>About</BracketLink>
					</li>
					<li>
						<BracketLink href="/contact" strikeWhenActive>Contact</BracketLink>
					</li>
				</ul>
			</nav>

			<section className="mt-8 md:mt-12">
				<h2 className="uppercase tracking-wide text-[10px] md:text-xs text-black/50 mb-3 md:mb-4">Socials</h2>
				<ul className="space-y-1 md:space-y-2 text-[12px] md:text-[14px]">
					<li>
						<a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/shivambarkule" className="group inline-flex items-center gap-1 select-none">
							<span className="transition-transform duration-500 ease-out will-change-transform group-hover:-translate-x-1">[</span>
							<span className="underline-offset-4 group-hover:underline transition-colors duration-300">LinkedIn</span>
							<span className="text-black/70 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">↗</span>
							<span className="transition-transform duration-500 ease-out will-change-transform group-hover:translate-x-1">]</span>
						</a>
					</li>
					<li>
						<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/eclipsarielle" className="group inline-flex items-center gap-1 select-none">
							<span className="transition-transform duration-500 ease-out will-change-transform group-hover:-translate-x-1">[</span>
							<span className="underline-offset-4 group-hover:underline transition-colors duration-300">Instagram</span>
							<span className="text-black/70 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">↗</span>
							<span className="transition-transform duration-500 ease-out will-change-transform group-hover:translate-x-1">]</span>
						</a>
					</li>
					<li>
						<a target="_blank" rel="noopener noreferrer" href="https://github.com/shivambarkule" className="group inline-flex items-center gap-1 select-none">
							<span className="transition-transform duration-500 ease-out will-change-transform group-hover:-translate-x-1">[</span>
							<span className="underline-offset-4 group-hover:underline transition-colors duration-300">GitHub</span>
							<span className="text-black/70 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">↗</span>
							<span className="transition-transform duration-500 ease-out will-change-transform group-hover:translate-x-1">]</span>
						</a>
					</li>
				</ul>
			</section>


		</aside>
	);
}
