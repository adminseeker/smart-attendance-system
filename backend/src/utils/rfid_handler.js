const mqtt = require("./mqtt_handler");

const get_rfid_id = async ()=>{
    const data = await mqtt.get("rfid_add");
    let id = data.id.toString();
    if(data.id){
        return id;
    }
    return "id not found!";    
}

module.exports = {get_rfid_id};