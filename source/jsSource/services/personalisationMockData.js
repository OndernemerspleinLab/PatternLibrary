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
		href: "../05-usability-01-starter-02-alle-rechtsvormen/05-usability-01-starter-02-alle-rechtsvormen.html",
		audiences: [
			"Ondernemers",
			"Starters",
		],
	},

	{
		text: "De VAR: onmisbaar voor zzp'ers",
		href: "../05-usability-03-zzp-03-var-onmisbaar/05-usability-03-zzp-03-var-onmisbaar.html",
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
		href: "../05-usability-01-starter-00-aangifte-doen/05-usability-01-starter-00-aangifte-doen.html",
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
			"../05-usability-02-mkb-00-omgevingsvergunning/05-usability-02-mkb-00-omgevingsvergunning.html",
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

export const stories = [
	{
		img: '../../images/homepage/header-ondernemer-krijn-ratsma1440.jpg',
		quote: 'Doe de dingen waar je zelf energie van krijgt',
		citation: 'Krijn Ratsma',
		href: 'http://verhalen.ondernemersplein.nl/artikelen/#2590/krijn-ratsma',
		audiences: [
			"Ondernemers",
		],
	},


	{
		img: '../../images/homepage/header-starter-wouterjan-stikkel1440.jpg',
		quote: 'Ik heb alles gefinancierd met zakgeld',
		citation: 'Wouterjan Stikkel',
		href: 'http://verhalen.ondernemersplein.nl/artikelen/#1533/wouterjan-stikkel',
		audiences: [
			"Starters",
		],
	},

	{
		img: '../../images/homepage/header-starter-ted-griffioen1440.jpg',
		quote: 'Wij kunnen onze eigen werkplek gaaf maken',
		citation: 'Ted Griffioen',
		href: 'http://verhalen.ondernemersplein.nl/artikelen/#2439/ted-griffioen​',
		audiences: [
			"Ervaren ondernemers",
		],
	},
];

const isForAudience = (audience, {audiences}) => includes(audiences, audience);

export const filterByAudience = (audience, data) => data.filter(partial(isForAudience, audience));
export const filterWithoutAudience = (audience, data) => data.filter(partial(negate(isForAudience), audience));