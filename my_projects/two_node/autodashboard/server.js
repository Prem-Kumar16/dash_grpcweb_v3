
var messages = require('./datasim_pb.js');
var services = require('./datasim_grpc_pb.js');
const grpc = require('@grpc/grpc-js');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


//New additions for service discovery start

const {DiscoverRequest, DiscoverResponse} = require('./service_registry_pb.js');
const {ServiceRegistryClient} = require('./service_registry_grpc_pb.js');

//The URL is where the chariott's service registry is running
var service_client = new ServiceRegistryClient('13.201.23.199:50000', grpc.credentials.createInsecure());

// Declare variables for service to be discovered

const serviceName = 'digital_dash';  
const serviceNamespace = 'sdv.cansignals';
const serviceVersion = '1.0.0.0';

var disRequest = new DiscoverRequest();
disRequest.setNamespace(serviceNamespace);
disRequest.setName(serviceName);
disRequest.setVersion(serviceVersion);

service_client.discover(disRequest, {}, (error, sd_response) => {
  if (error) {
    console.error('Error discovering service:', error);
  } else {
    const discoveredService = sd_response.getService();
    if (discoveredService) {
        console.log('Service discovered successfully:', discoveredService.toObject());
        // You can now use the discovered service details for further communication
        var service_uri = discoveredService.getUri();
        console.log('Service URI:', service_uri);

        var carInfo = {};
        carInfo.leftindicator = 0
        var canid = 0
        app.use(express.static(__dirname + "/html"));

        io.on('connection', function(client) {
            console.log('client connected')
        })

        //Use the uri discovered from service registry to create grpc client and to get CAN Signals
        var grpc_client = new services.CANSignalServiceClient(service_uri, grpc.credentials.createInsecure());
        console.log("grpc client created and server starts to send messages")
        try {
            var request = new messages.Empty();
            var stream = grpc_client.streamCANSignals(request);
            stream.on('data', function(response) {
                //console.log("The id is : " + response.array[0]);
                var out = {}
                out.id = response.array[0]
                if(response.array[1]) {
                    var buffer = Buffer.from(response.array[1]);
                    carInfo = buffer.readUIntBE(0, 4);
                    out.data = carInfo
                    console.log(carInfo)
                    io.emit('carMessage', out)
                    //console.log(value);
                }
                else {
                    console.log('No data in response.array[1]');
                }
                
            });
            stream.on('error', function(err) {
                console.error('Error:', err);
            });
        } catch (e) {
            console.error('Exception:', e);
        }
    }
  }
});

server.listen(4000)


//*************************************************************************************************************************** */

/*
var messages = require('./datasim_pb.js');
var services = require('./datasim_grpc_pb.js');
const grpc = require('@grpc/grpc-js');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var carInfo = {};
        carInfo.leftindicator = 0
        var canid = 0
        app.use(express.static(__dirname + "/html"));

        io.on('connection', function(client) {
            console.log('client connected')
        })

        //Use the uri discovered from service registry to create grpc client and to get CAN Signals
        var grpc_client = new services.CANSignalServiceClient('15.207.89.18:50100', grpc.credentials.createInsecure());
        console.log("grpc client created and server starts to send messages")
        try {
            var request = new messages.Empty();
            var stream = grpc_client.streamCANSignals(request);
            stream.on('data', function(response) {
                //console.log("The id is : " + response.array[0]);
                var out = {}
                out.id = response.array[0]
                if(response.array[1]) {
                    var buffer = Buffer.from(response.array[1]);
                    carInfo = buffer.readUIntBE(0, 4);
                    out.data = carInfo
                    console.log(carInfo)
                    io.emit('carMessage', out)
                    //console.log(value);
                }
                else {
                    console.log('No data in response.array[1]');
                }
                
            });
            stream.on('error', function(err) {
                console.error('Error:', err);
            });
        } catch (e) {
            console.error('Exception:', e);
        }

server.listen(4000)

*/