<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

use App\Http\Requests;

class TripController extends Controller
{
    public function __construct() {
//        \Session::clear();
        if (!\Session::has($this->getBasePathString(false))) {
            $this->getTripData();
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return $this->output();
    }

    public function startTrip($tripId) {
        $this->setTripPath($tripId, 'started', true);

        return $this->output();
    }

    public function checkIn($tripId, $locationId) {
        $this->setTripPath($tripId, 'locations.' . $locationId . '.visited', true);

        return $this->output();
    }

    public function skipLocation($tripId, $locationId) {
        $this->setTripPath($tripId, 'locations.' . $locationId . '.skipped', true);

        return $this->output();
    }

    protected function output() {

        $session          = \Session::get('get_there');
        $session['trips'] = \Session::get($this->getBasePathString() . 'trips.' . \Session::get($this->getBasePathString() . 'current_user'));

        \Session::save();

        return new JsonResponse($session);
    }

    protected function setBasePath($path, $data) {
        \Session::set($this->getBasePathString() . $path, $data);
    }

    protected function getBasePath($path = '') {
        return \Session::get($this->getBasePathString((!empty($path))) . $path);
    }

    protected function setTripPath($tripId, $path, $data) {
        \Session::set($this->getTripBasePathString($tripId) . $path, $data);
    }

    protected function getTripPath($tripId, $path = '') {
        return \Session::get($this->getTripBasePathString($tripId, (!empty($path))) . $path);
    }

    public function getBasePathString($lastDot = true) {
        return 'get_there' . ($lastDot === true ? '.' : '');
    }

    protected function getTripBasePathString($tripId, $lastDot = true) {

        return $this->getBasePathString() . 'trips.' . \Session::get($this->getBasePathString() . 'current_user') . '.' . $tripId . ($lastDot === true ? '.' : '');
    }

    protected function getTripData() {
        $result = [
            'current_user' => 3,
            'trips'        => [],
            'users'        => [
                ['id'                     => 1,
                 'firstname'              => 'Bianca',
                 'additional_information' => 'none'
                ],
                ['id'                     => 2,
                 'firstname'              => 'Bart',
                 'additional_information' => 'none'
                ],
                ['id'                     => 3,
                 'firstname'              => 'Jan',
                 'additional_information' => 'none'
                ],
                ['id'                     => 4,
                 'firstname'              => 'Roy',
                 'additional_information' => 'none'
                ],
                ['id'                     => 5,
                 'firstname'              => 'Rémi',
                 'additional_information' => 'none'
                ]
            ]
        ];

        for ($i = 1; $i <= 5; $i++) {
            $result['trips'][$i] = [
                1 => [
                    'id'         => 1,
                    'name'       => 'Gluten free trip - traveller',
                    'start_date' => new \DateTime(20160320),
                    'end_date'   => new \DateTime(20160320),
                    'started'    => false,
                    'created_by' => 1,
                    'locations'  => [
                        1 => [
                            //location1
                            'id'          => 1,
                            'name'        => 'Checkpoint Charlie',
                            'description' => 'crossing point of former east and west Berlin',
                            'latitude'    => 52.5075927,
                            'longitude'   => 13.390368500000022,
                            'skipped'     => false,
                            'visited'     => false
                        ],
                        2 => [
                            //location2
                            'id'          => 2,
                            'name'        => 'Schloss Bellevue',
                            'description' => 'residence of german president',
                            'latitude'    => 52.5175726,
                            'longitude'   => 13.352792799999975,
                            'skipped'     => false,
                            'visited'     => false
                        ],
                        3 => [
                            //location3
                            'id'          => 3,
                            'name'        => 'Restaurant "Simela"',
                            'description' => 'italian restaurant with glutenfree pizza',
                            'latitude'    => 52.52756729999999,
                            'longitude'   => 13.398033899999973,
                            'skipped'     => false,
                            'visited'     => false
                        ],
                        6 => [
                            //location6
                            'id'          => 6,
                            'name'        => 'Schlosspark Charlottenburg',
                            'description' => 'historical background information on Berlin',
                            'latitude'    => 52.51996,
                            'longitude'   => 13.293800000000033,
                            'skipped'     => false,
                            'visited'     => false
                        ],
                        7 => [
                            //location7
                            'id'          => 7,
                            'name'        => 'history of science and technology',
                            'description' => 'Museum',
                            'latitude'    => 52.49862779999999,
                            'longitude'   => 13.376844300000016,
                            'skipped'     => true,
                            'visited'     => false
                        ]
                    ],
                    'ratings'    => [
                        'rating'   => 4,
                        'rated_by' => 1
                    ],
                    'comments'   => [
                        ['id'           => 1,
                         'commented_by' => 2,
                         'comment'      => 'next time I will definitely need more time for the "Zoologischer Garten", had to hurry a bit to get through my planned trip.'
                        ],
                        ['id'           => 2,
                         'commented_by' => 4,
                         'comment'      => 'Thanks for hint, we only took parts of your route, but saved more time for the garden, really beautiful and great for the kids!'
                        ],
                        ['id'           => 4,
                         'commented_by' => 3,
                         'comment'      => 'it was raining yesterday, so we did not take the outdoor parts of your trip (just skipped them), but great tour, thanks!'
                        ]
                    ],
                    'tags'       => [
                        ['id'          => 1,
                         'description' => 'glutenfree'
                        ],
                        ['id'          => 2,
                         'description' => 'family'
                        ],
                        ['id'          => 3,
                         'description' => 'children'
                        ]
                    ]
                ],
                2 => [
                    'id'         => 2,
                    'name'       => 'Gluten free trip - family',
                    'start_date' => new \DateTime(20160912),
                    'end_date'   => new \DateTime(20160912),
                    'started'    => false,
                    'created_by' => 2,
                    'locations'  => [
                        1 => [
                            //location1
                            'id'          => 1,
                            'name'        => 'Checkpoint Charlie',
                            'description' => 'crossing point of former east and west Berlin',
                            'latitude'    => 52.5075927,
                            'longitude'   => 13.390368500000022,
                            'skipped'     => false,
                            'visited'     => true
                        ],
                        2 => [
                            //location2
                            'id'          => 2,
                            'name'        => 'Schloss Bellevue',
                            'description' => 'residence of german president',
                            'latitude'    => 52.5175726,
                            'longitude'   => 13.352792799999975,
                            'skipped'     => false,
                            'visited'     => false
                        ],
                        3 => [
                            //location3
                            'id'          => 3,
                            'name'        => 'Restaurant "Simela"',
                            'description' => 'italian restaurant with glutenfree pizza',
                            'latitude'    => 52.52756729999999,
                            'longitude'   => 13.398033899999973,
                            'skipped'     => false,
                            'visited'     => true
                        ],
                        4 => [
                            //location4
                            'id'          => 4,
                            'name'        => 'Story of Berlin',
                            'description' => 'discover historical perspective of Berlin',
                            'latitude'    => 52.50185999999999,
                            'longitude'   => 13.323120000000017,
                            'skipped'     => false,
                            'visited'     => false
                        ],
                        5 => [
                            //location5
                            'id'          => 5,
                            'name'        => 'Zoologischer Garten',
                            'description' => 'wildlife in the middle of the city',
                            'latitude'    => 52.5079196,
                            'longitude'   => 13.33775460000004,
                            'skipped'     => false,
                            'visited'     => true
                        ]
                    ],
                    'ratings'    => [
                        'rating'   => 5,
                        'rated_by' => 2
                    ],
                    'comments'   => [
                        ['id'           => 3,
                         'commented_by' => 1,
                         'comment'      => 'we took that trip with 2 kids (aged 3 and 7) and definitely recommend families to take the subway, because the streets are really busy'
                        ]
                    ],
                    'tags'       => [
                        ['id'          => 4,
                         'description' => 'city'
                        ]
                    ]
                ]
            ];
        }

        \Session::set('get_there', $result);
    }
}
