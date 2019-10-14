package hamb


import grails.gorm.services.Service
import grails.validation.ValidationException

@Service(Forgot)
abstract class ForgotService {

    abstract Forgot get(Serializable id)

    abstract List<Forgot> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    /* Forgot save(Forgot forgot) {
         if (forgot == null) {
             throw new IllegalArgumentException('Forgot must be not null')
         }

         if (!forgot.validate()) {
             throw new ValidationException('Invalid forgot', forgot.errors)
         }

         forgot.save flush: true

         sendMail {
             to forgot.email
             from "franklin.farias@hospitaldocoracao-al.com.br"
             subject "AmbCor - Redefinir de senha"
             text 'http://localhost:4200/redefinicaosenha'
         }


         return forgot
     }*/

    Forgot save(Forgot forgot) {
        return forgot.save(flush: true)
    }


}