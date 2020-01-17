const idbPromised = idb.open("favorite", 1, upgradedDb => {
  if (!upgradedDb.objectStoreNames.contains("favo")) {
    upgradedDb.createObjectStore("favo", { keyPath: "favId" });
  }
});

const dbReadFav  = favId => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then(db => {
        const transaction = db.transaction("favo", `readonly`);
        return transaction.objectStore("favo").get(favId);
      })
      .then(data => {
        if (data !== undefined) {
            resolve(data);
          } else {
            reject(new Error("Favorite not Found"));
          }
      });
  });
};

const dbReadAllFav = () => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then(db => {
        const transaction = db.transaction("favo", `readonly`);
        return transaction.objectStore("favo").getAll();
      })
      .then(data => {
        if (data !== undefined) {
          resolve(data);
        } else {
          reject(new Error("Favorite not Found"));
        }
      });
  });
};

const dbTambahFavorite = (fav) => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then(db => {
        const transaction = db.transaction("favo", `readwrite`);
        transaction.objectStore("favo").add(fav);
        return transaction;
      })
      .then(transaction => {
        if (transaction.complete) {
          resolve(true);
        } else {
          reject(new Error(transaction.onerror));
        }
      });
  });
};

const dbHapusFav = favId => {
  return new Promise((resolve, reject) => {
    idbPromised
      .then(db => {
        const transaction = db.transaction("favo", `readwrite`);
        transaction.objectStore("favo").delete( parseInt(favId) );
        return transaction;
      })
      .then(transaction => {
        console.log(transaction)
        if (transaction.complete) {
          resolve(true);
        } else {
          reject(new Error(transaction.onerror));
        }
      });
  });
};
