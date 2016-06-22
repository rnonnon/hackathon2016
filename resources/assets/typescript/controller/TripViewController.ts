var app = angular.module("trip");

class TripViewController {
    static $inject = ["TripService", "$routeParams", "uiGmapGoogleMapApi", "tripData", "$location", "$window"];

    public rateValue:number;
    public maxRateValue:number = 5;
    public isRateReadonly:boolean = false;
    public numberOfRates:number;
    public steps:Array<any>;
    public trip:Trip;
    public users:any;
    public showMap:boolean = false;
    public map:any;

    constructor(tripService:any, routeParams, uiGmapGoogleMapApi, tripData, private $location, private $window) {
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
    public goToComments() {
        angular.element('html, body').animate({
            scrollTop: angular.element('#comments').offset().top
        }, 500);
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
    public goMap(location){
        var name = location.name.replace(/\s/g,"+");
        //var u = encodeURI("http://maps.apple.com/?ll="+location.latitude+","+location.longitude)
        //this.$location.url("http://maps.apple.com/?q="+name+"&ll="+location.latitude+","+location.longitude);
        this.$window.open("http://maps.apple.com/?q="+name+"&ll="+location.latitude+","+location.longitude, '_system', 'location=no');
        //this.$location.path(u);
        //alert("http://maps.apple.com/?q="+name+"&ll="+location.latitude+","+location.longitude);
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