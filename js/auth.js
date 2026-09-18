import { auth } from "../firebase.js";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


/* =========================
   ADMIN LOGIN
========================= */

const loginForm = document.getElementById("adminLoginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");

        message.textContent = "Login হচ্ছে...";

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            window.location.href = "dashboard.html";

        } catch (error) {

            console.error(error);

            message.textContent =
                "Email অথবা Password সঠিক নয়।";

        }
    });
}


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(auth, (user) => {

    const currentPage =
        window.location.pathname.split("/").pop();

    if (
        user &&
        currentPage === "login.html"
    ) {
        window.location.href = "dashboard.html";
    }

});


/* =========================
   LOGOUT
========================= */

const logoutButton =
    document.getElementById("logoutBtn");

if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        try {

            await signOut(auth);

            window.location.href =
                "login.html";

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );

        }

    });

}
