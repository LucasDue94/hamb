package hamb

import grails.gorm.services.Service

@Service(Atendimento)
interface AtendimentoService {

    Atendimento get(Serializable id)

    List<Atendimento> list(Map args)

    Long count()

    void delete(Serializable id)

    Atendimento save(Atendimento atendimento)

}