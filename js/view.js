import { html } from "./imports.js";

export function view(state) {
	return html`
    <iframe class="main"></iframe>
		<div class="controls">
				<button class="menu-button" @click=${() => dispatch("LAST")}>⇦</button>
				<button class="menu-button" @click=${() => dispatch("NEXT")}>⇨</button>
		</div>
	`
}
