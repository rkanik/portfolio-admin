'use client'

import type { TProps } from '@/types'

import { useState } from 'react'
import { cn } from '@/utils/cn'
import { Button, Layout, Menu, theme, MenuProps } from 'antd'
import {
	DashboardOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	OrderedListOutlined,
	ProjectOutlined,
} from '@ant-design/icons'
import Link from 'next/link'

type MenuItem = Required<MenuProps>['items'][number]

const toMenuItems = (items: any[]): MenuItem[] => {
	return items.map((item) => ({
		...item,
		key: item.key || item.label,
		label: item.label && item.href ? <Link href={item.href}>{item.label}</Link> : item.label,
		children: Array.isArray(item.children) ? toMenuItems(item.children) : null,
	}))
}

export default function AppLayoutClient({ children }: TProps) {
	const [collapsed, setCollapsed] = useState(false)

	const [items] = useState(
		toMenuItems([
			{
				href: '/',
				label: 'Home',
				icon: <DashboardOutlined />,
			},
			{
				label: 'Projects',
				href: '/projects',
				icon: <ProjectOutlined />,
			},
			{
				label: 'Other',
				icon: <OrderedListOutlined />,
				children: [
					{
						label: 'Option 1',
					},
					{
						label: 'Option 2',
					},
				],
			},
		]),
	)

	return (
		<Layout className='h-screen !bg-[url(/img/bg2.jpg)] !bg-cover !bg-top !bg-no-repeat overflow-hidden'>
			<div className='absolute inset-0 z-0 bg-black/90 backdrop-blur-md'></div>
			<Layout.Sider
				{...{ collapsed }}
				width={250}
				className='!bg-white/[0.09] !backdrop-blur-md p-2 border-r border-white border-opacity-10'
				onCollapse={(v) => setCollapsed(v)}
			>
				<Menu
					theme='dark'
					mode='inline'
					className='!bg-transparent'
					defaultSelectedKeys={['Home']}
					items={items}
				/>
			</Layout.Sider>
			<div className='flex-1 overflow-auto z-10 relative'>
				<Layout.Header
					className={cn(
						'!p-0 m-3 !bg-white/[0.09] !backdrop-blur-md !rounded-lg !sticky !top-3 z-50',
					)}
				>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Layout.Header>
				<Layout.Content className='overflow-auto px-3'>
					<div className='h-[1200px] '>{children}</div>
				</Layout.Content>
				<Layout.Footer className='h-6 !py-0 flex items-center !px-2 mt-3 !bg-white/[0.09] !backdrop-blur-md !sticky !bottom-0 z-50'>
					Footer
				</Layout.Footer>
			</div>
		</Layout>
	)
}
