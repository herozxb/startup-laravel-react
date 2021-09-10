<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHonestyToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->decimal('honesty_with_money')->after('email')->nullable();
            $table->decimal('ability_with_money')->after('email')->nullable();
            $table->decimal('total_money')->after('email')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->dropColumn('honesty_with_money');
            $table->dropColumn('ability_with_money');
            $table->dropColumn('total_money');
        });
    }
}
