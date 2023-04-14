<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DeleteThumbs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'thumbs:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deletes generated thumbnails';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $files = $this->withProgressBar(Storage::disk('thumbs')->allFiles(), function($files) {
            Storage::disk('thumbs')->delete($files);
        });

        $this->newLine();
        $this->info('Thumbnails successfully deleted!');
    }   
}
