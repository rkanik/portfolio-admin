'use client'

import type { TProps } from '@/types'

import { cn } from '@/utils/cn'
import { useState } from 'react'
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps } from 'antd'
import {
	DashboardOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	OrderedListOutlined,
	ProjectOutlined,
	UserOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/useAuthContext'

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

	const router = useRouter()
	const supabase = createClientComponentClient<Database>()
	const { user } = useAuthContext()

	const [items] = useState(
		toMenuItems([
			{
				href: '/',
				label: 'Home',
				icon: <DashboardOutlined />,
			},
			{
				href: `/${user?.user_metadata.username}`,
				label: 'Profile',
				icon: <UserOutlined />,
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

	const onUpdate = () => {
		// supabase.auth
		// 	.updateUser({
		// 		data: {
		// 			username: 'rkanik',
		// 			// name: 'RK Anik',
		// 			// dob: '02-02-1997',
		// 			// gender: 'male',
		// 			// thumbnail: 'https://avatars.githubusercontent.com/u/30260735',
		// 		},
		// 	})
		// 	.then((res) => {
		// 		console.log(res)
		// 		supabase.auth.getUser().then((res) => {
		// 			console.log(res)
		// 		})
		// 	})
	}

	return (
		<div className='h-screen !bg-[url(/img/bg2.jpg)] !bg-cover !bg-top !bg-no-repeat flex flex-col overflow-hidden'>
			<div className='flex flex-1 overflow-hidden'>
				<div className='absolute inset-0 z-0 bg-black/90 backdrop-blur-md'></div>
				<Layout.Sider
					{...{ collapsed }}
					width={250}
					className='!bg-white/[0.09] !backdrop-blur-md border-r border-white border-opacity-10 !sticky !top-0'
					onCollapse={(v) => setCollapsed(v)}
				>
					<div
						className='h-16 flex items-center px-3 text-lg'
						onClick={onUpdate}
					>
						{user?.user_metadata.name}
					</div>
					<Menu
						theme='dark'
						mode='inline'
						className='!bg-transparent !p-1'
						defaultSelectedKeys={['Home']}
						items={items}
					/>
				</Layout.Sider>
				<div className='relative flex-1 flex flex-col'>
					<div
						id='scrollable'
						className='flex-1 z-10 relative overflow-auto scroll-smooth'
					>
						<Layout.Header className='!px-3 m-3 !bg-white/[0.09] !backdrop-blur-md !rounded-lg !sticky !top-3 z-50 border border-white border-opacity-5 flex items-center justify-between'>
							<Button
								type='text'
								icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
								onClick={() => setCollapsed(!collapsed)}
							/>

							<Dropdown
								menu={{
									items: [
										{
											key: 'logout',
											label: 'Logout',
											async onClick(v) {
												await supabase.auth.signOut()
												router.replace('/login')
											},
										},
									],
								}}
								placement='bottomRight'
								arrow={{ pointAtCenter: true }}
							>
								<Avatar>U</Avatar>
							</Dropdown>
						</Layout.Header>
						<Layout.Content className='px-3'>{children}</Layout.Content>
					</div>
				</div>
			</div>
			<div className='h-6 flex items-center px-2 !bg-white/[0.09] !backdrop-blur-md flex-none border-t border-white border-opacity-10'>
				Footer
			</div>
		</div>
	)
}
