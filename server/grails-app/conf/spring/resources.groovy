import hamb.UserDetailService
import hamb.auth.CodificadorSenha
import hamb.auth.CustomAccessTokenRenderer

// Place your Spring DSL code here
beans = {
    userDetailsService(UserDetailService)
    userPasswordEncoderListener(CodificadorSenha)
    accessTokenJsonRenderer(CustomAccessTokenRenderer)
}
