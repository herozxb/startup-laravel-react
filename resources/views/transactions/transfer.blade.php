@extends('layouts.layout')
@section('header')
@include('layouts.partials.header')
@endsection

@section('title', '汇款')

@section('content')






    <link href="https://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-star-rating/4.0.2/css/star-rating.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-star-rating/4.0.2/js/star-rating.min.js"></script>

<!-- Secondary menu
  ============================================= -->
<div class="bg-white">
    <div class="container d-flex justify-content-center">
        <ul class="nav secondary-nav alternate">
            <li class="nav-item"> <a class="nav-link" href="{{ url('transactions/deposit') }}">存款</a></li>
            <li class="nav-item"> <a class="nav-link" href="{{ url('transactions/withdraw') }}">提现</a></li>
            <li class="nav-item"> <a class="nav-link active" href="{{ url('transactions/transfer') }}">汇款</a></li>
        </ul>
    </div>
</div>
<!-- Secondary menu end -->

<!-- Content
  ============================================= -->
<div id="content" class="py-4">
    <div class="container">
        <h2 class="font-weight-400 text-center mt-3">汇款</h2>
        <p class="text-4 text-center mb-4">在世界任何地方，发送汇款给任何人</p>
        <div class="row">
            <div class="col-md-8 col-lg-6 col-xl-5 mx-auto">
                <div class="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
                    <h3 class="text-5 font-weight-400 mb-3">交易细节</h3>
                    <!-- Send Money Form
            ============================================= -->
                    <form action="{{ url('transactions/confirmation') }}" method="post">
                        @csrf
                        <div class="form-group">
                            <label for="emailID">接收钱币账号：</label>
                            <input type="email" required value="" class="form-control flexdatalist"
                                data-bv-field="emailid" id="recipient-email" name="recipient_email" list="emails"
                                required placeholder="输入接收方的电子邮箱地址">
                            <datalist id="emails">
                                @foreach($users as $user)
                                <option value="{{ $user->email }}">{{ $user->email }}</option>
                                @endforeach
                            </datalist>
                        </div>
                        <div class="form-group">
                            <label for="youSend">发送总额：</label>
                            <div class="input-group">
                                <div class="input-group-prepend"> <span class="input-group-text">¥</span> </div>
                                <input type="number" min="1" max="{{ Auth::user()->wallet->balance }}" name="amount"
                                    class="form-control" data-bv-field="youSend" id="transfer-amount" value="1"
                                    placeholder="发送总额" step="1">
                                <div class="input-group-append"> <span class="input-group-text p-0">
                                        <select id="youSendCurrency" data-style="custom-select bg-transparent border-0"
                                            data-container="body" data-live-search="true"
                                            class="selectpicker form-control bg-transparent" required="">
                                            <optgroup label="Popular Currency">
                                                <option data-icon="currency-flag currency-flag-cny mr-1"
                                                    data-subtext="China" value="">人民币</option>
                                            </optgroup>
                                            <option value="" data-divider="true">divider</option>
                                            <optgroup label="Other Currency">
                                                <option data-icon="currency-flag currency-flag-cny mr-1"
                                                    data-subtext="China" value="">人民币</option>
                                            </optgroup>
                                        </select>
                                    </span> </div>
                            </div>
                            <small>最小发送额 ¥:1</small>
                        </div>
                        <div class="form-group">
                            <label for="youSend">汇款附加信息：</label>
                            <div class="input-group">
                                <textarea name="narration" class="form-control" placeholder="可选填此表格"></textarea>
                            </div>
                        </div>
                        <hr>
			<!-- honesty and ability rating stars -->
			<div class="container">
			    <h2>请评价对方的信誉和才能</h2>

			    <br/>
			    <label for="input-1" class="control-label">信誉数值（重要！信誉低于3星警告2次后，仍低于3星，不予提现）</label>
			    <input id="input_honesty" name="input_honesty" class="rating rating-loading" value="5" data-min="0" data-max="5" data-step="0.1" data-size="sm">

			    <br/>
			    <label for="input-1" ability="control-label">才能数值（没有星级别限制）</label>
			    <input id="input_ability" name="input_ability" class="rating rating-loading" value="5" data-min="0" data-max="5" data-step="0.1" data-size="sm">
			</div>


                        <button class="btn btn-primary btn-block" id="transfer-confirm-btn" disabled>继续交易</button>
                    </form>
                    <!-- Send Money Form end -->
                </div>

            </div>
        </div>
    </div>
</div>

<!-- Content end -->
<script>
$("#input-id").rating();
</script>





@include('layouts.partials.footer')

@endsection
