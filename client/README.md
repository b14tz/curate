

#### Local Testing




running `npm start` will automatically boot up the emulators, loading from an exported firebase 
setup in `seeds/base/`

to save changes made to this emulator configuration, run `firebase emulators:export ./seeds/base`

to start the emulator with a different emulator configuration, run `firebase emulators:start --import=./dir`
