package integracao

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class PacienteController {

    PacienteService pacienteService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond pacienteService.list(params), model:[pacienteCount: pacienteService.count()]
    }

    def show(Long id) {
        respond pacienteService.get(id)
    }

    @Transactional
    def save(Paciente paciente) {
        if (paciente == null) {
            render status: NOT_FOUND
            return
        }
        if (paciente.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond paciente.errors
            return
        }

        try {
            pacienteService.save(paciente)
        } catch (ValidationException e) {
            respond paciente.errors
            return
        }

        respond paciente, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Paciente paciente) {
        if (paciente == null) {
            render status: NOT_FOUND
            return
        }
        if (paciente.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond paciente.errors
            return
        }

        try {
            pacienteService.save(paciente)
        } catch (ValidationException e) {
            respond paciente.errors
            return
        }

        respond paciente, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        pacienteService.delete(id)

        render status: NO_CONTENT
    }
}
