import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    push,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const navHome = document.getElementById("home");
navHome.addEventListener("click", () => {
    window.location.href = "../pages/hero.html"
})

const firebaseConfig = {
    apiKey: "AIzaSyAyMYsKMwOWeiWl_a2o0Q9ybHcoHcmBcAw",
    authDomain: "passx-b9457.firebaseapp.com",
    projectId: "passx-b9457",
    storageBucket: "passx-b9457.appspot.com",
    messagingSenderId: "1078047940805",
    appId: "1:1078047940805:web:b3a8c1e83317013b4150ac",
    measurementId: "G-BF41YRMRB0",
    databaseURL: "https://passx-b9457-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

console.log("script connected");

const addingPassword = document.getElementById("adding-password");

addingPassword.addEventListener("click", function () {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("User ID:", uid);

            const websitename = document.getElementById("websiteToAdd").value;
            const email = document.getElementById("emailToAdd").value;
            const password = document.getElementById("passwordToAdd").value;

            console.log(websitename, email, password);

            const sanitizedWebsiteName = websitename.replace(
                /[^a-zA-Z0-9_-]/g,
                "_"
            );

            function writeUserData(userId, websitename, email, password) {
                console.log("Saving data to database...");

                // Use the sanitized website name as the key
                const websiteRef = ref(
                    database,
                    `users/${userId}/credentials/${sanitizedWebsiteName}`
                );

                set(websiteRef, {
                    websitename: websitename,
                    email: email,
                    password: password,
                })
                    .then(() => {
                        console.log("Data saved successfully!");
                        console.log("loading");
                        document.getElementById("add-pass-success").style.transition = "all 0.5s ease-in-out;"
                        document.getElementById("add-pass-success").style.display = "flex"
                        setTimeout(() => {
                            document.getElementById("add-pass-success").style.display = "none"
                        }, 4000);
                        
                    })
                    .catch((error) => {
                        console.error("Error saving data:", error);
                    });
            }

            writeUserData(uid, sanitizedWebsiteName, email, password);
        } else {
            console.log("User is logged out");
        }
    });

    console.log("Entered in adding password event");
});
