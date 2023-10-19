import { getApps, getApp, initializeApp } from 'firebase/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB7b34oBBuSNaVn_Fp4AzKHrQU9T6LcTNc",
    authDomain: "doevida-a0fe8.firebaseapp.com",
    projectId: "doevida-a0fe8",
    storageBucket: "doevida-a0fe8.appspot.com",
    messagingSenderId: "505561669780",
    appId: "1:505561669780:web:2836e784b378a220119481",
    measurementId: "G-BE89KVKF5F"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
