package integracao

import grails.gorm.transactions.ReadOnly

@ReadOnly
class AgendaController {

    AgendaService agendaService

    static responseFormats = ['json', 'xml']

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond agendaService.list(params), model:[agendaCount: agendaService.count()]
    }

    def show(String id) {
        respond agendaService.get(id)
    }
}
