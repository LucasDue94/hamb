package hamb


import grails.gorm.services.Service

@Service(Forgot)
abstract class ForgotService {

    abstract Forgot get(Serializable id)

    abstract List<Forgot> list(Map args)


    abstract Long count()

    abstract void delete(Serializable id)

    Forgot save(Forgot forgot) {
        forgot.save flush: true

        sendMail {
            to forgot.usuario.email
            from "franklin.farias@hospitaldocoracao-al.com.br"
            subject "AmbCor - Redefinir de senha"
            text "http://localhost:4200/redefinicaodesenha/$forgot.id/$forgot.token"
        }

        return forgot
    }

}