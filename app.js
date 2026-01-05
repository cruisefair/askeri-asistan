// Örnek veri (Firebase olmadan)
const SAMPLE_LEGISLATION = [
    {
        id: '1',
        title: 'Askeri Ceza Kanunu',
        category: 'Ceza Kanunu',
        number: '1632',
        date: '22.05.1930',
        summary: 'Askeri suçlar ve cezalarla ilgili temel kanun.',
        content: 'Askeri suçlar ve bunlara verilecek cezalar bu kanunda düzenlenmiştir.'
    },
    {
        id: '2',
        title: 'Disiplin Kanunu',
        category: 'Disiplin',
        number: '477',
        date: '18.03.1926',
        summary: 'Askeri personelin disiplin işlemleri.',
        content: 'Askeri personele uygulanacak disiplin cezaları ve prosedürler bu kanunda belirtilmiştir.'
    },
    {
        id: '3',
        title: 'Yol Kanunu',
        category: 'Trafik',
        number: '2918',
        date: '13.10.1983',
        summary: 'Karayolları trafik güvenliği ile ilgili düzenlemeler.',
        content: 'Trafik kuralları ve güvenliği hakkında genel düzenlemeler.'
    }
];

const SAMPLE_WEAPONS = [
    {
        id: '1',
        name: 'MPT-76',
        type: 'Piyade Tüfeği',
        caliber: '7.62x51mm NATO',
        manufacturer: 'MKEK',
        specifications: {
            weight: '4.1 kg',
            length: '1007 mm',
            barrel_length: '419 mm',
            magazine_capacity: '20 mermi'
        },
        description: 'Türk Silahlı Kuvvetleri'nin standart piyade tüfeği.'
    },
    {
        id: '2',
        name: 'MPT-55',
        type: 'Piyade Tüfeği',
        caliber: '5.56x45mm NATO',
        manufacturer: 'MKEK',
        specifications: {
            weight: '3.5 kg',
            length: '885 mm',
            barrel_length: '406 mm',
            magazine_capacity: '30 mermi'
        },
        description: 'Hafif piyade tüfeği, özel birlikler tarafından kullanılır.'
    },
    {
        id: '3',
        name: 'SAR 109T',
        type: 'Tabanca',
        caliber: '9x19mm',
        manufacturer: 'Sarsilmaz',
        specifications: {
            weight: '0.95 kg',
            length: '200 mm',
            barrel_length: '112 mm',
            magazine_capacity: '17 mermi'
        },
        description: 'Yerli üretim standart tabanca.'
    }
];

// Uygulama State
let currentTab = 'legislation';
let currentView = 'list'; // 'list' veya 'detail'
let currentItem = null;
let legislationData = [...SAMPLE_LEGISLATION];
let weaponsData = [...SAMPLE_WEAPONS];
let isOnline = navigator.onLine;

// DOM Elements
const content = document.getElementById('content');
const offlineIndicator = document.getElementById('offline-indicator');
const navItems = document.querySelectorAll('.nav-item');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    updateOnlineStatus();
});

function initializeApp() {
    renderCurrentView();
}

function setupEventListeners() {
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            switchTab(tab);
        });
    });

    // Online/Offline status
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

function switchTab(tab) {
    currentTab = tab;
    currentView = 'list';
    currentItem = null;

    // Update nav
    navItems.forEach(item => {
        if (item.dataset.tab === tab) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    renderCurrentView();
}

function renderCurrentView() {
    if (currentView === 'list') {
        if (currentTab === 'legislation') {
            renderLegislationList();
        } else {
            renderWeaponsList();
        }
    } else if (currentView === 'detail') {
        if (currentTab === 'legislation') {
            renderLegislationDetail();
        } else {
            renderWeaponDetail();
        }
    }
}

function renderLegislationList() {
    const html = `
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Mevzuat ara..." id="search-input">
        </div>
        <div class="list-container" id="list-container">
            ${legislationData.map(item => `
                <div class="list-item" onclick="showDetail('legislation', '${item.id}')">
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <div class="meta">
                        <span>📁 ${item.category}</span>
                        <span>📋 ${item.number}</span>
                        <span>📅 ${item.date}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    content.innerHTML = html;

    // Search functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
        filterLegislation(e.target.value);
    });
}

