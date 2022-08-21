function Validator(options) {

    // hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value)
        var showMessage = inputElement.parentElement.querySelector(options.errorSelector);
        console.log(errorMessage)
        if (errorMessage) {
            inputElement.parentElement.classList.add('invalid')
            showMessage.innerHTML = errorMessage;
        } else {
            showMessage.innerHTML = '';
            inputElement.parentElement.classList.remove('invalid')

        }
    }

// lấy element của form cần validate
    var formElement = document.querySelector(options.form)
    console.log(formElement);
    console.log(options);
    console.log(options.rules);
    if (formElement) {
        options.rules.forEach(rule => {
            console.log(rule)
            var inputElement = formElement.querySelector(rule.selector);
            // xử lý trường hợp Blur khỏi input
            if (inputElement) {
                inputElement.onblur = function () {
                    // value: inputElement.value
                    // test function: rule.test
                    validate(inputElement, rule)
                }
                // xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function (){
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        });
    }
}

// định nghĩa
// nguyên tắc rule
// khi có lỗi => trả ra lỗi
// khi hợp hệ =>  không trả ra cái gì cả 
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này !'
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường Này Phải LÀ Email !'
        }
    }
}
Validator.minLength = function (selector,min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}
Validator.scanPassword = function (selector,min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}

