function autocompleteWithAJAX(inputRef, urlReq, charMin) {
    var inputLenght;
    var currentFocus = -1;
    inputRef.on('input', () => {
        inputLenght = inputRef.val().length;
        if (inputLenght <= 1) {
            closeAllLists();
            return;
        }
        $.ajax({
                type: "GET",
                url: urlReq,
                data: {
                    term: inputRef.val()
                },
                async: true,
                dataType: 'json', //you may use jsonp for cross origin request
                crossDomain: true,
                success: function (data, status, xhr) {
                    //alert(data);
                }
            })
            .done(function (listRaw) {
                var list = JSON.parse(listRaw);
                closeAllLists();
                let elem = $('<div></div>');
                elem.attr('id', inputRef.attr('id') + "autocomplete-list");
                elem.attr('class', 'autocomplete-items');
                inputRef.parent().append(elem);
                for (let x = 0; x < getArrayLength(list); x++) {
                    let item = $('<div></div>');
                    item.append(`<strong>${list[x].substr(0, inputLenght)}</strong>${list[x].substr(inputLenght)}`);
                    //item.append(list[x]);
                    item.append(`<input type="hidden" value="${list[x]}">`);
                    item.on('click', () => {
                        inputRef.val(item.children('input').val());
                        closeAllLists();
                    })
                    elem.append(item);
                }
            })
            .fail(function () {
                atome(inputRef, ["Qualcosa", "non", "ha", "funzionato", "come", "avrebbe", "dovuto."]);
            })
            .always(function () {

            });
    })

    inputRef.on("keydown", function (e) {
        let x = $("#" + inputRef.attr('id') + "autocomplete-list");
        if (x) x = x.children('div');
        else return;
        //alert(x.length);
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x.get(currentFocus).click();
            } else if (currentFocus === -1) {
                if (x) x.get(0).click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        $(x.get(currentFocus)).addClass('autocomplete-active');
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        x.removeClass('autocomplete-active');
        /* for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        } */
    }

    function closeAllLists(elmnt) {
        //close all autocomplete lists in the document,
        //except the one passed as an argument:
        $(".autocomplete-items").remove();
        /*
        let x = $(".autocomplete-items");
        if (elmnt == null && elmnt == undefined) {
            x.remove();
            currentFocus = -1;
        } else {
            for (var i = 0; i < getArrayLength(x); i++) {
                if (elmnt != x[i] && elmnt != residenceState) {
                    x[i].parent().remove(x[i]);
                }
            }
        } */
    }
    //execute a function when someone clicks in the document:
    $('*').on("click", function () {
        closeAllLists();
    });
}

function autocompleteWithArray(inputRef, array, charMin) {
    var inputLenght;
    var currentFocus = -1;
    inputRef.on('input', () => {
        inputLenght = inputRef.val().length;
        if (inputLenght <= 1) {
            closeAllLists();
            return;
        }
        closeAllLists();
        let elem = $('<div></div>');
        elem.attr('id', inputRef.attr('id') + "autocomplete-list");
        elem.attr('class', 'autocomplete-items');
        inputRef.parent().append(elem);
        for (let x = 0; x < getArrayLength(array); x++) {
            let item = $('<div></div>');
            item.append(`<strong>${array[x].substr(0, inputLenght)}</strong>${array[x].substr(inputLenght)}`);
            //item.append(list[x]);
            item.append(`<input type="hidden" value="${array[x]}">`);
            item.on('click', () => {
                inputRef.val(item.children('input').val());
                closeAllLists();
            })
            elem.append(item);
        }
    })

    inputRef.on("keydown", function (e) {
        let x = $("#" + inputRef.attr('id') + "autocomplete-list");
        if (x) x = x.children('div');
        else return;
        //alert(x.length);
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x.get(currentFocus).click();
            } else if (currentFocus === -1) {
                if (x) x.get(0).click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        $(x.get(currentFocus)).addClass('autocomplete-active');
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        x.removeClass('autocomplete-active');
        /* for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        } */
    }

    function closeAllLists(elmnt) {
        //close all autocomplete lists in the document,
        //except the one passed as an argument:
        $(".autocomplete-items").remove();
        /*
        let x = $(".autocomplete-items");
        if (elmnt == null && elmnt == undefined) {
            x.remove();
            currentFocus = -1;
        } else {
            for (var i = 0; i < getArrayLength(x); i++) {
                if (elmnt != x[i] && elmnt != residenceState) {
                    x[i].parent().remove(x[i]);
                }
            }
        } */
    }
    //execute a function when someone clicks in the document:
    $('*').on("click", function () {
        closeAllLists();
    });
}

function getArrayLength(array) {
    let x = 0;
    while (array[x] != undefined && array[x] != null) {
        x++;
    }
    return x;
}

function validateForm(listObj) {
    let isValid = true;
    listObj.each((i, obj) => {
        if ($(obj).val() === "") {
            isValid = false;
            $(obj).parent().addClass('has-error');
        } else {
            $(obj).parent().removeClass('has-error');
        }
    })
    if (!isValid) {
        listObj.on("change", () => {
            listObj.each((i, obj) => {
                if ($(obj).val() === "") {
                    $(obj).parent().addClass('has-error');
                } else {
                    $(obj).parent().removeClass('has-error');
                }
            })
        })
    }
    return isValid;
}