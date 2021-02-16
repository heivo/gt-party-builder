import React, { useContext, useState } from 'react';
import { Hero } from '../graphql/schema';
import HeroPicker from './HeroPicker';
import HeroSlot from './HeroSlot';
import HeroSlotContainer from './HeroSlotContainer';
import HeroesBuffSummary from './HeroesBuffSummary';
import StateContext from '../context/StateContext';
import WeaponSlotContainer from './WeaponSlotContainer';
import WeaponSlot from './WeaponSlot';

function MainView() {
	const { slots, selectHero } = useContext(StateContext);

	const selectedHeros = slots.map((slot) => slot.hero).filter((hero) => hero !== null) as Hero[];

	const [heroPickerSlot, setHeroPickerSlot] = useState<number>();

	const openHeroPicker = (slotNumber: number) => () => {
		setHeroPickerSlot(slotNumber);
	};

	const openWeaponPicker = (slotNumber: number) => () => {
		// setHeroPickerSlot(slotNumber);
	};

	const handleSelectHero = (slotNumber: number, hero: Hero) => {
		selectHero(slotNumber, hero);
		setHeroPickerSlot(undefined);
	};

	if (heroPickerSlot !== undefined) {
		const currentHero = slots[heroPickerSlot].hero;
		const lockedHeros = selectedHeros.filter((hero) => hero !== currentHero);
		return <HeroPicker lockedHeros={lockedHeros} onSelect={(hero) => handleSelectHero(heroPickerSlot, hero)} />;
	}

	return (
		<>
			<HeroSlotContainer>
				<HeroSlot hero={slots[0].hero} onClick={openHeroPicker(0)} />
				<HeroSlot hero={slots[1].hero} onClick={openHeroPicker(1)} />
				<HeroSlot hero={slots[2].hero} onClick={openHeroPicker(2)} />
				<HeroSlot hero={slots[3].hero} onClick={openHeroPicker(3)} />
			</HeroSlotContainer>
			<WeaponSlotContainer>
				<WeaponSlot weapon={slots[0].weapon} onClick={openWeaponPicker(0)} />
				<WeaponSlot weapon={slots[1].weapon} onClick={openWeaponPicker(1)} />
				<WeaponSlot weapon={slots[2].weapon} onClick={openWeaponPicker(2)} />
				<WeaponSlot weapon={slots[3].weapon} onClick={openWeaponPicker(3)} />
			</WeaponSlotContainer>
			<HeroesBuffSummary heroes={selectedHeros} />
		</>
	);
}

export default MainView;
