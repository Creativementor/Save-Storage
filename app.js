import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs
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
    apiKey: "AIzaSyAiX7dwNLVt6k3GyizXCGqd_CB-5MagC-w",
    authDomain: "save-data-fcdc1.firebaseapp.com",
    projectId: "save-data-fcdc1",
    storageBucket: "save-data-fcdc1.appspot.com",
    messagingSenderId: "644889784637",
    appId: "1:644889784637:web:aba69675e5ee43c5325554",
    measurementId: "G-BZB3FZG8BJ"
};



const image = document.getElementById("image");
const save_file = document.getElementById("save_file");
const container = document.getElementById("container");

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const db = getFirestore(app);

const imagesCollection = collection(db, "images")

getImagesFromDB();

save_file.addEventListener("click", () => {
    console.log(image.files[0]);

    const imagesStorageRef = ref(storage, image.files[0].name)

    save_file.disabled = true;

    uploadBytes(imagesStorageRef, image.files[0])
        .then((snapshot) => {
            console.log('Uploaded an array!');

            getDownloadURL(imagesStorageRef)
                .then((url) => {

                    // add url + category to the db

                    console.log("url =>", url);

                    addDoc(imagesCollection, { url, category: "images" }).then(() => {
                        console.log("Docment updated to the DB");
                        getImagesFromDB();
                        save_file.disabled = false;
                    });
                })
                .catch((err) => {
                    console.log("Error in download", err), (save_file.disabled = false);
                })
        })
        .catch((err) => {
            console.log(err), (save_file.disabled = false);
        })
});

async function getImagesFromDB() {
    const querySnapshot = await getDocs(imagesCollection);
    container.innerHTML = ""
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`);
        
        console.log(doc.data());

        const img = `  <img id="${doc.id}"
         src="${doc.data().url}"
        style="height: 300px; width: 300px; border-radius: 12px; margin: 30px;" 
         
         />`

         container.innerHTML += img;
    });
}