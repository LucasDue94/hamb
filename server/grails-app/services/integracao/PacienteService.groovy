package integracao

import grails.gorm.services.Service

@Service(Paciente)
abstract class PacienteService {

    abstract Paciente get(Serializable id)

    List<Paciente> list(Map args, String termo) {
        def criteria = Paciente.createCriteria()
        List<Paciente> pacienteList = (List<Paciente>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                registros {
                    atendimento {
                        isNotNull('id')
                    }
                }
                or {
                    ilike('nome', "%${termo}%")
                    ilike('id', "%${termo}%")
                    registros {
                        ilike('id', "%${termo}%")
                    }
                }
            }
        }
        return pacienteList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Paciente save(Paciente paciente)

}