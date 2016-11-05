call npm install
call npm install -g bower
call bower install
rd /q /s assets/
xcopy "C:\Users\cobbe\Google Drive\bagger\assets" .\assets\ /e
gulp
