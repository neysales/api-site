const especialidadesComponent = {
    data() {
        return {
            specialties: [
                { id: 1, name: 'Clínico Geral', description: 'Atendimento geral' },
                { id: 2, name: 'Pediatria', description: 'Atendimento infantil' }
            ]
        }
    },
    template: `
        <div class="specialties-page">
            <h2>{{ $t('specialties.title') }}</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>{{ $t('specialties.name') }}</th>
                        <th>{{ $t('specialties.description') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="specialty in specialties" :key="specialty.id">
                        <td>{{ specialty.name }}</td>
                        <td>{{ specialty.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
};

app.component('especialidades', especialidadesComponent);
