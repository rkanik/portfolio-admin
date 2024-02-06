'use client'

import * as React from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd'

type Props = {
	title: string
	open?: boolean
	width?: number
	onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void
}

export const DrawerForm = ({ title, width = 512, open, onClose }: Props) => {
	return (
		<Drawer
			title={title}
			width={width}
			onClose={onClose}
			open={open}
			styles={{
				body: {
					paddingBottom: 80,
				},
			}}
			extra={
				<Space>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						onClick={onClose}
						type='primary'
					>
						Submit
					</Button>
				</Space>
			}
		>
			<Form
				layout='vertical'
				hideRequiredMark
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name='name'
							label='Name'
							rules={[{ required: true, message: 'Please enter user name' }]}
						>
							<Input placeholder='Please enter user name' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='url'
							label='Url'
							rules={[{ required: true, message: 'Please enter url' }]}
						>
							<Input
								style={{ width: '100%' }}
								addonBefore='http://'
								addonAfter='.com'
								placeholder='Please enter url'
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name='owner'
							label='Owner'
							rules={[{ required: true, message: 'Please select an owner' }]}
						>
							<Select placeholder='Please select an owner'>
								<Select.Option value='xiao'>Xiaoxiao Fu</Select.Option>
								<Select.Option value='mao'>Maomao Zhou</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='type'
							label='Type'
							rules={[{ required: true, message: 'Please choose the type' }]}
						>
							<Select placeholder='Please choose the type'>
								<Select.Option value='private'>Private</Select.Option>
								<Select.Option value='public'>Public</Select.Option>
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							name='approver'
							label='Approver'
							rules={[{ required: true, message: 'Please choose the approver' }]}
						>
							<Select placeholder='Please choose the approver'>
								<Select.Option value='jack'>Jack Ma</Select.Option>
								<Select.Option value='tom'>Tom Liu</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name='dateTime'
							label='DateTime'
							rules={[{ required: true, message: 'Please choose the dateTime' }]}
						>
							<DatePicker.RangePicker
								style={{ width: '100%' }}
								getPopupContainer={(trigger) => trigger.parentElement!}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							name='description'
							label='Description'
							rules={[
								{
									required: true,
									message: 'please enter url description',
								},
							]}
						>
							<Input.TextArea
								rows={4}
								placeholder='please enter url description'
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	)
}
