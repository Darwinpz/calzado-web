$(document).ready(function () {
    $('#table_calendario').DataTable({
        "pagingType": "full_numbers", //con esto salen los botones de primero anterior siguiente ultimo y los numeros de pagina
        "pageLength": 5, //para que se filtren por 5
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json" //Para que salga en español
        },
        "lengthMenu": [5, 10, 15,20]
    });
});