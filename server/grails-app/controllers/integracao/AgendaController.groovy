package integracao

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured
import hamb.Perfil

@ReadOnly
@Secured(Perfil.PERMISSAO_MEDICO)
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
