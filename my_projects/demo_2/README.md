*Final steps*

Run this command : sudo npm install -g grpc-tools

git clone dash_grpc_v3

do "npm install" in both folders under demo_2

In autodashboard folder, run the below 2 commands to produce proto buffer files for datasim and service_registry
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=grpc_js:./ datasim.proto
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=grpc_js:./ service_registry.proto
