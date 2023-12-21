#!/bin/sh
nohup ./start_sr.sh &
sleep 2
node server.js &
envoy -c envoy.yaml &
python3 -m http.server 8081
