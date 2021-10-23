const numberOfDrones = 15;
const numberOfAltitudes = 15;
const velosity = 60;
let ticker = 240;
const arrayOfAltitudes = [];
for (let i = 0; i < numberOfAltitudes; i++) {
  arrayOfAltitudes[i] = 2 + i * 2;
}
const arrayOfAltitudesLength = arrayOfAltitudes.length;
function waitingCustomerMessage() {
  console.log("waitingCustomerMessage of " + x); // x is number of the drone
}
function customerArrivalMessage() {
  console.log("customerArrivalMessage of " + x);
}
function onFlyMessage() {
  console.log("onFlyMessage of " + x);
}
function lendingMessage() {
  console.log("lendingMessage of " + x);
}
function endOfServiceMessage() {
  console.log("endOfServiceMessage of " + x);
}
function waitingAltitudeMessage() {
  console.log("waitingAltitudeMessage of " + x);
}

class Drone {
  constructor(
    name,
    altitude,
    timeTillLending,
    distanceToFly,
    waitingTime,
    numberOfFlights,
    onTheGround,
    onFly
  ) {
    this.name = name;
    this.altitude = altitude;
    this.timeTillLending = timeTillLending;
    this.distanceToFly = distanceToFly;
    this.waitingTime = waitingTime;
    this.numberOfFlights = numberOfFlights;
    this.onTheGround = onTheGround;
    this.onFly = onFly;
  }
}
const drone = [];
for (let i = 0; i < numberOfDrones; i++) {
  drone[i] = new Drone(i + 1, 0, 0, 0, 0, 0, 1, 0);
}
function droneFlightSimulation() {
  ticker--;
  for (let i = 0; i < numberOfDrones; i++) {
    x = drone[i].name;
    if (drone[i].timeTillLending == 0) {
      if (
        drone[i].timeTillLending == 0 &&
        drone[i].numberOfFlights !== 0 &&
        drone[i].onFly == 1
      ) {
        lendingMessage();
        endOfServiceMessage();
        //arrayOfAltitudes.push(drone[i].altitude);
        drone[i].onTheGround = 1;
        drone[i].onFly = 0;
        //console.log(drone[i]);
      }
      if (drone[i].onTheGround == 1) {
        drone[i].waitingTime = Math.floor(Math.random() * 3 + 1);
        drone[i].distanceToFly = Math.floor(Math.random() * 3 + 1);
      }
      if (drone[i].waitingTime == 0 && arrayOfAltitudesLength > 0) {
        drone[i].altitude = arrayOfAltitudes[i];
        //arrayOfAltitudes.shift();
        drone[i].timeTillLending =
          Math.round(
            ((drone[i].distanceToFly + drone[i].altitude * 2) / velosity) * 36
          ) + 1;
        drone[i].numberOfFlights++;
        customerArrivalMessage();
        onFlyMessage();
        drone[i].timeTillLending--;
        drone[i].onTheGround = 0;
        drone[i].onFly = 1;
        //console.log(" no wait, H available -ok");   //testing
      }

      if (drone[i].waitingTime > 0 && arrayOfAltitudesLength > 0) {
        waitingCustomerMessage();
        drone[i].waitingTime--;
        drone[i].onTheGround = 0;
        drone[i].onFly = 0;
        //console.log(" wait , H available -ok");  //testing
      }
      if (drone[i].waitingTime > 0 && arrayOfAltitudesLength == 0) {
        waitingAltitudeMessage();
        drone[i].waitingTime--;
        drone[i].onTheGround = 0;
        drone[i].onFly = 0;
        console.log(" NO SENSE --- "); //testing, no sense , but still
      }
      if (drone[i].waitingTime == 0 && arrayOfAltitudes.length == 0) {
        waitingAltitudeMessage();
        drone[i].onTheGround = 0;
        drone[i].onFly = 0;
        //console.log("no wait, H Not availabe --ok"); //testing
      }
    }
    if (drone[i].onTheGround == 0 && drone[i].onFly == 1) {
      onFlyMessage();
      drone[i].timeTillLending--;
      //console.log("on the fly, just reducing time" + drone[i].timeTillLending); //testing
    }
  }
}

function stopSimulation() {
  if (ticker == 0) {
    clearInterval(a);
  }
}
let a = setInterval(() => {
  droneFlightSimulation();
  stopSimulation();
}, 100);
