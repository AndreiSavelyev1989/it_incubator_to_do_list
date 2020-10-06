type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionsTypes =
    ReturnType<typeof incrementAgeAC>|
    ReturnType<typeof incrementChildrenCountAC>|
    ReturnType<typeof changeNameAC>

const incrementAgeAC = () => ({type: "INCREMENT-AGE"}) as const
const incrementChildrenCountAC = () => ({type: "INCREMENT-CHILDREN-COUNT"}) as const
const changeNameAC = (newName: string) => ({type: "CHANGE-NAME", newName}) as const

export const userReducer = (state: StateType, action: ActionsTypes) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {
                ...state,
                age: state.age + 1
            }
        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE-NAME':
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error("I don't understand this type")
    }
}