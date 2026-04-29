export const ROLES = {
	admin: "Admin",
	customer: "Customer",
	rider: "Rider",
	vendor: "Vendor",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
