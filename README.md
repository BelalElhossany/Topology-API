# Topology Api

## Language used
* JavaScript is used.
### Why?
* Easy to work with Json files
* Easy to do operations on JavaScript arrays
* Garbage-collecting language, so no need to worry about memory and pointers
* No need to use build tool

## Packages used
* jest for testing
* jsdoc for documenting

## Getting it working


### Dependencies
* npm install

### Generate documentation
* Documentation is done on API and Class levels
* npm run docs
![ Documentation ](https://github.com/BelalElhossany/Topology-API/blob/main/images/doc.PNG)

### Test
* Tests are done on API and Class levels
* npm run test
![ Test ](https://github.com/BelalElhossany/Topology-API/blob/main/images/test.PNG)

## Code Analysis Tool
* Standard js is used
* standard "./src/*.js"

## How to use API
* const { readJSON, writeJSON, queryTopologies, deleteTopology, queryDevices, queryDevicesWithNetlistNode } = require('./src/api')
