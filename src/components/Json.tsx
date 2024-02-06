export const Json = ({ data }: { data: any }) => {
	return (
		<pre>
			<code>{JSON.stringify(data, null, 2)}</code>
		</pre>
	)
}
