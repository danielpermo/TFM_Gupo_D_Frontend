import { Component, OnInit, inject } from '@angular/core';
import { Profesor } from 'src/app/interfaces/profesor';
import { Usuario } from 'src/app/interfaces/usuario';
import { ProfesoresService } from 'src/app/services/profesores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profesArr: Profesor[] = [];
  profesArrPar: Profesor[] = [];
  profesArrImp: Profesor[] = [];
  combinedArr: any = [];
  ciudadesArr: string[] = [];
  asignaturasArr: any[] = [];
  filtradoArr: any[] = [];
  filtroAsignaturasArr: any[] = []
  filtradoCiudad: boolean = false;
  filtradoAsignatura: boolean = false;
  filtrado: boolean = false;
  ciudad: string = "";
  asignatura: string = "";
  asignaturasActivate: boolean = false;
  ciudadActivate: boolean = false;

  profesoresService = inject(ProfesoresService);

  async ngOnInit() {
    const response = await this.profesoresService.getAllPublic();
    response.sort((a: { puntuacion: string; }, b: { puntuacion: string; }) => {
      // Comprobar si a y b tienen la puntuación "No valorado"
      if (a.puntuacion === "No valorado" && b.puntuacion === "No valorado") {
        return 0;
      }
      if (a.puntuacion === "No valorado") {
        return 1; // Mover 'a' al final
      }
      if (b.puntuacion === "No valorado") {
        return -1; // Mover 'b' al final
      }

      // Ordenar por puntuación de mayor a menor
      return Number(b.puntuacion) - Number(a.puntuacion);
    });
    this.profesArr = response;
    this.profesArrPar = this.profesArr.filter((_, index) => index % 2 === 0);
    this.profesArrImp = this.profesArr.filter((_, index) => index % 2 === 1);
    const maxLength = Math.max(this.profesArrPar.length, this.profesArrImp.length);
    for (let i = 0; i < maxLength; i++) {
      this.combinedArr.push({ par: this.profesArrPar[i], impar: this.profesArrImp[i] });
    }
    const ciudadesSet = new Set<string>();
    for (const profesor of this.profesArr) {
      ciudadesSet.add(profesor.ciudad);
    }
    this.ciudadesArr = Array.from(ciudadesSet).sort();
    this.ciudadesArr.unshift('Todas');

    const asignaturasSet = new Set<string>();
    for (const profesor of this.profesArr) {
      for (const asignatura of profesor.asignaturas) {
        asignaturasSet.add(asignatura);
      }
    }
    this.asignaturasArr = Array.from(asignaturasSet).sort();
    const todas: any = { asignatura_id: 0, nombre: "Todas", clase: 0 }
    this.asignaturasArr.unshift(todas);

  }

  async filtrarCiudad(pCiudad: string) {
    this.filtradoArr = [];
    this.ciudad = pCiudad;


    if (pCiudad === 'Todas' && this.asignaturasActivate === false) {
      this.ciudadActivate = false;
      return this.filtradoArr = this.combinedArr;
    } else if (pCiudad === 'Todas' && this.asignaturasActivate === true) {
      this.ciudadActivate = false;
      return this.filtradoArr;
    } else if (pCiudad === 'Todas') {
      return this.ciudadActivate = false;
    }

    if (this.asignaturasActivate === true) {
      const response = await this.profesoresService.filtrarCiudad(pCiudad);
      response.sort((a: { puntuacion: string; }, b: { puntuacion: string; }) => {
        // Comprobar si a y b tienen la puntuación "No valorado"
        if (a.puntuacion === "No valorado" && b.puntuacion === "No valorado") {
          return 0;
        }
        if (a.puntuacion === "No valorado") {
          return 1; // Mover 'a' al final
        }
        if (b.puntuacion === "No valorado") {
          return -1; // Mover 'b' al final
        }

        // Ordenar por puntuación de mayor a menor
        return Number(b.puntuacion) - Number(a.puntuacion);
      });
      const profesArr: any[] = response;
      const profesFiltradoArr: any[] = profesArr.filter(profesor => profesor.ciudad === pCiudad);
      const profesFiltradoAsignaturasArr: any[] = profesFiltradoArr.filter(profesor => profesor.asignaturas.some((asignatura: any) => asignatura.asignatura_id === this.asignatura));
      if (profesFiltradoAsignaturasArr.length === 0) {
        this.filtradoArr = this.filtroAsignaturasArr;
        return this.filtradoArr;
      }

      const profesArrPar: any[] = profesFiltradoArr.filter((_, index) => index % 2 === 0);
      const profesArrImp: any[] = profesFiltradoArr.filter((_, index) => index % 2 === 1);
      const maxLength = Math.max(profesArrPar.length, profesArrImp.length);
      for (let i = 0; i < maxLength; i++) {
        this.filtradoArr.push({ par: profesArrPar[i], impar: profesArrImp[i] });
        this.filtradoCiudad = true;
        this.filtrado = true;
        this.ciudad = pCiudad;
        this.asignaturasActivate = true;
        return this.filtradoArr;
      }
    }
    const response = await this.profesoresService.filtrarCiudad(pCiudad);
    response.sort((a: { puntuacion: string; }, b: { puntuacion: string; }) => {
      // Comprobar si a y b tienen la puntuación "No valorado"
      if (a.puntuacion === "No valorado" && b.puntuacion === "No valorado") {
        return 0;
      }
      if (a.puntuacion === "No valorado") {
        return 1; // Mover 'a' al final
      }
      if (b.puntuacion === "No valorado") {
        return -1; // Mover 'b' al final
      }

      // Ordenar por puntuación de mayor a menor
      return Number(b.puntuacion) - Number(a.puntuacion);
    });
    const profesArr: any[] = response;
    const profesFiltradoArr: any[] = profesArr.filter(profesor => profesor.ciudad === pCiudad);
    const profesArrPar: any[] = profesFiltradoArr.filter((_, index) => index % 2 === 0);
    const profesArrImp: any[] = profesFiltradoArr.filter((_, index) => index % 2 === 1);
    const maxLength = Math.max(profesArrPar.length, profesArrImp.length);
    for (let i = 0; i < maxLength; i++) {
      this.filtradoArr.push({ par: profesArrPar[i], impar: profesArrImp[i] });
      this.filtradoCiudad = true;
      this.filtrado = true;
      this.asignaturasActivate = true;
      return this.filtradoArr;
    }

  }

  async filtrarAsignatura(pAsignatura: any) {
    this.filtroAsignaturasArr = [];
    this.asignatura = pAsignatura;
    if (pAsignatura === 0 && this.ciudadActivate === false) {
      this.asignaturasActivate = false;
      return this.filtradoArr = this.combinedArr;
    } else if (pAsignatura === 0 && this.ciudadActivate === true) {
      this.asignaturasActivate = false;
      return this.filtradoArr;
    } else if (pAsignatura === 0) {
      return this.asignaturasActivate = false;
    }
    const response = await this.profesoresService.filtrarAsignatura(pAsignatura);
    response.sort((a: { puntuacion: string; }, b: { puntuacion: string; }) => {
      // Comprobar si a y b tienen la puntuación "No valorado"
      if (a.puntuacion === "No valorado" && b.puntuacion === "No valorado") {
        return 0;
      }
      if (a.puntuacion === "No valorado") {
        return 1; // Mover 'a' al final
      }
      if (b.puntuacion === "No valorado") {
        return -1; // Mover 'b' al final
      }

      // Ordenar por puntuación de mayor a menor
      return Number(b.puntuacion) - Number(a.puntuacion);
    });

    if (this.filtradoCiudad === true) {
      const profesArr: any[] = response;
      const profesFiltradoArr: any[] = profesArr.filter(profesor => profesor.asignaturas.some((asignatura: any) => asignatura.asignatura_id === pAsignatura));
      const profesFiltradoCiudadArr: any[] = profesFiltradoArr.filter(profesor => profesor.ciudad === this.ciudad);
      if (profesFiltradoCiudadArr.length === 0) {
        this.filtradoArr = this.filtroAsignaturasArr;
        return this.filtradoArr;
      }

      const profesArrPar: any[] = profesFiltradoCiudadArr.filter((_, index) => index % 2 === 0);
      const profesArrImp: any[] = profesFiltradoCiudadArr.filter((_, index) => index % 2 === 1);
      const maxLength = Math.max(profesArrPar.length, profesArrImp.length);
      for (let i = 0; i < maxLength; i++) {
        this.filtroAsignaturasArr.push({ par: profesArrPar[i], impar: profesArrImp[i] });
        this.filtradoArr = this.filtroAsignaturasArr
        this.filtrado = true;
        return this.filtradoArr;
      }

    }
    const profesArr: any[] = response;
    const profesFiltradoArr: any[] = profesArr.filter(profesor => profesor.asignaturas.some((asignatura: any) => asignatura.asignatura_id === pAsignatura));
    const profesArrPar: any[] = profesFiltradoArr.filter((_, index) => index % 2 === 0);
    const profesArrImp: any[] = profesFiltradoArr.filter((_, index) => index % 2 === 1);
    const maxLength = Math.max(profesArrPar.length, profesArrImp.length);
    for (let i = 0; i < maxLength; i++) {
      this.filtradoArr.push({ par: profesArrPar[i], impar: profesArrImp[i] });
      this.filtradoCiudad = false;
      this.filtrado = true;
      this.ciudadActivate = true;
      return this.filtradoArr;
    }

  }


  mostrarFiltro(pFiltro: string) {
    if (pFiltro === "todos") {
      this.asignaturasActivate = false;
      this.ciudadActivate = false;
      this.filtradoArr = this.combinedArr;
    } else if (pFiltro === 'ciudad') {
      this.ciudadActivate = true;
      this.asignaturasActivate = false;
    } else if (pFiltro === 'asignaturas') {
      this.asignaturasActivate = true;
      this.ciudadActivate = false;
    }
  }

}