function renderWeaponsList() {
    const html = `
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Silah ara..." id="search-input">
        </div>
        <div class="list-container" id="list-container">
            ${weaponsData.map(item => `
                <div class="list-item" onclick="showDetail('weapons', '${item.id}')">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="meta">
                        <span>🔫 ${item.type}</span>
                        <span>📏 ${item.caliber}</span>
                        <span>🏭 ${item.manufacturer}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    content.innerHTML = html;

    // Search functionality
    document.getElementById('search-input').addEventListener('input', (e) => {
        filterWeapons(e.target.value);
    });
}

function renderLegislationDetail() {
    const item = legislationData.find(l => l.id === currentItem);
    if (!item) return;

    const html = `
        <div class="detail-view">
            <button class="back-button" onclick="goBack()">← Geri</button>
            <h2>${item.title}</h2>

            <div class="info-section">
                <div class="info-label">Kategori</div>
                <div class="info-value">${item.category}</div>
            </div>

            <div class="info-section">
                <div class="info-label">Kanun Numarası</div>
                <div class="info-value">${item.number}</div>
            </div>

            <div class="info-section">
                <div class="info-label">Tarih</div>
                <div class="info-value">${item.date}</div>
            </div>

            <div class="info-section">
                <div class="info-label">Özet</div>
                <div class="info-value">${item.summary}</div>
            </div>

            <div class="info-section">
                <div class="info-label">İçerik</div>
                <div class="info-value">${item.content}</div>
            </div>
        </div>
    `;
    content.innerHTML = html;
}

function renderWeaponDetail() {
    const item = weaponsData.find(w => w.id === currentItem);
    if (!item) return;

    const html = `
        <div class="detail-view">
            <button class="back-button" onclick="goBack()">← Geri</button>
            <h2>${item.name}</h2>

            <div class="info-section">
                <div class="info-label">Tip</div>
                <div class="info-value">${item.type}</div>
            </div>

            <div class="info-section">
                <div class="info-label">Kalibre</div>
                <div class="info-value">${item.caliber}</div>
            </div>

            <div class="info-section">
                <div class="info-label">Üretici</div>
                <div class="info-value">${item.manufacturer}</div>
            </div>

            <div class="info-section">
                <div class="info-label">Teknik Özellikler</div>
                <div class="info-value">
                    ${Object.entries(item.specifications).map(([key, value]) => `
                        <div style="margin: 5px 0;">
                            <strong>${key.replace('_', ' ')}:</strong> ${value}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="info-section">
                <div class="info-label">Açıklama</div>
                <div class="info-value">${item.description}</div>
            </div>
        </div>
    `;
    content.innerHTML = html;
}

function showDetail(tab, id) {
    currentItem = id;
    currentView = 'detail';
    renderCurrentView();
}

function goBack() {
    currentView = 'list';
    currentItem = null;
    renderCurrentView();
}

function filterLegislation(query) {
    const filtered = SAMPLE_LEGISLATION.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase())
    );

    const container = document.getElementById('list-container');
    container.innerHTML = filtered.map(item => `
        <div class="list-item" onclick="showDetail('legislation', '${item.id}')">
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="meta">
                <span>📁 ${item.category}</span>
                <span>📋 ${item.number}</span>
                <span>📅 ${item.date}</span>
            </div>
        </div>
    `).join('');
}

function filterWeapons(query) {
    const filtered = SAMPLE_WEAPONS.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(query.toLowerCase())
    );

    const container = document.getElementById('list-container');
    container.innerHTML = filtered.map(item => `
        <div class="list-item" onclick="showDetail('weapons', '${item.id}')">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="meta">
                <span>🔫 ${item.type}</span>
                <span>📏 ${item.caliber}</span>
                <span>🏭 ${item.manufacturer}</span>
            </div>
        </div>
    `).join('');
}

function updateOnlineStatus() {
    isOnline = navigator.onLine;
    if (isOnline) {
        offlineIndicator.classList.add('hidden');
    } else {
        offlineIndicator.classList.remove('hidden');
    }
}