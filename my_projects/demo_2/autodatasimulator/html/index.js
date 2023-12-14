//var socket = io.connect('3.7.144.155:3000');

var socket = io.connect(document.location.protocol+'//'+document.location.host);

var out = {}

const inputLeftSign = document.getElementById('leftSign');
const inputRightSign = document.getElementById('rightSign');
const inputDippedBeam = document.getElementById('dippedBeam');
const inputBrake = document.getElementById('brake');
const inputDrift = document.getElementById('drift');
const inputHighBeam = document.getElementById('highBeam');
const inputLock = document.getElementById('lock');
const inputSeatBelt = document.getElementById('seatBelt');
const inputEngineTemp = document.getElementById('engineTemp');
const inputStab = document.getElementById('stab');
const inputABS = document.getElementById('abs');
const inputGasIcon = document.getElementById('gasIcon');
const inputTrunk = document.getElementById('trunk');
const inputBonnet = document.getElementById('bonnet');
const inputDoors = document.getElementById('doors');
const inputBattery = document.getElementById('battery');
const inputOil = document.getElementById('oil');
const inputEngineFail = document.getElementById('engineFail');

const inputSpeed = document.getElementById('speed');
const inputTacho = document.getElementById('tacho');
const inputGas = document.getElementById('gas');
const inputMileage = document.getElementById('mileage');

inputLeftSign.addEventListener('change', e => {
      out.id = e.target.id
      if (e.target.checked == false)
      {
        out.value = 0
      } else
      {
        out.value = 1
      }
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputRightSign.addEventListener('change', e => {
      out.id = e.target.id
      if (e.target.checked == false)
      {
        out.value = 0
      } else
      {
        out.value = 1
      }
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputDippedBeam.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputBrake.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputDrift.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputHighBeam.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputLock.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputSeatBelt.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputEngineTemp.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputStab.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputABS.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputGasIcon.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputTrunk.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputBonnet.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputDoors.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputBattery.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputOil.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputEngineFail.addEventListener('change', e => {
      out.id = e.target.id
      out.value = e.target.value
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputSpeed.addEventListener('input', e => {
      out.id = e.target.id
      out.value = e.target.value * 1000
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputTacho.addEventListener('input', e => {
      out.id = e.target.id
      out.value = e.target.value * 1000
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputGas.addEventListener('input', e => {
      out.id = e.target.id
      out.value = e.target.value * 1000
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})

inputMileage.addEventListener('input', e => {
      out.id = e.target.id
      out.value = e.target.value * 1000
      socket.emit("buttonPressed", out)
      console.log("Button id = " + out.id)
      console.log("Button Value =  " + out.value)
})
