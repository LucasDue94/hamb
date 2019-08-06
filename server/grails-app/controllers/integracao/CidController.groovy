package integracao

import grails.gorm.transactions.ReadOnly
import grails.plugin.springsecurity.SpringSecurityService
import grails.plugin.springsecurity.annotation.Secured
import hamb.Perfil
import hamb.Usuario

@ReadOnly
@Secured(Perfil.PERMISSAO_MEDICO)
class CidController {

    CidService cidService
    SpringSecurityService springSecurityService

    static responseFormats = ['json', 'xml']

    def index(Integer max) {
        Usuario usuarioAtual = springSecurityService.loadCurrentUser() as Usuario

        params.max = Math.min(max ?: 10, 100)
        respond cidService.list(usuarioAtual, params), model:[cidCount: cidService.count()]
    }
}
