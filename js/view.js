import { html } from "./imports.js";

export function view(state) {
	return html`
    <iframe class="main"></iframe>
		<div class="controls">
				<button 
					class="menu-button" 
					@click=${() => dispatch("LAST")} 
					?disabled=${state.index === 0}>
					⇦
					</button>
				<button 
					class="menu-button" 
					@click=${() => dispatch("NEXT")} 
					?disabled=${state.index+1 === state.pages.length}>
					⇨
					</button>
		</div>
	`
}
