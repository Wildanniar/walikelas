// ==============================
// services/siswa.js
// ==============================

let table = null;
let mode = "tambah";
let dataSiswa = [];

// ==============================
// LOAD DATA SISWA
// ==============================
async function loadSiswa() {

    try {

        const result = await API.get("siswa");

        if (!result.success) {
            alert(result.message);
            return;
        }

        // Simpan data ke variabel global
        dataSiswa = result.data;

        // Hancurkan DataTable jika sudah ada
        if ($.fn.DataTable.isDataTable("#tableSiswa")) {
            $("#tableSiswa").DataTable().destroy();
        }

        $("#tableSiswa tbody").empty();

        dataSiswa.forEach((item, index) => {

            $("#tableSiswa tbody").append(`
                <tr>

                    <td>${index + 1}</td>

                    <td>${item.nis}</td>

                    <td>${item.nama}</td>

                    <td>${item.jk}</td>

                    <td>${item.kelas}</td>

                    <td>${item.alamat}</td>

                    <td>${item.no_hp}</td>

                    <td>

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editSiswa('${item.id}')">

                            <i class="fas fa-edit"></i>

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="hapusSiswa('${item.id}')">

                            <i class="fas fa-trash"></i>

                        </button>

                    </td>

                </tr>
            `);

        });

        table = $("#tableSiswa").DataTable({

            responsive: true,

            pageLength: 10,

            autoWidth: false,

            destroy: true,

            language: {
                url: "https://cdn.datatables.net/plug-ins/1.13.7/i18n/id.json"
            }

        });

    } catch (err) {

        console.error(err);

        alert("Gagal mengambil data.");

    }

}

// ==============================
// MODAL TAMBAH
// ==============================
function tambahBaru() {

    mode = "tambah";

    $("#modalTitle").text("Tambah Data Siswa");

    $("#id").val("");
    $("#nis").val("");
    $("#nama").val("");
    $("#jk").val("L");
    $("#kelas").val("");
    $("#alamat").val("");
    $("#no_hp").val("");

    $("#modalSiswa").modal("show");

}

// ==============================
// EDIT DATA
// ==============================
function editSiswa(id) {

    mode = "edit";

    const siswa = dataSiswa.find(item => item.id == id);

    if (!siswa) {

        alert("Data tidak ditemukan");

        return;

    }

    $("#modalTitle").text("Edit Data Siswa");

    $("#id").val(siswa.id);
    $("#nis").val(siswa.nis);
    $("#nama").val(siswa.nama);
    $("#jk").val(siswa.jk);
    $("#kelas").val(siswa.kelas);
    $("#alamat").val(siswa.alamat);
    $("#no_hp").val(siswa.no_hp);

    $("#modalSiswa").modal("show");

}

// ==============================
// TOMBOL SIMPAN
// ==============================
$("#btnSimpan").on("click", function () {

    if (mode === "tambah") {

        tambahSiswa();

    } else {

        updateSiswa();

    }

});

// ==============================
// VALIDASI
// ==============================
function validasiForm() {

    if ($("#nis").val().trim() === "") {

        alert("NIS wajib diisi");

        return false;

    }

    if ($("#nama").val().trim() === "") {

        alert("Nama wajib diisi");

        return false;

    }

    return true;

}

// ==============================
// TAMBAH DATA
// ==============================
async function tambahSiswa() {

    if (!validasiForm()) return;

    const data = {

        action: "insertSiswa",

        nis: $("#nis").val(),

        nama: $("#nama").val(),

        jk: $("#jk").val(),

        kelas: $("#kelas").val(),

        alamat: $("#alamat").val(),

        no_hp: $("#no_hp").val()

    };

    try {

        const result = await API.post(data);

        alert(result.message);

        if (result.success) {

            $("#modalSiswa").modal("hide");

            loadSiswa();

        }

    } catch (err) {

        console.error(err);

        alert("Gagal menyimpan data.");

    }

}

// ==============================
// UPDATE DATA
// ==============================
async function updateSiswa() {

    if (!validasiForm()) return;

    const data = {

        action: "updateSiswa",

        id: $("#id").val(),

        nis: $("#nis").val(),

        nama: $("#nama").val(),

        jk: $("#jk").val(),

        kelas: $("#kelas").val(),

        alamat: $("#alamat").val(),

        no_hp: $("#no_hp").val()

    };

    try {

        const result = await API.post(data);

        alert(result.message);

        if (result.success) {

            $("#modalSiswa").modal("hide");

            loadSiswa();

        }

    } catch (err) {

        console.error(err);

        alert("Gagal mengubah data.");

    }

}

// ==============================
// HAPUS DATA
// ==============================
async function hapusSiswa(id) {

    if (!confirm("Yakin ingin menghapus data ini?")) {

        return;

    }

    try {

        const result = await API.post({

            action: "deleteSiswa",

            id: id

        });

        alert(result.message);

        if (result.success) {

            loadSiswa();

        }

    } catch (err) {

        console.error(err);

        alert("Gagal menghapus data.");

    }

}

// ==============================
// INIT
// ==============================
$(document).ready(function () {

    loadSiswa();

});