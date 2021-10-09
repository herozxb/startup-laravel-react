<!-- Header
  ============================================= -->
<header id="header">
    <div class="container">
        <div class="header-row">
            <div class="header-column justify-content-start">
                <!-- Logo
          ============================= -->
                <div class="logo"> <a class="d-flex" href="{{ url('/') }}" title="天赋网"><img
                            src="{{ asset('images/Photo.jpg') }}" alt="天赋网" style="height:50px"/></a> </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.1.2/socket.io.min.js"></script>


                <!--div class="logo"> <a class="d-flex" href="{{ url('/') }}" title="Payyed - HTML Template">主页</a> </div-->
                <!-- Logo end -->

                <!-- Collapse Button
          ============================== -->
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#header-nav">
                    <span></span> <span></span> <span></span> </button>
                <!-- Collapse Button end -->

                @auth
                <!-- Primary Navigation
          ============================== -->
                <nav class="primary-menu navbar navbar-expand-lg">
                    <div id="header-nav" class="collapse navbar-collapse">
                        <ul class="navbar-nav mr-auto">
                            <li class="active"><a style="font-size:200%" class="d-flex" href="{{ url('/') }}" title="天赋网">主页</a> </li>
                            <li><a style="font-size:120%" href="{{ url('profile/'.Auth::user()->uuid) }}">个人主页</a></li>
                            <li><a style="font-size:120%" href="{{ url('video') }}">视频聊天</a></li>
                            <li><a style="font-size:120%" href="{{ url('dashboard') }}">数据面板</a></li>
                            <li><a style="font-size:120%" href="{{ url('transactions/') }}">转账记录</a></li>
                            <li><a style="font-size:120%" href="{{ url('transactions/transfer') }}">发送钱币</a></li>
                        </ul>
                    </div>
                </nav>
                <!-- Primary Navigation end -->
            </div>
            <div class="header-column justify-content-end">
                <nav class="login-signup navbar navbar-expand">
                    <ul class="navbar-nav">
                        <li class="align-items-center h-auto ml-sm-3 float-right"><button
                                class="btn btn-outline-primary shadow-none d-sm-block" Onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">退出账户</button></li>
                    </ul>

                </nav>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
            </div>

            @else



            <div class="header-column justify-content-end">

                <!-- Login & Signup Link
          ============================== -->
                <nav class="login-signup navbar navbar-expand">
                    <ul class="navbar-nav">

                        <li class="align-items-center h-auto ml-sm-3"><a class="btn btn-outline-primary shadow-none  d-sm-block" href="{{ route('register') }}">注册</a> </li>
                        <li class="align-items-center h-auto ml-sm-3"><a
                                class="btn btn-outline-primary shadow-none d-sm-block"
                                href="{{ route('login') }}">登入</a></li>
                    </ul>
                </nav>
                <!-- Login & Signup Link end -->
            </div>

            @endauth
        </div>
    </div>
</header>
<!-- Header End -->
