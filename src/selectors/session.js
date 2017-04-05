export const selectSession = state => state.session

export const selectUser = state => state.session.get('user')
