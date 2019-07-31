package integracao

import grails.gorm.transactions.ReadOnly
import hamb.Usuario

@ReadOnly
class CidController {

    CidService cidService

    static responseFormats = ['json', 'xml']

    def index(Integer max) {
        // TODO: usar usuário logado no sistema
        Usuario usuarioAtual = Usuario.load 1L

        params.max = Math.min(max ?: 10, 100)
        respond cidService.list(usuarioAtual, params), model:[cidCount: cidService.count()]
    }
}
