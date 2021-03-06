import React, { useContext } from 'react';
import styles from '../style.module.scss';
import StateContext, { SlotData } from '../context/StateContext';
import HeroBadge from './HeroBadge';
import WeaponBadge from './WeaponBadge';
import ReactTooltip from 'react-tooltip';

interface Props {
	number: number;
	data: SlotData;
	onClickHero: () => void;
	onClickWeapon: () => void;
	index: number;
}

const Slot = ({ number, data: { hero, weapon }, onClickHero, onClickWeapon, index }: Props) => {
	const { selectHero } = useContext(StateContext);

	const makeLeader = () => {
		if (hero) {
			selectHero(0, hero);
		}
		ReactTooltip.hide();
	};

	return (
		<div className={styles.slot}>
			<HeroBadge hero={hero} onClick={onClickHero} size={150} />
			{((number > 0 && hero) || weapon) && (
				<div className={styles.slotSecondaryButtons}>
					{weapon && (
						<WeaponBadge weapon={weapon} onClick={onClickWeapon} showAilment={index === 0} size={80} />
					)}
					{number > 0 && hero && (
						<div
							className={styles.slotLeaderButton}
							onClick={makeLeader}
							data-tip={`Make ${hero.name} party leader`}
							data-delay-show="500"
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default Slot;
