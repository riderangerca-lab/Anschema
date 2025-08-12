@echo off
echo Deploying AnS Portfolio to GitHub Pages...
cd /d "C:\Anschema\anschema-portfolio"
npm run build
npm run deploy
echo Deployment complete! Visit: https://riderangerca-lab.github.io/Anschema
pause
