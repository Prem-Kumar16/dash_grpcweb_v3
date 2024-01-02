FROM premrajreddy/envoy_for_chariott:v1
RUN apt-get update
#NodeJS installation
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_21.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install nodejs -y

#Chariott build
RUN apt-get install can-utils nano
RUN apt install -y gcc
RUN apt install -y protobuf-compiler
RUN apt install -y libsdl2-dev
RUN apt-get install -y make
RUN apt-get install -y g++
#Get rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN npm install -g protoc-gen-grpc-web
RUN npm install -g grpc-tools
#Install git
RUN apt-get update
RUN apt install -y git
RUN git clone https://github.com/eclipse-chariott/chariott.git
RUN cd chariott/service_discovery &&\
    cargo build -p service_discovery &&\
    cargo test
WORKDIR /app
COPY package.json /app
COPY . .
RUN npm install
RUN npx webpack ./client.js
RUN chmod +x /app/start_sr.sh
RUN chmod +x /app/start_server.sh
CMD ./start_server.sh
#CMD ["/bin/sh"]
#CMD ["bash"]
EXPOSE 8080
EXPOSE 9090
EXPOSE 50000
