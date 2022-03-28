import noteReducer from "./noteReducer"
import deepFreezer from "deep-freezer"

describe('noteReducer', () => {
    test('return new state with action NEW_NOTE', () => {
        const state = []
        const action = {
            type: 'NEW_NOTE',
            data: {
                content: 'the app state is in redux store',
                important: true,
                id: 1,
            },
        }

        deepFreezer(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })

    test('return new state with action TOGGLE_IMPORTANTCE', () => {
        const state = [
            {
                content: 'the app is in redux store',
                important: true,
                id: 1,
            },
            {
                content: 'state changes are made with actions',
                important: false,
                id: 2,
            }
        ]

        const action = {
            type: 'TOGGLE_IMPORTANCE',
            data: {
                id: 2
            }
        }

        deepFreezer(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[0])

        expect(newState).toContainEqual({
            content: 'state changes are made with actions',
            important: true,
            id: 2
        })
    })
})