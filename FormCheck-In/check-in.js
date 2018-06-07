var docT = $("#documentType");
var btn = $("#buttonSubmit");
var nome = $("#nOme");
var surname = $('#surname');
var sex = $('#sex');
var birthPlace = $('#birthPlace');
var birthDate = $('#birthDate');
var nationality = $('#nationality');
var residenceState = $('#residenceState');
var city = $('#city');
var address = $('#address');
var addressNum = $('#addressNumber');
var documentNum = $('#documentNumber');
var documentPlace = $('#documentEmissPlace');
var list = $(':input').not('button');
var lang;
//var lang = navigator.language;
//alert(lang);

$(function () {
    //alert(navigator.language);
    if (navigator.language === "it")
        lang = it;
    else if (navigator.language === "en-US") {
        lang = enUS;
        //alert('Lingua inglese caricata');
    }
    else
        lang = enUS;
    loadLanguage();
})

function loadLanguage() {
    if (lang.language === "it") {
        document.title = "Modulo Dati Nominativo";
        $('#formTitle').text('Modulo Dati Nominativo');
    } else if (lang.language === "en-US") {
        document.title = "Nominative Module";
        $('#formTitle').text('Nominative Module');
    }
    $("#documentTypeL").text(lang.documentType.title);
    $('#documentType').empty();
    for (let x = 0; x < lang.documentType.options.lenght; x++) {
        $('#documentType').append(`<option value="${x}">${lang.documentType.options[x]}</option>`)
    };
    $("#nomeL").text(lang.name);
    $('#surnameL').text(lang.surname);
    $('#genderL').text(lang.gender.title);
    $('#gender').empty();
    for (let x = 0; x < lang.gender.options.lenght; x++) {
        $('#gender').append(`<option value="${x}">${lang.gender.options[x]}</option>`)
    };
    $('#birthPlaceL').text(lang.birthPlace);
    $('#birthDateL').text(lang.birthDate);
    $('#citizenshipL').text(lang.citizenship);
    $('#residenceStateL').text(lang.countryOfResidence);
    $('#cityL').text(lang.cityOfResidence);
    $('#addressL').text(lang.homeAddress);
    $('#addressNumberL').text(lang.homeNumber);
    $('#documentNumberL').text(lang.documentNumber);
    $('#documentEmissPlaceL').text(lang.emissionPlace);
}

btn.on("click", (event) => {
    let isValid = true;
    list.each((i, obj) => {
        if ($(obj).val() === "") {
            isValid = false;
            $(obj).parent().addClass('has-error');
        } else {
            $(obj).parent().removeClass('has-error');
        }
    })
    if (!isValid)
        event.preventDefault();
    list.on("change", (event) => {
        list.each((i, obj) => {
            if ($(obj).val() === "") {
                $(obj).parent().addClass('has-error');
            } else {
                $(obj).parent().removeClass('has-error');
            }
        })
    })
});

$('#randB').click((event) => {

})

$('#en_USLang').click((event) => {
    lang = enUS;
    loadLanguage();
})

$('#itLang').click((event) => {
    lang = it;
    loadLanguage();
})

/* $('form input').change((event) => {
    $(this).parent().removeClass('has-error');
    alert(event.target.att)
}) */

/* $('.has-error').change(() => {
    this.removeClass('has-error');
}) */