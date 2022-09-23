
const dynamicMenu = document.querySelector('.dynamicMenu');
const menuText = document.querySelector('.menuText');
const contactBtn = document.querySelector('.contact__btn');
const contactDs = document.querySelector('.contact__description')
const aboutBtn = document.querySelector('.about__btn');
const languageBtn = document.querySelector('.language__btn');
const themeBtn = document.querySelector('.theme__btn');
// mosue over

function menuBTNs_animations(opa, tra) {
    //opacity
    contactBtn.style.opacity = opa;
    themeBtn.style.opacity = opa;
    aboutBtn.style.opacity = opa;
    languageBtn.style.opacity = opa;
    //transform
    themeBtn.style.transform = tra;
    aboutBtn.style.transform = tra;
    languageBtn.style.transform = tra;
}

dynamicMenu.addEventListener('mouseover', ()=> { 
    menuText.style.visibility = 'hidden';
    menuText.style.transform = 'translateY(100%)';
    menuText.style.opacity = '0';
    contactBtn.style.transform = 'translateY(0)';
    menuBTNs_animations('1', 'translateY(0)');
    //contactDs.style.opacity = '1';
    
    // mouse out
    dynamicMenu.addEventListener('mouseout', ()=> { 
        menuText.style.visibility = 'visible';
        menuText.style.transform = 'translateY(0)';
        menuText.style.opacity = '1';
        contactBtn.style.transform = 'translateY(200%)';
        //contactDs.style.opacity = '0';
        menuBTNs_animations('0', 'translateY(-70%)');
    });
});
