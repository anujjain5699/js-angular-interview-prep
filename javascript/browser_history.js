/*
1. Implement a **Browser History class**

const browser = new BrowserHistory("home");

browser.visit("page1");
browser.visit("page2");

browser.back(1);           // "page1"
browser.forward(1);        // "page2"
browser.getCurrentPage();  // "page2"
*/

class BrowserHistory{
    constructor(homepage){
        this.history = [homepage];
        this.currentIndex = 0;
    }

    visit(page){
        // Clear forward history when visiting a new page after going back
        this.history = this.history.slice(0, this.currentIndex + 1);
        this.history.push(page)
        this.currentIndex=this.history.length-1
    }

    back(count){
        this.currentIndex = Math.max(0,this.currentIndex-count)
        console.log(this.history[this.currentIndex])
    }

    forward(count){
        this.currentIndex= Math.min(this.currentIndex+count, this.history.length-1)
        console.log(this.history[this.currentIndex])
    }

    getCurrentPage(){
        console.log(this.history[this.currentIndex])
    }
}

// const browser = new BrowserHistory("home");

// browser.visit("page1");
// browser.visit("page2");

// console.log(browser.back(1));           // "page1"
// console.log(browser.forward(1));        // "page2"
// console.log(browser.getCurrentPage());  // "page2"
const browser = new BrowserHistory("home");
browser.visit("page1");
browser.visit("page2");
browser.visit("page3");

browser.back(2);        // at "page1"
browser.visit("page4"); // visits page4

browser.forward(1); 

