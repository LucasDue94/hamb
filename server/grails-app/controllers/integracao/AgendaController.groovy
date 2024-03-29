package integracao

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured
import hamb.Perfil

@ReadOnly
@Secured([Perfil.PERMISSAO_MEDICO])
class AgendaController {

    AgendaService agendaService

    static responseFormats = ['json', 'xml']

    def index(Integer max, String data, Long usuarioId) {
        if (data == 'undefined' || data == '') data = null
        params.max = Math.min(max ?: 10, 100)
        respond agendaService.list(data, usuarioId), model: [agendaCount: agendaService.count()]
    }

    def show(Long id) {
        respond agendaService.get(id)
    }
}
