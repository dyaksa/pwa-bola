function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function (reg) {
            console.log("serviceWorker berhasil di daftarkan");
            return reg;
        })
        .catch(function () {
            console.log("serviceWorker gagal didaftarkan");
        });
}

export default registerServiceWorker;