function logout(){
    var sendData={};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/member/Logout",
        data: sendData,
        success: function (data) {
            if (data === "clear") {
                location.reload();
            }
            else {
                alert("logout fail");
                /*$("#reconfirmtext").html("미 인증된 메일입니다. 인증 확인 후 로그인 해 주세요.");
                $("#reconfirmbutton").show();
                email=item.email;
                $('#mail_confirm').modal('toggle');
                $('#pop-up-login').modal('toggle');*/
            }
        }
    });
}