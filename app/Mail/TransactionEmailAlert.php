<?php

namespace App\Mail;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class TransactionEmailAlert extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        //
        //$this->data = $data;
        //$this->subject('新的入款交易在虚拟钱包');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        //return $this->view('emails.credit-transaction')->with(['data' => $this->data]);
    }
}
