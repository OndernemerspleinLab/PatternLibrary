import {includes, negate, partial} from 'utils/functional';

export const audiences = [
	{
		name: "Ondernemers",
		defaultSelection: true,
	},
	{
		name: "Starters",
		defaultSelection: false,
	},
	{
		name: "Ervaren ondernemers",
		defaultSelection: false,
	},
];

export const topTasks = [
	{
		text: "Een rechtsvorm kiezen",
		href: "#",
		audiences: [
			"Ondernemers",
			"Starters",
		],
	},

	{
		text: "De VAR: onmisbaar voor zzp'ers",
		href: "#",
		audiences: [
			"Ondernemers",
		],
	},

	{
		text: "In 10 stappen naar een eigen bedrijf",
		href: "#",
		audiences: [
			"Ondernemers",
			"Starters",
		],
	},

	{
		text: "Financiering vinden",
		href: "#",
		audiences: [
			"Ondernemers",
			"Ervaren ondernemers",
		],
	},

	{
		text: "Een ondernemingsplan maken",
		href: "#",
		audiences: [
			"Ondernemers",
			"Starters",
		],
	},

	{
		text: "Btw-aangifte doen voor Starters",
		href: "#",
		audiences: [
			"Ondernemers",
			"Starters",
		],
	},
	{
		text: "Hoe kom ik uit de schulden",
		href: "#",
		audiences: [
			"Ervaren ondernemers",
		],
	},
	{
		text: "Financiering vinden",
		href: "#",
		audiences: [
			"Ervaren ondernemers",
		],
	},
	{
		text: "Nieuw product vastleggen",
		href: "#",
		audiences: [
			"Ervaren ondernemers",
		],
	},
	{
		text: "Hoe ontsla ik personeel",
		href: "#",
		audiences: [
			"Ervaren ondernemers",
		],
	},
	{
		text: "Bedrijf verkopen of stoppen",
		href: "#",
		audiences: [
			"Ervaren ondernemers",
		],
	},
	{
		text: "Uitstel van betaling en betalingsregeling",
		href: "#",
		audiences: [
			"Ervaren ondernemers",
		],
	},
];

export const themes = [
	{
		text: "",
		href: "",
		audiences: [
			"Ondernemers",
			"Starters",
			"Ervaren ondernemers"
		],
	},
];

const isForAudience = (audience, {audiences}) => includes(audiences, audience);

export const filterByAudience = (audience, data) => data.filter(partial(isForAudience, audience));
export const filterWithoutAudience = (audience, data) => data.filter(partial(negate(isForAudience), audience));