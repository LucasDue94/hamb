package integracao

import grails.gorm.transactions.ReadOnly

@ReadOnly
class AgendaController {

    AgendaService agendaService

    static responseFormats = ['json', 'xml']

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)

        // TODO: move to service and filter counter
        Calendar calendar = GregorianCalendar.instance
        calendar.time = new Date()

        int firstDay = calendar.getActualMinimum Calendar.DAY_OF_MONTH
        int lastDay = calendar.getActualMaximum Calendar.DAY_OF_MONTH

        calendar.set Calendar.DAY_OF_MONTH, firstDay
        calendar.set Calendar.HOUR, 0
        calendar.set Calendar.MINUTE, 0
        calendar.set Calendar.SECOND, 0
        Date firstDayMonth = calendar.time

        calendar.set Calendar.DAY_OF_MONTH, lastDay
        calendar.set Calendar.HOUR, 23
        calendar.set Calendar.MINUTE, 59
        calendar.set Calendar.SECOND, 59
        Date lastDayMonth = calendar.time

        def criteria = Agenda.createCriteria()
        def agendaList = criteria.list() {
            ge 'dataHora', firstDayMonth
            le 'dataHora', lastDayMonth

            order 'dataHora', 'asc'
        }


        respond agendaList, model:[agendaCount: agendaService.count()]
//        respond agendaService.list(params), model:[agendaCount: agendaService.count()]
    }

    def show(String id) {
        respond agendaService.get(id)
    }
}
