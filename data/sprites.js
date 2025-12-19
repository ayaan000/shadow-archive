/**
 * Pixel Art Sprites
 * Defined as 8x8 or 16x16 grids of characters
 */

export const SPRITES = {
    // Forest Creatures
    cat: {
        width: 11,
        height: 10,
        frames: [
            [
                "...........  ",
                "x...x......  ",
                "xx.xx......  ",
                "xxxxxx.....  ",
                "xxxxxxx....  ",
                "xxxxxxxxx..  ",
                ".xxxxxxxxx.  ",
                ".xx.xxx.xx.  ",
                ".xx.....xx.  ",
                "...........  "
            ],
            [
                "...........  ",
                "x...x......  ",
                "xx.xx......  ",
                "xxxxxx.....  ",
                "xxxxxxx....  ",
                "xxxxxxxxx..  ",
                ".xxxxxxxxx.  ",
                ".xx.xxx.xx.  ",
                "..x.....x..  ",
                "...........  "
            ]
        ]
    },

    // Forest Artifact
    stone: {
        width: 10,
        height: 10,
        frames: [[
            "   .xx.   ",
            "  xxxxxx  ",
            " xxxxxxxx ",
            " xoxxxoxx ",
            " xxxxxxxx ",
            " xxxxxxxx ",
            " xxxxxxxx ",
            " xxxxxxxx ",
            "  xxxxxx  ",
            "   xxxx   "
        ]]
    },

    // Ice Creature (Fox)
    fox: {
        width: 12,
        height: 10,
        frames: [
            [
                "........... ",
                "..x...x.... ",
                ".xxx.xxx... ",
                ".xxxxxxx... ",
                ".xxxxxxx... ",
                ".xxxxxxxxx. ",
                ".xxxxxxxxx. ",
                "..xx..xx... ",
                "..xx..xx... ",
                "........... "
            ],
            [
                "........... ",
                "..x...x.... ",
                ".xxx.xxx... ",
                ".xxxxxxx... ",
                ".xxxxxxx... ",
                ".xxxxxxxxx. ",
                ".xxxxxxxxx. ",
                "..xx..xx... ",
                "...x...x... ",
                "........... "
            ]
        ]
    },

    // Ice Artifact
    crystal: {
        width: 8,
        height: 12,
        frames: [[
            "   xx   ",
            "  xxxx  ",
            "  xoxx  ",
            " xxxxx  ",
            " xxoxx  ",
            " xxxxx  ",
            " xxoxx  ",
            " xxxxx  ",
            "  xxxx  ",
            "  xxxx  ",
            "   xx   ",
            "   xx   "
        ]]
    },

    // Ruins Creature (Golem)
    golem: {
        width: 12,
        height: 12,
        frames: [
            [
                "   xxxxxx   ",
                "  xxxxxxxx  ",
                "  xxoxxoxx  ",
                "  xxxxxxxx  ",
                " xxxxxxxxxx ",
                " xxxxxxxxxx ",
                "  xx xx xx  ",
                "  xx xx xx  ",
                "  xx xx xx  ",
                "  xx    xx  ",
                " xxx    xxx ",
                "            "
            ],
            [
                "   xxxxxx   ",
                "  xxxxxxxx  ",
                "  xxoxxoxx  ",
                "  xxxxxxxx  ",
                " xxxxxxxxxx ",
                " xxxxxxxxxx ",
                "  xx xx xx  ",
                "  xx xx xx  ",
                "  xx xx xx  ",
                "  xx    xx  ",
                " xxx    xxx ",
                "            "
            ]
        ]
    },

    // Ruins Artifact
    tablet: {
        width: 10,
        height: 12,
        frames: [[
            " xxxxxxxx ",
            " xxxxxxxx ",
            " xxoxxoxx ",
            " xxxxxxxx ",
            " xxoxxoxx ",
            " xxxxxxxx ",
            " xxoxxoxx ",
            " xxxxxxxx ",
            " xxoxxoxx ",
            " xxxxxxxx ",
            " xxxxxxxx ",
            "          "
        ]]
    },

    // Void Creature (Shadow Cat)
    shadow_cat: {
        width: 12,
        height: 11,
        frames: [
            [
                "x...x.......",
                "xx.xx.......",
                "xxxxxx......",
                "xxxxxxxx....",
                "xxxxxxxxx...",
                "xxxxxxxxxxx.",
                ".xxxxxxxxxxx",
                ".xxxxxxxxxxx",
                ".xxx.xxx.xxx",
                ".xxx.....xxx",
                "............",
                "............"
            ],
            [
                "x...x.......",
                "xx.xx.......",
                "xxxxxx......",
                "xxxxxxxx....",
                "xxxxxxxxx...",
                "xxxxxxxxxxx.",
                ".xxxxxxxxxxx",
                ".xxx.xxx.xxx",
                "..x.......x.",
                "............",
                "............"
            ]
        ]
    },

    // Void Artifact
    void_shard: {
        width: 10,
        height: 10,
        frames: [[
            "    xx    ",
            "   xxxx   ",
            "  xxxxxx  ",
            " xxxxxxxx ",
            " xxxxxxxx ",
            " xxxxxxxx ",
            "  xxxxxx  ",
            "   xxxx   ",
            "    xx    ",
            "          "
        ]]
    },

    // Bosses
    boss_stag: {
        width: 16,
        height: 16,
        frames: [[
            "      x    x    ",
            "     xx    xx   ",
            "    xxx    xxx  ",
            "   xxxx    xxxx ",
            "  xxxxx    xxxxx",
            "  xxxxxxxxxxxxxx",
            "  xxxxxxxxxxxxxx",
            "   xxxxxxxxxxxx ",
            "   xx oxx oxx   ",
            "   xxxxxxxxxxxx ",
            "    xxxxxxxxxx  ",
            "    xx      xx  ",
            "    xx      xx  ",
            "   xxx      xxx ",
            "                ",
            "                "
        ]]
    },

    boss_bear: {
        width: 18,
        height: 14,
        frames: [[
            "      xxxxxx      ",
            "    xxxxxxxxxx    ",
            "   xxxxxxxxxxxx   ",
            "  xxxxxxxxxxxxxx  ",
            "  xx oxxxxxxo xx  ",
            " xxxxxxxxxxxxxxxx ",
            "xxxxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxxxx",
            "xxxxxxxxxxxxxxxxxx",
            " xxxx        xxxx ",
            " xxxx        xxxx ",
            "  xx          xx  ",
            "                  ",
            "                  "
        ]]
    },

    boss_construct: {
        width: 16,
        height: 18,
        frames: [[
            "     xxxxxx     ",
            "    xxxxxxxx    ",
            "    xxoxxoxx    ",
            "    xxxxxxxx    ",
            "   xxxxxxxxxx   ",
            "  xxxxxxxxxxxx  ",
            "  xxxxxxxxxxxx  ",
            "  xxxxxxxxxxxx  ",
            "   xxxxxxxxxx   ",
            "   xx  xx  xx   ",
            "   xx  xx  xx   ",
            "   xx  xx  xx   ",
            "   xx  xx  xx   ",
            "  xxx  xx  xxx  ",
            "                ",
            "                ",
            "                ",
            "                "
        ]]
    },

    boss_eye: {
        width: 16,
        height: 16,
        frames: [[
            "      xxxx      ",
            "    xxxxxxxx    ",
            "   xxxxxxxxxx   ",
            "  xxxxxxxxxxxx  ",
            "  xxxxoxxoxxxx  ",
            " xxxxxxxxxxxxxx ",
            " xxxxxxxxxxxxxx ",
            " xxxxxxxxxxxxxx ",
            "  xxoxxxxxxoxx  ",
            "  xxxxxxxxxxxx  ",
            "   xxxxxxxxxx   ",
            "    xxxxxxxx    ",
            "      xxxx      ",
            "                ",
            "                ",
            "                "
        ]]
    }
};
