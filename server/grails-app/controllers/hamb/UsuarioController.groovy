package hamb

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class UsuarioController {

    UsuarioService usuarioService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max, String termo) {
        params.max = Math.min(max ?: 10, 100)
        respond usuarioService.list(params, termo), model: [usuarioCount: usuarioService.count()]
    }

    def show(Long id) {
        respond usuarioService.get(id)
    }

    @Transactional
    def save(Usuario usuario) {
        if (usuario == null) {
            render status: NOT_FOUND
            return
        }
        if (usuario.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond usuario.errors
            return
        }

        try {
            usuarioService.save(usuario)
        } catch (ValidationException e) {
            respond usuario.errors
            return
        }

        respond usuario, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Usuario usuario) {
        if (usuario == null) {
            render status: NOT_FOUND
            return
        }

        if (usuario.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond usuario.errors
            return
        }

        try {
            usuarioService.save(usuario)
        } catch (ValidationException e) {
            respond usuario.errors
            return
        }

        respond usuario, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        usuarioService.delete(id)

        render status: NO_CONTENT
    }

    @Transactional
    def onOff(Usuario usuario) {
        if (usuario.id == null) {
            render status: NOT_FOUND
            return
        }
        usuarioService.onOff(usuario)

        respond status: OK
    }
}
