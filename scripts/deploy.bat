:: clean up
rm dist -r

:: requires 7zip
7z a dist/russian-judge-redemption www LICENSE.md README.md -tzip
