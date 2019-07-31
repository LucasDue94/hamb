package integracao

import grails.gorm.services.Service

@Service(RegistroAtendimento)
interface RegistroAtendimentoService {

    RegistroAtendimento get(Serializable id)

    List<RegistroAtendimento> list(Map args)

    Long count()

    void delete(Serializable id)

    RegistroAtendimento save(RegistroAtendimento registroAtendimento)

}