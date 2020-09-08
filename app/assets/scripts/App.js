import "../styles/styles.scss";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from './modules/RevealOnScroll';

new RevealOnScroll(document.querySelectorAll('.features__item'), 75);
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60);

let mobileMenu = new MobileMenu();

// alert('FATASS Jonas!!!');
if(module.hot) {
    module.hot.accept();
}

 
