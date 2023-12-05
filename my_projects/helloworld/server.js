/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/helloworld.proto';

//New : Proto file for service discovery

var SD_PROTO_PATH = __dirname + '/service_registry.proto';

var assert = require('assert');
var async = require('async');
var _ = require('lodash');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var helloworld = protoDescriptor.helloworld;


//New proto description start
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
//New proto description end

//New additions for registering the service start
var client = new service_registry.ServiceRegistry('0.0.0.0:50000', grpc.credentials.createInsecure());

var registerRequest = {
  service: {
    namespace: 'sdv.samples',
    name: 'service1',
    version: '1.0.0.0',
    uri: 'http://localhost:8080',
    communication_kind: 'grpc+proto',
    communication_reference: 'sample.communication_reference.v1.proto',
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

/**
 * @param {!Object} call
 * @param {function():?} callback
 */
function doSayHello(call, callback) {
  callback(null, {message: 'Hello! '+ call.request.name});
}

/**
 * @param {!Object} call
 */
function doSayRepeatHello(call) {
  var senders = [];
  function sender(name) {
    return (callback) => {
      call.write({
        message: 'Hey! ' + name
      });
      _.delay(callback, 500); // in ms
    };
  }
  for (var i = 0; i < call.request.count; i++) {
    senders[i] = sender(call.request.name + i);
  }
  async.series(senders, () => {
    call.end();
  });
}

/*
//New function
function doRegister(call, callback) {

}
//New function end
*/

/**
 * @return {!Object} gRPC server
 */
function getServer() {
  var server = new grpc.Server();
  server.addService(helloworld.Greeter.service, {
    sayHello: doSayHello,
    sayRepeatHello: doSayRepeatHello,
  });
  /*
  // New service (register) added
  server.addService(service_registry.ServiceRegistry.service, {
    register: doRegister,
  });
  // New service (register) end
  */
  return server;
}

if (require.main === module) {
  var server = getServer();
  server.bindAsync(
    '0.0.0.0:9090', grpc.ServerCredentials.createInsecure(), (err, port) => {
      assert.ifError(err);
      server.start();
  });
}

exports.getServer = getServer;
