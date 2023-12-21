cd ..
cd chariott/service_discovery/
cargo run -p service_discovery &
cd ..
cd /app
node server.js &
envoy -c envoy.yaml &
python3 -m http.server 8081 
