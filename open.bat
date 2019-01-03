@echo off
cd /d "C:\"
start /d "C:\Program Files\MongoDB\Server\3.4\bin\" mongod.exe
cd /d "D:\hasan destop\folders\eschoolweb"
start cmd.exe /k "node index"
cd /d "D:\hasan destop\folders\eschoolweb\web"
start cmd.exe /k "npm start"
cd /d "D:\hasan destop\folders\eschoolweb\mobile"
start cmd.exe /k "ionic serve"
pause