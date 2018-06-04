$(document).ready(function(){
var sendData=function(akcja,inputData){
$.ajax({
    url: "http://localhost:3000",
    data: { "akcja": akcja, "content":inputData },
    type: "POST",
    success: function (data) {
        //czytamy odesłane z serwera dane
        var obj = JSON.parse(data)

        console.log(obj)
        
switch (obj.action) {
    case "refreshUser":
    $('#sUsers').find('option').remove()
    for(var i=0;i<obj.users.length;i++)
        $('#sUsers').append($('<option>', {
            value: obj.users[i]._id,
            text: obj.users[i]._id
        }));

        $('#txOutput').val(JSON.stringify(obj.users));
        
        break;

    default:
    console.log("succes")
        break;
}

        //tu wypisz sumę w div-ie na stronie

    },
    error: function (xhr, status, error) {
        console.log(xhr);
    },
});
}
var startup={login:"",password:""}
sendData("refreshUser",startup);
$("#bAdd").on('click',function(){
    var doc;
    var login=$('#iLogin').val();
    var password=$('#iPassword').val();
    doc={login:login,password:password}
    sendData("addUser",doc);
    
})
$("#bRefresh").on('click',function(){
    var doc;
    var login=$('#iLogin').val();
    var password=$('#iPassword').val();
    doc={login:login,password:password}
    sendData("refreshUser",doc);
    
})
$("#bDelete").on('click',function(){
    var doc;
    var id=$('#sUsers').val()
    doc={"id":id}
    sendData("deleteUser",doc);
    
})
$("#bUpdate").on('click',function(){
    var doc;
    var id=$('#sUsers').val()
    var pass=$('#iPassword').val();
    doc={"password":pass,"id":id};
    sendData("updateUser",doc);
})
});