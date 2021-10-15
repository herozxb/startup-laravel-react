<!-- Header
  ============================================= -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

/* CSS used here will be applied after bootstrap.css */
.badge-notify{
   background:red;
   position:relative;
   top: -20px;
   left: -35px;
}


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
                        socketID=[]
                        for(var i =0; i < users.length; i++) {
                            socketID.push(users[i].socketId);

                        }

                        var myArray = [
                            {'name':'Michael', 'age':'30', 'birthdate':'11/10/1989'},
                            {'name':'Mila', 'age':'32', 'birthdate':'10/1/1989'},
                            {'name':'Paul', 'age':'29', 'birthdate':'10/14/1990'},
                            {'name':'Dennis', 'age':'25', 'birthdate':'11/29/1993'},
                            {'name':'Tim', 'age':'27', 'birthdate':'3/12/1991'},
                            {'name':'Erik', 'age':'24', 'birthdate':'10/31/1995'},
                        ]
                        
                        buildTable(myArray)

                        function buildTable(data){
                            var table = document.getElementById('myTable')

                            for (var i = 0; i < data.length; i++){
                                var row = `<tr>
                                                <td>${data[i].name}</td>
                                                <td>${data[i].age}</td>
                                                <td>${data[i].birthdate}</td>
                                          </tr>`
                                table.innerHTML += row


                            }
                        }

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
                                    <span class="fa-layers fa-fw" style="background:MistyRose">
                                        <i class="fas fa-bell" data-toggle="modal" data-target="#exampleModal"></i>
                                        <span class="fa-layers-counter" style="background:Tomato">1,419</span>
                                    </span>`
                                </span>
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">站内消息提示</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body" >
                                    <table class="table table-striped">
                                        <tr  class="bg-info">
                                            <th>Name</th>
                                            <th>Age</th>
                                            <th>Birthday</th>
                                        </tr>
                                        <a class="btn-link stretched-link" href="/video">
                                            <tbody id="myTable">
                                            </tbody>
                                        </a>
                                    </table>

                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
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
                                    <h5 class="modal-title" id="exampleModalLabel">站内消息提示</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    <table class="table table-striped">
                                        <tr  class="bg-info">
                                            <th>Name</th>
                                            <th>Age</th>
                                            <th>Birthday</th>
                                        </tr>
                                        <a class="btn-link stretched-link" href="/video">
                                            <tbody id="myTable">
                                            </tbody>
                                        </a>
                                    </table>
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
