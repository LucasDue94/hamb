package hamb

import grails.gorm.services.Service

@Service(Sala)
interface SalaService {

    Sala get(Serializable id)

    List<Sala> list(Map args)

    Long count()

    void delete(Serializable id)

    Sala save(Sala sala)

}