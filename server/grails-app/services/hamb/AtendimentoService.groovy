package hamb

import grails.gorm.services.Service

@Service(Atendimento)
interface AtendimentoService {

    Atendimento get(Serializable id)

    List<Atendimento> list(Map args)

    Long count()

    void delete(Serializable id)

    // TODO: incrementar contador de uso de CID ao incluir novo atendimento
    Atendimento save(Atendimento atendimento)

}