package integracao

import grails.gorm.services.Service

@Service(Agenda)
interface AgendaService {

    abstract Agenda get(Serializable id)

    abstract List<Agenda> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Agenda save(Agenda agenda)

}