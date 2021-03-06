@extends('layouts.layout')

@section('title', '提款')

@section('content')

<!-- Secondary menu
  ============================================= -->
<div class="bg-white">
    <div class="container d-flex justify-content-center">
        <ul class="nav secondary-nav alternate">
            <li class="nav-item"> <a class="nav-link" href="{{ url('transactions/deposit') }}">存款</a></li>
            <li class="nav-item"> <a class="nav-link active" href="{{ url('transactions/withdraw') }}">提款</a></li>
            <li class="nav-item"> <a class="nav-link" href="{{ url('transactions/transfer') }}">汇款</a></li>
        </ul>
    </div>
</div>
<!-- Secondary menu end -->

<!-- Content
  ============================================= -->
<div id="content" class="py-4">
    <div class="container">
        <h2 class="font-weight-400 text-center mt-3 mb-4">提款</h2>
        <div class="row">
            <div class="col-md-8 col-lg-6 col-xl-5 mx-auto">
                <!-- Withdraw Money Form
        ============================================= -->
                <div class="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
                    <div class="text-center bg-primary p-4 rounded mb-4">
                        <h3 class="text-10 text-white font-weight-400">
                            &#8358;{{ number_format(Auth::user()->wallet->balance) }}</h3>
                        <p class="text-white">可用的金额</p>
                    </div>
                    <form method="post">
                        @csrf
                        <div class="form-group">
                            <label for="withdrawto">提款到</label>
                            <select id="withdrawto" name='account_uuid' class="custom-select" required="">
                                <option value="{{ $account->uuid }}">
                                    {{ $account->bank_name." - ".$account->account_number }}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="youSend">金额</label>
                            <div class="input-group">
                                <div class="input-group-prepend"><span class="input-group-text">&#8358;</span> </div>
                                <input type="number" class="form-control" data-bv-field="youSend" id="withdraw-amount"
                                    name="amount" step="100" min="1000" max="{{ Auth::user()->wallet->balance }}">
                            </div>
                            <small><b>最小&#8358;1000</b></small>
                        </div>
                        <button class="btn btn-primary btn-block" id="withdraw-btn" type="submit"
                            disabled>继续</button>
                    </form>
                </div>
                <!-- Withdraw Money Form end -->
            </div>
        </div>
    </div>
</div>
<!-- Content end -->


@include('layouts.partials.footer')

<script src="https://checkout.flutterwave.com/v3.js"></script>

@endsection
