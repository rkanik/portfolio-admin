'use client'

import { Maybe, TProps } from '@/types'
import { Database } from '@/types/supabase'
import { Session, User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext<{
	user: Maybe<User>
	session: Maybe<Session>
}>(null!)

type Props = TProps & {
	initialUser?: Maybe<User>
	initialSession?: Maybe<Session>
}

export const AuthProvider = ({ children, initialUser, initialSession }: Props) => {
	const [user, setUser] = useState<Maybe<User>>(initialUser)
	const [session, setSession] = useState<Maybe<Session>>(initialSession)

	const supabase = createClientComponentClient<Database>()

	useEffect(() => {
		const v = supabase.auth.onAuthStateChange((event, session) => {
			console.log('onAuthStateChange', event, session)
			setSession(session)
			setTimeout(async () => {
				const {
					data: { user },
				} = await supabase.auth.getUser()
				console.log('getUser', user)
				setUser(user)
			}, 0)
		})
		return () => {
			v.data.subscription.unsubscribe()
		}
	}, [])

	return <AuthContext.Provider value={{ user, session }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('AuthProvider not used!')
	}
	return context
}
