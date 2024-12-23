import { getProductById } from './product';
export class Unk {
	static async getWishList() {
		const WishListIds = getWishList();
		const promises = WishListIds.map(async (id, index) => {
			const product = await getProductById(parseInt(id));
			return { id: index, product: { ...product } };
		});
		const productDetails = await Promise.all(promises);
		return productDetails;
	}
	static addWhishListItem(prodId: number) {
		if (this.haveWhishListItem(prodId)) {
			this.removeWhishListItem(prodId);
			return;
		}
		const WishList = getWishList();
		WishList.push(prodId.toString());
		localStorage.setItem('wishlist', JSON.stringify(WishList));
		if (this.haveCartItem(prodId)) {
			this.removeCartItem(prodId);
		}
	}
	static removeWhishListItem(prodId: number) {
		const WishList = getWishList();
		const newWishList = WishList.filter((id) => id !== prodId.toString());
		localStorage.setItem('wishlist', JSON.stringify(newWishList));
	}
	static haveWhishListItem(prodId: number) {
		const WishList = getWishList();
		return WishList.includes(prodId.toString());
	}
	static async getCartItems() {
		const cartItemsIds = getCart();
		const promises = cartItemsIds.map(async (id, index) => {
			const product = await getProductById(parseInt(id));
			return { id: index, product: { ...product }, count: 1 };
		});
		const productDetails = await Promise.all(promises);
		return productDetails;
	}
	static addCartItem(prodId: number) {
		const cartItems = getCart();
		if (this.haveWhishListItem(prodId)) {
			this.removeWhishListItem(prodId);
		}
		if (this.haveCartItem(prodId)) {
			throw new Error('Can not add the same product twice');
		}
		cartItems.push(prodId.toString());
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
		return true;
	}
	static haveCartItem(prodId: number) {
		const cartItems = getCart();
		return cartItems.includes(prodId.toString());
	}
	static totalCartPrice() {}
	static totalCartItems() {}
	// static updateItemQuantity(prodId: number, quantity: number) {}
	static removeCartItem(prodId: number) {
		const cartItems = getCart();
		const newCartItems = cartItems.filter((id) => id !== prodId.toString());
		localStorage.setItem('cartItems', JSON.stringify(newCartItems));
		return newCartItems;
	}
	static emptyCart() {
		localStorage.setItem('cartItems', JSON.stringify([]));
		return [];
	}
}
const getWishList = (): string[] => {
	if (typeof window !== 'undefined' && localStorage.getItem('wishlist')) {
		return JSON.parse(localStorage.getItem('wishlist') || '[]');
	} else if (typeof window !== 'undefined') {
		localStorage.setItem('wishlist', JSON.stringify([]));
		return [];
	}
	return [];
};
const getCart = (): string[] => {
	if (typeof window !== 'undefined' && localStorage.getItem('cartItems')) {
		return JSON.parse(localStorage.getItem('cartItems') || '[]');
	} else if (typeof window !== 'undefined') {
		localStorage.setItem('cartItems', JSON.stringify([]));
		return [];
	}
	return [];
};
