import type { Metadata } from 'next'
import type { TProps } from '@/types'

import { Roboto } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import RootLayoutClient from './layout-client'

import './globals.css'

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Admin | RK',
	description: 'Admin panel of RK Anik',
}

export default function RootLayout({ children }: TProps) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<AntdRegistry>
					<RootLayoutClient>{children}</RootLayoutClient>
				</AntdRegistry>
			</body>
		</html>
	)
}
