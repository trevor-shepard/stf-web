import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '..'

import firebase, { auth, db } from 'utils/firebase'

export interface UserState {
	username: string | null
	email: string | null
	uid: string | null
	error: string | null
}

export interface User {
	username: string
	uid: string
	email: string
}

export interface ExpertUser {
	username: string
	uid: string
	email: string
}

interface UserWithoutId {
	username: string
	email: string
}

interface UserUpdate {}

const initialState: UserState = {
	username: null,
	email: null,
	uid: null,
	error: null
}

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		recieveUser(state, action: PayloadAction<User>) {
			return {
				...action.payload,
				error: null
			}
		},
		clear() {
			firebase.auth().signOut()
			return {
				username: null,
				email: null,
				uid: null,
				error: null
			}
		},
		updateUser(state, action: PayloadAction<UserUpdate>) {
			return {
				...state,
				...action.payload
			}
		},
		userError(state, action: PayloadAction<string>) {
			state.error = action.payload
			return state
		}
	}
})

export const { recieveUser, userError, clear, updateUser } = user.actions

export default user.reducer

export const login = (email: string, password: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		const uid = await auth
			.signInWithEmailAndPassword(email, password)
			.then(resp => {
				if (resp === null || resp.user === null) {
					throw new Error('user not found')
				} else {
					return resp.user.uid
				}
			})
		const user = (await db
			.collection('users')
			.doc(uid)
			.get()
			.then(doc => doc.data())) as User

		dispatch(recieveUser(user))
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const signup = (
	user: UserWithoutId,
	password: string
): AppThunk => async dispatch => {
	try {
		const uid = await auth
			.createUserWithEmailAndPassword(user.email, password)
			.then(resp => {
				if (resp === null || resp.user === null) {
					throw new Error('user not found')
				} else {
					return resp.user.uid
				}
			})

		await db
			.collection('users')
			.doc(uid)
			.set({
				...user,
				uid
			})
		dispatch(
			recieveUser({
				...user,
				uid
			})
		)
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const update = (
	id: string,
	update: UserUpdate
): AppThunk => async dispatch => {
	try {
		await db
			.collection('users')
			.doc(id)
			.update(update)
		dispatch(updateUser(update))
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const logout = (): AppThunk => async dispatch => {
	dispatch(clear())
}
