import { InputGroup, Label } from '@blueprintjs/core';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Casa } from '../../services/casas';
import { formatNumber } from '../votos/Votacion';

interface IShowCasaProps {
	casa : Casa
}

export const ShowCasa: React.FunctionComponent<IShowCasaProps> = (props:IShowCasaProps) => {
	
	const {nombre, localizacion, imagenes, precio, numeroDeHuespedes, url} = props.casa

	return (
		<>
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
			<Label className="bp3-inline">
				Url en AirBnB: <InputGroup disabled value={url} />
			</Label>
		</>
	)
}