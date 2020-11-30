import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var T1= [];
var T2= [];
var T3= [];
var tva;
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent  {
  comm=false;
  cmd: any;

  constructor(private fb: FormBuilder, private http:HttpClient) { this.createForm();} 
factureForm: FormGroup;
createForm() {
  this.factureForm= this.fb.group({
    tva: ['',],
    ref1: ['', ],
    quant1:  ['', ],
    prix1: ['',  ],
    ref2: ['', ],
    quant2:  ['',  ],
    prix2: ['',  ],
    ref3: ['', ],
    quant3:  ['',  ],
    prix3: ['',  ],
    ref4: ['', ],
    quant4:  ['',  ],
    prix4: ['',  ],
    ref5: ['', ],
    quant5:  ['',  ],
    prix5: ['',  ],
    ref6: ['', ],
    quant6:  ['', ],
    prix6: ['', ],
    ref7: ['', ],
    quant7:  ['', ],
    prix7: ['',  ],
    ref8: ['', ],
    quant8:  ['',  ],
    prix8: ['',  ],
    client: ['',  ],

  });}
  donn:any;
  i:number;
  calcul(c){
    if (eval(c)==0){
      return " ";
    }
    else {
      return(eval(c))
    }
  }
  generatePdf(donn: FormGroup){
    T1[1]=donn.value.ref1;
    T1[2]=donn.value.ref2;
    T1[3]=donn.value.ref3;
    T1[4]=donn.value.ref4;
    T1[5]=donn.value.ref5;
    T1[6]=donn.value.ref6;
    T1[7]=donn.value.ref7;
    T1[8]=donn.value.ref8;
    T2[1]=donn.value.quant1;
    T2[2]=donn.value.quant2;
    T2[3]=donn.value.quant3;
    T2[4]=donn.value.quant4;
    T2[5]=donn.value.quant5;
    T2[6]=donn.value.quant6;
    T2[7]=donn.value.quant7;
    T2[8]=donn.value.quant8;
    T3[1]=donn.value.prix1;
    T3[2]=donn.value.prix2;
    T3[3]=donn.value.prix3;
    T3[4]=donn.value.prix4;
    T3[5]=donn.value.prix5;
    T3[6]=donn.value.prix6;
    T3[7]=donn.value.prix7;
    T3[8]=donn.value.prix8;
    tva=donn.value.tva;
    const documentDefinition = {
      content: [
        {
          columns: [
            {
              image:
               'data:image/png;base64,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',
              height: 150,
              },
            [
              {
                text: 'Facture',
                color: '#333333',
                width: '*',
                fontSize: 28,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 15],
              },
              {
                stack: [
                  {
                    columns: [
                      {
                        text: 'Facture No.',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: Math.floor((Math.random()*1000000)+1),
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Date de Facturation',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: Date().substring(3,15),
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Status',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 12,
                        alignment: 'right',
                        width: '*',
                      },
                      {
                        text: 'Payé',
                        bold: true,
                        fontSize: 14,
                        alignment: 'right',
                        color: 'green',
                        width: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'de',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
            {
              text: 'a',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text: 'Electro Dari',
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: donn.value.client,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
          ],
        },
        '\n\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 1;
            },
            hLineColor: function(i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function(i, node) {
              return '#eaeaea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 2;
            },
            paddingBottom: function(i, node) {
              return 2;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                {
                  text: '#Référence',
                  fillColor: '#eaf2f5',
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'quantité',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'TVA',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'Prix unitaire',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'Prix TTC',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
              ],
              [
                {
                  text: T1[1],
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: T2[1],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul(((tva*T3[1])/100)*T2[1]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: T3[1],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul((T3[1]*T2[1])+((tva*T3[1])/100)*T2[1]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: T1[2],
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: T2[2],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul(((tva*T3[2])/100)*T2[2]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: T3[2],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul((T3[2]*T2[2])+((tva*T3[2])/100)*T2[2]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: T1[3],
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: T2[3],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul(((tva*T3[3])/100)*T2[3]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: T3[3],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul((T3[3]*T2[3])+((tva*T3[3])/100)*T2[3]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: T1[4],
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: T2[4],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul(((tva*T3[4])/100)*T2[4]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: T3[4],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul((T3[4]*T2[4])+((tva*T3[4])/100)*T2[4]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              
              [
                {
                  text: T1[5],
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: T2[5],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul(((tva*T3[5])/100)*T2[5]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: T3[5],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul((T3[5]*T2[5])+((tva*T3[5])/100)*T2[5]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              
              [
                {
                  text: T1[6],
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: T2[6],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul(((tva*T3[6])/100)*T2[6]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: T3[6],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul((T3[6]*T2[6])+((tva*T3[6])/100)*T2[6]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              
              [
                {
                  text: T1[7],
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: T2[7],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul(((tva*T3[7])/100)*T2[7]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: T3[7],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul((T3[7]*T2[7])+((tva*T3[7])/100)*T2[7]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              
              [
                {
                  text: T1[8],
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                  alignment: 'left',
                },
                {
                  border: [false, false, false, true],
                  text: T2[8],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul(((tva*T3[8])/100)*T2[8]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: T3[8],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, false, false, true],
                  text: this.calcul((T3[8]*T2[8])+((tva*T3[8])/100)*T2[8]),
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
        '\n',
        '\n\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function(i, node) {
              return 1;
            },
            vLineWidth: function(i, node) {
              return 1;
            },
            hLineColor: function(i, node) {
              return '#eaeaea';
            },
            vLineColor: function(i, node) {
              return '#eaeaea';
            },
            hLineStyle: function(i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function(i, node) {
              return 10;
            },
            paddingRight: function(i, node) {
              return 10;
            },
            paddingTop: function(i, node) {
              return 3;
            },
            paddingBottom: function(i, node) {
              return 3;
            },
            fillColor: function(rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'Prix HTC',
                  border: [false, true, false, true],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, true, false, true],
                  text: ((T2[1]*T3[1])+(T2[2]*T3[2])+(T2[3]*T3[3])+(T2[4]*T3[4])+(T2[5]*T3[5])+(T2[6]*T3[6])+(T2[7]*T3[7])+(T2[8]*T3[8])).toFixed(2) + 'DT',
                  alignment: 'right',
                  fillColor: '#f5f5f5',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Prix TTC (18% TVA)',
                  border: [false, false, false, true],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  text: (((T2[1]*T3[1])+(T2[2]*T3[2])+(T2[3]*T3[3])+(T2[4]*T3[4])+(T2[5]*T3[5])+(T2[6]*T3[6])+(T2[7]*T3[7])+(T2[8]*T3[8]))*((tva/100)+1)).toFixed(2) + 'DT',
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
        '\n\n',
        {
          text: 'Signature',
          style: 'notesTitle',
        },
        {
          text: '........',
          style: 'notesText',
        },
      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
    };
    pdfMake.createPdf(documentDefinition).open();
   }
}
