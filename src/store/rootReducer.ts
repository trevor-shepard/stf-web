import { combineReducers } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import groups from './slices/groupsSlice'
import members from './slices/membersSlice'

const rootReducer = combineReducers({
	user,
	groups,
	members
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
