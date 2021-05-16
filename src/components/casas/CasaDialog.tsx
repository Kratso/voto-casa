import { Dialog, InputGroup, Label } from '@blueprintjs/core';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Casa } from '../../services/casas/index';
import { formatNumber } from '../votos/Votacion';


interface CasaDialogProps {
	casa: Casa,
	toggleOpen: ()=>void,
	isOpen: boolean,
}

export class CasaDialog extends React.PureComponent<CasaDialogProps>{
	render(){
		const {nombre, localizacion, imagenes, precio, numeroDeHuespedes} = this.props.casa

		return (
			<Dialog
				className="bp3-dark casa-dialog-container"
				isOpen={this.props.isOpen}
				isCloseButtonShown={false}
				onClose={this.props.toggleOpen}
				title={nombre}
			>
				<div className="casa-dialog">
					<h2>{localizacion}</h2>
					<Label className="bp3-inline">
						Precio por Noche: <InputGroup disabled leftIcon="euro" value={formatNumber(precio)} />
					</Label>
					<Label className="bp3-inline">
						Número de Huéspedes: <InputGroup disabled leftIcon="person" value={numeroDeHuespedes.toString()} />
					</Label>
					<Carousel 
						className="carrousel"
						autoPlay={true}
						centerMode={true}
						centerSlidePercentage={70}
						dynamicHeight={false}
						infiniteLoop={true}

					>
						{imagenes.map(img=>(
							<div>
								<img src={img} alt={nombre + " imagen"} />
							</div>
						))}
					</Carousel>
				</div>
			</Dialog>
		)
	}
}