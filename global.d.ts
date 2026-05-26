declare module '*.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export {};