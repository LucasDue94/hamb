package integracao

import grails.gorm.services.Service
import grails.plugin.springsecurity.SpringSecurityService
import hamb.Usuario
import org.springframework.beans.factory.annotation.Autowired

@Service(Agenda)
abstract class AgendaService {

    @Autowired SpringSecurityService springSecurityService

    abstract Agenda get(Serializable id)

    List<Agenda> list(Map args) {
        Usuario usuario = Usuario.get(springSecurityService.principal.id as Long)

        Calendar calendar = GregorianCalendar.instance
        calendar.time = new Date()

        int firstDay = calendar.getActualMinimum Calendar.DAY_OF_MONTH
        int lastDay = calendar.getActualMaximum Calendar.DAY_OF_MONTH

        calendar.set Calendar.DAY_OF_MONTH, firstDay
        calendar.set Calendar.HOUR, 0
        calendar.set Calendar.MINUTE, 0
        calendar.set Calendar.SECOND, 0
        Date firstDayMonth = calendar.time

        calendar.set Calendar.DAY_OF_MONTH, lastDay
        calendar.set Calendar.HOUR, 23
        calendar.set Calendar.MINUTE, 59
        calendar.set Calendar.SECOND, 59
        Date lastDayMonth = calendar.time

        def criteria = Agenda.createCriteria()
        return criteria.list() {
            eq 'crm', usuario.crm
            between 'dataHora', firstDayMonth, lastDayMonth

            order 'dataHora'
        } as List<Agenda>
    }

    abstract Long count()
}