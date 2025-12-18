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
            id: 'forest_wisp',
            name: 'Ancient Wisp',
            type: 'creature',
            region: 'forest',
            x: 400,
            y: 300,
            size: 25,
            isBoss: false,
            moving: true,
            description: 'A flickering spirit that has watched over this forest for centuries. Its light dims and brightens with the rhythm of forgotten songs.'
        },
        {
            id: 'forest_stone',
            name: 'Whispering Stone',
            type: 'artifact',
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
            name: 'Forest Sprite',
            type: 'creature',
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
            name: 'The Elder Guardian',
            type: 'boss',
            region: 'forest',
            x: 1300,
            y: 800,
            size: 60,
            isBoss: true,
            moving: true,
            description: 'The ancient protector of the forest realm. Its presence is overwhelming, yet peaceful. Once discovered, it grants passage to colder lands.'
        }
    ],
    ice: [
        {
            id: 'ice_shard',
            name: 'Frozen Echo',
            type: 'artifact',
            region: 'ice',
            x: 500,
            y: 600,
            size: 28,
            isBoss: false,
            moving: false,
            description: 'A crystalline structure that seems to hold frozen moments in time. Approach carefully, for it reflects your own shadow back at you.'
        },
        {
            id: 'ice_wanderer',
            name: 'Glacial Wanderer',
            type: 'creature',
            region: 'ice',
            x: 900,
            y: 300,
            size: 22,
            isBoss: false,
            moving: true,
            description: 'A being made of ice and starlight, endlessly walking across the frozen plains, searching for something it cannot remember.'
        },
        {
            id: 'ice_titan',
            name: 'The Frost Colossus',
            type: 'boss',
            region: 'ice',
            x: 1200,
            y: 700,
            size: 70,
            isBoss: true,
            moving: false,
            description: 'An immense frozen giant, dormant for eons. Its discovery causes the very air to crystallize, opening the path to forgotten ruins.'
        }
    ],
    ruins: [
        {
            id: 'ruins_keeper',
            name: 'Silent Keeper',
            type: 'creature',
            region: 'ruins',
            x: 600,
            y: 400,
            size: 24,
            isBoss: false,
            moving: true,
            description: 'A faceless guardian that tends to ruins that predate history itself. It moves with purpose, maintaining order in the chaos of time.'
        },
        {
            id: 'ruins_throne',
            name: 'The Empty Throne',
            type: 'artifact',
            region: 'ruins',
            x: 1000,
            y: 500,
            size: 35,
            isBoss: false,
            moving: false,
            description: 'A seat of power from a civilization that vanished without trace. The air around it hums with the weight of forgotten authority.'
        },
        {
            id: 'ruins_sovereign',
            name: 'The Last Sovereign',
            type: 'boss',
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
            name: 'Reality Fragment',
            type: 'artifact',
            region: 'void',
            x: 700,
            y: 500,
            size: 26,
            isBoss: false,
            moving: true,
            description: 'A piece of something that should not exist. It shifts between states, neither here nor there, a reminder that all things fade.'
        },
        {
            id: 'void_watcher',
            name: 'The Unmade',
            type: 'creature',
            region: 'void',
            x: 1100,
            y: 400,
            size: 30,
            isBoss: false,
            moving: true,
            description: 'An entity that exists in the space between existence and non-existence. To see it is to understand the nature of endings.'
        },
        {
            id: 'void_archive',
            name: 'The Shadow Archive',
            type: 'boss',
            region: 'void',
            x: 1200,
            y: 700,
            size: 80,
            isBoss: true,
            moving: false,
            description: 'The heart of all forgotten things. A repository of shadows, memories, and lost worlds. You have reached the end of your journey.'
        }
    ]
};
