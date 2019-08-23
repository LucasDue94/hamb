package integracao

import grails.gorm.services.Service

@Service(PacienteAgendado)
abstract class PacienteAgendadoService {

    PacienteAgendado get(String id) {
        def criteria = PacienteAgendado.createCriteria()
        PacienteAgendado pacienteAgendado = (PacienteAgendado) criteria.get {
            registro {
                eq 'id', id
            }
        }
        return pacienteAgendado
    }

    abstract List<PacienteAgendado> list(Map args)

    abstract Long count()

    abstract void delete(Serializable id)

    abstract PacienteAgendado save(PacienteAgendado pacienteAgendado)

}