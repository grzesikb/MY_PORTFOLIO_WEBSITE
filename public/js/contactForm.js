const contactNav = document.querySelector('.contact__Navigation');

const NameINPUT = document.getElementById('contact__Input--Name');
const EmailINPUT = document.getElementById('contact__Input--Email');
const MessageINPUT = document.getElementById('contact__Input--Message');

const labelName = document.querySelector('.contact__Input--Name-Label');
const labelEmail = document.querySelector('.contact__Input--Email-Label');
const labelMessage = document.querySelector('.contact__Input--Message-Label');

var previousUse = 1;
var contactPoints = 0;

contactNav.addEventListener('click', () => {
    switch (previousUse) {
        case 1:
            if (NameINPUT.value != '') {
                previousUse = 2;
                labelName.style.marginTop = '-5vh';
                labelName.style.fontSize = 'calc(0.5vw + 1vh)';
                labelName.innerHTML = 'Name: ';
                contactNav.style.top = '50vh';
                EmailINPUT.style.visibility = 'visible';
                NameINPUT.style.border = 'none';
                labelEmail.style.visibility = 'visible';
                labelEmail.style.marginTop = '0';
                labelEmail.style.fontSize = 'calc(1vw + 2vh)';
                
                EmailINPUT.focus();
               
                EmailINPUT.addEventListener('focus', () => {
                    labelEmail.style.marginTop = '-5vh';
                    labelEmail.style.fontSize = 'calc(0.5vw + 1vh)';
                });

                contactPoints = 1;
            }
        break;

        case 2:
            if (EmailINPUT.value != '' && EmailINPUT.checkValidity() == true) {
                previousUse = 3;
                labelEmail.innerHTML = 'E-mail: ';
                contactNav.style.top = 'calc(74vh + 20px)';
                MessageINPUT.style.visibility = 'visible';
                EmailINPUT.style.border = 'none';
                labelMessage.style.visibility = 'visible';
                contactNav.style.right = '8vw';
                contactNav.innerHTML = 'Send';
                contactPoints = 2;
            }
        break;

        case 3:
            if (MessageINPUT.value != '') {
                contactPoints = 3;
            }
        break;
    }
});

document
    .querySelector('form')
    .addEventListener('submit', (e) => {
        if (contactPoints == 3) {
            e.preventDefault();
            // e.target.elements.name.value = ''; e.target.elements.email.value = '';
            // e.target.elements.message.value = '';
            document.querySelector('form').style.display = 'none';
            document.querySelector('.contact__TextEnd').style.visibility = 'visible';
        }
    });
