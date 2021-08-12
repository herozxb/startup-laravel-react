<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body>
    <table width="600" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr>
        </tr>
        <tr>
            <td align="center" valign="top" bgcolor="#f1f69d"
                style="background-color:#f1f69d; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#000000; padding:10px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
                    <tr>
                        <td align="left" valign="top"
                            style="font-family:Arial, Helvetica, sans-serif; font-size:13px; color:#525252;">
                            <div
                                style="font-family:Georgia, 'Times New Roman', Times, serif; font-size:56px; color:#000000;">
                                新的入款金币的交易<span style="color:#478730;">*</span></div>
                            <div><br>
                                一次新的金币交易入款事件，在你的账户中已经完成。请你查看以下的的交易信息细节。</div>
                            <p>总额: {{ $data->amount }}</p>
                            <p>发送方: {{ Auth::user()->first_name." ".Auth::user()->last_name }}</p>
                            <p>信息描述: <br>{{ $data->narration }}</p>
                            <p>日期和时间: {{ date('Y-m-d H:i:s') }}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="left" valign="top" bgcolor="#478730" style="background-color:#478730;">
                <table width="100%" border="0" cellspacing="0" cellpadding="15">
                    <tr>
                        <td align="left" valign="top"
                            style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:13px;">公司地址：北京房山区凯旋大街<br>
                            联系人员：张喜博<br>
                            联系手机: 13521259871<br>
                            Email 邮件地址: <a href="mailto:name@yourcompanyname.com"
                                style="color:#ffffff; text-decoration:none;">54690707@qq.com </a><br>
                            Website 公司网站: <a href="http://www.yourcompanyname.com" target="_blank"
                                style="color:#ffffff; text-decoration:none;">www.xhappysearch.com</a></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
