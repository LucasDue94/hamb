package integracao

import grails.gorm.services.Service

@Service(Convenio)
interface ConvenioService {

    Convenio get(Serializable id)

    List<Convenio> list(Map args)

    Long count()

    void delete(Serializable id)

    Convenio save(Convenio convenio)

}