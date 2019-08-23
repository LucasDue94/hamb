package integracao

import grails.gorm.services.Service

@Service(Paciente)
abstract class PacienteService {

    Paciente get(String id) {
        def criteria = Paciente.createCriteria()
        Paciente paciente = (Paciente) criteria.get() {
            eq 'id', id
        }
        return paciente
    }

    List<Paciente> list(Map args, String termo) {
        def criteria = Paciente.createCriteria()
        List<Paciente> pacienteList = (List<Paciente>) criteria.list(args) {

            isNotEmpty('atendimentos')
            if (termo != null && !termo.isEmpty()) {
                or {
                    ilike('nome', "%${termo}%")
                    ilike('id', "%${termo}%")
                    registros {
                        ilike('id', "%${termo}%")
                        projections {
                            distinct('paciente')
                        }
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