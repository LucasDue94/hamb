package hamb

import grails.gorm.services.Service

@Service(Atendimento)
abstract class AtendimentoService {

    abstract Atendimento get(Serializable id)

    List<Atendimento> list(Map args, String codPrt) {
        def criteria = Atendimento.createCriteria()
        List<Atendimento> atendimentoList = (List<Atendimento>) criteria.list(args) {
            if (codPrt != null && !codPrt.isEmpty()) {
                registroAtendimento {
                    paciente {
                        eq('id', codPrt.padLeft(9, '0'))
                    }
                }
            }
            order("dataAtendimento", "asc")
        }
        return atendimentoList
    }


    abstract Long count()

    // TODO: incrementar contador de uso de CID ao incluir novo atendimento
    abstract void delete(Serializable id)

    abstract Atendimento save(Atendimento atendimento)

}