import { HTMLAttrAnchor } from "../types/html.types.js"

interface Props extends HTMLAttrAnchor {
	onClick?: () => void
}

export default function handleClickUtil({
	href,
	download,
	target,
	onClick
}: Props) {
	if (download && href) {
		const a = document.createElement("a")
		a.href = href
		a.download = download
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	} else if (href) {
		window.open(href, target)
	} else {
		onClick?.()
	}
}
