FROM rust:latest
RUN apt-get update
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_21.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install nodejs -y
RUN apt-get install can-utils nano
RUN apt install -y gcc
#RUN apt install -y git git-lfs
#RUN git lfs install
#RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y 
#RUN . "$HOME/.cargo/env"
RUN apt install -y protobuf-compiler
RUN apt install -y libsdl2-dev
RUN apt-get install -y make
RUN apt-get install -y g++
RUN npm install -g protoc-gen-grpc-web
RUN npm install -g grpc-tools
RUN git clone https://github.com/eclipse-chariott/chariott.git
RUN cd chariott/service_discovery &&\
    cargo build -p service_discovery &&\
    cargo test
WORKDIR /app
COPY package.json /app
COPY . .
RUN rm Dockerfile
RUN protoc -I=. autodemo.proto \
    --js_out=import_style=commonjs:. \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
RUN protoc -I=. service_registry.proto \
    --js_out=import_style=commonjs:. \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
RUN npm install
RUN npx webpack client.js
RUN node server.js &
