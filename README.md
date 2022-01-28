## CONTACS APP

#### Descripción

Aplicación web tipo CRUD para administrar contactos realizada con angular 11 🛠️.  Permite crear, editar, eliminar y listar contactos a pedido del usuario.

#### Uso en vivo online
Enlace: https://github.com/AirDevCode/contacts-app

•	Desde la página de inicio dar clic en administrar contactos.

•	En la página de contactos se podrá visualizar los elementos que ya estén añadidos en el sistema.

#### Filtros
•	Se pueden filtrar los datos desde el campo de texto que se encuentra encima de la tabla de información. 

•	El campo de texto permite realizar un filtro automático (a medida que el usuario escribe) sobre todos los datos presentes en la tabla por igual.

•	El icono de búsqueda sólo tiene fines decorativos, no cuenta con ninguna interacción, puesto que el campo de texto ya realiza la búsqueda.

 #### Función agregar

•	Desde el botón agregar contacto de la vista de contactos se puede acceder al formulario que permite crear un nuevo registro. Todos los datos son requeridos, por lo que si se intenta guardar sin tener todos los campos llenos el sistema mostrará los respectivos errores. Además, el campo de correo electrónico verifica que sea una dirección válida para este tipo de dato para permitir el guardado exitoso (ejemplo: micorreo@micorreo.com).
   
•	El campo de la edad se llena automáticamente a partir de la fecha de nacimiento y se encuentra deshabilitado para edición. Para que la edad pueda mostrarse la fecha de nacimiento debe ser igual o superior a un año. 

•	Si intenta ingresar un contacto con un correo electrónico ya existente la aplicación mostrará un mensaje de error, puesto que cada usuario agregado debe tener una dirección de correo única.

•	Con la información correctamente diligenciada se puede guardar un nuevo dato y el sistema redirigirá a la lista principal mostrando una notificación en la parte superior indicando el éxito de la operación y en el listado se podrá evidenciar el nuevo registro agregado.
   

#### Función editar
•	Desde el listado de contactos dando clic en el botón Editar  se abrirá una vista que trae los datos del contacto elegido y permitirá la actualización del registro.

•	Este formulario sigue las mismas reglas de validación que el de creación del registro.

#### Función eliminar
•	Desde el listado de contactos dando clic en el botón Borrar  se eliminará el registro seleccionado.

#### Versión móvil

La aplicación se encuentra optimizada para visualizarse en dispositivos móviles. La tabla que muestra la lista de contactos posee un scroll horizontal al momento de visualizarla en este tipo de dispositivos. 
   
#### Descarga desde repositorio y uso en el ordenador 🔧

##### Requisitos 📋: 
•	Angular CLI instalado. Versión de Angular 11 o superior. 
•	Editor de código preferible VS Code.
•	Preferible contar con Git y GitBash.

##### Pasos para la descarga
•	Desde el repositorio https://github.com/AirDevCode/contacts-app en el botón code clonar el proyecto o dar clic en <<Download ZIP>> y extraer la carpeta en el ordenador.
•	Abrir el proyecto en el editor de código y desde la terminal integrada o GIT Bash realizar la instalación de las dependencias con  $npm install
•	Posteriormente ejecutar el proyecto con ng serve -o y si se desea cambiar el puerto añadir --port.  
•	La aplicación utiliza un fakeApi para realizar peticiones HTTP a partir del localhost:4000. Puede cambiar este comportamiento para conectarse a una API propia o editar el puerto desde la carpeta environments en el archivo environment.ts.

##### Con los pasos anteriores el proyecto se ejecutará de forma local. 

 
