var API_PATH = '/upload/stl';

var fileEater = {

    getForm: function(formElement){
        var formElement = document.querySelector(formElement);
        var formData = new FormData(formElement);
        return formData;
    },

    upload: function(formData, callback) {

        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                callback(request.responseText);
            }
        };

        request.open("POST", API_PATH);
        request.send(formData);
    }
};
