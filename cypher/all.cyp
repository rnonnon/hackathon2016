CREATE
(user_1:User {firstname:'Bianca', other_information: '....'}),
(trip_1:Trip {title: 'My personal trip', start_date: 20160320, end_date: 20160325}),
(user_1)-[:TOOK_TRIP]->(trip_1),
(location_1:Location {title: 'Checkpoint Charlie', lat: '52.5075927', long: '13.3903685'})