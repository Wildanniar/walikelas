// ======================================================
// Google Apps Script URL
// ======================================================

const BASE_URL = "https://script.google.com/macros/s/AKfycbxA-lgSTCHUXZ604UXOOxs65AlsNfeTor2AgEqWbVneQRWpDk8Tp4en0n4SX2a0bpfy/exec";


// ======================================================
// Generic API
// ======================================================

const API = {

    // ============================
    // GET
    // ============================
    async get(action) {

        try {

            const response = await fetch(`${BASE_URL}?action=${action}`);

            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }

            return await response.json();

        } catch (error) {

            console.error("GET ERROR :", error);

            return {
                success: false,
                message: "Gagal mengambil data."
            };

        }

    },


    // ============================
    // POST
    // ============================
    async post(data) {

        try {

            const response = await fetch(BASE_URL, {

                method: "POST",

                // Mengubah header ke text/plain untuk menghindari CORS blocking oleh Google Apps Script
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(data)

            });

            // Catatan: Jika menggunakan pengiriman tertentu ke Google Script, 
            // terkadang response.ok bisa bernilai false karena status redirect (302),
            // namun jika data masuk ke spreadsheet, itu tanda sukses.
            if (!response.ok && response.status !== 0) {
                throw new Error(`HTTP Error ${response.status}`);
            }

            return await response.json();

        } catch (error) {

            console.error("POST ERROR :", error);

            return {
                success: false,
                message: "Gagal mengirim data."
            };

        }

    }

};
