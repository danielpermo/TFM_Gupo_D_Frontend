import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-valoraciones-prof',
  templateUrl: './valoraciones-prof.component.html',
  styleUrls: ['./valoraciones-prof.component.css']
})
export class ValoracionesProfComponent implements OnInit {

  alumArr: any = [];

  constructor(private profesoresService: ProfesoresService) { }

  async ngOnInit() {
    const response = await this.profesoresService.getProfeAlum();
    this.alumArr = response;
    console.log(this.alumArr);
    return this.alumArr;
  }

}
