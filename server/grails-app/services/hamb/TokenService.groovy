package hamb

import groovy.transform.CompileStatic
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.transaction.TransactionStatus

import javax.transaction.Transactional

@Transactional
@CompileStatic
class TokenService {

    static lazyInit = false

    @Scheduled(initialDelay = 5000l, fixedDelay = 60000l)
    void removeTokenExpiradas() {
        Calendar calendar = GregorianCalendar.getInstance()
        calendar.time = new Date()
        calendar.add(Calendar.HOUR, -1)

        UsuarioToken.withTransaction { TransactionStatus transactionStatus ->
            List<UsuarioToken> tokensExpiradas = UsuarioToken.withCriteria {
                lt 'ultimoAcesso', calendar.time
            } as List<UsuarioToken>

            if (tokensExpiradas != null && !tokensExpiradas.isEmpty()) {
                tokensExpiradas*.delete()
                transactionStatus.flush()
            }
        }
    }
}
