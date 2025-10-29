// Interactive Comparison Tool JavaScript
// أداة المقارنة التفاعلية

class ComparisonTool {
    constructor() {
        this.items = [];
        this.features = [];
        this.data = {};
        this.init();
    }

    init() {
        // Cache DOM elements
        this.table = document.getElementById('comparisonTable');
        this.headerRow = document.getElementById('headerRow');
        this.tbody = document.getElementById('comparisonBody');
        this.emptyState = document.getElementById('emptyState');
        this.featureControls = document.getElementById('featureControls');
        this.actionButtons = document.getElementById('actionButtons');
        
        // Bind event listeners
        this.bindEvents();
        
        // Load saved comparison from localStorage
        this.loadSavedComparison();
    }

    bindEvents() {
        // Add item button
        const addItemBtn = document.getElementById('addItemBtn');
        const itemNameInput = document.getElementById('itemName');
        
        addItemBtn?.addEventListener('click', () => {
            const name = itemNameInput.value.trim();
            if (name) {
                this.addItem(name);
                itemNameInput.value = '';
            }
        });

        // Enter key for adding item
        itemNameInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const name = itemNameInput.value.trim();
                if (name) {
                    this.addItem(name);
                    itemNameInput.value = '';
                }
            }
        });

        // Add feature button
        const addFeatureBtn = document.getElementById('addFeatureBtn');
        const featureNameInput = document.getElementById('featureName');
        
        addFeatureBtn?.addEventListener('click', () => {
            const name = featureNameInput.value.trim();
            if (name) {
                this.addFeature(name);
                featureNameInput.value = '';
            }
        });

        // Enter key for adding feature
        featureNameInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const name = featureNameInput.value.trim();
                if (name) {
                    this.addFeature(name);
                    featureNameInput.value = '';
                }
            }
        });

        // Action buttons
        document.getElementById('clearAllBtn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all items and features?')) {
                this.clearAll();
            }
        });

        document.getElementById('exportBtn')?.addEventListener('click', () => {
            this.exportAsImage();
        });

        document.getElementById('shareBtn')?.addEventListener('click', () => {
            this.shareComparison();
        });

        document.getElementById('printBtn')?.addEventListener('click', () => {
            window.print();
        });

        // Template buttons
        document.querySelectorAll('.template-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const template = e.currentTarget.dataset.template;
                this.loadTemplate(template);
            });
        });

        // Category selector
        document.getElementById('categorySelect')?.addEventListener('change', (e) => {
            if (e.target.value) {
                this.loadTemplate(e.target.value);
            }
        });
    }

    addItem(name) {
        if (this.items.includes(name)) {
            alert('This item already exists!');
            return;
        }

        this.items.push(name);
        this.updateTable();
        this.saveToLocalStorage();
        
        // Show controls if first item
        if (this.items.length === 1) {
            this.showControls();
        }
    }

    addFeature(name) {
        if (this.features.includes(name)) {
            alert('This feature already exists!');
            return;
        }

        this.features.push(name);
        this.updateTable();
        this.saveToLocalStorage();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.updateTable();
        this.saveToLocalStorage();
        
        if (this.items.length === 0) {
            this.hideControls();
        }
    }

    removeFeature(index) {
        this.features.splice(index, 1);
        this.updateTable();
        this.saveToLocalStorage();
    }

    updateTable() {
        if (this.items.length === 0) {
            this.table.style.display = 'none';
            this.emptyState.style.display = 'block';
            return;
        }

        this.table.style.display = 'table';
        this.emptyState.style.display = 'none';

        // Update header row
        this.headerRow.innerHTML = '<th style="padding: 1rem; text-align: left; font-weight: 600; border-right: 2px solid #000; min-width: 150px;">Features</th>';
        
        this.items.forEach((item, index) => {
            const th = document.createElement('th');
            th.style.cssText = 'padding: 1rem; text-align: center; font-weight: 600; border-right: 2px solid #000; min-width: 200px; position: relative;';
            th.innerHTML = `
                ${item}
                <button onclick="comparisonTool.removeItem(${index})" 
                        style="position: absolute; top: 0.5rem; right: 0.5rem; background: #ff0000; color: white; border: none; padding: 0.25rem 0.5rem; cursor: pointer; font-size: 0.75rem;">
                    ✕
                </button>
            `;
            this.headerRow.appendChild(th);
        });

        // Update body rows
        this.tbody.innerHTML = '';
        
        // Add default features if none exist
        if (this.features.length === 0 && this.items.length > 0) {
            this.features = ['Price', 'Rating', 'Pros', 'Cons'];
        }

        this.features.forEach((feature, featureIndex) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #ccc';
            
            // Feature name cell
            const featureCell = document.createElement('td');
            featureCell.style.cssText = 'padding: 1rem; font-weight: 600; border-right: 2px solid #000; position: relative;';
            featureCell.innerHTML = `
                ${feature}
                <button onclick="comparisonTool.removeFeature(${featureIndex})" 
                        style="position: absolute; top: 0.5rem; right: 0.5rem; background: #ff0000; color: white; border: none; padding: 0.2rem 0.4rem; cursor: pointer; font-size: 0.7rem;">
                    ✕
                </button>
            `;
            tr.appendChild(featureCell);

            // Data cells for each item
            this.items.forEach((item, itemIndex) => {
                const td = document.createElement('td');
                td.style.cssText = 'padding: 1rem; border-right: 1px solid #ccc;';
                
                const key = `${feature}_${item}`;
                const value = this.data[key] || '';
                
                td.innerHTML = `
                    <div contenteditable="true" 
                         data-feature="${feature}" 
                         data-item="${item}"
                         style="min-height: 30px; padding: 0.5rem; border: 1px solid transparent; transition: all 0.3s;"
                         onblur="comparisonTool.updateData('${feature}', '${item}', this.textContent)"
                         onfocus="this.style.borderColor='#000'"
                         onblur="this.style.borderColor='transparent'">
                        ${value}
                    </div>
                `;
                tr.appendChild(td);
            });

            this.tbody.appendChild(tr);
        });
    }

    updateData(feature, item, value) {
        const key = `${feature}_${item}`;
        this.data[key] = value;
        this.saveToLocalStorage();
    }

    showControls() {
        this.featureControls.style.display = 'block';
        this.actionButtons.style.display = 'flex';
    }

    hideControls() {
        this.featureControls.style.display = 'none';
        this.actionButtons.style.display = 'none';
    }

    clearAll() {
        this.items = [];
        this.features = [];
        this.data = {};
        this.updateTable();
        this.hideControls();
        localStorage.removeItem('comparisonData');
    }

    saveToLocalStorage() {
        const data = {
            items: this.items,
            features: this.features,
            data: this.data
        };
        localStorage.setItem('comparisonData', JSON.stringify(data));
    }

    loadSavedComparison() {
        const saved = localStorage.getItem('comparisonData');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.items = data.items || [];
                this.features = data.features || [];
                this.data = data.data || {};
                
                if (this.items.length > 0) {
                    this.showControls();
                    this.updateTable();
                }
            } catch (e) {
                console.error('Error loading saved comparison:', e);
            }
        }
    }

    loadTemplate(templateName) {
        const templates = {
            smartphones: {
                items: ['iPhone 15 Pro', 'Samsung S24 Ultra', 'Google Pixel 8 Pro'],
                features: ['Price', 'Display', 'Camera', 'Battery', 'Storage', 'Processor', 'RAM', 'OS', 'Weight', 'Rating']
            },
            laptops: {
                items: ['MacBook Pro', 'Dell XPS', 'ThinkPad X1'],
                features: ['Price', 'Processor', 'RAM', 'Storage', 'Display', 'Battery Life', 'Weight', 'OS', 'Ports', 'Rating']
            },
            streaming: {
                items: ['Netflix', 'Disney+', 'HBO Max', 'Amazon Prime'],
                features: ['Monthly Price', 'Content Library', 'Original Shows', 'Video Quality', 'Simultaneous Streams', 'Offline Downloads', 'Supported Devices', 'Free Trial', 'Rating']
            },
            cars: {
                items: ['Tesla Model 3', 'Toyota Camry', 'Honda Civic'],
                features: ['Price', 'MPG/Range', 'Acceleration', 'Top Speed', 'Seating', 'Cargo Space', 'Safety Rating', 'Warranty', 'Features', 'Rating']
            },
            gaming: {
                items: ['PlayStation 5', 'Xbox Series X', 'Nintendo Switch'],
                features: ['Price', 'Processor', 'GPU', 'RAM', 'Storage', 'Resolution', 'Frame Rate', 'Exclusive Games', 'Online Service', 'Rating']
            },
            custom: {
                items: [],
                features: []
            }
        };

        const template = templates[templateName];
        if (template) {
            if (this.items.length > 0 || this.features.length > 0) {
                if (!confirm('Loading a template will clear your current comparison. Continue?')) {
                    return;
                }
            }

            this.items = [...template.items];
            this.features = [...template.features];
            this.data = {};
            
            if (this.items.length > 0) {
                this.showControls();
            }
            
            this.updateTable();
            this.saveToLocalStorage();
        }
    }

    exportAsImage() {
        // Use html2canvas library for this feature
        alert('Export feature requires html2canvas library. This would convert the table to an image for download.');
        
        // Implementation would be:
        // html2canvas(this.table).then(canvas => {
        //     const link = document.createElement('a');
        //     link.download = 'comparison.png';
        //     link.href = canvas.toDataURL();
        //     link.click();
        // });
    }

    shareComparison() {
        const shareData = {
            items: this.items,
            features: this.features,
            data: this.data
        };
        
        const shareUrl = window.location.origin + window.location.pathname + '#' + btoa(JSON.stringify(shareData));
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Share link copied to clipboard!');
        }).catch(() => {
            prompt('Copy this link to share:', shareUrl);
        });
    }
}

// Initialize the comparison tool when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.comparisonTool = new ComparisonTool();
    
    // Check if there's shared data in URL
    if (window.location.hash) {
        try {
            const sharedData = JSON.parse(atob(window.location.hash.substring(1)));
            if (sharedData.items && sharedData.features) {
                window.comparisonTool.items = sharedData.items;
                window.comparisonTool.features = sharedData.features;
                window.comparisonTool.data = sharedData.data || {};
                window.comparisonTool.showControls();
                window.comparisonTool.updateTable();
                window.comparisonTool.saveToLocalStorage();
            }
        } catch (e) {
            console.error('Error loading shared data:', e);
        }
    }
});
