'use client'

import { Json } from '@/components/Json'
import { useAuthContext } from '@/context/useAuthContext'
import { UserOutlined } from '@ant-design/icons'
import {
	Button,
	Col,
	Divider,
	Flex,
	Form,
	Input,
	Row,
	Select,
	Space,
	Timeline,
	Typography,
} from 'antd'
import { useParams } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import { RiGraduationCapLine } from 'react-icons/ri'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'

export default function Page() {
	const { user } = useAuthContext()
	const { username } = useParams<{ username: string }>()

	const onScrollToSection = useCallback((id: string) => {
		const scrollable = document.getElementById('scrollable')
		scrollable?.scrollTo({
			behavior: 'smooth',
			top: Math.round(
				(document.getElementById(id)?.getBoundingClientRect().top ?? 0) +
					(scrollable?.scrollTop || 0) -
					144,
			),
		})
	}, [])

	const [timelineItems] = useState(
		[
			{
				id: 'personal',
				children: 'Personal',
				dot: <UserOutlined className='text-lg' />,
			},
			{
				id: 'education',
				children: 'Education',
				dot: <RiGraduationCapLine className='text-lg' />,
			},
			{
				id: 'employment',
				children: 'Employment',
				dot: <HiOutlineOfficeBuilding className='text-lg' />,
			},
		].map((v) => ({
			dot: v.dot,
			children: (
				<span
					className='cursor-pointer'
					onClick={() => onScrollToSection(v.id)}
				>
					{v.children}
				</span>
			),
		})),
	)

	const supabase = createClientComponentClient<Database>()

	const toForm = (v?: any) => {
		return {
			name: v?.data?.name || '',
			username: v?.username || '',
			emails: v?.data?.emails || [{ type: 'primary', email: '' }],
		}
	}

	const [form, setForm] = useState(toForm())

	useEffect(() => {
		supabase
			.from('profiles')
			.select('*')
			.eq('username', username)
			.single()
			.then(({ data }) => {
				setForm(toForm(data))
			})
	}, [supabase, username])

	return (
		<div className='flex relative'>
			<div className='w-48 flex-none'>
				<div className='sticky top-28 pl-4 pt-1'>
					<Timeline items={timelineItems} />
				</div>
			</div>
			<div className='max-w-3xl flex-1 mx-auto'>
				<Divider orientation='left'>
					<div className='flex items-center space-x-1'>
						<UserOutlined />
						<span>Personal Information</span>
					</div>
				</Divider>
				<section
					id='personal'
					className='min-h-screen p-8 rounded-lg bg-white/5'
				>
					<Form
						layout='vertical'
						variant='outlined'
					>
						<Json data={form} />
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name='name'
									label='Full Name'
									rules={[{ required: true }]}
								>
									<Input
										className='!bg-transparent'
										value={form.name}
										// onChange={(e) => {
										// 	setForm((v) => ({
										// 		...v,
										// 		name: e.target.value,
										// 	}))
										// }}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name='username'
									label='Username'
									rules={[{ required: true }]}
								>
									<Input
										className='!bg-transparent'
										value={form.username}
										// onChange={(e) => {
										// 	setForm((v) => ({
										// 		...v,
										// 		username: e.target.value,
										// 	}))
										// }}
									/>
								</Form.Item>
							</Col>
							<Col span={24}>
								<Flex
									align='center'
									justify='space-between'
								>
									<Typography>Emails</Typography>
									<Button
										size='small'
										type='text'
										onClick={() => {
											setForm((v) => ({
												...v,
												emails: [
													...v.emails,
													{
														type: '',
														email: '',
													},
												],
											}))
										}}
									>
										Add Email
									</Button>
								</Flex>
								<Divider className='!mt-1 !mb-4' />
							</Col>
							{form.emails.map((item: any) => (
								<>
									<Col span={6}>
										<Form.Item
											name='email-type'
											label='Type'
											rules={[{ required: true }]}
										>
											<Select value={item.type}>
												<Select.Option value='primary'>Primary</Select.Option>
												<Select.Option value='secondary'>Secondary</Select.Option>
												<Select.Option value='home'>Home</Select.Option>
												<Select.Option value='office'>Office</Select.Option>
												<Select.Option value='other'>Other</Select.Option>
											</Select>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name='email'
											label='Email Address'
											rules={[{ required: true }]}
										>
											<Input
												className='!bg-transparent'
												value={item.email}
											/>
										</Form.Item>
									</Col>
									<Col span={6}></Col>
								</>
							))}
						</Row>
					</Form>
				</section>

				<Divider orientation='left'>
					<div className='flex items-center space-x-1'>
						<RiGraduationCapLine /> <span>Education</span>
					</div>
				</Divider>
				<section
					id='education'
					className='h-[1200px]'
				>
					Education
				</section>

				<Divider orientation='left'>
					<div className='flex items-center space-x-1'>
						<HiOutlineOfficeBuilding /> <span>Employment</span>
					</div>
				</Divider>
				<section
					id='employment'
					className='h-[1200px]'
				>
					Employment
				</section>

				{/* My Profile
			<Button href={`/${username}/update`}>Update</Button>
			<Json data={username} />
			<Json data={user} /> */}
			</div>
		</div>
	)
}
