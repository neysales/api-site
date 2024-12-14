const atendentesComponent = {
    data() {
        return {
            attendants: [
                { id: 1, name: 'Dr. João Silva', specialty: 'Clínico Geral', status: 'Disponível' },
                { id: 2, name: 'Dra. Maria Santos', specialty: 'Pediatra', status: 'Ocupado' }
            ]
        }
    },
    template: `
        <div class="attendants-page">
            <h2>{{ $t('attendants.title') }}</h2>
            <div class="card">
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>{{ $t('attendants.name') }}</th>
                                <th>{{ $t('attendants.specialty') }}</th>
                                <th>{{ $t('attendants.status') }}</th>
                                <th>{{ $t('attendants.actions') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="attendant in attendants" :key="attendant.id">
                                <td>{{ attendant.name }}</td>
                                <td>{{ attendant.specialty }}</td>
                                <td>{{ attendant.status }}</td>
                                <td>
                                    <button class="btn btn-sm btn-primary me-2">{{ $t('buttons.edit') }}</button>
                                    <button class="btn btn-sm btn-danger">{{ $t('buttons.delete') }}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
};

// Registrando o componente
app.component('atendentes-page', atendentesComponent);
