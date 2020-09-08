import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.browserHeight = window.innerHeight;
        this.itemsToReveal = els;
        this.thresholdPercent = thresholdPercent;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle);
        window.addEventListener('resize', debounce(() => {
            console.log('Resize Just ran');
            this.browserHeight = window.innerHeight;
        }, 333));
    }

    calcCaller() {
        console.log("The scroll function ran");
        this.itemsToReveal.forEach(el => {
            if(!el.isRevealed) {
                this.calculateIfScrolledTo(el);
            }
        });
    }

    calculateIfScrolledTo(el) {
        //window.scrollY is how much the user have scrolled down
        //window.browserHeight is the windows innerheight (see constructor function)
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            console.log("Element was calculated");
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;  
            if(scrollPercent < this.thresholdPercent) {
                el.classList.add('reveal-item--is-visible');
                el.isRevealed = true;
                
                //Remove eventListerner on when scroll has reached last item
                if(el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle);
                }
            }    
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add('reveal-item');
            el.isRevealed = false;
        });

        this.itemsToReveal[this.itemsToReveal.length -1].isLastItem = true;
    }
}

export default RevealOnScroll;