// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// SPDX-License-Identifier: MIT
//
'use strict';
var grpc = require('@grpc/grpc-js');
var service_registry_pb = require('./service_registry_pb.js');

function serialize_service_registry_DiscoverByNamespaceRequest(arg) {
  if (!(arg instanceof service_registry_pb.DiscoverByNamespaceRequest)) {
    throw new Error('Expected argument of type service_registry.DiscoverByNamespaceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_DiscoverByNamespaceRequest(buffer_arg) {
  return service_registry_pb.DiscoverByNamespaceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_registry_DiscoverByNamespaceResponse(arg) {
  if (!(arg instanceof service_registry_pb.DiscoverByNamespaceResponse)) {
    throw new Error('Expected argument of type service_registry.DiscoverByNamespaceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_DiscoverByNamespaceResponse(buffer_arg) {
  return service_registry_pb.DiscoverByNamespaceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_registry_DiscoverRequest(arg) {
  if (!(arg instanceof service_registry_pb.DiscoverRequest)) {
    throw new Error('Expected argument of type service_registry.DiscoverRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_DiscoverRequest(buffer_arg) {
  return service_registry_pb.DiscoverRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_registry_DiscoverResponse(arg) {
  if (!(arg instanceof service_registry_pb.DiscoverResponse)) {
    throw new Error('Expected argument of type service_registry.DiscoverResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_DiscoverResponse(buffer_arg) {
  return service_registry_pb.DiscoverResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_registry_ListRequest(arg) {
  if (!(arg instanceof service_registry_pb.ListRequest)) {
    throw new Error('Expected argument of type service_registry.ListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_ListRequest(buffer_arg) {
  return service_registry_pb.ListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_registry_ListResponse(arg) {
  if (!(arg instanceof service_registry_pb.ListResponse)) {
    throw new Error('Expected argument of type service_registry.ListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_ListResponse(buffer_arg) {
  return service_registry_pb.ListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_registry_RegisterRequest(arg) {
  if (!(arg instanceof service_registry_pb.RegisterRequest)) {
    throw new Error('Expected argument of type service_registry.RegisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_RegisterRequest(buffer_arg) {
  return service_registry_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_registry_RegisterResponse(arg) {
  if (!(arg instanceof service_registry_pb.RegisterResponse)) {
    throw new Error('Expected argument of type service_registry.RegisterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_RegisterResponse(buffer_arg) {
  return service_registry_pb.RegisterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_registry_UnregisterRequest(arg) {
  if (!(arg instanceof service_registry_pb.UnregisterRequest)) {
    throw new Error('Expected argument of type service_registry.UnregisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_UnregisterRequest(buffer_arg) {
  return service_registry_pb.UnregisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_service_registry_UnregisterResponse(arg) {
  if (!(arg instanceof service_registry_pb.UnregisterResponse)) {
    throw new Error('Expected argument of type service_registry.UnregisterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_service_registry_UnregisterResponse(buffer_arg) {
  return service_registry_pb.UnregisterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service Registry definition
//
// The protobuf definitions for Chariott's service registry
//
// The entry point for the Registry gRPC Service.
var ServiceRegistryService = exports.ServiceRegistryService = {
  // Register, or add a service to the registry
register: {
    path: '/service_registry.ServiceRegistry/Register',
    requestStream: false,
    responseStream: false,
    requestType: service_registry_pb.RegisterRequest,
    responseType: service_registry_pb.RegisterResponse,
    requestSerialize: serialize_service_registry_RegisterRequest,
    requestDeserialize: deserialize_service_registry_RegisterRequest,
    responseSerialize: serialize_service_registry_RegisterResponse,
    responseDeserialize: deserialize_service_registry_RegisterResponse,
  },
  // Unregister, or remove a service from the registry
unregister: {
    path: '/service_registry.ServiceRegistry/Unregister',
    requestStream: false,
    responseStream: false,
    requestType: service_registry_pb.UnregisterRequest,
    responseType: service_registry_pb.UnregisterResponse,
    requestSerialize: serialize_service_registry_UnregisterRequest,
    requestDeserialize: deserialize_service_registry_UnregisterRequest,
    responseSerialize: serialize_service_registry_UnregisterResponse,
    responseDeserialize: deserialize_service_registry_UnregisterResponse,
  },
  // Discover, or retrieve the metadata for a single service given its fully qualified name
discover: {
    path: '/service_registry.ServiceRegistry/Discover',
    requestStream: false,
    responseStream: false,
    requestType: service_registry_pb.DiscoverRequest,
    responseType: service_registry_pb.DiscoverResponse,
    requestSerialize: serialize_service_registry_DiscoverRequest,
    requestDeserialize: deserialize_service_registry_DiscoverRequest,
    responseSerialize: serialize_service_registry_DiscoverResponse,
    responseDeserialize: deserialize_service_registry_DiscoverResponse,
  },
  // Discover a list of services given their namespace
discoverByNamespace: {
    path: '/service_registry.ServiceRegistry/DiscoverByNamespace',
    requestStream: false,
    responseStream: false,
    requestType: service_registry_pb.DiscoverByNamespaceRequest,
    responseType: service_registry_pb.DiscoverByNamespaceResponse,
    requestSerialize: serialize_service_registry_DiscoverByNamespaceRequest,
    requestDeserialize: deserialize_service_registry_DiscoverByNamespaceRequest,
    responseSerialize: serialize_service_registry_DiscoverByNamespaceResponse,
    responseDeserialize: deserialize_service_registry_DiscoverByNamespaceResponse,
  },
  // List, or retrieve all contents of the service registry
list: {
    path: '/service_registry.ServiceRegistry/List',
    requestStream: false,
    responseStream: false,
    requestType: service_registry_pb.ListRequest,
    responseType: service_registry_pb.ListResponse,
    requestSerialize: serialize_service_registry_ListRequest,
    requestDeserialize: deserialize_service_registry_ListRequest,
    responseSerialize: serialize_service_registry_ListResponse,
    responseDeserialize: deserialize_service_registry_ListResponse,
  },
};

exports.ServiceRegistryClient = grpc.makeGenericClientConstructor(ServiceRegistryService);
