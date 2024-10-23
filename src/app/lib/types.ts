export type LoginUser = {
	email: string;
	password: string;
};
export type UserSchema = {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
};
export type RegisterUser = {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	re_password: string;
};
export interface CategorySchema {
	id: number;
	name: string;
	sub_categories: Array<SubCategorySchema>;
}

export interface SubCategorySchema {
	id: number;
	name: string;
}

export interface ProductSchema {
	id: number;
	name: string;
	photo: string;
	description: string;
	price: number;
	compare_price: number;
	category: number;
	quantity: number;
	sold: number;
	date_created: string;
	get_thumbnail: string;
	rating: number;
}
export interface CartItemSchema {
	id: number;
	count: number;
	product: ProductSchema;
}
export interface FilterOptions {
	categoryId?: number;
	priceRange?: string;
	sortBy?: string;
	order?: 'asc' | 'desc';
	search?: string;
}
export interface SortOptionsSchema {
	name: string;
	current: boolean;
	sortBy: string;
	order: 'asc' | 'desc';
}
