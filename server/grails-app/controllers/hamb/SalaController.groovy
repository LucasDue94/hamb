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
class SalaController {

    SalaService salaService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond salaService.list(params), model:[salaCount: salaService.count()]
    }

    def show(Long id) {
        respond salaService.get(id)
    }

    @Transactional
    def save(Sala sala) {
        if (sala == null) {
            render status: NOT_FOUND
            return
        }
        if (sala.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond sala.errors
            return
        }

        try {
            salaService.save(sala)
        } catch (ValidationException e) {
            respond sala.errors
            return
        }

        respond sala, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Sala sala) {
        if (sala == null) {
            render status: NOT_FOUND
            return
        }
        if (sala.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond sala.errors
            return
        }

        try {
            salaService.save(sala)
        } catch (ValidationException e) {
            respond sala.errors
            return
        }

        respond sala, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        salaService.delete(id)

        render status: NO_CONTENT
    }
}
