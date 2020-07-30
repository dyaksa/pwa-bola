import "./idb.js";

let dbPromised = idb.open('football_database', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("footballs")) {
        let footballObjectStore = upgradeDb.createObjectStore("footballs", {
            keyPath: "id"
        });
        footballObjectStore.createIndex("name", "name", {
            unique: false
        });
    }
});

function saveForLater(team) {
    dbPromised.then(function (db) {
        let tx = db.transaction("footballs", "readwrite");
        let store = tx.objectStore("footballs");
        console.log(team);
        //gunakan put() daripada add() karena put akan mereplace data yang sudah ada sedangakn add akan menampilkan error
        store.put(team);
        return tx.complete;
    }).then(function () {
        console.log("Artikel berhasil tersimpan");
    }).catch(() => {
        console.log(new Error(tx.onerror));
    });
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            let tx = db.transaction("footballs", "readonly");
            let store = tx.objectStore("footballs");
            return store.getAll();
        }).then(results => {
            resolve(results);
        }).catch(err => {
            reject(err);
        })
    });
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            let tx = db.transaction("footballs", "readonly");
            let store = tx.objectStore("footballs");
            return store.get(id);
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    });
}

const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const transaction = db.transaction("footballs", "readwrite");
            transaction.objectStore("footballs").delete(parseInt(id));
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true);
            } else {
                reject(new Error(transaction.onerror));
            }
        })
    });
}

export {
    saveForLater,
    getAll,
    getById,
    deleteById
};