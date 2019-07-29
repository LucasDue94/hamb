package integracao

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class AgendaController {

    AgendaService agendaService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond agendaService.list(params), model:[agendaCount: agendaService.count()]
    }

    def show(Long id) {
        respond agendaService.get(id)
    }

    @Transactional
    def save(Agenda agenda) {
        if (agenda == null) {
            render status: NOT_FOUND
            return
        }
        if (agenda.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond agenda.errors
            return
        }

        try {
            agendaService.save(agenda)
        } catch (ValidationException e) {
            respond agenda.errors
            return
        }

        respond agenda, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Agenda agenda) {
        if (agenda == null) {
            render status: NOT_FOUND
            return
        }
        if (agenda.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond agenda.errors
            return
        }

        try {
            agendaService.save(agenda)
        } catch (ValidationException e) {
            respond agenda.errors
            return
        }

        respond agenda, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        agendaService.delete(id)

        render status: NO_CONTENT
    }
}
