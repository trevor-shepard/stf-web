import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'

import { AppThunk } from '..'

import { db } from 'utils/firebase'

import { GroupsState, Group } from 'types'

import { fetchMember } from './membersSlice'
const initialState: GroupsState = {}

const groups = createSlice({
	name: 'groups',
	initialState,
	reducers: {
		recieveGroup(state, action: PayloadAction<Group>) {
			const group = action.payload

			return {
				...state,
				[group.id]: group
			}
		},
		recieveGroups(state, action: PayloadAction<GroupsState>) {
			return {
				...state,
				...action.payload
			}
		},
		clearGroups() {
			return {}
		}
	}
})

export const { recieveGroup, recieveGroups, clearGroups } = groups.actions

export default groups.reducer

export const fetchUserGroups = (uid: string): AppThunk => async dispatch => {
	try {
		const groups = await db
			.collection('groups')
			.where('members', 'array-contains', uid)
			.get()
			.then(querySnapshot => {
				const values: { [id: string]: Group } = {}
				querySnapshot.forEach(doc => {
					const group = doc.data() as Group
					values[group.id] = group
				})

				return values
			})

		for (const group of Object.values(groups)) {
			const { members } = group
			for (const member of members) dispatch(fetchMember(member))
		}

		dispatch(recieveGroups(groups))
	} catch (error) {}
}

export const createGroup = (name: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		const { user } = getState()
		const uid = user.uid as string
		const ref = await db.collection('groups').doc()
		const group = {
			name,
			id: ref.id,
			locked: {
				[uid]: false
			},
			members: [uid],
			activities: {
				run$mile: {
					example: 4
				},
				sleep_in$hour: {
					example: -4
				}
			}
		}

		await ref.set(group)

		dispatch(recieveGroup(group))
	} catch (error) {}
}

export const joinGroup = (id: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		const {
			user: { uid }
		} = getState()
		const group = (await db
			.collection('groups')
			.doc(id)
			.get()
			.then(doc => doc.data())) as Group

		const { members, locked } = group

		const isLocked =
			Object.values(locked).reduce((acc, curr) => (curr ? acc + 1 : acc), 0) >
			Object.values(locked).length / 2

		if (isLocked) throw Error('group is locked')

		await db
			.collection('groups')
			.doc(id)
			.update({
				members: [...members, uid],
				locked: { ...locked, [uid as string]: false }
			})

		for (const member of members) dispatch(fetchMember(member))

		dispatch(
			recieveGroup({
				...group,
				members: [...members, uid as string]
			})
		)
	} catch (error) {}
}

export const requestVote = (
	groupID: string,
	verb: string,
	vote: number
): AppThunk => async (dispatch, getState) => {
	try {
		const state = getState()

		const uid = state.user.uid as string

		const group = state.groups[groupID]

		const activities = group.activities

		const votes = activities[verb]
		
		const updatedGroup = {
			...group,
			activities: {
				...activities,
				[verb]: {
					...votes,
					[uid]: vote
				}
			}
		}

		if (votes.example) {
			dispatch(
				requestRemoveExampleVote(groupID, verb, {
					...votes,
					[uid]: vote
				})
			)
		} else {
			await db
				.collection('groups')
				.doc(groupID)
				.update(updatedGroup)

			dispatch(recieveGroup(updatedGroup))
		}
	} catch (error) {
		debugger
	}
}

export const requestRemoveExampleVote = (
	groupID: string,
	verb: string,
	votes: {
		[uid: string]: number
	}
): AppThunk => async (dispatch, getState) => {
	try {
		const state = getState()

		const group = state.groups[groupID]

		const activities = group.activities

		const updatedVotes = Object.keys(votes).reduce((acc, key) => {
			if (key !== 'example')
				return {
					...acc,
					[key]: votes[key]
				}
			return acc
		}, {})

		const updatedGroup = {
			...group,
			activities: {
				...activities,
				[verb]: updatedVotes
			}
		}

		await db
			.collection('groups')
			.doc(groupID)
			.update(updatedGroup)

		dispatch(recieveGroup(updatedGroup))
	} catch (error) {}
}

export const addActivity = (
	groupID: string,
	verb: string,
	vote: number
): AppThunk => async (dispatch, getState) => {
	try {
		const state = getState()

		const uid = state.user.uid as string

		const group = state.groups[groupID]

		const activities = group.activities

		const updatedGroup = {
			...group,
			activities: {
				...activities,
				[verb]: {
					[uid]: vote
				}
			}
		}

		await db
			.collection('groups')
			.doc(groupID)
			.update(updatedGroup)

		dispatch(recieveGroup(updatedGroup))
	} catch (error) {}
}

export const subscribeToGroups = (dispatch: Dispatch<any>, uid: string) => {
	const unsubscribe = db
		.collection('groups')
		.where('members', 'array-contains', uid)
		.onSnapshot(querySnapshot => {
			const groups: { [id: string]: Group } = {}
			querySnapshot.forEach(doc => {
				const group = doc.data() as Group
				groups[group.id] = group
			})

			for (const group of Object.values(groups)) {
				const { members } = group
				for (const member of members) dispatch(fetchMember(member))
			}

			dispatch(recieveGroups(groups))
		})

	return unsubscribe
}
