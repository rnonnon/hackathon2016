CREATE
(user_1:User {firstname:'Bianca', other_information: '....'}),
(trip_1:Trip {title: 'Gluten free trip - traveller', start_date: 20160320, end_date: 20160320}),
(trip_2:Trip {title: 'Gluten free trip - family', start_date: 20160912, end_date: 20160912}),

(location_1:Location {title: 'Checkpoint Charlie', description: 'Historical information', lat: '52.5075927', long: '13.390368500000022'}),
(location_2:Location {title: 'Schloss bellevue', description: '', lat: '52.5175726', long: '13.352792799999975'}),
(location_3:Location {title: 'Simela', description: 'Italian restaurant', lat: '52.52756729999999', long: '13.398033899999973'}),
(location_4:Location {title: 'Story of Berlin', description: 'Museum', lat: '52.50185999999999', long: '13.323120000000017'}),
(location_5:Location {title: 'Zoologischer Garten', description: 'Nice for children', lat: '52.5079196', long: '13.33775460000004'}),
(location_6:Location {title: 'Schlosspark Charlottenburg', description: '', lat: '52.51996', long: '13.293800000000033'}),
(location_7:Location {title: 'Technisches Museum', description: '', lat: '52.49862779999999', long: '13.376844300000016'}),


(user_1)-[:TOOK_TRIP]->(trip_1),
(location_6)-[:IS_PART_OF {start_date: '20160320110000', end_date: '20160320123000'}]->(trip_1),
(location_3)-[:IS_PART_OF {start_date: '20160320123000', end_date: '20160320140000'}]->(trip_1),
(location_2)-[:IS_PART_OF {start_date: '20160320140000', end_date: '20160320150000'}]->(trip_1),
(location_1)-[:IS_PART_OF {start_date: '20160320150000', end_date: '20160320170000'}]->(trip_1),
(location_7)-[:IS_PART_OF {start_date: '20160320170000', end_date: '20160320190000'}]->(trip_1),

(user_1)-[:TOOK_TRIP]->(trip_2),
(location_1)-[:IS_PART_OF {start_date: '20160912090000', end_date: '20160912110000'}]->(trip_2),
(location_2)-[:IS_PART_OF {start_date: '20160912110000', end_date: '20160912123000'}]->(trip_2),
(location_3)-[:IS_PART_OF {start_date: '20160912123000', end_date: '20160912140000'}]->(trip_2),
(location_4)-[:IS_PART_OF {start_date: '20160912140000', end_date: '20160912160000'}]->(trip_2),
(location_5)-[:IS_PART_OF {start_date: '20160912160000', end_date: '20160912180000'}]->(trip_2)