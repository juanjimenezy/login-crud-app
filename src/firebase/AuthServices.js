import { auth } from './config';

export const loginFirebase = async (registro) => {
    const response = await auth.signInWithEmailAndPassword(registro.email, registro.password);
    return response;
};

export const registerFirebase = async(registro) => {
    const response = await auth.createUserWithEmailAndPassword(registro.email,registro.password);
    return response;
};

export const getUserFirebase = () => {
    const user = auth.currentUser;
    return user;
};

export const logoutFirebase = async() => {
    await auth.signOut();
    return;
};