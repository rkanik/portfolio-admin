import type { TProps } from '@/types'
import type { Database } from '@/types/supabase'

import AppLayoutClient from './layout-client'

import { cookies } from 'next/headers'
import { AuthProvider } from '@/context/useAuthContext'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function AppLayout({ children }: TProps) {
	const cookieStore = cookies()
	const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

	const userRes = await supabase.auth.getUser()
	const sessionRes = await supabase.auth.getSession()

	return (
		<AuthProvider
			initialUser={userRes.data.user}
			initialSession={sessionRes.data.session}
		>
			<AppLayoutClient>{children}</AppLayoutClient>
		</AuthProvider>
	)
}
