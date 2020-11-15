/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 * Owner : Mohamed Ayman
 * Date : 15/11/2020
*/

/**
 * Define Global Variables
 * 
*/


let navg = document.querySelector('#navbar__list');
let sections = document.querySelectorAll('section');

// build the nav
function buildtheNav(){
	// create document fragement for better performance
	const myDocFragement=document.createDocumentFragment();
	let i=1;
	for(let sec of sections){
		// create elements and append them to the fragement
	let el=document.createElement('li');
	let elLink=document.createElement('a');
	elLink.className='menu__link';
	// adding id starting for 1
	elLink.id=i;
	elLink.innerText=sec.dataset.nav;
    
    
	myDocFragement.appendChild(el);
	el.appendChild(elLink);
	i++
	
	
	}
	// append the fragement to the nav bar
	navg.appendChild(myDocFragement);
	let links=document.querySelectorAll('a');
	for(let li of links){
		// add listener to the links , once the click event happend scroll smoothly to the targeted section
	li.addEventListener('click',function(){
    let sc=document.querySelector('#section'+li.id);
    sc.scrollIntoView({behavior: "smooth"});
	
	})		
		
		
	}
	
	
}


// create function to check if the user stopped scrolling for a bunch of time ( 5 sec ) the navigation bar will disappear and if
// the user continued the scrolling, the navigation bar will appear again
let timer=null;
function hideBar(){
	
	window.addEventListener('scroll',function(){
		if(timer!==null){
			// clear the timer
			clearTimeout(timer);
		}
		// after 5 sec the bar will disappear
		timer=setTimeout(function(){
			document.querySelector("ul").style.display = "none";
		},5000)
		// if the scrolling event used again the bar will appear again
		window.addEventListener('scroll',function(){
						document.querySelector("ul").style.display = "block";

		})
		
	})

	
}
// highlight current section
function highLight(){
	// check if we are scrolling and one of the sections is in view port partially , highlight the mentioned section
	window.addEventListener('scroll',function(){
		
		for(let sec of sections){
		let bounding=sec.getBoundingClientRect();
		console.log(bounding);
		if(bounding.top>= -(sec.offsetHeight) && bounding.left>= -(sec.offsetWidth) && bounding.right<= (window.innerWidth || document.documentElement.clientWidth)  && bounding.bottom<= (window.innerHeight || document.documentElement.clientHeight)){
			
			sec.classList.add('your-active-class');
			let ls=document.querySelectorAll('a');
			for(let li of ls){
				if(sec.dataset.nav === li.innerText){
					li.classList.add('active-link');
				}
			}
			
		}
		else{
			sec.classList.remove('your-active-class');
		}
		
		
		}
	});
	
	
}




buildtheNav();
hideBar();
highLight();