const {Empty, CANSignal} = require('./autodemo_pb.js');
const {CANSignalServiceClient} = require('./autodemo_grpc_web_pb.js');

//New additions for service discovery start

const {DiscoverRequest, DiscoverResponse} = require('./service_registry_pb.js');
const {ServiceRegistryClient} = require('./service_registry_grpc_web_pb.js');


var service_client = new ServiceRegistryClient('http://' + window.location.hostname + ':8080',
                               null, null);

// Declare variables for service discovery

const serviceName = 'speed_and_rpm';  
const serviceNamespace = 'sdv.cansignals';
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
      //var client = new CANSignalServiceClient(service_uri, null, null);
      var client = new CANSignalServiceClient('http://' + window.location.hostname + service_uri, null, null);

      // server streaming call

      document.addEventListener("DOMContentLoaded", onDomReadyHandler())


      function onDomReadyHandler(event) {
        const emptyRequest = new Empty();
        var stream = client.streamCANSignals(emptyRequest, {});
        stream.on('data', (carInfo) => {
          //console.log(carInfo.array[0]);
          var speed = carInfo.array[0];
          var revs = carInfo.array[1];
          var speed_attribute = document.getElementsByTagName('canvas')[0];
          var rev_attribute = document.getElementsByTagName('canvas')[1];
          speed_attribute.setAttribute('data-value', speed)
          rev_attribute.setAttribute('data-value', revs)
          console.log("Speed is " + speed + " Rev is " + revs)
        });
        stream.on('error', (err) => {
          console.log(`Unexpected stream error: code = ${err.code}` +
                      `, message = "${err.message}"`);
        });
      }

    } else {
      console.log('No service found.');
    }
  }
});
