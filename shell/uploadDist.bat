@echo off
set "source_folder=D:\bishe\My-College-Life-Is-Over_Front-End-H5\dist"
set "destination_folder=D:\bishe\upload\dist"
set "git_folder=D:\bishe\upload"


xcopy  "%source_folder%" "%destination_folder%" /E /I /Y
cd /d "%git_folder%"
git status
git add .
git commit -m "脚本提交111"
git push
echo copy file success！
pause