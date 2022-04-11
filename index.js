//imports 
import axios from 'axios';
import {
    merakiAuth,
    merakiAuthObject
} from './config.js'

//https://developer.cisco.com/meraki/api-latest/#!getting-started/base-uri
const merakiBaseUri = `https://api.meraki.com/api/v1`; 

//get array of organizationId objects if there are more than one
//https://developer.cisco.com/meraki/api-latest/#!getting-started/find-your-organization-id
const getOrganizationIds = async () => {
    let organizations = [];
    return await axios.get(`${merakiBaseUri}/organizations`, merakiAuthObject)
        .then(res => {
            res.data.forEach(org => {
                organizations.push({
                    name: org.name,
                    id: org.id
                })
            })
            return organizations;
        })
        .catch(err => {if(err) console.log(err)});
}
console.log(await getOrganizationIds()); //log array of orgs to the console

//get network Ids
//https://developer.cisco.com/meraki/api-latest/#!getting-started/find-your-network-id
const getNetworkIds = async () => {
    let idArray = [];
    let organizations = await getOrganizationIds();
    organizations.forEach(org => {
        await axios.get(`${merakiBaseUri}/organizations/${org.id}/networks`,merakiAuthObject)
            .then(res => {
                res.data.forEach(id => {
                    idArray.push({
                        name: id.name,
                        id: id.id,
                        organizationId: id.organizationId
                    })
                })
                return idArray;
            })
            .catch(err => {if(err) console.log(err)});
    })
}
console.log(await getNetworkIds());

//return an array of all device information
//https://developer.cisco.com/meraki/api-latest/#!getting-started/find-your-device-serials
const getDeviceInfo = async () => {
    let deviceInfoArray = [];
    let deviceNetworkIds = await getNetworkIds();
    deviceNetworkIds.forEach(device => {
        await axios.get(`${merakiBaseUri}/${device.id}/devices`,merakiAuthObject)
            .then(res => {
                res.data.forEach(info => {
                    deviceInfoArray.push({
                        name: info.name,
                        serial: info.serial,
                        mac: info.mac,
                        model: info.model
                    })
                })
                return deviceInfoArray;
            })
            .catch(err => {if(err) console.log(err)});
    })
};

const deviceInfo = await getDeviceInfo();
console.log(deviceInfo);