    var modal = document.getElementById('profile');
 
    // 鼠标点击模型外区域关闭登录框
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    
    $('#submitbutton').click(function(){
        // alert(123)
        //var curpassword = $('#curpassword').val();
        var changepassword = $('#changepassword').val();
        var repeatpassword = $('#repeatpassword').val();
        var nickname = $('#profile-nickname').val();
        if(changepassword!=repeatpassword){
            alert("更改密码与重复密码不同");
            document.getElementById('changepassword').value='';
            document.getElementById('repeatpassword').value='';
            return;
        } 
        $.ajax({
            url:'http://60.205.211.19:1024/user/login',
            type:'POST',
            data:{
                nickname:nickname,
                password:curpassword,
                changepassword:changepassword,
            },
            headers:{
                Authorization:sessionStorage.getItem('token')
            },
            xhrFields:{
                withCredentials:true
            },
            success:function(res){ 
                if(res.code == 200){
                    alert('update successfully')
                    alert(res.data)
                    sessionStorage.setItem('token',res.data);
                }else{
                    alert('update fail:' + res.message)
                }
            }
        })
    })
    $('#logout-display').click(function(){
        $('#user-infor').hide();
        $('#logout-display').hide();
        $('#creat-listt').hide();
        $('#login-display').show();
        $('#register-display').show()
    })  
    $('#register').click(function()
    {
        var phone = $('#phone').val()
        var nickname = $('#nickname').val()
        var password = $('#password').val()
        //alert(123);
        $.ajax({
            url:'http://60.205.211.19:1024/user/register',
            type:'POST',
            data:{
                phone:phone,
                nickname:nickname,
                password:password
            },
            success:function(res){
                if(res.code == 200){
                    $('#bg-register').hide();
                    alert('register successfully')
                }else
                {
                    alert('register fail:' + res.message)
                }
            }
        })
    })
    $('#login').click(function()
    {
        var account = $('#loginaccount').val()
        // tmpaccount = account;
        sessionStorage.setItem('account',account);
        var password = $('#loginpassword').val()
        $.ajax({
            url:'http://60.205.211.19:1024/user/login',
            type:'POST',
            data:{
                phone:account,
                password:password,
            },
            headers:{
                Authorization:sessionStorage.getItem('token')
            },
            xhrFields:{
                withCredentials:true
            },
            success:function(res){ 
                if(res.code == 200){
                    alert('login successfully')
                    sessionStorage.setItem('token',res.data);
                    location.reload();
                    $('#user-infor').show();
                    $('#creat-list').show();
                    $('#logout-display').show();
                    $('#login-display').hide();
                    $('#register-display').hide()
                }else{
                    alert('login fail:' + res.message)
                }
            }
        })
    })
    
    $('#logout-display').click(function()
    {
        $.ajax({
            url:'http://60.205.211.19:1024/user/logout',
            type:'GET',
            data:{
            },
            headers:{
                Authorization:sessionStorage.getItem('token')
            },
            xhrFields:{
                withCredentials:true
            },
            success:function(res){ 
                if(res.code == 200){
                    alert('logout successfully')
                    sessionStorage.removeItem('account');
                    sessionStorage.setItem('token',res.data);
                    location.reload();
                    window.location.href="./index.html";
                }else{
                    alert('logout fail:' + res.message)
                }
            }
        })
    })
    
    // 获取模型
    var modal = document.getElementById('profile');
    
    // 鼠标点击模型外区域关闭登录框
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    $('#profilesubmitbutton').click(function()
    {
            // alert(123)
            var changepassword = $('#changepassword').val();
            var repeatpassword = $('#repeatpassword').val();
            var nickname = $('#profile-nickname').val();
            if(changepassword!=repeatpassword){
                alert("更改密码与重复密码不同");
                document.getElementById('changepassword').value='';
                document.getElementById('repeatpassword').value='';
                return;
            } 
            $.ajax({
                url:'http://60.205.211.19:1024/user/profile',
                type:'POST',
                data:{
                    nickname:nickname,
                    password:changepassword,
                },
                headers:{
                    Authorization:sessionStorage.getItem('token')
                },
                xhrFields:{
                    withCredentials:true
                },
                success:function(res){ 
                    if(res.code == 200){
                        alert('update successfully')
                        //alert(res.data)
                        sessionStorage.setItem('token',res.data);
                        window.location.href="./index.html"
                    }else{
                        alert('update fail:' + res.message);
                    }
                }
            })
    })
    
    getstatus();
    function getstatus()
    {
        $.ajax({
            url:'http://60.205.211.19:1024/user/loginInfo',
            type:'GET',
            data:{
            },
            headers:{
                Authorization:sessionStorage.getItem('token')
            },
            xhrFields:{
                withCredentials:true
            },
            success:function(res){ 
                if(res.code == 200){
                    $('#user-infor').show();
                    $('#login-display').hide();
                    $('#register-display').hide();
                    $('#logout-display').show();
                    $('#my-list').show();
                    $('#creat-list').show();
                    document.getElementById('username').innerText = res.data;
                    document.getElementById('profile-nickname').value = res.data;

                    var tmp = document.getElementById("temp");
                    if(!tmp.childElementCount) show_list();
                        
                }else{
                    $('#user-infor').hide();
                    $('#logout-display').hide();
                    $('#login-display').show();
                    $('#register-display').show();
                    $('#my-list').hide();
                    $('#creat-list').hide();
                }
            }
        });
    }
    function show_list()
    {
        $.ajax({
            url:'http://60.205.211.19:1024/bill/getList',
            type:'GET',
            xhrFields:{
                withCredentials:true
            },
            headers:{
                Authorization:sessionStorage.getItem('token')
            },
            success:function(res){
                if(res.code == 200)
                {
                    var tmp = document.getElementById("temp");
                    var len = res.data.length;
                    for(var i = 0;i < len;i++)
                    {
                        var nmp = res.data[i];
                        var newobj = document.createElement("a");
                        var newobj2 = document.createElement("dd");
                        newobj.innerText = nmp.name;
                        newobj.setAttribute('href','./题单管理.html?id=' + nmp.id);
                        newobj2.appendChild(newobj);
                        tmp.appendChild(newobj2);
                    }
                }
                else alert(res.message)
            }
        })
    }