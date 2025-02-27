import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import cron from "node-cron";
import KaryawanRoute from "./routes/KaryawanRoute.js"
import PlafondRoute from "./routes/PlafondRoute.js"
import PinjamanRoute from "./routes/PinjamanRoute.js"
import AntreanPengajuan from "./routes/AntreanPengajuanRoute.js";
import AngsuranRoute from "./routes/AngsuranRoute.js"; 
// import updateAngsuranOtomatis from './routes/UpdateAngsuranOtomatis.js';

import UserRoute from "./routes/UserRoutes.js";
import verifyToken from "./middlewares/authMiddleware.js";
import checkSessionTimeout from "./middlewares/checkSessionTimeout.js";
import dotenv from 'dotenv';
import "./cronjobs.js";

import './models/PinjamanModel.js';
import './models/KaryawanModel.js';
import './models/AntreanPengajuanModel.js';
import './models/Association.js';
import './models/AngsuranModel.js';
import './models/PlafondModel.js'; 
import './models/UserModel.js';
import jwt from 'jsonwebtoken';


const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());

app.use(UserRoute); // Rute user untuk login, tanpa middleware otentikasi

const protectedRoutes = [
    KaryawanRoute,
    PlafondRoute,
    PinjamanRoute,
    AntreanPengajuan,
    AngsuranRoute,
    // PlafondUpdateRoute,
    // updateAngsuranOtomatis
];

// Terapkan middleware otentikasi pada routes yang dilindungi
protectedRoutes.forEach(route => {
    app.use(verifyToken, checkSessionTimeout, route); 
});

app.listen(5000, () => console.log('Server up and running...'));
