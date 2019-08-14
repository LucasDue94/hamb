package integracao

import grails.gorm.services.Service
import grails.plugin.springsecurity.SpringSecurityService
import hamb.Usuario
import org.springframework.beans.factory.annotation.Autowired
import java.text.SimpleDateFormat

@Service(Agenda)
abstract class AgendaService {

    @Autowired
    SpringSecurityService springSecurityService

    abstract Agenda get(Serializable id)

    List<Agenda> list(String data) {
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
        ArrayList<Agenda> agendaList = new ArrayList<Agenda>()

        if (data == null) {
            agendaList = criteria.list() {
                eq 'crm', usuario.crm
                between 'dataHora', firstDayMonth, lastDayMonth

                order 'dataHora'
            } as List<Agenda>
        } else {
            SimpleDateFormat sdf = new SimpleDateFormat('yyyy-MM-dd')

            calendar.setTime(sdf.parse(data))
            calendar.set Calendar.HOUR, 0
            calendar.set Calendar.MINUTE, 0
            calendar.set Calendar.SECOND, 0
            Date agendaDiaStart = calendar.time

            calendar.setTime(sdf.parse(data))
            calendar.set Calendar.HOUR, 23
            calendar.set Calendar.MINUTE, 59
            calendar.set Calendar.SECOND, 59
            Date agendaDiaEnd = calendar.time

            agendaList = criteria.list() {
                eq 'crm', usuario.crm
                between 'dataHora', agendaDiaStart, agendaDiaEnd
                order 'dataHora', 'asc'

            } as List<Agenda>
        }
        return agendaList
    }

    abstract Long count()
}