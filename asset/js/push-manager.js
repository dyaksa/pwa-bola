import {
    urlBase64ToUint8Array
} from "./extension.js";

function pushManager() {
    //check apakah serviceWorker sudah di daftarkan dengan menggunakan navigator.serviceWorker.ready
    navigator.serviceWorker.ready.then(() => {
        if (("PushManager" in window)) {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    "BFOADbv7p5ck89dk4Zbp8AJJAa-40uaDO882L0sf2Pr9S-gW0dU8KGTmJSKepMu4HR393ZnZ2FOs7uSl1VRBGUY")
            }).then(subscribe => {
                console.log(`Berhasil subscribe dengan endpoint ${subscribe.endpoint}`);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(err => {
                console.error('Tidak dapat melakukan subscribe ', err.message);
            })
        })
    }
    });
}

export default pushManager;