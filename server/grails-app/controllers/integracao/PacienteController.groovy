package integracao

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import hamb.Perfil

import static org.springframework.http.HttpStatus.*

@ReadOnly
@Secured(Perfil.PERMISSAO_MEDICO)
class PacienteController {

    PacienteService pacienteService

    static responseFormats = ['json', 'xml']

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond pacienteService.list(params), model:[pacienteCount: pacienteService.count()]
    }

    def show(Long id) {
        respond pacienteService.get(id)
    }
}
