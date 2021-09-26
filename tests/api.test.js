const { expect } = require('@jest/globals')
const { readJSON, writeJSON, queryTopologies, deleteTopology, queryDevices, queryDevicesWithNetlistNode } = require('../src/api')
const topology = {
  id: 'top1',
  components: [
    {
      type: 'resistor',
      id: 'res1',
      resistance: {
        default: 100,
        min: 10,
        max: 1000
      },
      netlist: {
        t1: 'vdd',
        t2: 'n1'
      }
    },
    {
      type: 'nmos',
      id: 'm1',
      'm(l)': {
        deafult: 1.5,
        min: 1,
        max: 2
      },
      netlist: {
        drain: 'n1',
        gate: 'vin',
        source: 'vss'
      }
    }
  ]
}

test('Read topology from JSON file', () => {
  expect(readJSON('topology')).toEqual(topology)
})

test('Writing topology to JSON file', () => {
  writeJSON(topology.id)
  expect(readJSON('writtenTopology')).toEqual(topology)
})

test('Query about topologies in memory', () => {
  expect(queryTopologies()).toEqual([topology, topology])
})

test('Delete topology from memory', () => {
  deleteTopology(topology.id)
  expect(queryTopologies()).toEqual([topology])
})

test('Query about devices of a specific topology', () => {
  expect(queryDevices(topology.id)).toEqual(topology.components)
})

test('Query about devices connected to a specific netlist node', () => {
  expect(queryDevicesWithNetlistNode(topology.id, 'n1')).toEqual(topology.components)
  expect(queryDevicesWithNetlistNode(topology.id, 'vss')).toEqual([topology.components[1]])
})
