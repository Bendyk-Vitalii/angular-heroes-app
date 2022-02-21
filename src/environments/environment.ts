import { Environment } from './interface';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDOqZD1gEuMutWQF9gg3o1V-tuagRIH5UY",
    authDomain: "angular-heroes-app-6157a.firebaseapp.com",
    databaseURL: "https://angular-heroes-app-6157a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "angular-heroes-app-6157a",
    storageBucket: "angular-heroes-app-6157a.appspot.com",
    messagingSenderId: "883310124683",
    appId: "1:883310124683:web:d0e2e1a5463632f0317e8e"
  },
  heroes: {
    searchId: "https://superheroapi.com/api.php/1880983215397777/search/id"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
