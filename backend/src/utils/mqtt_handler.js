var mqtt = require('mqtt')

const get = (topic)=>{
  return new Promise((resolve,reject)=>{
    var client  = mqtt.connect(process.env.MQTT_URL)


    client.on('connect',()=>{
      client.subscribe(topic, function (err) {
        if(err){
            console.log("error on connecting to mqtt server!!!")
            client.end()
            reject(err)
        }else{
            console.log("Connected to MQTT Server")
        }
      })        
    })
  
    client.on('message', function (topic, message) {
      msg = message.toString();
      data = JSON.parse(msg);
      // console.log(data)
      client.end()
      resolve(data)
      // client.end()
    })
  })
  
}

const send = (topic,msg)=>{
  return new Promise((resolve,reject)=>{
    var client  = mqtt.connect(process.env.MQTT_URL)
    client.on('connect',()=>{
      client.publish(topic, msg, (err)=>{
          if(err){
            client.end()
            reject(err)
          }else{
            client.end()
            resolve("Sent "+msg)
          }
      })
    })
  })
}

// connect()

module.exports = {get,send}