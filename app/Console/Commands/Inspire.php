<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
//use Illuminate\Foundation\Inspiring;
use GraphAware\Neo4j\Client\ClientBuilder;


class Inspire extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'inspire';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Display an inspiring quote';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $client = ClientBuilder::create()
            ->addConnection('default', 'http://neo4j:hackaton2016@localhost:7474') // Example for HTTP connection configuration (port is optional)
            ->addConnection('bolt', 'bolt://neo4j:hackaton2016@localhost:7687') // Example for BOLT connection configuration (port is optional)
            ->build();

        $result = $client->run("
        MATCH
            (a:Trip)-[:IS_PART_OF]-(b:Location)
        where ID(a) = 62
        return a,b"
        );
        print_r($result->firstRecord());
        $this->comment(PHP_EOL.Inspiring::quote().PHP_EOL);
    }
}