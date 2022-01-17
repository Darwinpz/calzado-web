$(document).ready(function () {
    $('#table_categorias').DataTable({
        "pagingType": "full_numbers", //con esto salen los botones de primero anterior siguiente ultimo y los numeros de pagina
        "pageLength": 5, //para que se filtren por 5
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json" //Para que salga en español
        },
        "lengthMenu": [5, 10, 15,20]
    });
});


$('.btn-eliminar').click(function (e) {

    e.preventDefault();

    let $this = $(this);

    let categoria = $this.data('nombre')

    const response = confirm('¿Estas seguro de eliminar la categoria: '+categoria+'?');

    if (response) {
        
        $.ajax({

            url: '/administrar/categorias',
            type: 'DELETE',
            data: {categoria}

        }).done(function () {

            window.location.reload();

        });

    }

});