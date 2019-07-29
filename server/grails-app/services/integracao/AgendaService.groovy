package integracao

import grails.gorm.services.Service

@Service(Agenda)
abstract class AgendaService {

    abstract Agenda get(Serializable id)

    List<Agenda> list(Map args, String dataIni, String dataFinal, String crm) {
        def criteria = Agenda.createCriteria()
        List<Agenda> agendaList = (List<Agenda>) criteria.list(args) {
            if (crm!= null && !crm.isEmpty()) {
                ilike('crm', "%${crm}%")
                and {
                    between("data", dataIni, dataFinal)
                }
            }
            order("nome_pac", "asc")
        }
        return agendaList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Agenda save(Agenda agenda)

}