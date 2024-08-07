import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

// Function to handle password change
function handlePasswordChange() {
  const auth = getAuth();
  const user = auth.currentUser;

  const oldPassword = document.getElementById("old-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmNewPassword = document.getElementById(
    "confirm-new-password"
  ).value;

  // Validate input fields
  if (newPassword !== confirmNewPassword) {
    document.getElementById("error-confirm-new-password").textContent =
      "პაროლები არ ემთხვევა";
    return;
  }

  if (!user) {
    console.error("No user is currently logged in.");
    return;
  }

  // Re-authenticate user
  const credential = EmailAuthProvider.credential(user.email, oldPassword);
  reauthenticateWithCredential(user, credential)
    .then(() => {
      // Update password
      return updatePassword(user, newPassword);
    })
    .then(() => {
      console.log("Password updated successfully.");
      // Redirect or show success message
      window.location.href = "../index.html"; // Redirect to the main page or any other page
    })
    .catch((error) => {
      console.error("Error updating password:", error);
      // Handle errors (e.g., show error messages)
      if (error.code === "auth/wrong-password") {
        document.getElementById("error-old-password").textContent =
          "არასწორი ძველი პაროლი";
      }
    });
}

// Add event listener to the form
document
  .getElementById("change-password-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    handlePasswordChange();
  });
