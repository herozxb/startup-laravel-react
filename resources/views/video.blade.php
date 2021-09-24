@extends('layouts.layout')
@section('title', "视频通话")
@section('content')


<!-- Scripts -->
<script src="{{ asset('js/app.js') }}" defer></script>

<!-- Fonts -->
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

<!-- Styles -->
<link href="{{ asset('css/app.css') }}" rel="stylesheet">



<!-- Content
  ============================================= -->
<div id="content" class="py-4">
    <div class="container">
        <div class="d-flex justify-content-center " >
            <!-- Middle Panel
        ============================================= -->
            <div class="col-lg-9">
                @if(Auth::check())
                <!--div class="info">
                   <a class="d-block">Hello World 3</a>
                   <a class="d-block">{{ Auth::user()->email }}</a>
                </div-->
                <div id="example" data-name="{{ Auth::user()->email }}" data-password="hero2009" ></div>
                @else
                <div id="example" data-name="None" data-password="None" ></div>
                @endif
                <!--div id="example"></div-->
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
