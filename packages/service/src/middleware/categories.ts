// Blablabla I know it would be better to store the questions in the database
// but I don't have the time for this, so I'm gonna rush it.
// Also it would be unnecessary work for this small task

import { Category } from '../types/category';

const categories = [
  {
    title: 'general',
    translations: {
      en: 'General',
      de: 'Allgemein',
    },
    questions: [
      {
        name: 'howSatisfiedAreYouWithOurNetworkInTotal',
        translations: {
          de: 'Wie zufrieden bist du mit dem Netzwerk im Ganzen?',
          en: 'How satisfied are you with our network in total?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'howSatisfiedAreYouWithOurSystems',
        translations: {
          de:
            'Wie zufrieden bist du mit unseren Systemen (Party, Freunde etc.)?',
          en: 'How satisfied are you with our systems (party, friends etc.)?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'whatIsYourFavoriteGamemodeOnLuminu',
        translations: {
          de: 'Was ist dein favorisierter Spielmodus auf dem Netzwerk?',
          en: 'What is your favorite gamemode on Luminu?',
        },
        isRequired: false,
        value: '',
        customs: ['Rush', 'Bedwars', 'Skypvp'],
        type: 'custom',
      },
    ],
  },
  {
    title: 'rush',
    translations: {
      en: 'Rush',
      de: 'Rush',
    },
    questions: [
      {
        name: 'HowsatisfiedareyouwiththeRushgamemode?',
        translations: {
          de: 'Wie zufrieden bist du mit dem Spielmodus Rush?',
          en: 'How satisfied are you with the Rush game mode?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'HowsatisfiedareyouwiththeshopinRush',
        translations: {
          de: 'Wie zufrieden bist du mit dem Shop in Rush?',
          en: 'How satisfied are you with the shop in Rush?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'HowsatisfiedareyouwiththemapsinRush',
        translations: {
          de: 'Wie zufrieden bist du mit den Maps in Rush?',
          en: 'How satisfied are you with the maps in Rush?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'Whichchangesintheshopwouldyousuggest',
        translations: {
          de: 'Welche Änderungen im Shop würdest du vorschlagen?',
          en: 'Which changes in the shop would you suggest?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
      {
        name: 'Whatchangeswouldyouliketoseeinthemaps',
        translations: {
          de: 'Welche Änderungen wünscht du dir an den Maps?',
          en: 'What changes would you like to see in the maps?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
      {
        name: 'Whatchangeswouldyouliketoseeinthegamemode',
        translations: {
          de: 'Welche Änderungen wünscht du dir am Spielmodus?',
          en: 'What changes would you like to see in the game mode?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
    ],
  },
  {
    title: 'bedwars',
    translations: {
      en: 'BedWars',
      de: 'BedWars',
    },
    questions: [
      {
        name: 'HowsatisfiedareyouwiththeBWgamemode?',
        translations: {
          de: 'Wie zufrieden bist du mit dem Spielmodus BedWars?',
          en: 'How satisfied are you with the BedWars game mode?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'HowsatisfiedareyouwiththeshopinBW',
        translations: {
          de: 'Wie zufrieden bist du mit dem Shop in BedWars?',
          en: 'How satisfied are you with the shop in BedWars?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'HowsatisfiedareyouwiththemapsinBW',
        translations: {
          de: 'Wie zufrieden bist du mit den Maps in BedWars?',
          en: 'How satisfied are you with the maps in BedWars?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'WhichchangesintheshopwouldyousuggestBW',
        translations: {
          de: 'Welche Änderungen im Shop würdest du vorschlagen?',
          en: 'Which changes in the shop would you suggest?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
      {
        name: 'WhatchangeswouldyouliketoseeinthemapsBW',
        translations: {
          de: 'Welche Änderungen wünscht du dir an den Maps?',
          en: 'What changes would you like to see in the maps?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
      {
        name: 'WhatchangeswouldyouliketoseeinthegamemodeBW',
        translations: {
          de: 'Welche Änderungen wünscht du dir am Spielmodus?',
          en: 'What changes would you like to see in the game mode?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
    ],
  },
  {
    title: 'skypvp',
    translations: {
      en: 'SkyPVP',
      de: 'SkyPVP',
    },
    questions: [
      {
        name: 'Howsatisfiedareyouwiththeskypvpgamemode?',
        translations: {
          de: 'Wie zufrieden bist du mit dem Spielmodus SkyPVP?',
          en: 'How satisfied are you with the SkyPVP game mode?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'Howsatisfiedareyouwiththemapsinskypvp',
        translations: {
          de: 'Wie zufrieden bist du mit der Map in SkyPVP?',
          en: 'How satisfied are you with the map in SkyPVP?',
        },
        isRequired: true,
        value: '',
        customs: [],
        type: 'number',
      },
      {
        name: 'Whichchangesintheshopwouldyousuggestskypvp',
        translations: {
          de: 'Welche Änderungen in den Shops würdest du vorschlagen?',
          en: 'Which changes in the shops would you suggest?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
      {
        name: 'Whatchangeswouldyouliketoseeinthemapsskypvp',
        translations: {
          de: 'Welche Änderungen wünscht du dir an der Map?',
          en: 'What changes would you like to see in the map?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
      {
        name: 'WhatchangeswouldyouliketoseeintheSkyPvPgamemode',
        translations: {
          de:
            'Was für Änderungen würdest du dir am Spielmodus SkyPvP wünschen?',
          en: 'What changes would you like to see in the SkyPvP game mode?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
    ],
  },
  {
    title: 'finalSection',
    translations: {
      de: 'Schlussteil',
      en: 'Final Section',
    },
    questions: [
      {
        name: 'Whichgamemodewouldyoupreferonthenetwork',
        translations: {
          de: 'Welchen Spielmodus würdest du dir auf dem Netzwerk wünschen?',
          en: 'Which game mode would you like to see on the network?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
      {
        name: 'Whatsystemswouldyouliketoseeonthenetwork',
        translations: {
          de: 'Welche Systeme würdest du dir auf dem Netzwerk wünschen?',
          en: 'What systems would you like to see on the network?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
      {
        name: 'Whatelsewouldyouliketoremark',
        translations: {
          de: 'Was möchtest du noch anmerken?',
          en: 'What else would you like to remark?',
        },
        isRequired: false,
        value: '',
        customs: [],
        type: 'text',
      },
    ],
  },
] as Category[];

export { categories };
