package integracao

import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@ReadOnly
class ConvenioController {

    ConvenioService convenioService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond convenioService.list(params), model:[convenioCount: convenioService.count()]
    }

    def show(Long id) {
        respond convenioService.get(id)
    }

    @Transactional
    def save(Convenio convenio) {
        if (convenio == null) {
            render status: NOT_FOUND
            return
        }
        if (convenio.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond convenio.errors
            return
        }

        try {
            convenioService.save(convenio)
        } catch (ValidationException e) {
            respond convenio.errors
            return
        }

        respond convenio, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Convenio convenio) {
        if (convenio == null) {
            render status: NOT_FOUND
            return
        }
        if (convenio.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond convenio.errors
            return
        }

        try {
            convenioService.save(convenio)
        } catch (ValidationException e) {
            respond convenio.errors
            return
        }

        respond convenio, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        convenioService.delete(id)

        render status: NO_CONTENT
    }
}
