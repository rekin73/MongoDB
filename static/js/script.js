$(document).ready(function(){
var sendData=function(akcja,inputData){
$.ajax({
    url: "http://localhost:3000",
    data: { akcja: akcja, login:inputData.login,password:inputData.password },
    type: "POST",
    success: function (data) {
        //czytamy odesłane z serwera dane
        var obj = JSON.parse(data)

        console.log(obj)

        //tu wypisz sumę w div-ie na stronie

    },
    error: function (xhr, status, error) {
        console.log(xhr);
    },
});
}
$("#bAdd").on('click',function(){
    var doc;
    login=$('#iLogin').val();
    password=$('#iPassword').val();
    doc={login:login,password:password}
    sendData("addUser",doc);
    
})
});