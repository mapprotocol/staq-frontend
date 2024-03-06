#!/bin/bash
git pull
yarn build
pm2 delete 0
pm2 start "yarn start"