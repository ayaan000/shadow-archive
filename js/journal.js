/**
 * Journal - Manages discovered entries and UI
 */

export class Journal {
    constructor() {
        this.entries = new Map(); // id -> entry data
        this.isOpen = false;

        // DOM elements
        this.journalUI = document.getElementById('journal-ui');
        this.journalContent = document.getElementById('journal-content');
        this.closeBtn = document.getElementById('close-journal');

        // Setup close button
        this.closeBtn.addEventListener('click', () => this.close());

        // Load saved progress from localStorage
        this.loadProgress();
    }

    addEntry(entry) {
        this.entries.set(entry.id, {
            id: entry.id,
            name: entry.name,
            region: entry.region,
            description: entry.description,
            discovered: entry.discovered
        });
    }

    markDiscovered(id) {
        const entry = this.entries.get(id);
        if (entry) {
            entry.discovered = true;
            this.saveProgress();
            this.render();
            return entry;
        }
        return null;
    }

    isDiscovered(id) {
        const entry = this.entries.get(id);
        return entry ? entry.discovered : false;
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.journalUI.classList.remove('hidden');
        this.render();
    }

    close() {
        this.isOpen = false;
        this.journalUI.classList.add('hidden');
    }

    render() {
        // Clear existing content
        this.journalContent.innerHTML = '';

        // Group entries by region
        const regions = {};
        this.entries.forEach(entry => {
            if (!regions[entry.region]) {
                regions[entry.region] = [];
            }
            regions[entry.region].push(entry);
        });

        // Render each region's entries
        Object.keys(regions).forEach(regionName => {
            const regionEntries = regions[regionName];

            regionEntries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'journal-entry' + (entry.discovered ? '' : ' locked');

                const header = document.createElement('div');
                header.className = 'entry-header';

                const title = document.createElement('div');
                title.className = 'entry-title';
                title.textContent = entry.discovered ? entry.name : '???';

                const region = document.createElement('div');
                region.className = 'entry-region';
                region.textContent = entry.discovered ? this.formatRegionName(entry.region) : 'Unknown';

                header.appendChild(title);
                header.appendChild(region);

                const description = document.createElement('div');
                description.className = 'entry-description';
                description.textContent = entry.discovered ? entry.description : 'This knowledge remains hidden in shadow...';

                entryDiv.appendChild(header);
                entryDiv.appendChild(description);
                this.journalContent.appendChild(entryDiv);
            });
        });

        // Show message if no entries
        if (this.entries.size === 0) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'entry-description';
            emptyMsg.style.textAlign = 'center';
            emptyMsg.style.padding = '40px';
            emptyMsg.textContent = 'Explore the world to discover its secrets...';
            this.journalContent.appendChild(emptyMsg);
        }
    }

    formatRegionName(regionId) {
        const names = {
            forest: 'The Forest',
            ice: 'The Frozen Wastes',
            ruins: 'The Ancient Ruins',
            void: 'The Void'
        };
        return names[regionId] || regionId;
    }

    saveProgress() {
        const discovered = [];
        this.entries.forEach(entry => {
            if (entry.discovered) {
                discovered.push(entry.id);
            }
        });
        localStorage.setItem('shadowArchive_discovered', JSON.stringify(discovered));
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('shadowArchive_discovered');
            if (saved) {
                const discovered = JSON.parse(saved);
                return discovered;
            }
        } catch (e) {
            console.error('Failed to load progress:', e);
        }
        return [];
    }

    getDiscoveredIds() {
        return this.loadProgress();
    }
}
