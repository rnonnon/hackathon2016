var app = angular.module("trip");

class TripViewController {
    static $inject = ["TripService", "$routeParams", "tripData"];

    public rateValue:number;
    private totalRateValue:number;
    public maxRateValue:number = 5;
    public isRateReadonly:boolean = false;
    public numberOfRates:number;
    public steps:Array<any>;
    public trip:Trip;
    public users:any;

    constructor(tripService:any, routeParams, tripData) {
        this.trip = tripData.trip;
        this.users = tripData.users;
        angular.element("body").css("background-image","");
    }
    get tripCreator(){
        console.log(this.users[this.trip.created_by]);
        return this.users[this.trip.created_by];
    }
    get locationsSize(){
        return _.keys(this.trip.locations).length;
    }

    static resolve:{ [key: string]: any } = {
        tripData: ['TripService', '$route', function (tripService:TripService, $route) {
        return tripService.getTrip($route.current.params.id);
    }]
};

}

app.controller("TripViewController", TripViewController);