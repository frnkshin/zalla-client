import firebase from 'firebase/app';
import 'firebase/database';
import {Shrinker} from "modules/Shrinker";
import * as config from 'config';

class Firebase {
  constructor(config) {
    this.fb = firebase.initializeApp(config);
    this.db = firebase.database();
    this.prefix = "zal.la/";
    this.shrinker = new Shrinker();
  }

  /**
   * @desc returns deleted IDs from Firebase that are available to store
   * @returns Promise on completion,
   */
  retrieveDeleted = () => {
    return new Promise((resolve) => {
      let deletedID;
      this.db.ref('deleted').transaction((deletedIDs) => {
        if (deletedIDs) {
          deletedID = deletedIDs.shift();
        }
        return deletedIDs;
      }, (error, committed, snapshot) => {
        if (error) {
          resolve(null);
        } else if (committed) {
          resolve(deletedID);
        } else {
          resolve(null);
        }
      });
    });
  };

  /**
   * @param url: String
   * @returns Promise
   */
  shrink = (url) => {
    return new Promise((resolve, reject) => {
      let deleteTime = new Date(new Date().setDate(new Date().getDate() + 1));
      this.db.ref('urls').once('value', (snapshot) => {
        this.retrieveDeleted().then((deletedID) => {
          if (deletedID) {
            let shortUrl = this.prefix + this.shrinker.encode(deletedID);
            this.db.ref(`urls/${deletedID}`).set({'url': url, 'deleteTime': deleteTime});
            resolve(shortUrl);
          } else {
            if (snapshot) {
              let shortUrl = this.prefix + this.shrinker.encode(snapshot.numChildren());
              this.db.ref(`urls/${snapshot.numChildren()}`).set({'url': url, 'deleteTime': deleteTime});
              resolve(shortUrl);
            } else {
              let shortUrl = this.prefix + this.shrinker.encode(0);
              this.db.ref(`urls/0`).set({'url': url, 'deleteTime': deleteTime});
              resolve(shortUrl);
            }
          }
        })
      });
    });
  };

  expand = (code) => {
    let id = this.shrinker.decode(code);
    return new Promise((resolve, reject) => {
      this.db.ref(`urls/${id}`).once('value', (snapshot) => {
        if (snapshot.val()) {
          resolve(snapshot.val());
        } else {
          reject("This URL is not available");
        }
      });
    });
  };
}

export default new Firebase(config.firebase);