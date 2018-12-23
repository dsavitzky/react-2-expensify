import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = uid => ({
    type: 'LOGIN',
    uid
})

export const logOut = () => ({
    type: 'LOGOUT'
})

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider)
    }
}

export const startLogOut = () => {
    return () => {
        return firebase.auth().signOut()
    }
}