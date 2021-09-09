@extends('layouts.layout')

@section('title', 'Confirm Transfer')

@section('content')

<!-- Content
  ============================================= -->
<div id="content" class="py-4">
    <div class="container">
        <h2 class="font-weight-400 text-center mt-3">确认转移钱币</h2>
        <p class="text-4 text-center mb-4"><span class="font-weight-500">请认真检查要汇款的对方信息</span>
        </p>
        <div class="row">
            <div class="col-md-8 col-lg-6 col-xl-5 mx-auto">
                <div class="bg-light shadow-sm rounded p-3 p-sm-4 mb-4">

                    <!-- Send Money Confirm
            ============================================= -->
                    <form>
                        @csrf
                        <div class="form-group">
                            <label for="description">接收方</label>
                            <input readonly class="form-control" type="text"
                                value="{{ $recipient->first_name." ".$recipient->last_name }}" id="recipient">
                            <input id="recipient_uuid" type="hidden" name="recipient_uuid"
                                value="{{ $recipient->uuid }}" />
                        </div>
                        <div class="form-group">
                            <label for="description">金额</label>
                            <input readonly class="form-control" id="amount" type="text" name="amount"
                                value="{{ $transaction->amount }}" />
                        </div>
                        <div class="form-group">
                            <label for="description">附加信息</label>
                            <textarea readonly class="form-control" name="narration"
                                id="narration">{{ $transaction->narration }}</textarea>
                        </div>

                        <div class="form-group">
                            <label for="description">信誉</label>
                            <input readonly class="form-control" id="honesty" type="text" name="honesty"
                                value="{{ $transaction->input_honesty }}" />
                        </div>

                        <div class="form-group">
                            <label for="description">能力</label>
                            <input readonly class="form-control" id="ability" type="text" name="ability"
                                value="{{ $transaction->input_ability }}" />
                        </div>

                        <hr>
                        <a class="btn btn-secondary btn-block" href="{{ url()->previous() }}">返回</a>
                        <button class="btn btn-primary btn-block" id="confirm-transfer-btn">发送钱币</button>
                    </form>
                    <!-- Send Money Confirm end -->
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Content end -->

@include('layouts.partials.footer')

@endsection
