package integracao

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.annotation.Secured
import hamb.Perfil

@ReadOnly
@Secured(Perfil.PERMISSAO_MEDICO)
class PacienteController {

    PacienteService pacienteService

    static responseFormats = ['json', 'xml']

    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        respond pacienteService.list(params, termo), model: [pacienteCount: pacienteService.count()]
    }

    def show(Long id) {
        respond pacienteService.get(id)
    }
}
