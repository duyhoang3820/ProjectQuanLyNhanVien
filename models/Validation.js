var Validatiton = function () {
    this.kiemTraRong = function (selector, name, error_selector) {
        if (document.querySelector(selector).value.trim() === '') {
            document.querySelector(error_selector).innerHTML = name + ' không được bỏ trống !';
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
    this.kiemTraEmail = function (selector, name, error_selector) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regex.test(document.querySelector(selector).value)) {
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }
        document.querySelector(error_selector).innerHTML = 'Email không đúng định dạng! ';
        return false;
    }
    this.kiemTraTatCaSo = function (selector, name, error_selector) {
        var regex = /^[0-9]+$/;
        if (regex.test(document.querySelector(selector).value)) {
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }
        document.querySelector(error_selector).innerHTML = name + ' phải là số! ';
        return false;
    }
    this.kiemTraTatCaChu = function (selector, name, error_selector) {
        var regex =  /^[A-Za-z]+$/;;
        if (regex.test(document.querySelector(selector).value)) {
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }
        document.querySelector(error_selector).innerHTML = name + ' phải là chữ! ';
        return false;
    }
    this.kiemTraDoDai = function (selector, name, error_selector, minLength, maxLength) {
        var value = document.querySelector(selector).value;
        if (value.length < minLength || value.length > maxLength) {
            document.querySelector(error_selector).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự`;
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
    this.kiemTraGiaTri = function (selector, name, error_selector, minValue, maxValue) {
        var value = document.querySelector(selector).value;

        if (Number(value) < minValue || Number(value) > maxValue) {
            document.querySelector(error_selector).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
}