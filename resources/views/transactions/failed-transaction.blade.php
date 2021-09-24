@extends('layouts.layout')

@section('title', '成功存款')

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
        <div class="row">
            <div class="col-md-8 col-lg-6 col-xl-5 mx-auto">

                <!-- Deposit Money Success
          ============================================= -->
                <div class="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">
                    <div class="text-center my-5">
                        <p class="text-center text-danger text-20 line-height-07"><i class="fas fa-times-circle"></i>
                        </p>
                        <p class="text-center text-danger text-8 line-height-07">错误!</p>
                        <p class="text-center text-4">存入钱包成功.</p>
                    </div>
                    <p class="text-center text-3 mb-4">钱包存入<span
                            class="text-4 font-weight-500">&#8358;{{ number_format($amount, 2) }}</span>
                        失败.</p>
                    <a class="btn btn-primary btn-block" href='{{ url('transactions/deposit') }}'>继续存款</a>
                    <button class="btn btn-link btn-block"><i class="fas fa-print"></i> 打印</button>
                </div>
                <!-- Request Money Success end -->
            </div>
        </div>
    </div>
</div>
<!-- Content end -->
@endsection
