import { createSelector } from 'reselect'

export const selectSession = state => state.session

export const selectUser = createSelector(selectSession, (session) => session.user)
