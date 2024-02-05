'use client'

import type { TProps } from '@/types'
import { App, ConfigProvider, theme } from 'antd'

export default function RootLayoutClient({ children }: TProps) {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<App>{children}</App>
		</ConfigProvider>
	)
}
