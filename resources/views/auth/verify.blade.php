@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('确认你的电子邮箱Email地址') }}</div>

                <div class="card-body">
                    @if (session('resent'))
                        <div class="alert alert-success" role="alert">
                            {{ __('一个新的确认链接地址已经发送到你的电子邮箱Email里') }}
                        </div>
                    @endif

                    {{ __('在你继续进入网站前，请查看你的邮箱，确认网站发送给你的确认链接.') }}
                    {{ __('如果你没有接收到确认的链接') }},
                    <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                        @csrf
                        <button type="submit" class="btn btn-link p-0 m-0 align-baseline">{{ __('点击这里，重新发送给你一个新的确认链接到你的邮箱') }}</button>.
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
