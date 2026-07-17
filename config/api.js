// ======================================================
// Google Apps Script URL
// ======================================================

const BASE_URL = "https://script.google.com/macros/s/AKfycbxA-lgSTCHUXZ604UXOOxs65AlsNfeTor2AgEqWbVneQRWpDk8Tp4en0n4SX2a0bpfy/exec?action=siswa";


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

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(data)

            });

            if (!response.ok) {
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
