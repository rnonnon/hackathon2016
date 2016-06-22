var app = angular.module("trip");

class TripViewController {
    static $inject = ["TripService", "$routeParams", "uiGmapGoogleMapApi", "tripData", "$location"];

    public rateValue:number;
    public maxRateValue:number = 5;
    public isRateReadonly:boolean = false;
    public numberOfRates:number;
    public steps:Array<any>;
    public trip:Trip;
    public users:any;
    public showMap:boolean = false;
    public map:any;

    constructor(tripService:any, routeParams, uiGmapGoogleMapApi, tripData, private $location) {
        this.trip = tripData.trip;
        this.users = tripData.users;
        var paths = [];
        var markers = [];
        _.map(this.trip.locations,(location:Location) => {
            var coords = {
                longitude:location.longitude,
                latitude:location.latitude
            };
            paths.push(coords);
            markers.push({
                id:location.id,
                coords: coords
            });
        });
        this.map = { center: { latitude: paths[0].latitude, longitude: paths[0].longitude } };
        uiGmapGoogleMapApi.then(() => {
            this.map.markers = markers;
            this.map.polylines = [
                {
                    id: 1,
                    path: paths,
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    },
                    editable: false,
                    draggable: false,
                    geodesic: true,
                    visible: true,
                    icons: [{
                        icon: {
                            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                        },
                        offset: '25px',
                        repeat: '100px'
                    }]
                }];

        });
    }
    get tripCreator(){
        return this.users[this.trip.created_by];
    }
    get locationsSize(){
        return _.keys(this.trip.locations).length;
    }

    public startTrip(){
        this.$location.path("/trip/"+this.trip.id+"/start");
    }

    public toggleMap(){
        this.showMap = !this.showMap;
        document.querySelector("#myCard").classList.toggle("flip");
    }

    static resolve:{ [key: string]: any } = {
        tripData: ['TripService', '$route', function (tripService:TripService, $route) {
            return tripService.getTrip($route.current.params.id);
        }]
    };

    static resolveStart:{ [key: string]: any } = {
        tripData: ['TripService', '$route', function (tripService:TripService, $route) {
            return tripService.startTrip($route.current.params.id);
        }]
    };
}

app.controller("TripViewController", TripViewController);