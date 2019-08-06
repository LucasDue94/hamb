package integracao

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.CREATED
import static org.springframework.http.HttpStatus.NOT_FOUND
import static org.springframework.http.HttpStatus.NO_CONTENT
import static org.springframework.http.HttpStatus.OK
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional

@ReadOnly
class RegistroAtendimentoController {

    RegistroAtendimentoService registroAtendimentoService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond registroAtendimentoService.list(params), model:[registroAtendimentoCount: registroAtendimentoService.count()]
    }

    def show(Long id) {
        respond registroAtendimentoService.get(id)
    }

    @Transactional
    def save(RegistroAtendimento registroAtendimento) {
        if (registroAtendimento == null) {
            render status: NOT_FOUND
            return
        }
        if (registroAtendimento.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond registroAtendimento.errors
            return
        }

        try {
            registroAtendimentoService.save(registroAtendimento)
        } catch (ValidationException e) {
            respond registroAtendimento.errors
            return
        }

        respond registroAtendimento, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(RegistroAtendimento registroAtendimento) {
        if (registroAtendimento == null) {
            render status: NOT_FOUND
            return
        }
        if (registroAtendimento.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond registroAtendimento.errors
            return
        }

        try {
            registroAtendimentoService.save(registroAtendimento)
        } catch (ValidationException e) {
            respond registroAtendimento.errors
            return
        }

        respond registroAtendimento, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        registroAtendimentoService.delete(id)

        render status: NO_CONTENT
    }
}
