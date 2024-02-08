import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
});
