import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CuestionariosService } from 'src/app/services/cuestionarios.service';

@Component({
  selector: 'app-nuevo-cuestionario',
  templateUrl: './nuevo-cuestionario.component.html',
  styleUrls: ['./nuevo-cuestionario.component.css']
})
export class NuevoCuestionarioComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required]);

  groupFormControl = new FormControl('', [Validators.required]);

  constructor(private service: CuestionariosService) { }

  ngOnInit(): void {
  }


  async createQuizz() {
    let name = this.nameFormControl.value ?? ""
    let group = this.groupFormControl.value ?? ""
    await this.service.createQuizz(group, name)
    alert("Se creó el cuestionario")
  }

}
