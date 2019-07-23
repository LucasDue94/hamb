import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { UsuarioService } from './usuario/usuario.service';
// import { PerfilService } from './perfil/perfil.service';
// import { AtendimentoService } from './atendimento/atendimento.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
providers: [
    UsuarioService,
]
})
export class CoreModule {}
