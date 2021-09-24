@extends('layouts.layout')
@section('title', "个人信息")
@section('content')

<div id="content" class="py-4">
    <div class="container">
        <div class="row">

            @include('layouts.partials.sidebar')

            <!-- Middle Panel
        ============================================= -->
            <div class="col-lg-9">

                <!-- Personal Details
          ============================================= -->
                <div class="bg-light shadow-sm rounded p-4 mb-4">
                    <h3 class="text-5 font-weight-400 mb-3">个人信息</h3>
                    <div class="row">
                        <p class="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">姓名</p>
                        <p class="col-sm-9">{{ $user->first_name." ".$user->last_name }}</p>
                    </div>
                    <div class="row">
                        <p class="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">出生日期</p>
                        <p class="col-sm-9">{{ $user->dob }}</p>
                    </div>
                    <div class="row">
                        <p class="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">地址</p>
                        <p class="col-sm-9">{{ $user->address }}</p>
                    </div>
                </div>

                <!-- Personal Details End -->

                <div class="bg-light shadow-sm rounded p-4 mb-4">
                    <h3 class="text-5 font-weight-400 mb-3">联系方式</h3>
                    <div class="row">
                        <p class="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">电子邮件</p>
                        <p class="col-sm-9">{{ $user->email }}</p>
                    </div>
                    <div class="row">
                        <p class="col-sm-3 text-muted text-sm-right mb-0 mb-sm-3">手机</p>
                        <p class="col-sm-9">{{ $user->phone }}</p>
                    </div>

                </div>
                <!-- Email Addresses End -->

            </div>
            <!-- Middle Panel End -->

        </div>
    </div>
</div>
<!-- Content end -->

@include('layouts.partials.footer')

</div>
<!-- Document Wrapper end -->

<!-- Back to Top
============================================= -->

@endsection
