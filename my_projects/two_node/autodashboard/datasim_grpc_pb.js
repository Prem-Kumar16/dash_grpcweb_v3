// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var datasim_pb = require('./datasim_pb.js');

function serialize_datasim_CANSignal(arg) {
  if (!(arg instanceof datasim_pb.CANSignal)) {
    throw new Error('Expected argument of type datasim.CANSignal');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_datasim_CANSignal(buffer_arg) {
  return datasim_pb.CANSignal.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_datasim_Empty(arg) {
  if (!(arg instanceof datasim_pb.Empty)) {
    throw new Error('Expected argument of type datasim.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_datasim_Empty(buffer_arg) {
  return datasim_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var CANSignalServiceService = exports.CANSignalServiceService = {
  streamCANSignals: {
    path: '/datasim.CANSignalService/StreamCANSignals',
    requestStream: false,
    responseStream: true,
    requestType: datasim_pb.Empty,
    responseType: datasim_pb.CANSignal,
    requestSerialize: serialize_datasim_Empty,
    requestDeserialize: deserialize_datasim_Empty,
    responseSerialize: serialize_datasim_CANSignal,
    responseDeserialize: deserialize_datasim_CANSignal,
  },
};

exports.CANSignalServiceClient = grpc.makeGenericClientConstructor(CANSignalServiceService);
