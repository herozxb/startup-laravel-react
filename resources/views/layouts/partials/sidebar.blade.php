<!-- Left Panel
        ============================================= -->
<aside class="col-lg-3">

    <!-- Profile Details
          =============================== -->
    <div class="bg-light shadow-sm rounded text-center p-3 mb-4">
        <div class="profile-thumb mt-3 mb-4"> <img class="rounded-circle" src="{{ asset('images/profile-thumb.jpg') }}"
                alt="">
        </div>
        <p class="text-3 font-weight-500 mb-2">你好, {{ Auth::user()->first_name }}</p>
    </div>
    <!-- Profile Details End -->

    <!-- Available Balance
          =============================== -->
    <div class="bg-light shadow-sm rounded text-center p-3 mb-4">
        <div class="text-17 text-light my-3"><i class="fas fa-wallet"></i></div>
        <h3 class="text-9 font-weight-400">¥:{{ number_format(Auth::user()->wallet->balance, 2) }}
        </h3>
        <p class="mb-2 text-muted opacity-8">拥有金额</p>
        <hr class="mx-n3">
        <div class="d-flex"><a href="{{ url('transactions/withdraw') }}" class="btn-link mr-auto">提现</a> <a
                href="{{ url('transactions/deposit') }}" class="btn-link ml-auto">存款</a></div>
    </div>
    <!-- Available Balance End -->

    <!-- Need Help?
          =============================== -->
    <div class="bg-light shadow-sm rounded text-center p-3 mb-4">
        <div class="text-17 text-light my-3"><i class="fas fa-comments"></i></div>
        <h3 class="text-3 font-weight-400 my-4">出现问题，需要帮助?</h3>
        <p class="text-muted opacity-8 mb-4">对你的账户有疑问？<br>
            我们工作人员可以帮助你来解答!.</p>
        <a href="mailto:olusolaojewunmi@gmail.com" class="btn btn-primary btn-block">联系我们</a>
    </div>
    <!-- Need Help? End -->

</aside>
<!-- Left Panel End -->
