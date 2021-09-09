@extends('layouts.layout')
@section('title', "Welcome")
@section('content')


    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">



    <link rel="stylesheet" type="text/css" href="{{ asset('css/semantic.min.css') }}">
    <script src="{{ asset('js/semantic.min.js') }}"></script>
<!-- Content
  ============================================= -->
<!--div id="MenuBar"></div-->


    

@if(Auth::check())
<!--div class="info">
   <a class="d-block">Hello World 3</a>
   <a class="d-block">{{ Auth::user()->email }}</a>
</div-->
<div id="HomePage" data-name="{{ Auth::user()->email }}" data-password="hero2009" data-honesty="{{ Auth::user()->honesty_with_money }}" data-ability="{{ Auth::user()->ability_with_money }}" data-money="{{ Auth::user()->total_money }}" ></div>
@else
<div id="HomePage" data-name="None" data-password="None" ></div>
@endif

<!-- Content end -->
@include('layouts.partials.footer')

</div>
<!-- Document Wrapper end -->

<!-- Back to Top
============================================= -->

@endsection
