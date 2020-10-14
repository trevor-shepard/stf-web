import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '..'

import firebase, { auth, db } from 'utils/firebase'

import {
	UserState,
	User,
	UserUpdate,
	UserWithoutId,
	MemberActions
} from 'types'

import { clearGroups, fetchUserGroups } from './groupsSlice'
import { clearMembers, recieveMember } from './membersSlice'

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

export const login = (
	email: string,
	password: string
): AppThunk => async dispatch => {
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

		await recieveMember({
			...user,
			uid,
			actions: {}
		})
		dispatch(
			recieveMember({
				...user,
				uid,
				actions: {}
			})
		)

		dispatch(fetchUserGroups(uid))

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

		dispatch(
			recieveMember({
				...user,
				uid,
				actions: {}
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
	dispatch(clearGroups())
	dispatch(clearMembers())
}

export const addUserPhoto = (photo: string): AppThunk => async (
	dispatch,
	getState
) => {
	const { user, members } = getState()

	const uid = user.uid as string
	await db
		.collection('users')
		.doc(uid)
		.update({
			photo
		})

	dispatch(updateUser({ photo }))

	dispatch(
		recieveMember({
			...(user as User),
			actions: members[uid].actions as MemberActions,
			photo
		})
	)
}
