//Desafío Citas Médicas - Hans Contreras

// Importación de Módulos
const http = require('http');
const port = 3000
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

// Definir array para la lista de usuarios
let userList = [];

// Creación del Servidor
http
    .createServer((req, res) => {

        // Definir ruta para el registro de usuarios
        if (req.url.includes('/registrar_usuario')) {

            // Utilizar Axios para llamar a la API y traer los datos de la consulta
            axios
                .get('https://randomuser.me/api/')
                .then((data) => {
                    const name_ = data.data.results[0].name.first;
                    const lastname = data.data.results[0].name.last;
                    const id = uuidv4().slice(0, 6);
                    const date = moment().format('MMM Do YYYY, h:mm:ss a');

                    // Ingreso de objeto en el Array con las propiedades de la consulta
                    userList.push(
                        {
                            nombre: name_,
                            apellido: lastname,
                            id: id,
                            timestamp: date
                        });
                    console.log(chalk.blue.bgYellow('Usuario registrado exitosamente.\n'));

                })
                .catch((e) => {
                    console.log(e);
                })

            res.end();
        }

        // Definir ruta para consultar la lista de usuarios
        if (req.url.includes('/consultar_lista')) {

            let i = 1;

            console.log(chalk.red.bgGreen('\nLista de usuarios registrados:'));

            res.write('Lista de usuarios registrados:\n');

            // Utilizar Lodash para recorrer el array de la lista de usuarios
            _.forEach(userList, (elemento) => {

                // Print del resultado en consola
                console.log(chalk.blue.bgWhite(`${i}. 
                Nombre: ${elemento.name_} - 
                Apellido: ${elemento.lastname} - 
                Id: ${elemento.id} - 
                Timestamp: ${elemento.timestamp}`));

                // Resultado devuelto al cliente
                res.write(`${i}. 
                Nombre: ${elemento.name_} - 
                Apellido: ${elemento.lastname} - 
                Id: ${elemento.id} - 
                Timestamp: ${elemento.timestamp}\n`);
                i++;
            })

            res.end();
        }
    })
    .listen(`${port}`, () => { console.log(`Servidor corriendo en el puerto ${port}`) });