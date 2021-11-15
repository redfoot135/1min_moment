#!/bin/bash
cd /home/ubuntu/1min_moment/server

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export AUTHUSER=$(aws ssm get-parameters --region ap-northeast-2 --names AUTHUSER --query Parameters[0].Value | sed 's/"//g')
export AUTHPASS=$(aws ssm get-parameters --region ap-northeast-2 --names AUTHPASS --query Parameters[0].Value | sed 's/"//g')
export FROMEMAIL=$(aws ssm get-parameters --region ap-northeast-2 --names FROMEMAIL --query Parameters[0].Value | sed 's/"//g')
export ACCESSKEY=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESSKEY --query Parameters[0].Value | sed 's/"//g')
export SECRETKEY=$(aws ssm get-parameters --region ap-northeast-2 --names SECRETKEY --query Parameters[0].Value | sed 's/"//g')
export BUCKET=$(aws ssm get-parameters --region ap-northeast-2 --names BUCKET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js