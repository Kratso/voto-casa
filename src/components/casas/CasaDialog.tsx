import { Dialog } from '@blueprintjs/core';
import React from 'react';
import { Casa } from '../../services/casas/index';
import { ShowCasa } from './Casa';


interface CasaDialogProps {
	casa: Casa,
	toggleOpen: ()=>void,
	isOpen: boolean,
}

export class CasaDialog extends React.PureComponent<CasaDialogProps>{
	render(){
		const {nombre} = this.props.casa

		return (
			<Dialog
				className="bp3-dark casa-dialog-container"
				isOpen={this.props.isOpen}
				isCloseButtonShown={false}
				onClose={this.props.toggleOpen}
				title={nombre}
			>
				<div className="casa-dialog">
					<ShowCasa casa={this.props.casa} />
				</div>
			</Dialog>
		)
	}
}