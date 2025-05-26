async function cargarMascotas() {
    const res = await fetch('/mascotas');
    const mascotas = await res.json();
    const lista = document.getElementById('lista-mascotas');
    lista.innerHTML = '';
    mascotas.forEach(m => {
        if (m.estado === 'disponible') {
            lista.innerHTML += `<li><strong>${m.nombre}</strong> (${m.tipo}) - ${m.descripcion}</li>`;
        }
    });
}

document.addEventListener('DOMContentLoaded', cargarMascotas);
