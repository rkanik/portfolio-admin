import type { TProps } from '@/types'
import AppLayoutClient from './layout-client'

export default function AppLayout({ children }: TProps) {
	return <AppLayoutClient>{children}</AppLayoutClient>
}
