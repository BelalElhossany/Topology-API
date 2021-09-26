const { expect } = require('@jest/globals')
const TOPOLOGY_API = require('../src/implementation')
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
  expect(TOPOLOGY_API.read_topology('topology')).toEqual(topology)
})

test('Writing topology to JSON file', () => {
  TOPOLOGY_API.save_topology(topology.id)
  expect(TOPOLOGY_API.read_topology('writtenTopology')).toEqual(topology)
})

test('Query about topologies in memory', () => {
  expect(TOPOLOGY_API.get_topologies()).toEqual([topology, topology])
})

test('Delete topology from memory', () => {
  TOPOLOGY_API.delete_topology(topology.id)
  expect(TOPOLOGY_API.get_topologies()).toEqual([topology])
})

test('Query about devices of a specific topology', () => {
  expect(TOPOLOGY_API.get_devices_of_topology(topology.id)).toEqual(topology.components)
})

test('Query about devices connected to a specific netlist node', () => {
  expect(TOPOLOGY_API.get_devices_of_node(topology.id, 'n1')).toEqual(topology.components)
  expect(TOPOLOGY_API.get_devices_of_node(topology.id, 'vss')).toEqual([topology.components[1]])
})
