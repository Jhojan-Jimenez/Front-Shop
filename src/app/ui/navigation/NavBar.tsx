'use client';
import AuthContext, { useAuth } from '@/app/context/AuthContext';
import { UserSchema } from '@/app/lib/types';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
	Bars3Icon,
	ChartPieIcon,
	ChevronDownIcon,
	FingerPrintIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface Product {
	name: string;
	description: string;
	href: string;
	icon: React.ElementType;
}

interface CallToAction {
	name: string;
	href: string;
	icon: string;
}

const products: Product[] = [
	{
		name: 'Products',
		description: 'All products',
		href: '/products',
		icon: ChartPieIcon,
	},
	{
		name: 'Campo 1',
		description: 'Descripcion 1',
		href: '#',
		icon: ChartPieIcon,
	},
	{
		name: 'Campo 2',
		description: 'Descripcion 1',
		href: '#',
		icon: FingerPrintIcon,
	},
];

const callsToAction: CallToAction[] = [
	{ name: 'Watch demo', href: '#', icon: ' ' },
	{ name: 'Contact sales', href: '#', icon: ' ' },
];

export default function Navigation() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
	const { user, logout } = useAuth();

	return (
		<div className='bg-white shadow-md shadow-gray-200 w-full'>
			<nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
				<div className='flex lg:flex-1'>
					<Link href='/' className='-m-1.5 p-1.5'>
						<Image
							width={400}
							height={400}
							alt='Shop logo'
							src='/images/ShopIcon.jpg'
							className='h-12 w-auto'
						/>
					</Link>
				</div>

				<MobileMenuButton setMobileMenuOpen={setMobileMenuOpen} />

				<DesktopMenu />

				<DesktopActions user={user} logout={logout} />
			</nav>

			<MobileMenu
				open={mobileMenuOpen}
				setOpen={setMobileMenuOpen}
				user={user}
				logout={logout}
			/>
		</div>
	);
}

function MobileMenuButton({
	setMobileMenuOpen,
}: {
	// eslint-disable-next-line no-unused-vars
	setMobileMenuOpen: (open: boolean) => void;
}) {
	return (
		<div className='flex lg:hidden'>
			<button
				type='button'
				onClick={() => setMobileMenuOpen(true)}
				className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
			>
				<span className='sr-only'>Open main menu</span>
				<Bars3Icon className='h-6 w-6' aria-hidden='true' />
			</button>
		</div>
	);
}

function DesktopMenu() {
	return (
		<Popover.Group className='hidden lg:flex lg:gap-x-12'>
			<ProductPopover />
			<NavLink href={'/wishlist'}>Wishlist</NavLink>
			<NavLink href='#'>Marketplace</NavLink>
			<NavLink href='#'>Company</NavLink>
		</Popover.Group>
	);
}

