/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { ApiPromise, WsProvider } from 'https://deno.land/x/polkadot@0.2.2/api/mod.ts';

import { Button } from "../components/Button.tsx";

interface LoginProps {
	network: string;
}

export default function Login(props: LoginProps) {
	const [network, setNetwork] = useState(props.network);
	async function login() {
		// Create the API and wait until ready
		const api = await ApiPromise.create({ provider: new WsProvider() });
		// Retrieve the chain & node information information via rpc calls
		const [chain, nodeName, nodeVersion] = await Promise.all([
			api.rpc.system.chain(),
			api.rpc.system.name(),
			api.rpc.system.version(),
		]);
		console.log(
			`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
		);
		setNetwork(`${chain} using ${nodeName}`);
	}
	return (
		<div class={tw`flex gap-2 w-full`}>
			<p class={tw`flex-grow-1 font-bold text-xl`}>{network}</p>
			<Button onClick={() => login()}>Login</Button>
		</div>
	);
}
