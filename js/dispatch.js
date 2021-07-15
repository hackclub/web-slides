import { render } from './imports.js';
import { view } from "./view.js";
import { events } from "./events.js";

async function checkURL(href, state) {
	const url = new URL(href);

	const search = window.location.search;
	const pages = new URLSearchParams(search).get("pages");

	if (pages) {
		let link = pages;

		if (!link.startsWith("http")) link = `examples/${link}`;

		const file = await fetch(link,  {mode: 'cors'})
		const json = await file.json();

		state.defaultPath = json.defaultPath;
		state.pages = json.pages;

		dispatch("GOTO_PAGE", { index: 0 });
	}

}


const STATE = {
	defaultPath: "",
	pages: [],
	index: 0
};

const ACTIONS = {
	INIT(args, state) {
		dispatch("RENDER");
		events(state);
		checkURL(window.location.href, state);
	},
	GOTO_PAGE({ index }, state) {
		// set iframe source
		if (state.pages.length === 0) return;
		if (index < 0) return;
		if (index >= state.pages.length) return;

		state.index = index;
		const src = state.pages[index];

		document.querySelector("iframe").src = src;
	},
	NEXT(args, state) { 
		dispatch("GOTO_PAGE", { index: state.index + 1 });
	},
	LAST(args, state) { 
		dispatch("GOTO_PAGE", { index: state.index - 1 });
	},
	RENDER() {
		console.log("rendered")
	}
}

export function dispatch(action, args = {}, rerender = true) {
	const trigger = ACTIONS[action];
	if (trigger) trigger(args, STATE);
	else console.log("Action not recongnized:", action);

	if (rerender) {
		render(view(STATE), document.getElementById("root"));
	}
}
