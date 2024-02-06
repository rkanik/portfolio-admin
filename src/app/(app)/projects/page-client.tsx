'use client'

import { DrawerForm } from '@/components/DrawerForm'
import {
	DashOutlined,
	DeleteOutlined,
	EditOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
	HomeOutlined,
	ProjectOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Button, Dropdown, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { Layout } from 'antd'
import { useState } from 'react'

interface DataType {
	key: React.Key
	name: string
	age: number
	address: string
}

const columns: TableColumnsType<DataType> = [
	{
		title: 'Full Name',
		width: 100,
		dataIndex: 'name',
		key: 'name',
		fixed: 'left',
	},
	{
		title: 'Age',
		width: 100,
		dataIndex: 'age',
		key: 'age',
		fixed: 'left',
	},
	{
		title: 'Column 1',
		dataIndex: 'address',
		key: '1',
		width: 150,
	},
	{
		title: 'Column 2',
		dataIndex: 'address',
		key: '2',
		width: 150,
	},
	{
		title: 'Column 3',
		dataIndex: 'address',
		key: '3',
		width: 150,
	},
	{
		title: 'Column 4',
		dataIndex: 'address',
		key: '4',
		width: 150,
	},
	{
		title: 'Column 5',
		dataIndex: 'address',
		key: '5',
		width: 150,
	},
	{
		title: 'Column 6',
		dataIndex: 'address',
		key: '6',
		width: 150,
	},
	{
		title: 'Column 7',
		dataIndex: 'address',
		key: '7',
		width: 150,
	},
	{ title: 'Column 8', dataIndex: 'address', key: '8' },
	{
		// title: 'Action',
		key: 'operation',
		fixed: 'right',
		width: 64,
		className: 'text-center',
		render: () => (
			<Dropdown
				placement='bottomRight'
				arrow={{ pointAtCenter: true }}
				trigger={['click']}
				menu={{
					style: {
						minWidth: 150,
					},
					// className: '!bg-white/[0.09] !backdrop-blur-md',
					items: [
						{ key: 'update', label: 'Update', icon: <EditOutlined /> },
						{ key: 'view', label: 'View', icon: <EyeOutlined /> },
						{ key: 'hide', label: 'Make Private', icon: <EyeInvisibleOutlined /> },
						{ type: 'divider' },
						{
							key: 'delete',
							label: 'Delete',
							icon: <DeleteOutlined />,
							style: {
								color: 'red',
							},
						},
					],
				}}
			>
				<Button
					type='text'
					icon={<DashOutlined />}
				/>
			</Dropdown>
		),
	},
]

const data: DataType[] = []
for (let i = 0; i < 100; i++) {
	data.push({
		key: i,
		name: `Edward ${i}`,
		age: 32,
		address: `London Park no. ${i}`,
	})
}

export default function PageClient() {
	const [drawer, setDrawer] = useState(false)

	return (
		<div className='overflow-hidden'>
			<div className='flex items-center justify-between'>
				<div className='text-lg font-medium'>Projects</div>
				<Button onClick={() => setDrawer(true)}>Create Project</Button>
			</div>
			<Table
				size='small'
				columns={columns}
				dataSource={data}
				rowSelection={{}}
				scroll={{ x: 1200, y: 600 }}
				className='mt-4 !bg-transparent'
			/>
			<DrawerForm
				title='Create Project'
				open={drawer}
				onClose={() => setDrawer(false)}
			/>
		</div>
	)
}
