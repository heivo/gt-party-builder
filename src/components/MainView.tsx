import React, { useContext, useMemo, useState } from 'react';
import HeroPicker from './HeroPicker';
import PartyBuffSummary from './PartyBuffSummary';
import StateContext from '../context/StateContext';
import Slot from './Slot';
import styles from '../style.module.scss';
import { Hero, Weapon } from '../context/DataContext';
import ChainInfo from './ChainInfo';
import WeaponPicker from './WeaponPicker';
import ReactTooltip from 'react-tooltip';
import { useParams } from 'react-router-dom';

function MainView() {
	const { slots, selectHero, selectWeapon, reset } = useContext(StateContext);

	const selectedHeros = slots.map((slot) => slot.hero).filter((hero) => hero !== null) as Hero[];

	const [heroPickerSlot, setHeroPickerSlot] = useState<number>();
	const [weaponPickerSlot, setWeaponPickerSlot] = useState<number>();

	const openHeroPicker = (slotNumber: number) => () => {
		setHeroPickerSlot(slotNumber);
	};

	const openWeaponPicker = (slotNumber: number) => () => {
		setWeaponPickerSlot(slotNumber);
	};

	const handleSelectHero = (slotNumber: number, hero: Hero) => {
		selectHero(slotNumber, hero);
		setHeroPickerSlot(undefined);
	};

	const handleCloseHeroPicker = () => {
		setHeroPickerSlot(undefined);
	};

	const handleSelectWeapon = (slotNumber: number, weapon: Weapon) => {
		selectWeapon(slotNumber, weapon);
		setWeaponPickerSlot(undefined);
	};

	const handleCloseWeaponPicker = () => {
		setWeaponPickerSlot(undefined);
	};

	const { slug } = useParams<{ slug: string | undefined }>();

	const gtTeamPlannerLink = useMemo(() => {
		if (slug) {
			return `https://gt-team-planner.herokuapp.com/${slug}`;
		} else {
			return 'https://gt-team-planner.herokuapp.com';
		}
	}, [slug]);

	if (heroPickerSlot !== undefined) {
		const currentHero = slots[heroPickerSlot].hero;
		const otherUsedHeros = selectedHeros.filter((hero) => hero !== currentHero);
		return (
			<HeroPicker
				otherUsedHeros={otherUsedHeros}
				onSelect={(hero) => handleSelectHero(heroPickerSlot, hero)}
				onClose={handleCloseHeroPicker}
			/>
		);
	}

	if (weaponPickerSlot !== undefined) {
		const currentHero = slots[weaponPickerSlot].hero as Hero;
		return (
			<WeaponPicker
				hero={currentHero}
				showAilment={weaponPickerSlot === 0}
				onSelect={(weapon) => handleSelectWeapon(weaponPickerSlot, weapon)}
				onClose={handleCloseWeaponPicker}
			/>
		);
	}

	return (
		<>
			<p style={{ maxWidth: 800, fontWeight: 'bold' }}>
				There is a newer version of this tool available <a href={gtTeamPlannerLink}>here</a>. Please update your
				bookmarks.
			</p>
			<div className={styles.slotContainer}>
				{slots.map((slot, slotNumber) => (
					<Slot
						key={slotNumber}
						number={slotNumber}
						data={slot}
						onClickHero={openHeroPicker(slotNumber)}
						onClickWeapon={openWeaponPicker(slotNumber)}
						index={slotNumber}
					/>
				))}
			</div>
			<PartyBuffSummary heroes={selectedHeros} />
			<ChainInfo heroes={selectedHeros} weapon={slots?.[0].weapon} />
			{selectedHeros.length > 0 && (
				<button onClick={reset} className={styles.resetButton}>
					reset
				</button>
			)}
			<ReactTooltip effect="solid" place="bottom" multiline delayShow={200} />
		</>
	);
}

export default MainView;
