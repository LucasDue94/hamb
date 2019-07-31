package hamb

import grails.gorm.services.Service
import integracao.Sala

@Service(Sala)
interface SalaService {

    Sala get(Serializable id)

    List<Sala> list(Map args)

    Long count()

    void delete(Serializable id)

    Sala save(Sala sala)

}