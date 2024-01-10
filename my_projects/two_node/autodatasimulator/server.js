
var PROTO_PATH = __dirname + '/datasim.proto';

var SD_PROTO_PATH = __dirname + '/service_registry.proto';

var assert = require('assert');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var datasim = protoDescriptor.datasim;



//New proto description for service registry start
var packageDefinition2 = protoLoader.loadSync(
  SD_PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });
var protoDescriptor2 = grpc.loadPackageDefinition(packageDefinition2);
var service_registry = protoDescriptor2.service_registry;
//New proto description for service registry end

//New additions for registering the service start
//var client = new service_registry.ServiceRegistry('0.0.0.0:50000', grpc.credentials.createInsecure());
//The URL is where the chariott's service registry is running
var client = new service_registry.ServiceRegistry('13.126.233.234:50000', grpc.credentials.createInsecure());


var registerRequest = {
  service: {
    namespace: 'sdv.cansignals',
    name: 'digital_dash',
    version: '1.0.0.0',
    //uri: 'localhost:50100',
    uri: '3.7.144.155:50100', 
    communication_kind: 'grpc+proto',
    communication_reference: 'can.communication_reference.v1.proto',
  },
};

client.register(registerRequest, function(error, response) {
  if (!error) {
    console.log('Service registered successfully:', response);
  } else {
    console.error('Error registering service:', error);
  }
});


//New additions for registering the service end

var ButtonId = 0
var ButtonVal = 0
var out = {}
var ref = {};
ref.id = 0
ref.data = Buffer.alloc(8)

app.use(express.static(__dirname + "/html"));

io.on('connection', (socket) => {
   socket.on("buttonPressed", (data) => {
   ButtonId = data.id
   ButtonVal = data.value
   console.log("Button id = " + ButtonId)
   console.log("Button Value = " + ButtonVal)
   sendData(ButtonId, ButtonVal)
   })
})

function sendData(ButtonId, ButtonVal) {
    //var out = {}
    var buff = Buffer.alloc(8)

    if(ButtonId == "leftSign") {out.id = 1}
    if(ButtonId == "rightSign") {out.id = 2}
    if(ButtonId == "dippedBeam") {out.id = 3}
    if(ButtonId == "brake") {out.id = 4}
    if(ButtonId == "drift") {out.id = 5}
    if(ButtonId == "highBeam") {out.id = 6}
    if(ButtonId == "lock") {out.id = 7}
    if(ButtonId == "seatBelt") {out.id = 8}
    if(ButtonId == "engineTemp") {out.id = 9}
    if(ButtonId == "stab") {out.id = 10}
    if(ButtonId == "abs") {out.id = 11}
    if(ButtonId == "gasIcon") {out.id = 12}
    if(ButtonId == "trunk") {out.id = 13}
    if(ButtonId == "bonnet") {out.id = 14}
    if(ButtonId == "doors") {out.id = 15}
    if(ButtonId == "battery") {out.id = 16}
    if(ButtonId == "oil") {out.id = 17}
    if(ButtonId == "engineFail") {out.id = 18}
    if(ButtonId == "speed") {out.id = 19}
    if(ButtonId == "tacho") {out.id = 20}
    if(ButtonId == "gas") {out.id = 21}
    if(ButtonId == "mileage") {out.id = 22}

    console.log("CAN ID = " + out.id)
    buff.writeUIntBE(ButtonVal, 0, 4)
    out.data = buff

}

function streamCANSignals(call) {
  console.log("INside streamcansignals")
  setInterval(() => {
    while (out.id > 0) {
      // out === {}
      while (out.id !== ref.id || out.data !== ref.data) {
          try {
            console.log(out);
            call.write(out);
            out.id = ref.id;
            out.data = ref.data
          } catch (error) {
            console.error('Error sending gRPC message:', error);
          }
      }   
      
    }

  }, 100);
}

function main() {
  var grpc_server = new grpc.Server();
  grpc_server.addService(datasim.CANSignalService.service, {StreamCANSignals: streamCANSignals});
  grpc_server.bindAsync('0.0.0.0:50100', grpc.ServerCredentials.createInsecure(), () => {
  grpc_server.start();
  console.log("Server started successfully")
  });
}

main();

server.listen(3000)


//********************************************************************************************************** */

/*
var PROTO_PATH = __dirname + '/datasim.proto';

var assert = require('assert');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var datasim = protoDescriptor.datasim;

var ButtonId = 0
var ButtonVal = 0
var out = {}
var ref = {};
ref.id = 0
ref.data = Buffer.alloc(8)

app.use(express.static(__dirname + "/html"));

io.on('connection', (socket) => {
   socket.on("buttonPressed", (data) => {
   ButtonId = data.id
   ButtonVal = data.value
   console.log("Button id = " + ButtonId)
   console.log("Button Value = " + ButtonVal)
   sendData(ButtonId, ButtonVal)
   })
})

function sendData(ButtonId, ButtonVal) {
    //var out = {}
    var buff = Buffer.alloc(8)

    if(ButtonId == "leftSign") {out.id = 1}
    if(ButtonId == "rightSign") {out.id = 2}
    if(ButtonId == "dippedBeam") {out.id = 3}
    if(ButtonId == "brake") {out.id = 4}
    if(ButtonId == "drift") {out.id = 5}
    if(ButtonId == "highBeam") {out.id = 6}
    if(ButtonId == "lock") {out.id = 7}
    if(ButtonId == "seatBelt") {out.id = 8}
    if(ButtonId == "engineTemp") {out.id = 9}
    if(ButtonId == "stab") {out.id = 10}
    if(ButtonId == "abs") {out.id = 11}
    if(ButtonId == "gasIcon") {out.id = 12}
    if(ButtonId == "trunk") {out.id = 13}
    if(ButtonId == "bonnet") {out.id = 14}
    if(ButtonId == "doors") {out.id = 15}
    if(ButtonId == "battery") {out.id = 16}
    if(ButtonId == "oil") {out.id = 17}
    if(ButtonId == "engineFail") {out.id = 18}
    if(ButtonId == "speed") {out.id = 19}
    if(ButtonId == "tacho") {out.id = 20}
    if(ButtonId == "gas") {out.id = 21}
    if(ButtonId == "mileage") {out.id = 22}

    console.log("CAN ID = " + out.id)
    buff.writeUIntBE(ButtonVal, 0, 4)
    out.data = buff

}

function streamCANSignals(call) {
  console.log("INside streamcansignals")
  setInterval(() => {
    while (out.id > 0) {
      // out === {}
      while (out.id !== ref.id || out.data !== ref.data) {
          try {
            console.log(out);
            call.write(out);
            out.id = ref.id;
            out.data = ref.data
          } catch (error) {
            console.error('Error sending gRPC message:', error);
          }
      }   
      
    }

  }, 100);
}

function main() {
  var grpc_server = new grpc.Server();
  grpc_server.addService(datasim.CANSignalService.service, {StreamCANSignals: streamCANSignals});
  grpc_server.bindAsync('0.0.0.0:50100', grpc.ServerCredentials.createInsecure(), () => {
  grpc_server.start();
  console.log("Server started successfully")
  });
}

main();

server.listen(3000)

*/
