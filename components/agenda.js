const agendaComponent = {
    template: `
        <div class="agenda-page">
            <div id="calendar"></div>
        </div>
    `,
    data() {
        return {
            calendar: null
        }
    },
    mounted() {
        const calendarEl = this.$el.querySelector('#calendar');
        this.calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'timeGridWeek',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            locale: this.$root.language,
            slotMinTime: '08:00:00',
            slotMaxTime: '20:00:00',
            allDaySlot: false,
            slotDuration: '00:30:00',
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true
        });
        this.calendar.render();
    },
    beforeDestroy() {
        if (this.calendar) {
            this.calendar.destroy();
        }
    }
};

app.component('agenda-page', agendaComponent);
