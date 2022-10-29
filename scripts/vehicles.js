"use strict";

console.log("hej från cart");

class Vehicle {
    constructor (
        id,
        name,
        model,
        crew,
        passengers,
        cost_in_credits
        ) {
            this.id = id;
        this.name = name;
        this.model = model;
        this.crew = crew;
        this.passengers = passengers;
        this.cost_in_credits = cost_in_credits;
        }
}

export default Vehicle;