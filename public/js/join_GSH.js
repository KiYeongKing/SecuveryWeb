document.getElementById('lastname').onchange = function () {
    var lastnameExp=/^[가-힣]{1,30}|[a-zA-Z]{2,30}$/;
    if(!document.myform.lastname.value.match(lastnameExp)){
        document.myform.lastnameCheck.value="false";
    }
    else
    {
        document.myform.lastnameCheck.value="true";
    }
};
document.getElementById('firstname').onchange = function () {
    var firstnameExp=/^[가-힣]{1,30}|[a-zA-Z]{2,30}$/;
    if(!document.myform.firstname.value.match(firstnameExp)){
        document.myform.firstnameCheck.value="false";
    }
    else
    {
        document.myform.firstnameCheck.value="true";
    }
};
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
    if(!document.myform.password.value.match(document.myform.pw_confirm.value)){
        document.myform.pw_confirmCheck.value="false";
    }
    else
    {
        document.myform.pw_confirmCheck.value="true";
    }
};
document.getElementById('pw_confirm').onchange = function () {
    if(!document.myform.password.value.match(document.myform.pw_confirm.value)){
        document.myform.pw_confirmCheck.value="false";
    }
    else
    {
        document.myform.pw_confirmCheck.value="true";
    }
};
function submitseller(item){
    var sendData = {lastname: item.lastname.value, firstname: item.firstname.value, email: item.email.value, password: item.password.value};
    if(!document.myform.pw_confirmCheck.value.match("true")||!document.myform.passwordCheck.value.match("true")
        ||!document.myform.emailCheck.value.match("true")||!document.myform.firstnameCheck.value.match("true")
        ||!document.myform.lastnameCheck.value.match("true")){alert("양식채워주세요");return false;}

    $.ajax({
        method: "POST",
        type: "POST",
        url: "/member/Join",
        data: sendData,
        success: function (data) {
            if (data === "clear") {
                $("#email_auth").modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }
            else {
                alert(data);
                return false;
            }
        }
    });
}