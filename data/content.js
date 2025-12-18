/**
 * Content Data for The Shadow Archive
 * Contains region configurations and entity definitions
 */

// Region definitions with visual themes
export const REGIONS = {
    forest: {
        id: 'forest',
        name: 'The Forest',
        bgColor: '#0a1412',
        accentColor: '#2d5f4a',
        glowColor: '#4ecca3',
        width: 1600,
        height: 1200,
        nextRegion: 'ice'
    },
    ice: {
        id: 'ice',
        name: 'The Frozen Wastes',
        bgColor: '#0a0f1a',
        accentColor: '#3d5a80',
        glowColor: '#98c1d9',
        width: 1600,
        height: 1200,
        nextRegion: 'ruins'
    },
    ruins: {
        id: 'ruins',
        name: 'The Ancient Ruins',
        bgColor: '#1a1410',
        accentColor: '#6b5b3d',
        glowColor: '#d4a574',
        width: 1600,
        height: 1200,
        nextRegion: 'void'
    },
    void: {
        id: 'void',
        name: 'The Void',
        bgColor: '#050505',
        accentColor: '#2a1a3d',
        glowColor: '#9d4edd',
        width: 1600,
        height: 1200,
        nextRegion: null
    }
};

// Entity definitions
export const ENTITIES = {
    forest: [
        {
            id: 'forest_cat',
            name: 'Forest Cat',
            type: 'creature',
            sprite: 'cat',
            region: 'forest',
            x: 400,
            y: 300,
            size: 25,
            isBoss: false,
            moving: true,
            description: 'A small feline spirit with mossy fur. It watches silently from the shadows, guiding travelers with its glowing eyes.'
        },
        {
            id: 'forest_stone',
            name: 'Whispering Stone',
            type: 'artifact',
            sprite: 'stone',
            region: 'forest',
            x: 800,
            y: 500,
            size: 30,
            isBoss: false,
            moving: false,
            description: 'An ancient monolith covered in moss. Those who listen closely can hear faint echoes of a language long lost to time.'
        },
        {
            id: 'forest_sprite',
            name: 'Wandering Spirit',
            type: 'creature',
            sprite: 'cat', // Reusing cat sprite but maybe tinted differently in render
            region: 'forest',
            x: 1200,
            y: 400,
            size: 20,
            isBoss: false,
            moving: true,
            description: 'A playful entity that dances between the trees. It leaves trails of shimmering light that fade like forgotten memories.'
        },
        {
            id: 'forest_elder',
            name: 'The Guardian Stag',
            type: 'boss',
            sprite: 'boss_stag',
            region: 'forest',
            x: 1300,
            y: 800,
            size: 60,
            isBoss: true,
            moving: true,
            description: 'The ancient protector of the forest realm. Its antlers reach for the stars. Discovery grants passage to colder lands.'
        }
    ],
    ice: [
        {
            id: 'ice_shard',
            name: 'Frozen Echo',
            type: 'artifact',
            sprite: 'crystal',
            region: 'ice',
            x: 500,
            y: 600,
            size: 28,
            isBoss: false,
            moving: false,
            description: 'A crystalline structure that seems to hold frozen moments in time. Approach carefully, for it reflects your own shadow back at you.'
        },
        {
            id: 'ice_fox',
            name: 'Snow Fox',
            type: 'creature',
            sprite: 'fox',
            region: 'ice',
            x: 900,
            y: 300,
            size: 22,
            isBoss: false,
            moving: true,
            description: 'A creature of ice and starlight, endlessly walking across the frozen plains, searching for something it cannot remember.'
        },
        {
            id: 'ice_titan',
            name: 'The Frost Bear',
            type: 'boss',
            sprite: 'boss_bear',
            region: 'ice',
            x: 1200,
            y: 700,
            size: 70,
            isBoss: true,
            moving: true, // Bears move
            description: 'An immense frozen giant. Its discovery causes the very air to crystallize, opening the path to forgotten ruins.'
        }
    ],
    ruins: [
        {
            id: 'ruins_golem',
            name: 'Rune Golem',
            type: 'creature',
            sprite: 'golem',
            region: 'ruins',
            x: 600,
            y: 400,
            size: 24,
            isBoss: false,
            moving: true,
            description: 'A construct of stone and magic, tending to ruins that predate history itself. It moves with purpose, maintaining order.'
        },
        {
            id: 'ruins_tablet',
            name: 'Ancient Tablet',
            type: 'artifact',
            sprite: 'tablet',
            region: 'ruins',
            x: 1000,
            y: 500,
            size: 35,
            isBoss: false,
            moving: false,
            description: 'A record from a civilization that vanished without trace. The runes glow with the weight of forgotten authority.'
        },
        {
            id: 'ruins_sovereign',
            name: 'The Construct King',
            type: 'boss',
            sprite: 'boss_construct',
            region: 'ruins',
            x: 1300,
            y: 600,
            size: 65,
            isBoss: true,
            moving: true,
            description: 'The final ruler of a nameless empire. Its presence is both regal and sorrowful. Discovery grants passage into the void itself.'
        }
    ],
    void: [
        {
            id: 'void_fragment',
            name: 'Void Shard',
            type: 'artifact',
            sprite: 'void_shard',
            region: 'void',
            x: 700,
            y: 500,
            size: 26,
            isBoss: false,
            moving: true,
            description: 'A piece of something that should not exist. It shifts between states, neither here nor there.'
        },
        {
            id: 'void_cat',
            name: 'Shadow Cat',
            type: 'creature',
            sprite: 'shadow_cat',
            region: 'void',
            x: 1100,
            y: 400,
            size: 30,
            isBoss: false,
            moving: true,
            description: 'An entity that exists in the space between existence and non-existence. It purrs with the sound of silence.'
        },
        {
            id: 'void_eye',
            name: 'The All-Seeing Eye',
            type: 'boss',
            sprite: 'boss_eye',
            region: 'void',
            x: 1200,
            y: 700,
            size: 80,
            isBoss: true,
            moving: false,
            description: 'The heart of all forgotten things. It watches all, sees all. You have reached the end of your journey.'
        }
    ]
};
