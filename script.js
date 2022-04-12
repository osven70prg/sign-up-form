function validateForm(e) {
    e.preventDefault();
    let errorFlag = false, 
        selector = '';
    const inputNodeList = document.querySelectorAll('input');
    inputNodeList.forEach(inputNode => {
        selector = '#' + inputNode.id + ' ~ div.errorMessage';
        document.querySelector(selector).style.visibility = 'hidden';
        if (((inputNode.id === 'fname' || inputNode.id === 'lname') && inputNode.value === '') ||
            (inputNode.id === 'email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputNode.value)) ||
            (inputNode.id === 'pwd' && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(inputNode.value))) {
                document.querySelector(selector).style.visibility = 'visible';
                errorFlag = true;
        }
    });
    pwdValidity = validatePwdConf();
    if (!errorFlag && pwdValidity) {
        this.submit();
    }
    return;
}

function validatePwdConf() {
    const inputNodeList = document.querySelectorAll('input');
    let validity = true;
    if (inputNodeList[4].value !== inputNodeList[5].value) {
        document.querySelector('#pwdConf ~ div.errorMessage').style.visibility = 'visible';
        document.querySelector('input#pwd').className.add('error');
        document.querySelector('input#pwdConf').className.add('error');
        validity = false;
    } else {
        document.querySelector('#pwdConf ~ div.errorMessage').style.visibility = 'hidden';
        document.querySelector('input#pwd').className.remove('error');
        document.querySelector('input#pwdConf').className.remove('error');
    }
    return validity;
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', validateForm);
    document.querySelectorAll('input.error').forEach(input => {
        input.addEventListener('blur', validatePwdConf);
    })
});
