package integracao

import grails.gorm.services.Service
import org.hibernate.sql.JoinType

@Service(Paciente)
abstract class PacienteService {

    abstract Paciente get(Serializable id)

    List<Paciente> list(Map args, String termo) {
        def criteria = Paciente.createCriteria()
        List<String> pacienteIds = (List<String>) criteria.list(args) {
            if (termo != null && !termo.isEmpty()) {
                createAlias 'registros', 'r', JoinType.LEFT_OUTER_JOIN
                createAlias 'r.paciente', 'p', JoinType.LEFT_OUTER_JOIN

                or {
                    ilike('nome', "%${termo}%")
                    ilike('id', "%${termo}%")
                    ilike('r.id', "%${termo}%")
                    ilike('p.id', "%${termo}%")
                }

                isNotEmpty('r.atendimentos')

                projections {
                    distinct 'id'
                }
            }
        }

        List<Paciente> pacienteList = Paciente.getAll pacienteIds

        return pacienteList
    }

    abstract Long count()

    abstract void delete(Serializable id)

    abstract Paciente save(Paciente paciente)

}