import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
    getStorage,
    ref,
    uploadBytes
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwUdaLy1KCEjKgORPopZekP6O5RAUA0kM",
    authDomain: "storage-save-64f8f.firebaseapp.com",
    projectId: "storage-save-64f8f",
    storageBucket: "storage-save-64f8f.appspot.com",
    messagingSenderId: "912814913266",
    appId: "1:912814913266:web:99d6e1ccc47d3140af026b",
    measurementId: "G-6L54FQZ6TQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app, "gs://my-custom-bucket");

const imagesStorageRef = ref(storage, "images");

const images = document.getElementById("images")
const save_file = document.getElementById("save_file")

save_file.addEventListener("click", () => {
    console.log(images.files[0]);

    uploadBytes(imagesStorageRef, images.files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
})