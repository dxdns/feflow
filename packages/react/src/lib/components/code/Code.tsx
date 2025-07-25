import { classMapUtil } from "@dxdns/feflow-core/utils"
import { forwardRef, HTMLAttributes } from "react"
import styles from "@dxdns/feflow-core/styles/Code.module.css"

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default forwardRef<HTMLDivElement, Props>(
	({ className = "", children, ...rest }, ref) => {
		return (
			<div
				{...rest}
				ref={ref}
				className={classMapUtil(className, [className, styles], styles.code)}
			>
				{children}
			</div>
		)
	}
)
