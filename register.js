$(function(){
    var $username = $('#username'),
        $pwd = $('#pwd'),
        $phonenumber = $('#phonenumber'),
        $register = $('#register'),
        $yanzheng = $('#yanzheng'),
        $yanzhengbutton = $('#yanzheng-button');
        $yan = $('#yan');
        $a = $('#a');
        $b = $('#b');
        $dui = $('.dui');
        num = 9;
        $eye = $('#eye');
    $username.focusout(function(){
        $a.css("display","none");
        if(!validate('#username')){
            $username.css("border-color","red");
        }
        else{
            $username.css("border-color","");
        }
        
    });
    $username.focus(function(){
        $("#username-validate").html("");
        $username.css("border-color","");
        $a.css("display","block")
    })
    $phonenumber.focusout(function(){
        if(!validate('#phonenumber')){
            $phonenumber.css("border-color","red");
        }
        else{
            $phonenumber.css("border-color","");
        }
    })
    $phonenumber.focus(function(){
        $("#phonenumber-validate").html("");
        $phonenumber.css("border-color","");
    })
    $pwd.focusout(function(){
        $b.css("display","none");
        if(!validate('#pwd')){
            $pwd.css("border-color","red");
        }
        else{
            $pwd.css("border-color","");
        }
        
    })
    $pwd.focus(function(){
        console.log('gaibian')
        $("#pwd-validate").html("");
        $b.css("display","block");
    })
    $eye.mouseover(function () { 
        $eye.attr('src','http://images.669pic.com/element_pic/60/72/0/35/a33f8f40e6c8d09a7823da05de4d9752.jpg');
        $pwd.attr('type','text');
    });
    $eye.mouseleave(function () { 
        $eye.attr('src','http://bpic.588ku.com/element_origin_min_pic/01/50/72/255745604e0498c.jpg');
        $pwd.attr('type','password');
    });
    //获取验证码
    $yanzhengbutton.click(function(){
        if($phonenumber.val() == ''){
            $('#phonenumber-validate').html('请您输入手机号')
        }
        if(!(validate('#username') && validate('#phonenumber') && validate('#pwd')) || $username.val() == '' || $phonenumber.val() == '' || $pwd.val() == ''){
            setTimeout(function(){
                $('#yanzheng-validate').html('请求超时，请稍后再试')
            },10000)
        }
        else{
            $('#yanzheng-validate').html('');
            var timer = setInterval(function(){
                num--;
                if(num === 0){
                    clearInterval(timer);
                    $yanzhengbutton.val('发送验证码');
                    $yanzhengbutton.attr("disabled",false);
                }else{
                    $yanzhengbutton.attr("disabled",true);
                    $yanzhengbutton.val('正在发送（'+num+'s）');
                }
            },1000)
            console.log("发送验证码成功");
        }
    })
    //表单验证
    $register.click(function(){
        if(validate('#username') && $username != '' && validate('#phonenumber') && $phonenumber != '' && validate('#pwd') && $pwd != '' && $dui.is(":checked") && $yanzheng.val() != ''){
            $register.css("opacity","1");
            $register.attr("disabled",false);
            console.log('提交成功');
            clearInterval(listener);
        }else{
            alert('提交未成功，请重新输入信息');
        }
    })
    //字段验证
    function validate(field){
        var $data = $(field),
            $msg = $(field + '-validate');
        if(field == '#username'){
            var rz=$data.val().replace(/[\u4e00-\u9fa5]/g,"bv");
            console.log(rz.length);
            // 输入的值如果是中文则替换成两个字符赋予给rz
            var re=/[^\w\u4e00-\u9fa5]|^\d+$/g;
            // 非中英文和下划线或纯数字
            if(rz.length>14){
                $msg.html('用户名仅支持中英文、数字和下划线,且不能为纯数字');
                return false;
            }
            if(re.test($data.val())){
                $msg.html('用户名仅支持中英文、数字和下划线,且不能为纯数字');
                return false;
            }
            else{
                $msg.html('');
                return true;
            }
        }
        if(field == '#pwd'){
            // 长度为8~14个字符
            // 字母/数字以及标点符号至少包含2种
            // 不允许有空格、中文
            var rb = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,14}$/g;
            if(!rb.test($data.val())){
                console.log($data.val().length)
                $msg.html('密码设置不符合要求');
                return false;
            }else{
                $msg.html('');
                return true;
            }
        }
        if(field == '#phonenumber'){
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test($data.val()) && $data.val() != '') {
                $msg.html('手机号码格式不正确');
                return false;
            } 
            else{
                $msg.html('');
                return true;
            }
            
        }
    }
    //监听和表单验证
    function listening(){
        if($username.val() != '' && $phonenumber.val() != '' && $pwd.val() != '' && $dui.is(":checked") && $yanzheng.val() != ''){
            $register.css("opacity","1");
            $register.attr("disabled",false);
            console.log('可以提交')
        }
        else{
            $register.css("opacity","0.7");
            $register.attr("disabled",true);
            console.log('数据不全，不能提交');
        }
    }
    var listener = setInterval(listening,1000);
})