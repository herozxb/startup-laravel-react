<?php

namespace App\Listeners;

use App\Mail\WelcomeNewUserMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class WelcomeNewUserListener
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        //
        Mail::to($event->user->email)->send(new WelcomeNewUserMail($event->user));
    }
}