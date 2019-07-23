package hamb

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class AtendimentoController {

    AtendimentoService atendimentoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond atendimentoService.list(params), model:[atendimentoCount: atendimentoService.count()]
    }

    def show(Long id) {
        respond atendimentoService.get(id)
    }

    @Transactional
    def save(Atendimento atendimento) {
        if (atendimento == null) {
            render status: NOT_FOUND
            return
        }
        if (atendimento.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond atendimento.errors
            return
        }

        try {
            atendimentoService.save(atendimento)
        } catch (ValidationException e) {
            respond atendimento.errors
            return
        }

        respond atendimento, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Atendimento atendimento) {
        if (atendimento == null) {
            render status: NOT_FOUND
            return
        }
        if (atendimento.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond atendimento.errors
            return
        }

        try {
            atendimentoService.save(atendimento)
        } catch (ValidationException e) {
            respond atendimento.errors
            return
        }

        respond atendimento, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        atendimentoService.delete(id)

        render status: NO_CONTENT
    }
}
