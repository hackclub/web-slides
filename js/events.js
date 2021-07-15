// import ftdomdelegate from 'https://cdn.skypack.dev/ftdomdelegate';

const trigger = e => e.composedPath()[0];
const matchesTrigger = (e, selectorString) => trigger(e).matches(selectorString);
// create on listener
const createListener = (target) => (eventName, selectorString, event) => { // focus doesn't work with this, focus doesn't bubble, need focusin
	target.addEventListener(eventName, (e) => {
		e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
		if (selectorString === "" || matchesTrigger(e, selectorString)) event(e);
	})
}

function pauseEvent(e) {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

export function events(state) {
	const bodyListener = createListener(document.body);
	// bodyListener("mousedown", ".next", function(event) {
	// 	let code = event.code;
	// 	// console.log(code, event);
	// 	if (code === "Enter" && event.shiftKey) {
	// 	  event.preventDefault();
	// 	  dispatch("RUN");
	// 	}
	// });

}
