/**
 * Interface of the API
 * @module Interface
 */

const API = require('./implementation')

/**
 * Read topology from a JSON file to memory
 * @param {string} FileName Name of file
 * @returns {object} topology
 */

function readJSON (FileName) {
  return API.read_topology(FileName, false)
}

/**
 * Write a specific topology from memory to a JSON file
 * @param {string} TopologyID topology id
 * @returns {boolean} result of writing
 */

function writeJSON (TopologyID) {
  return API.save_topology(TopologyID)
}

/**
 * query about current topologies in memory
 * @returns {Array} list of topologies
 */

function queryTopologies () {
  return API.get_topologies()
}

/**
 * Delete a specific topology from memory
 * @param {string} TopologyID topology id
 * @returns {boolean} result of deleting
 */

function deleteTopology (TopologyID) {
  return API.delete_topology(TopologyID)
}

/**
 * query about devices of a specific topology
 * @param {string} TopologyID topology id
 * @returns {Array} list of devices
 */

function queryDevices (TopologyID) {
  return API.get_devices_of_topology(TopologyID)
}

/**
 * query about devices connected to a specific netlist node
 * @param {string} TopologyID topology id
 * @param {string} NetlistNodeID netlist node id
 * @returns {Array} list of devices
 */

function queryDevicesWithNetlistNode (TopologyID, NetlistNodeID) {
  return API.get_devices_of_node(TopologyID, NetlistNodeID)
}

module.exports.readJSON = readJSON
module.exports.writeJSON = writeJSON
module.exports.queryTopologies = queryTopologies
module.exports.deleteTopology = deleteTopology
module.exports.queryDevices = queryDevices
module.exports.queryDevicesWithNetlistNode = queryDevicesWithNetlistNode
