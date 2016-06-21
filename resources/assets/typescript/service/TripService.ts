var app = angular.module("trip");

class TripService {
    static $inject = ['$http'];
    constructor(private $http){}

    public getTrip(id:number):ng.Promise<Trip>{
        return this.$http.get("/api/start/"+id).then((i)=>{
            var users = {};
            i.data.users.map((user)=>{
                users[user.id] = user;
            });
            return {
                trip:i.data.trips[id],
                users:users
            };
        });
    }
}

app.service("TripService", TripService);