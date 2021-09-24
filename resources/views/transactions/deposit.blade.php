@extends('layouts.layout')

@section('title', '存款')

@section('content')

<!-- Secondary menu
  ============================================= -->
<div class="bg-white">
    <div class="container d-flex justify-content-center">
        <ul class="nav secondary-nav alternate">
            <li class="nav-item"> <a class="nav-link active" href="{{ url('transactions/deposit') }}">存款</a></li>
            <li class="nav-item"> <a class="nav-link" href="{{ url('transactions/withdraw') }}">提款</a></li>
            <li class="nav-item"> <a class="nav-link" href="{{ url('transactions/transfer') }}">汇款</a></li>
        </ul>
    </div>
</div>
<!-- Secondary menu end -->

<!-- Content
  ============================================= -->
<div id="content" class="py-4">
    <div class="container">
        <h2 class="font-weight-400 text-center mt-3 mb-4">存入金币</h2>
        <div class="row">
            <div class="col-md-8 col-lg-6 col-xl-5 mx-auto">
                <div class="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">

                    <!-- Deposit Money Form
            ============================================= -->
                    <form id="form-send-money">
                        <div class="form-group">
                            <label for="youSend">金额</label>
                            <div class="input-group">
                                <div class="input-group-prepend"> <span class="input-group-text">&#8358;</span> </div>
                                <input type="text" class="form-control" data-bv-field="youSend" id="deposit-amount"
                                    name="amount" placeholder="Enter Amount">
                                <div class="input-group-append"> <span class="input-group-text p-0">
                                        <select id="youSendCurrency" data-style="custom-select bg-transparent border-0"
                                            data-container="body" data-live-search="true"
                                            class="selectpicker form-control bg-transparent" required="">
                                            <optgroup label="Popular Currency">
                                                <option data-icon="currency-flag currency-flag-ngn mr-1"
                                                    data-subtext="Nigerian naira" value="">CHN</option>
                                            </optgroup>
                                            <option value="" data-divider="true">分隔符</option>
                                            <optgroup label="Other Currency">
                                                <option data-icon="currency-flag currency-flag-ngn mr-1"
                                                    data-subtext="Nigerian naira" value="">CHN</option>
                                            </optgroup>
                                        </select>
                                    </span> </div>
                            </div>
                            <small><b>最小金额 &#8358;1000</b></small>
                        </div>
                        <p class="text-muted mt-4">汇款收取的费用<span
                                class="float-right d-flex align-items-center"><del>100.00 CHN</del> <span
                                    class="bg-success text-1 text-white font-weight-500 rounded d-inline-block px-2 line-height-4 ml-2">免费</span></span>
                        </p>
                        <hr>
                        <p class="font-weight-500">你会存入<span class="text-3 float-right"
                                id="deposit-confirmation"></span>
                        </p>
                        <button id="payment-btn" class="btn btn-primary btn-block" disabled>继续</button>
                    </form>
                    <!-- Deposit Money Form end -->
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Content end -->

@include('layouts.partials.footer')

<script src="https://checkout.flutterwave.com/v3.js"></script>

@endsection
