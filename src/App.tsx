import React from 'react'
import './styles/App.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { useMediaQuery } from 'react-responsive'

import store from 'store'
import SignUp from 'features/signup'
import Homepage from 'features/homepage'
import Groups from 'features/groups'

import { AuthRoute, ProtectedRoute } from './utils/routeUtils'
// import LinkedInPopUp from 'components/LinkedIn/LinkedInPopUp'

import MobileNav from 'features/navbar/mobile'
import DesktopNav from 'features/navbar/desktop'

export const persistor = persistStore(store)

function App() {
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	})
	return (
		<div className="App">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router>
						{!isTabletOrMobileDevice && (
							<ProtectedRoute component={DesktopNav} />
						)}
						<Switch>
							{/* <Route path="/linkedin" component={LinkedInPopUp} /> */}
							<AuthRoute path="/signup" component={SignUp} />

							<ProtectedRoute path="/groups" component={Groups} />
							<ProtectedRoute path="/" component={Homepage} />
						</Switch>
						{isTabletOrMobileDevice && <ProtectedRoute component={MobileNav} />}
					</Router>
				</PersistGate>
			</Provider>
		</div>
	)
}

export default App
