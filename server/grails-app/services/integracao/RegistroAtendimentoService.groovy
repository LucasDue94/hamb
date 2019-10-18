package integracao

import grails.gorm.services.Service

@Service(RegistroAtendimento)
abstract class RegistroAtendimentoService {

    abstract RegistroAtendimento get(Serializable id)

    abstract List<RegistroAtendimento> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract RegistroAtendimento save(RegistroAtendimento registroAtendimento)

}