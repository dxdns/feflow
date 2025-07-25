import type { TextFieldType } from "@dxdns/feflow-core/types"
import { classMapUtil } from "@dxdns/feflow-core/utils"
import { forwardRef, InputHTMLAttributes } from "react"
import { TextField } from "../text-field"
import { SearchIcon } from "../../icons/index.js"
import styles from "@dxdns/feflow-core/styles/SearchInput.module.css"

interface Props
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
		TextFieldType {}

export default forwardRef<HTMLInputElement, Props>(
	({ className = "", variant = "text", color, ...rest }, ref) => {
		return (
			<div
				className={classMapUtil(
					className,
					[className, styles],
					[variant, styles],
					styles.searchInput
				)}
			>
				<SearchIcon className={styles.icon} />
				<TextField
					ref={ref}
					{...rest}
					className={styles.inputGroup}
					variant={variant}
					color={color}
					type="search"
				/>
			</div>
		)
	}
)
