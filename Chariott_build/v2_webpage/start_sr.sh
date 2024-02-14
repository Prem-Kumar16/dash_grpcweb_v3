#!/bin/sh
nohup ./start_webpage.sh &
cd ..
cd chariott/service_discovery/
cargo run -p service_discovery
