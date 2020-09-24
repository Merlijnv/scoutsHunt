rm *.apk -f
ionic cordova build --prod android
cp platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk .
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my.keystore app-release-unsigned.apk hunt
zipalign -v 4 app-release-unsigned.apk ScoutsHunt.apk
