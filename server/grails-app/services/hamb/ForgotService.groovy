package hamb


import grails.gorm.services.Service

@Service(Forgot)
abstract class ForgotService {


    abstract Forgot get(Serializable id)

    abstract List<Forgot> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    Forgot save(Forgot forgot) {

        if (forgot.usuario.isDirty('senha'))
            forgot.senhaAlterada = true

        forgot.save flush: true

        sendMail {
            to forgot.usuario.email
            from "franklin.farias@hospitaldocoracao-al.com.br"
            subject "AmbCor - Redefinição de senha"
            text "http://dev.hcal.lan/ambcor/#/redefinesenha/$forgot.id/$forgot.token"
//            text "http://localhost:4200/#/redefinesenha/$forgot.id/$forgot.token"
        }

        return forgot
    }

}