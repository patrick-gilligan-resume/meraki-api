//imports 
import axios from 'axios';
import {
    merakiAuth,
    merakiAuthObject
} from './config.js'

//https://developer.cisco.com/meraki/api-latest/#!getting-started/base-uri
const merakiBaseUri = `https://api.meraki.com/api/v1`; 

// //get array of organizationId objects if there are more than one
// //https://developer.cisco.com/meraki/api-latest/#!getting-started/find-your-organization-id
// const getOrganizationIds = async () => {
//     let organizations = [];
//     return await axios.get(`${merakiBaseUri}/organizations`, merakiAuthObject)
//         .then(res => {
//             res.data.forEach(org => {
//                 organizations.push({
//                     name: org.name,
//                     id: org.id
//                 })
//             })
//             return organizations;
//         })
//         .catch(err => {if(err) console.log(err)});
// }
// /* 
// // sample return
// Successful HTTP Status: 200
// [
//   {
//     name: "org",
//     id: 123
//   }
// ]

// */
// ////////////////////////////////////////////

// //get network Ids
// //https://developer.cisco.com/meraki/api-latest/#!getting-started/find-your-network-id
// const getNetworkIds = async () => {
//     let idArray = [];
//     let organizations = await getOrganizationIds();
//     organizations.forEach(org => {
//         await axios.get(`${merakiBaseUri}/organizations/${org.id}/networks`,merakiAuthObject)
//             .then(res => {
//                 res.data.forEach(id => {
//                     idArray.push({
//                         name: id.name,
//                         id: id.id,
//                         organizationId: id.organizationId
//                     })
//                 })
//                 return idArray;
//             })
//             .catch(err => {if(err) console.log(err)});
//     })
// }
// // sample response body
// /*
// Successful HTTP Status: 200
// [
//   {
//     name: "org",
//     id: 123
//     organizationId: 789
//   }
// ]
// */
// ////////////////////////////////////////////


// //return an array of all device information
// //https://developer.cisco.com/meraki/api-latest/#!getting-started/find-your-device-serials
// const getDeviceInfo = async () => {
//     let deviceInfoArray = [];
//     let deviceNetworkIds = await getNetworkIds();
//     deviceNetworkIds.forEach(device => {
//         await axios.get(`${merakiBaseUri}/${device.id}/devices`,merakiAuthObject)
//             .then(res => {
//                 res.data.forEach(info => {
//                     deviceInfoArray.push({
//                         name: info.name,
//                         serial: info.serial,
//                         mac: info.mac,
//                         model: info.model
//                     })
//                 })
//                 return deviceInfoArray;
//             })
//             .catch(err => {if(err) console.log(err)});
//     })
// };
/*
// sample response body
Successful HTTP Status: 200
[
  {
    name: "device",
    serial: 123456,
    mac: "1A-2B-3C-DE-4F-50",
    model: "MS-120"
  }
]
*/
////////////////////////////////////////////

//blink device LEDs for a given serial number
const blinkDevice = async (serial) => {
    axios.post(`${merakiBaseUri}/${serial}/blinkLeds`, merakiAuthObject)
        .then(res => {
            if (res.status == 202) {
                console.log(`Device with serial number ${serial} will blink for 20 seconds...`)
            } else {
                console.log(res.status);
            }
        })
        .catch(err => {if(err) console.log(err)});
};
////////////////////////////////////////////

//link device name to serial
const linkNameToSerial = async (serialArray, deviceName) => {
    let foundSerial = '';
    serialArray.forEach(entry => {
        if (entry.name === deviceName) {
            console.log('yes', entry.serial);
            foundSerial = entry.serial
        };
    });
    return foundSerial;
}
// const organizationIds = await getOrganizationIds();
// const networkIds = await getNetworkIds();
// const deviceInfo = await getDeviceInfo();

// console.log(organizationIds);
// console.log(networkIds);
// console.log(deviceInfo);

let testArray = [
    {
        name: "device1",
        serial: "123456",
        mac: "1A-2B-3C-DE-4F-50",
        model: "MS-120"
    },
    {
        name: "device2",
        serial: "234567",
        mac: "1A-2B-3C-DE-4F-50",
        model: "MS-1130"
    }
]


export {
    blinkDevice,
    linkNameToSerial,
    testArray
}