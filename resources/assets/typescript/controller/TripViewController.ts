var app = angular.module("trip");

class TripViewController {
    public rateValue:number;
    private totalRateValue:number;
    public maxRateValue:number = 5;
    public isRateReadonly:boolean = false;
    public numberOfRates:number;
    public steps:Array<any>;
    constructor() {
        this.totalRateValue = 20;
        this.numberOfRates = 5;
        this.computeRating();
    }
    private computeRating() {
        this.rateValue = this.totalRateValue / this.numberOfRates;
    }
}

app.controller("TripViewController", TripViewController);