function ProductPopover() {
	return (
		<Popover className='relative'>
			<Popover.Button className='flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900'>
				Product
				<ChevronDownIcon
					className='h-5 w-5 flex-none text-gray-400'
					aria-hidden='true'
				/>
			</Popover.Button>

			<Transition
				enter='transition ease-out duration-200'
				enterFrom='opacity-0 translate-y-1'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease-in duration-150'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-1'
			>
				<Popover.Panel className='absolute -left-8 top-full z-40 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'>
					<div className='p-4'>
						{products.map((item) => (
							<ProductItem key={item.name} item={item} />
						))}
					</div>
					<div className='grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50'>
						{callsToAction.map((item) => (
							<CallToActionItem key={item.name} item={item} />
						))}
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
}

function ProductItem({ item }: { item: Product }) {
	return (
		<div className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50'>
			<div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
				<item.icon
					className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
					aria-hidden='true'
				/>
			</div>
			<div className='flex-auto'>
				<Link href={item.href} className='block font-semibold text-gray-900'>
					{item.name}
					<span className='absolute inset-0' />
				</Link>
				<p className='mt-1 text-gray-600'>{item.description}</p>
			</div>
		</div>
	);
}

function CallToActionItem({ item }: { item: CallToAction }) {
	return (
		<Link
			href={item.href}
			className='flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100'
		>
			<span className='h-5 w-5 flex-none text-gray-400' aria-hidden='true'>
				{item.icon}
			</span>
			{item.name}
		</Link>
	);
}

interface DesktopActionsProps {
	user: UserSchema | null;
	logout: () => void;
}

function DesktopActions({ user, logout }: DesktopActionsProps) {
	const { refreshLogin } = useContext(AuthContext);
	return (
		<div className='hidden lg:flex lg:flex-1 lg:justify-end gap-x-10'>
			{user ? (
				<button
					className='text-sm font-semibold leading-6 text-gray-900'
					onClick={() => logout()}
				>
					Sign Out
				</button>
			) : (
				<>
					<Link
						href={'/login'}
						className='text-sm font-semibold leading-6 text-gray-900'
						onClick={refreshLogin}
					>
						Log in <span aria-hidden='true'>&rarr;</span>
					</Link>
					<Link
						href={'/register'}
						className='text-sm font-semibold leading-6 text-gray-900'
					>
						Register <span aria-hidden='true'>&rarr;</span>
					</Link>
				</>
			)}
			<Link
				href='/shopping'
				className='text-sm font-semibold leading-6 text-gray-900 flex justify-center items-center'
			>
				<FaShoppingCart />
			</Link>
		</div>
	);
}

interface MobileMenuProps {
	open: boolean;
	// eslint-disable-next-line no-unused-vars
	setOpen: (open: boolean) => void;
	user: UserSchema | null;
	logout: () => void;
}

function MobileMenu({ open, setOpen, user, logout }: MobileMenuProps) {
	const { refreshLogin } = useContext(AuthContext);
	return (
		<Dialog as='div' className='lg:hidden' open={open} onClose={setOpen}>
			<div className='fixed inset-0 z-40' />
			<Dialog.Panel className='fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
				<div className='flex items-center justify-between'>
					<Link href='/' className='-m-1.5 p-1.5'>
						<span className='sr-only'>Your Company</span>
						<Image
							width={400}
							height={400}
							alt='Shop logo'
							src='/images/ShopIcon.jpg'
							className='h-8 w-auto'
						/>
					</Link>
					<button
						type='button'
						className='-m-2.5 rounded-md p-2.5 text-gray-700'
						onClick={() => setOpen(false)}
					>
						<span className='sr-only'>Close menu</span>
						<XMarkIcon className='h-6 w-6' aria-hidden='true' />
					</button>
				</div>
				<div className='mt-6 flow-root'>
					<div className='-my-6 divide-y divide-gray-500/10'>
						<div className='space-y-2 py-6'>
							<MobileProductDisclosure />
							<MobileNavLink href='wishlist'>Wishlist</MobileNavLink>
							<MobileNavLink href='#'>Marketplace</MobileNavLink>
							<MobileNavLink href='#'>Company</MobileNavLink>
						</div>
						<div className='py-6'>
							{user ? (
								<Link
									href={'/login'}
									className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
									onClick={() => logout()}
								>
									Logout
								</Link>
							) : (
								<>
									<Link
										href={'/login'}
										className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
										onClick={refreshLogin}
									>
										Log in <span aria-hidden='true'>&rarr;</span>
									</Link>
									<Link
										href={'/login'}
										className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
									>
										Register <span aria-hidden='true'>&rarr;</span>
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</Dialog.Panel>
		</Dialog>
	);
}

function MobileProductDisclosure() {
	return (
		<Disclosure as='div' className='-mx-3'>
			{({ open }: { open: boolean }) => (
				<>
					<Disclosure.Button className='flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
						Product
						<ChevronDownIcon
							className={`h-5 w-5 flex-none ${open ? 'rotate-180' : ''}`}
							aria-hidden='true'
						/>
					</Disclosure.Button>
					<Disclosure.Panel className='mt-2 space-y-2'>
						{[...products, ...callsToAction].map((item) => (
							<Disclosure.Button
								key={item.name}
								as='a'
								href={item.href}
								className='block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50'
							>
								{item.name}
							</Disclosure.Button>
						))}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
	return (
		<Link href={href} className='text-sm font-semibold leading-6 text-gray-900'>
			{children}
		</Link>
	);
}

function MobileNavLink({ href, children }: NavLinkProps) {
	return (
		<Link
			href={href}
			className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
		>
			{children}
		</Link>
	);
}
