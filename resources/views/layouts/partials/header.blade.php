<!-- Header
  ============================================= -->
<header id="header">
    <link rel="stylesheet" href="{{ asset('css/all.css') }}">
    <div class="container">
        <div class="header-row">
            <div class="header-column justify-content-start">
                <!-- Logo
          ============================= -->
                <div class="logo"> <a class="d-flex" href="{{ url('/') }}" title="天赋网"><img
                            src="{{ asset('images/Photo.jpg') }}" alt="Payyed" style="height:50px"/></a> </div>
                <div>hello 1</div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.1.2/socket.io.min.js"></script>
                <script>
                    console.log("===socket===");
                
                    var socket = io('https://120.53.220.237:5002');
                    socket.on("getUsers", (users) => {
                      console.log("===all_user_in_laravel===");
                      console.log(users); 
                      document.getElementById("greeting").innerHTML = users;
                    });

                    
                </script>


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
                            <li class="active"><a style="font-size:200%" class="d-flex" href="{{ url('/') }}" title="Payyed - HTML Template">主页</a> </li>
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
                        
                            <div class="d-flex align-items-center mr-2">
                                <span style="font-size: 30px; color: orange;">
                                  <i class="fas fa-bell" data-toggle="modal" data-target="#exampleModal"></i>
                                </span>
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body" >
                                    ...
                                    <p id="greeting">bonjour</p>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                        
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
                        
                            <div class="d-flex align-items-center mr-2">
                                <span style="font-size: 30px; color: orange;">
                                  <i class="fas fa-bell" data-toggle="modal" data-target="#exampleModal"></i>
                                </span>  
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    ...
                                    <p id="greeting">bonjour</p>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                        
                        <li class="align-items-center h-auto ml-sm-3 mr-2"><a class="btn btn-outline-primary shadow-none  d-sm-block" href="{{ route('register') }}">注册</a> </li>
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
