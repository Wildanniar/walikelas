// config/router.js

const routes = {
    dashboard: {
        page: "pages/dashboard.html",
        script: "services/dashboard.js",
        title: "Dashboard"
    },
    siswa: {
        page: "pages/siswa.html",
        script: "services/siswa.js",
        title: "Data Siswa"
    },
    nilai: {
        page: "pages/nilai.html",
        script: "services/nilai.js",
        title: "Nilai"
    },
    absensi: {
        page: "pages/absensi.html",
        script: "services/absensi.js",
        title: "Absensi"
    },
    tugas: {
        page: "pages/tugas.html",
        script: "services/tugas.js",
        title: "Tugas"
    }
};

async function loadPage(pageName) {

    const route = routes[pageName];

    if (!route) {
        document.getElementById("app").innerHTML = "<h3>404 Page Not Found</h3>";
        return;
    }

    // Load HTML
    const response = await fetch(route.page);
    const html = await response.text();

    document.getElementById("app").innerHTML = html;

    // Ganti title browser
    document.title = route.title + " | Wali Kelas";

    // Ganti heading jika ada
    const heading = document.getElementById("page-title");
    if (heading) heading.innerText = route.title;

    // Hapus script lama
    document.querySelectorAll(".dynamic-script").forEach(s => s.remove());

    // Load JS halaman
    const script = document.createElement("script");
    script.src = route.script + "?v=" + Date.now();
    script.classList.add("dynamic-script");

    document.body.appendChild(script);

    // Sidebar Active
    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    const activeMenu = document.querySelector(`[data-page="${pageName}"]`);

    if (activeMenu) {
        activeMenu.closest(".nav-item").classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", () => {

    loadPage("dashboard");

    document.querySelectorAll("[data-page]").forEach(menu => {

        menu.addEventListener("click", function(e){

            e.preventDefault();

            loadPage(this.dataset.page);

        });

    });

});