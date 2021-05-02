import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'
import stls from '@/styles/Modal.module.sass'

const Modal = ({ show, onClose, children, title = '' }) => {
	const [isBrowser, setIsBrowser] = useState(false)

	useEffect(() => setIsBrowser(true))

	const handleClose = e => {
		e.preventDefault()
		onClose()
	}

	const modalContent = show ? (
		<div className={stls.overlay}>
			<div className={stls.modal}>
				<div className={stls.header}>
					<a href='#' onClick={handleClose}>
						<FaTimes />
					</a>
				</div>
				{title && <div>{title}</div>}
				<div className={stls.body}>{children}</div>
			</div>
		</div>
	) : null

	if (isBrowser) {
		return ReactDOM.createPortal(
			modalContent,
			document.getElementById('modal-root')
		)
	} else {
		return null
	}
}

export default Modal
