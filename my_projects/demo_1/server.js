var PROTO_PATH = __dirname + '/autodemo.proto';

var SD_PROTO_PATH = __dirname + '/service_registry.proto';

var assert = require('assert');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var can = require("socketcan");
var channel = can.createRawChannel('vcan0', true);

var carInfo = {};
carInfo.speed = 0
carInfo.revs = 0

channel.addListener("onMessage", function(msg) {
    carInfo.revs = msg.data.readUIntBE(0, 4)
    carInfo.speed = msg.data.readUIntBE(4, 2)
    //console.log(carInfo)
  })
  

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var autodemo = protoDescriptor.autodemo;

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
var client = new service_registry.ServiceRegistry('0.0.0.0:50000', grpc.credentials.createInsecure());

var registerRequest = {
  service: {
    namespace: 'sdv.cansignals',
    name: 'speed_and_rpm',
    version: '1.0.0.0',
    uri: 'http://localhost:8080',
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
  
  function getServer() {
    var server = new grpc.Server();
    server.addService(autodemo.CANSignalService.service, {
        StreamCANSignals: (call) => {
            setInterval(() => {
                console.log(carInfo);
                call.write(carInfo);
            },100)
        }
    });
    return server;
  }
  
  if (require.main === module) {
    var server = getServer();
    server.bindAsync(
      '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
        assert.ifError(err);
        server.start();
        channel.start()
    });
  }

  
  exports.getServer = getServer;
