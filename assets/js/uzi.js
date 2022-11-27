$(document).ready(function(){

    UIkit.accordion('#extras');

    generateDefaultString();

    $('#btngenerate').on('click',function(){

       initGeneration();

    });

    $('#btnreverse').on('click',reverseString);

    $('#txtraw').on('keyup',function(){

        handleLengthValue();
       
        generateGivenString($(this).val());
        
    });

    $('.copy-btn').on('click',function(){

        var target=$(this).attr('data-target');

        var message=$(this).attr('data-message');

        copyToClipboard(target,message);

    });

    $('#btnclear').on('click',function(){

        generateDefaultString();

    });

});

$(document).on('change','#txtraw',function(){
    generateGivenString("");
});

$(document).on('keyup','#txtraw',function(){
    generateGivenString("");
});

$(document).on('change','#txtlength',function(){
    initGeneration();
});

$(document).on('keyup','#txtlength',function(){
    initGeneration();
});

$(document).on('change','#selcodex',function(){
    initGeneration();
});

function initGeneration(){

    var codex=$('#selcodex').val();

    var length=parseInt($('#txtlength').val());

    if(typeof(length)!=="number"){
        length=1;
    }//
    if(length>32){length=32;}//
    if(length<1){length=1;}//
    
    $('#txtlength').val(length);

    generateRandomString(length,codex);

    showFullString();

};

function reverseString(){

    var rawString=$('#txtraw').val();

    var reverseString=rawString.split("").reverse().join("");

    $('#txtraw').val(reverseString);

    generateGivenString(rawString);

};

function handleLengthValue(){

    var rawLength=parseInt($('#txtraw').val().length);

    if(rawLength<1){rawLength=1;}//
    if(rawLength>32){rawLength=32;}//

    $('#txtlength').val(rawLength);

}//

function generateDefaultString(){

    $("#selcodex").val("all").change();

    $("#txtlength").val(3);

    $("#txtraw").val('uzi').change();

    convertToMD5('uzi');

    convertToBase64('uzi');

    convertToSHA1('uzi');

    showFullString();

};

function showFullString(){

    $('#spfull').html($("#txtraw").val());

};


function getCodexString(codex){

    codeBase="uzi";

    if(codex=="all"){

        codeBase="abcdefghijklmnopqrstuvwxyz";
        codeBase+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        codeBase+="0123456789";
        codeBase+="~!@#$%^&*()_+-={}[]:;,.?";

    }//

    if(codex=="unamb"){

        codeBase="abcdefghjkmnpqrstuvwxyz";
        codeBase+="ABCDEFGHJKMNPQRSTUVWXYZ";
        codeBase+="23456789";
        codeBase+="~!@#$%^&*()_+-={}[]:;,.?";

    }//

    if(codex=="letters"){

        codeBase="abcdefghjkmnpqrstuvwxyz";
        codeBase+="ABCDEFGHJKMNPQRSTUVWXYZ";

    }//

    if(codex=="lowcase"){

        codeBase="abcdefghijklmnopqrstuvwxyz";

    }//

    if(codex=="upcase"){

        codeBase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    }//

    if(codex=="numer"){

        codeBase="0123456789";

    }//

    if(codex=="symbols"){

        codeBase+="~!@#$%^&*()_+-={}[]:;,.?";

    }//

    if(codex=="alphanumeric"){

        codeBase="1234567890";

        codeBase+=getCodexString('lowcase');

        codeBase+=getCodexString('upcase');

    }//

    if(codex=="hexadecimal"){

        codeBase="123456789ABCDEF";

    }//

    if(codex=="octal"){

        codeBase="01234567";

    }//

    return codeBase;

};

function generateRandomString(length,codex){

    length=parseInt(length);

    var codeBase=getCodexString(codex);

    var baseLength=codeBase.length;

    var generatedString="";

    if(length>0 && length<=32){

        for(var x=1; x<=length; x++){

            var index=Math.floor(Math.random() * baseLength) + 1;

            generatedString+=codeBase.charAt(index);

        }//

    }//

    else{

        generatedString="incorrect length.";

    }//

    $('#txtraw').val(generatedString);

    convertToMD5(generatedString);

    convertToSHA1(generatedString);

    convertToBase64(generatedString);

    showFullString();

};

function generateGivenString(rawString=""){

    if(rawString.length<=0){
        rawString=$('#txtraw').val();
    }//

    convertToMD5(rawString);

    convertToSHA1(rawString);

    convertToBase64(rawString);

    showFullString();

}//

function copyToClipboard(elementID,message){

    var copyText=document.getElementById(elementID);

    copyText.select();

    copyText.setSelectionRange(0,99999);

    document.execCommand("copy");

    alert('Copied '+message+'!');

}//

/* hashing functions */

function convertToMD5(rawString){

    var md5 = $.md5(rawString);

    $('#txtmd5').val(md5);

}//

function convertToSHA1(rawString){

    var sha1=SHA1(rawString);

    $('#txtsha1').val(sha1);

}//

function convertToBase64(rawString){

    var base64=btoa(rawString);

    $('#txtbase64').val(base64);

}//