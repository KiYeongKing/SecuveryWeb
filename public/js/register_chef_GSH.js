function register_chef_value(){
    var formData = new FormData();
    formData.append("imageIden",$("input[name=imageIden]").value);
    formData.append("imageFace",$("input[name=imageFace]").value);
    if($("input[name=imageStore]")[0].files[0])
        formData.append("imageStore",$("input[name=imageStore]")[0].files[0]);
    if($("input[name=imageStore]")[1].files[0])
        formData.append("imageStore",$("input[name=imageStore]")[1].files[0]);
    if($("input[name=imageStore]")[2].files[0])
        formData.append("imageStore",$("input[name=imageStore]")[2].files[0]);
    if($("input[name=imageStore]")[3].files[0])
        formData.append("imageStore",$("input[name=imageStore]")[3].files[0]);
    console.log(formData.values());
    var sendData={};
    /*$.ajax({
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
                $('#pop-up-login').modal('toggle');
            }
        }
    });*/
}