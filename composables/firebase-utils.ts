import {getAuth} from "firebase/auth";

let isLoggedIn = false;
let userDetails: any = null;

export function initAuth() {
    const auth = getAuth();
    if (auth) {
        auth.onAuthStateChanged((user) => {
            isLoggedIn = !!user;
            if (user) {
                userDetails = userDetails || {};
            }
            // console.log(user)
        }, (error) => {
            console.error("Error checking user login status:", error);
            isLoggedIn = false;
        });
    } else {
        isLoggedIn = false;
    }
}

export async function setAuth() {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        if (auth) {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    isLoggedIn = true;
                    userDetails = user;
                    resolve(userDetails);
                } else {
                    isLoggedIn = false;
                    userDetails = null;
                    resolve(null);
                }
            }, (error) => {
                console.error("Error checking user login status:", error);
                isLoggedIn = false;
                userDetails = null;
                reject(error);
            });
        } else {
            isLoggedIn = false;
            userDetails = null;
            resolve(null);
        }
    });
}

export {isLoggedIn, userDetails};