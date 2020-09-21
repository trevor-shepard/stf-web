import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { RootState } from 'store/rootReducer'
type RouteProps = {
	exact?: boolean
	path?: string
	component: React.ComponentType<any>
}

const Auth = ({ component: Component, path, exact }: RouteProps) => {
	const loggedIn = useSelector((state: RootState) => state.user.uid !== null)
	return (
		<Route
			path={path}
			exact={exact}
			render={props =>
				!loggedIn ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	)
}

const Protected = ({ component: Component, path, exact }: RouteProps) => {
	const loggedIn = useSelector((state: RootState) => state.user.uid !== null)
	return (
		<Route
			path={path}
			exact={exact}
			render={props =>
				loggedIn ? <Component {...props} /> : <Redirect to="/signup" />
			}
		/>
	)
}

export const AuthRoute = Auth
export const ProtectedRoute = Protected
