#!/bin/bash
git pull
npm run build
pm2 delete 0
pm2 start "npm run start"