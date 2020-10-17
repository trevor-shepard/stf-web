import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '..'

import { db, handleFireBaseUpload } from 'utils/firebase'

import { User, Member, MembersState, Action, MemberActions } from 'types'

const initialState: MembersState = {}

const members = createSlice({
	name: 'events',
	initialState,
	reducers: {
		recieveAction(state, reduxAction: PayloadAction<Action>) {
			const action = reduxAction.payload

			let user = state[action.uid] as Member
			user = {
				...user,
				actions: {
					...user.actions,
					[action.id]: action
				}
			}

			return {
				...state,
				[user.uid]: {
					...user,
					actions: {
						...user.actions,
						[action.id]: action
					}
				}
			}
		},
		recieveMember(state, reduxAction: PayloadAction<Member>) {
			const member = reduxAction.payload

			return {
				...state,
				[member.uid]: member
			}
		},
		recieveMemberActions(state, reduxAction: PayloadAction<MemberActions>) {
			const actions = reduxAction.payload
			const { uid } = Object.values(actions)[0]
			const member = state[uid]

			return {
				...state,
				[uid]: {
					...member,
					actions: {
						...member.actions,
						...actions
					}
				}
			}
		},
		clearMembers() {
			return {}
		}
	}
})

export const {
	recieveAction,
	recieveMember,
	recieveMemberActions,
	clearMembers
} = members.actions

export default members.reducer

export const fetchMember = (uid: string): AppThunk => async dispatch => {
	try {
		const member = (await db
			.collection('users')
			.doc(uid)
			.get()
			.then(doc => doc.data())) as User
		const actions = await db
			.collection('actions')
			.where('uid', '==', uid)
			.get()
			.then(querySnapshot => {
				const values: { [id: string]: Action } = {}
				querySnapshot.forEach(doc => {
					const action = doc.data() as Action
					values[action.id] = action
				})

				return values
			})
		dispatch(
			recieveMember({
				...member,
				actions
			})
		)
	} catch (e) {}
}

export const fetchMembersActions = (
	uid: string
): AppThunk => async dispatch => {
	try {
		const actions = await db
			.collection('actions')
			.where('uid', '==', uid)
			.get()
			.then(querySnapshot => {
				const values: { [id: string]: Action } = {}
				querySnapshot.forEach(doc => {
					const action = doc.data() as Action
					values[action.id] = action
				})

				return values
			})

		dispatch(recieveMemberActions(actions))
	} catch (e) {}
}

export const recordActivity = (
	date: number,
	name: string,
	quantity: number,
	photo: File | null
): AppThunk => async (dispatch, getState) => {
	const {
		user: { uid }
	} = getState()

	const ref = await db.collection('actions').doc()

	
	const downloadURL = photo ? await handleFireBaseUpload(`/images/${uid}/actions/${ref.id}/${photo.name}`, photo) : null


	const action: Action = {
		uid: uid as string,
		name,
		quantity,
		date,
		id: ref.id,
		photo: downloadURL
	}

	await ref.set(action)

	dispatch(recieveAction(action))
}