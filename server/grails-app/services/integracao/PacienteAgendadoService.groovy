package integracao

import grails.gorm.services.Service

@Service(PacienteAgendado)
abstract class PacienteAgendadoService {

    abstract PacienteAgendado get(Serializable id)

    abstract List<PacienteAgendado> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract PacienteAgendado save(PacienteAgendado pacienteAgendado)

}