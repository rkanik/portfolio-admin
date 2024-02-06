import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()

	const supabase = createMiddlewareClient<Database>({ req, res })
	const session = await supabase.auth.getSession()

	if (!session.data.session && req.nextUrl.pathname !== '/login') {
		const absoluteURL = new URL('/login', req.nextUrl.origin)
		return NextResponse.redirect(absoluteURL.toString())
	} else if (!!session.data.session && req.nextUrl.pathname === '/login') {
		const absoluteURL = new URL('/', req.nextUrl.origin)
		return NextResponse.redirect(absoluteURL.toString())
	}

	return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!_next/static|_next/image|favicon.ico).*)',
	],
}
