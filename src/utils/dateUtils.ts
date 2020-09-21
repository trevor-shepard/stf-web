export interface Timestamp {
	seconds: number
	nanoseconds: number
}

export const tToD = (timestamp: Timestamp) => new Date(timestamp.seconds * 1000)

export const convertTimestampsToDates = (object: { [key: string]: any }) => {
	const obj: { [key: string]: any } = {}

	for (const key of Object.keys(object)) {
		const value = object[key]

		if (value.seconds) {
			obj[key] = tToD(value as Timestamp)
		} else if (typeof object[key] === 'object') {
			obj[key] = convertTimestampsToDates(value)
		} else {
			obj[key] = value
		}
	}

	return obj
}

export const convertParticipantSeenToDates = (participants: {
	[id: string]: string
}) => {
	const newobj: { [id: string]: Date } = {}

	for (const id of Object.keys(participants)) {
		newobj[id] = new Date(participants[id])
	}
	return newobj
}
