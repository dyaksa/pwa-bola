function requestPermission() {
    //check apakah serviceWorker sudah di daftarkan dengan menggunakan navigator.serviceWorker.ready
    navigator.serviceWorker.ready.then(() => {
        if ("Notification" in window) {
        Notification.requestPermission().then(result => {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan");
                return;
            } else if (result === "default") {
                console.log("Pengguna menutup kotak dialog permintaan ijin");
                return;
            }

            navigator.serviceWorker.getRegistration().then(reg => {
                reg.showNotification("notifikasi diijinkan");
            });
        })
    }
    });
}

export default requestPermission;