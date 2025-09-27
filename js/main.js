class SafetyReportSystem {
    constructor() {
        this.selectedArea = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress(16.67);
    }

    bindEvents() {
        // Selección de área → redirige inmediatamente
        document.querySelectorAll('.area-card').forEach(card => {
            card.addEventListener('click', () => {
                this.selectArea(card);
                this.proceedToSpecificForm(); // 🔹 redirige al instante
            });
        });
    }

    selectArea(selectedCard) {
        // Desmarcar todas las tarjetas
        document.querySelectorAll('.area-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Marcar la tarjeta seleccionada
        selectedCard.classList.add('selected');
        this.selectedArea = selectedCard.dataset.area;

        // Ocultar mensaje de error si existía
        const areaError = document.getElementById('areaError');
        if (areaError) areaError.style.display = 'none';
    }

    collectData() {
        return {
            selectedArea: this.selectedArea,
            timestamp: new Date().toISOString()
        };
    }

    saveToSessionStorage() {
        const data = this.collectData();
        sessionStorage.setItem('safetyReportData', JSON.stringify(data));
    }

    proceedToSpecificForm() {
        if (!this.selectedArea) {
            const areaError = document.getElementById('areaError');
            if (areaError) {
                areaError.style.display = 'block';
                areaError.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        this.saveToSessionStorage();

        // 🔹 Ajusta las rutas según tus carpetas reales
        const areaPages = {
            'flight': 'flight.html',
            'cabin': 'cabin.html',
            'dispatch': 'dispatch.html',
            'ground_handling': 'ground_handling.html',
            'cargo': 'cargo.html',
            'maintenance': 'maintenance.html',
            'security': 'security.html',
            'organization': 'organization.html',
            'counters': 'counters.html'
        };

        const targetPage = areaPages[this.selectedArea];
        if (targetPage) {
            window.location.href = targetPage;
        } else {
            console.error('Área inválida seleccionada:', this.selectedArea);
        }
    }

    updateProgress(percentage) {
        const progressFill = document.getElementById('progressFill');
        if (progressFill) progressFill.style.width = percentage + '%';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SafetyReportSystem();
});
