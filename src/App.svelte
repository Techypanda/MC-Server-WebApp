<script lang="ts">
	import Loader from "./Loader.svelte";
	import { serverData } from "./store";
	export const API_URI = "https://api.mcsrvstat.us/2/";
	export const SERVER_URI = "hypixel.net"; // Replace with mc.techytechster.com
	let apiResponse: ServerStatusResponse;
	async function doWork() {
		try {
			const resp = await fetch(`${API_URI}${SERVER_URI}`);
			const data = await resp.json();
			serverData.set(data);
			timePassed = 0;
		} catch (err) {
			console.error(err);
		}
	}
	setInterval(() => promise = doWork(), 60000);
	let promise = doWork();
	let timePassed = 0;
	setInterval(() => timePassed++, 1000);
	serverData.subscribe((value) => {
		apiResponse = value as ServerStatusResponse;
	});
</script>

<main>
	<h1>Server Status</h1>
	{#await promise}
		<Loader />
	{:then}
		<div style="display: flex;">
			<div style="margin-right: 20px;">
				<img src={apiResponse.icon} alt={apiResponse.hostname} />
				<div id="status">
					<div
						id="statusDisplay"
						class={apiResponse.online ? "online" : "offline"}
					/>
					<p id="statusText">
						{apiResponse.online ? "Online" : "Offline"}
					</p>
				</div>
			</div>
			<div>
				<p style="margin-bottom: 0">
					Server IP Address 1 - {apiResponse.hostname}
				</p>
				<p style="margin-top: 0">
					Server IP Address 2 - {apiResponse.ip}:{apiResponse.port}
				</p>
			</div>
		</div>
		<h2>Server MOTD</h2>
		<div id="motd">
			{#each apiResponse.motd.html as htmlString}
				<p style="margin: 0;">{@html htmlString}</p>
			{/each}
		</div>
		<h2>Modpack Details</h2>
		<p style="margin: 0;">...</p>
		<h2>Check Again</h2>
		<p style="margin: 0;">{timePassed}s since last check</p>
		<p class="angrycheck noselect" on:click={() => promise = doWork()}>CHECK AGAIN!</p>
		<h2>Server Health</h2>
		<p style="margin: 0;">You can see the server health via the <a href="???">netdata here</a></p>
	{/await}
</main>

<style>
	a {
		color: var(--blue);
		text-decoration: none;
	}
	h1 {
		font-family: "Rampart One", cursive !important;
		color: var(--blue);
		margin-top: 0;
	}
	h2 {
		font-family: "Rampart One", cursive !important;
		color: var(--blue);
		margin-top: 15px;
	}
	p {
		font-family: "Gluten", cursive;
	}
	#statusDisplay {
		display: inline-block;
		height: 10px;
		width: 10px;
		border-radius: 100%;
	}
	.online {
		background-color: #39ff14;
	}
	.offline {
		background-color: #fc2c0c;
	}
	#statusText {
		display: inline-block;
		margin: 0 auto;
	}
	.angrycheck {
		color: #fc2c0c;
		font-weight: 600;
		cursor: pointer;
	}
	.noselect {
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Old versions of Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
	}
</style>
