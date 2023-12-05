const {HelloRequest, RepeatHelloRequest,
       HelloReply} = require('./helloworld_pb.js');
const {GreeterClient} = require('./helloworld_grpc_web_pb.js');

//New additions for service discovery start

const {DiscoverRequest, DiscoverResponse} = require('./service_registry_pb.js');
const {ServiceRegistryClient} = require('./service_registry_grpc_web_pb.js');


var service_client = new ServiceRegistryClient('http://' + window.location.hostname + ':8080',
                               null, null);

// Declare variables for service discovery

const serviceName = 'service1';  
const serviceNamespace = 'sdv.samples';
const serviceVersion = '1.0.0.0';

var disRequest = new DiscoverRequest();
disRequest.setNamespace(serviceNamespace);
disRequest.setName(serviceName);
disRequest.setVersion(serviceVersion);

// Perform service discovery
service_client.discover(disRequest, {}, (error, response) => {
  if (error) {
    console.error('Error discovering service:', error);
  } else {
    const discoveredService = response.getService();
    if (discoveredService) {
      console.log('Service discovered successfully:', discoveredService.toObject());
      // You can now use the discovered service details for further communication
      var service_uri = discoveredService.getUri();
      console.log('Service URI:', service_uri);

      //Use the retrieved service uri to 
      var client = new GreeterClient(service_uri, null, null);

      // simple unary call
      var request = new HelloRequest();
      request.setName('World');

      client.sayHello(request, {}, (err, response) => {
        if (err) {
          console.log(`Unexpected error for sayHello: code = ${err.code}` +
                      `, message = "${err.message}"`);
        } else {
          console.log(response.getMessage());
        }
      });

      // server streaming call
      var streamRequest = new RepeatHelloRequest();
      streamRequest.setName('World');
      streamRequest.setCount(5);

      var stream = client.sayRepeatHello(streamRequest, {});
      stream.on('data', (response) => {
        console.log(response.getMessage());
      });
      stream.on('error', (err) => {
        console.log(`Unexpected stream error: code = ${err.code}` +
                    `, message = "${err.message}"`);
      });
    } else {
      console.log('No service found.');
    }
  }
});

//New additions for service discovery end
