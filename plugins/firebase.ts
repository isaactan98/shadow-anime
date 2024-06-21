import {initializeApp} from "firebase/app";
import {setAuth} from "~/composables/firebase-utils";

export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig();

    const firebaseConfig: any = {
        apiKey: config['public'].firebaseApiKey,
        authDomain: config['public'].firebaseAuthDomain,
        projectId: config['public'].firebaseProjectId,
        storageBucket: config['public'].firebaseStorageBucket,
        messagingSenderId: config['public'].firebaseMessageId,
        appId: config['public'].firebaseAppId,
        measurementId: config['public'].firebaseMeasurementId,
    };

    // Initialize Firebase
    initializeApp(firebaseConfig);

    initAuth()
});
