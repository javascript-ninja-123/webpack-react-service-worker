import PouchDB from 'pouchdb';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
PouchDB.adapter('worker', require('worker-pouch'));

if ('serviceWorker' in navigator) {
  const registration = runtime.register();

}
