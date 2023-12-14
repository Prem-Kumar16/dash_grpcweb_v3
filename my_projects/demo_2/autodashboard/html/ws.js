//var socket = io.connect('13.126.175.152:4000');

var socket = io.connect(document.location.protocol+'//'+document.location.host);

document.addEventListener("DOMContentLoaded", onDomReadyHandler())

function onDomReadyHandler(event) {
    socket.on('carMessage', (msg) => {
       console.log(msg.id)
       console.log(msg.data)

      if(msg.id == 1 && msg.data == 1)
       {
          turnSignalsStates.left = true;
       }

      if(msg.id == 1 && msg.data == 0)
       {
          turnSignalsStates.left = false;
       }

      if(msg.id == 2 && msg.data == 1)
       {
          turnSignalsStates.right = true;
       }

      if(msg.id == 2 && msg.data == 0)
       {
          turnSignalsStates.right = false;
       }

      if(msg.id == 3)
       {
          iconsStates.dippedBeam  = msg.data;
       }
      if(msg.id == 4)
       {
          iconsStates.brake  = msg.data;
       }

      if(msg.id == 5)
       {
          iconsStates.drift  = msg.data;
       }

      if(msg.id == 6)
       {
          iconsStates.highBeam  = msg.data;
       }

      if(msg.id == 7)
       {
          iconsStates.lock  = msg.data;
       }

      if(msg.id == 8)
       {
          iconsStates.seatBelt  = msg.data;
       }

      if(msg.id == 9)
       {
          iconsStates.engineTemp  = msg.data;
       }

      if(msg.id == 10)
       {
          iconsStates.stab  = msg.data;
       }

      if(msg.id == 11)
       {
          iconsStates.abs  = msg.data;
       }

      if(msg.id == 12)
       {
          iconsStates.gas  = msg.data;
       }

      if(msg.id == 13)
       {
          iconsStates.trunk  = msg.data;
       }

      if(msg.id == 14)
       {
          iconsStates.bonnet  = msg.data;
       }

      if(msg.id == 15)
       {
          iconsStates.doors  = msg.data;
       }

      if(msg.id == 16)
       {
          iconsStates.battery  = msg.data;
       }

      if(msg.id == 17)
       {
          iconsStates.oil  = msg.data;
       }

      if(msg.id == 18)
       {
          iconsStates.engineFail  = msg.data;
       }

      if(msg.id == 19)
       {
          speed  = msg.data/1000;
       }

      if(msg.id == 20)
       {
          tacho  = msg.data/1000;
       }

      if(msg.id == 21)
       {
          gas  = msg.data/1000;
       }

      if(msg.id == 22)
       {
          mileage  = msg.data/1000;
       }

       redraw();
    })
}
