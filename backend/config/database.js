import { Sequelize } from "sequelize";

// const db = new Sequelize('peminjaman_karyawan', 'root', '', {
//     host: 'localhost', 
//     dialect: 'mysql',
//     timezone: "+07:00", //Indonesian timezone
//     dialectOptions: {
//         timezone: "local", 
//     },
//     logging: console.log
// });

const db = new Sequelize("peminjaman_karyawan", "root", "", {
    host: "localhost", 
    dialect: 'mysql',
    timezone: "+07:00", //Indonesian timezone
    dialectOptions: {
        timezone: "local", 
    },
    logging: false,

    //Connection pool -> connecting to the database from multiple process. 
    // Contoh: cron job untuk potongan angsuran otomatis harus berjalan terus dari sisi backend
    // tapi di sisi lain, user harus di logout otomatis ketika session berakhir 
    // Jadi, backend harus nyala terus meskipun user sudah di logout otomatis
    pool: { 
        max: 20, // max connection user dalam pool
        min: 0,  // min connection idle
        acquire: 120000, // timeout untuk mendapat koneksi: 60 detik
        idle: 60000 // Idle: to make client connected to db but isn't currently executing any queries
    }
});

export default db; 