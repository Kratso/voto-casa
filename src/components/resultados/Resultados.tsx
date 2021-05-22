import { Classes } from '@blueprintjs/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGanador, getGanador, getVotos } from '../../services/votos';
import { ShowCasa } from '../casas/Casa';

	
	
export const Resultados: React.FunctionComponent = ()=>{
	
	const dispatch = useDispatch();

	const ganador = useSelector(getGanador);
	const votos = useSelector(getVotos);
	
	if(votos === 0 || ganador.nombre==='') dispatch(fetchGanador());

	const containerClases = "resultados-container " + Classes.CARD

	return (
		<div className={containerClases}>
			<div className="votacion-exp">
				<h1>Resultados</h1>
				{
					(ganador === null  || ganador.nombre === '')
					? (
						<>
							<p>
								La votación todavía no ha terminado.
							</p>
						</>
					)
					: (
						<>
							<p>
								El ganador con {votos} puntos es :
							</p>
							<ShowCasa
								casa={ganador}
							/>
						</>
					)
				}

			</div>
		</div>
	);
}