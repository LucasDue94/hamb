package hamb


import grails.converters.JSON
import grails.gorm.transactions.ReadOnly
import grails.gorm.transactions.Transactional
import grails.validation.ValidationException
import org.grails.web.json.JSONException
import org.grails.web.json.JSONObject

import static org.springframework.http.HttpStatus.*

@ReadOnly
class ForgotController {

    ForgotService forgotService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond forgotService.list(params), model: [forgotCount: forgotService.count()]
    }

    def show(Long id) {
        respond forgotService.get(id)
    }

    @Transactional
    def save() {
        JSONObject form = null

        try {
            form = JSON.parse request.reader.text
        } catch (JSONException ignored) {
            render status: UNPROCESSABLE_ENTITY
            return
        }

        if (form == null || form.email == null || form.email.isEmpty()) {
            render status: NOT_FOUND
            return
        }

        Forgot forgot = new Forgot()
        def usuario = Usuario.findByEmail form.email
        forgot.usuario = usuario

        if (!forgot.validate()) {
            transactionStatus.setRollbackOnly()
            respond forgot.errors
            return
        }

        try {

            def now = new Date()
            def tempoRestante = forgot.validade.getTime() - now.getTime()
            def limitSend = tempoRestante - 3300000

            if (limitSend < 299999) {
                forgotService.save(forgot)
                sendMail {
                    to forgot.usuario.email
                    from "franklin.farias@hospitaldocoracao-al.com.br"
                    subject "AmbCor - Redefinir de senha"
                    text 'http://localhost:4200/redefinicaosenha'
                }
            }
        } catch (ValidationException e) {
            respond forgot.errors
            return
        }

        respond forgot, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(Forgot forgot) {
        if (forgot == null) {
            render status: NOT_FOUND
            return
        }
        if (forgot.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond forgot.errors
            return
        }

        try {
            forgotService.save(forgot)
        } catch (ValidationException e) {
            respond forgot.errors
            return
        }

        respond forgot, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        forgotService.delete(id)

        render status: NO_CONTENT
    }
}
