document.getElementById('email').onchange = function () {
    var emailExp=/^[a-zA-Z0-9.!#$%&'+\\/=?^_'{|}+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!document.myform.email.value.match(emailExp)){
        document.myform.emailCheck.value="false";
    }
    else
    {
        document.myform.emailCheck.value="true";
    }
};
document.getElementById('password').onchange = function () {
    var passwordExp=/^(?=.*[a-zA-Z])(?=.*[!@#$%])(?=.*[0-9]).{6,15}/;
    if(!document.myform.password.value.match(passwordExp)){
        document.myform.passwordCheck.value="false";
    }
    else
    {
        document.myform.passwordCheck.value="true";
    }
};
function login(item){
    var sendData = {email: item.email.value, password: item.password.value};
    if(!document.myform.passwordCheck.value.match("true")||!document.myform.emailCheck.value.match("true"))
    {
        alert("양식채워주세요");
        return false;
    }

    $.ajax({
        method: "POST",
        type: "POST",
        url: "/member/Login",
        data: sendData,
        success: function (data) {
            if (data === "clear") {
                location.replace('/');
            }
            else if(data==="이메일 에러"||data==="패스워드 에러"||data==="타사연동으로 가입된 회원입니다. 아래 버튼을 이용해서 로그인해주세요")
            {
                alert(data);
                //$("#loginfail").html(data);
                //$("#loginfail").css("color", "red");
            }
            else {
                alert("미 인증된 메일입니다. 인증 확인 후 로그인 해 주세요.");
                /*$("#reconfirmtext").html("미 인증된 메일입니다. 인증 확인 후 로그인 해 주세요.");
                $("#reconfirmbutton").show();
                email=item.email;
                $('#mail_confirm').modal('toggle');
                $('#pop-up-login').modal('toggle');*/
            }
        }
    });
}