import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
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

const image = document.getElementById("image")
const save_file = document.getElementById("save_file")

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const db = getFirestore(app);

const imagesCollection = collection(db, "images")



save_file.addEventListener("click", () => {
    console.log(image.files[0]);

    const imagesStorageRef = ref(storage, image.files[0].name)

    uploadBytes(imagesStorageRef, image.files[0])
        .then((snapshot) => {
            console.log('Uploaded an array!');

            getDownloadURL(imagesStorageRef)
                .then((url) => {
                    //add url + category to the db

                    console.log("url =>", url);

                    addDoc(imagesCollection, { url, category: "image" }).then(() => {

                        console.log("Document updated to the DB");

                    })
                })
                .catch((err) => console.log("Error in Download", err))
            })
            .catch((err) => console.log(err))
});
