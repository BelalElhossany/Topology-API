/**
 * Implementation of the API
 * @module Implementation
 */

const fs = require('fs');

/**
 * Get key of an object by its value.
 * @param {object} object - the object
 * @param {string} value - the object's value
 * @returns {string} - the object's key
 */
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

/**
 * Class of Topology API
 */
class Topology_API{
    /**
    * @property {Array} topologies list of topologies in memory
    */
    static topologies = [];

    /**
    * @property {Function} read_topology read topology from a JSON file
    * @param {string} file_name path of the file
    * @returns {object} topology object
    */
    static read_topology(file_name,save_check = false){
        try{
            let topology = require("../topologies/"+file_name+".json");
            if(! save_check )this.topologies.push(topology)
            return topology
        }
        catch(err){
            console.log(err)
            return false;
        }
    }

    /**
    * @property {Function} save_topology save topology from memory to a JSON file
    * @param {string} file_name path of the file
    * @returns {boolean} result of saving
    */
    static save_topology(topology_id){
        let topology = this.topologies.find(t => t.id === topology_id)
        const jsonData = JSON.stringify(topology);
        fs.writeFileSync("./topologies/writtenTopology.json", jsonData);
        if(this.read_topology("writtenTopology",true))return true;
        else return false;
    }

     /**
    * @property {Function} get_topologies get current topologies in memory
    * @returns {Array} list of topologies 
    */
    static get_topologies(){
        return this.topologies;
    }

    /**
    * @property {Function} delete_topology delete topology from memory
    * @param {string} topology_id id of the topology
    * @returns {boolean} result of deleting
    */
    static delete_topology(topology_id){
        // find topology
        let index = this.topologies.findIndex(t => t.id === topology_id);
        // delete topology
        if(index != undefined){
            this.topologies.splice(index,1);
            return true;
        }
        else return false;
    }
    /**
    * @property {Function} get_devices_of_topology get devices of a specific topology
    * @param {string} topology_id id of the topology
    * @returns {Array} list of devices
    */
    static get_devices_of_topology(topology_id){
        const topology = this.topologies.find(t => t.id === topology_id);
        return topology.components
    }

    /**
    * @property {Function} get_devices_of_node get devices connected to a specific netlist node
    * @param {string} topology_id id of the topology
    * @param {string} node_id id of the netlist node
    * @returns {Array} list of devices
    */
    static get_devices_of_node(topology_id,node_id){
        // get topology
        const topology = this.topologies.find(t => t.id === topology_id);
        // get all devices of topology
        const devices = topology.components;
        // get devices which connected to the node
        let connected_devices = []
        devices.forEach(d => {
            let nodes = d.netlist;
            if(getKeyByValue(nodes,node_id)) connected_devices.push(d);
        })
        return connected_devices;
    }
}

module.exports = Topology_API