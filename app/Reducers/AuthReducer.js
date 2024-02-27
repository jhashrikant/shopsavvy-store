function Authreducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }

        case 'RESET':
            return action.payload

        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuthenticated: true
            }

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true
            }

        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false
            }

        case 'LOAD_AUTH_STATUS':
            return {
                ...state,
                isAuthenticated: action.payload
            }

        case 'USER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }

}
export default Authreducer;