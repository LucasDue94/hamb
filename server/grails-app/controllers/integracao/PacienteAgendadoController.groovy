package integracao

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured
import hamb.Perfil

@ReadOnly
@Secured(Perfil.PERMISSAO_MEDICO)
class PacienteAgendadoController {

    PacienteAgendadoService pacienteAgendadoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond pacienteAgendadoService.list(params), model:[pacienteAgendadoCount: pacienteAgendadoService.count()]
    }

    def show(String id) {
        respond pacienteAgendadoService.get(id)
    }

}
