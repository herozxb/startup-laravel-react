@extends('layouts.layout')
@section('title', '编辑个人信息')

@section('content')

<!-- Secondary Menu
  ============================================= -->
<div class="bg-primary">
    <div class="container d-flex justify-content-center">
        <ul class="nav secondary-nav">
            <li class="nav-item"> <a class="nav-link active"
                    href="{{ url('profile/edit-profile/'.$user->uuid) }}">账户</a></li>
            <li class="nav-item"> <a class="nav-link" href="{{ url('bank-accounts') }}">银行账户</a></li>
        </ul>
    </div>
</div>
<!-- Secondary Menu end -->

<!-- Content
  ============================================= -->
<div id="content" class="py-4">
    <div class="container">
        <div class="row">

            @include('layouts.partials.sidebar')

            <!-- Middle Panel
        ============================================= -->
            <div class="col-lg-9">
                @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
                @endif
                @if (session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
                @endif
                <form action="{{ url('profile/edit-profile/'.$user->uuid) }}" method="POST">
                    @csrf
                    @method('put')
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label for="firstName">名</label>
                                <input type="text" value="{{ $user->first_name }}" class="form-control"
                                    data-bv-field="firstName" name="first_name" id="firstName" required
                                    placeholder="First Name">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label for="fullName">姓</label>
                                <input type="text" value="{{ $user->last_name }}" class="form-control"
                                    data-bv-field="fullName" name="last_name" id="fullName" required
                                    placeholder="Last Name">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label for="fullName">电子邮件Email</label>
                                <input type="email" value="{{ $user->email }}" class="form-control"
                                    data-bv-field="Email" name="email" id="Email" required placeholder="Email Address">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label for="fullName">手机</label>
                                <input type="text" value="{{ $user->phone }}" class="form-control"
                                    data-bv-field="phoneNumber" name="phone" id="phoneNumber" required
                                    placeholder="Phone Number">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label for="birthDate">生日</label>
                                <div class="position-relative">
                                    <input id="birthDate" value="{{ $user->dob }}" name="dob" type="date"
                                        max="{{ date('Y-m-d') }}" class="form-control" required
                                        placeholder="Date of Birth">
                                    <span class="icon-inside"><i class="fas fa-calendar-alt"></i></span> </div>
                            </div>
                        </div>
                        <div class="col-12">
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label for="address">地址</label>
                                <textarea class="form-control" placeholder="Your Address"
                                    name="address">{{ $user->address }}</textarea>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block mt-2" type="submit">保存更改</button>
                </form>


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
